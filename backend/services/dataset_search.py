import re

import numpy as np
import requests


DATASETS_API = 'https://huggingface.co/api/datasets'
DATASET_MODEL_NAME = 'sentence-transformers/all-MiniLM-L12-v2'
MIN_SIMILARITY = 0.25
_dataset_model = None
STOP_WORDS = {
    'a', 'ai', 'an', 'and', 'application', 'artificial', 'based', 'computer',
    'deep', 'for', 'from', 'in', 'intelligence', 'into', 'learning', 'machine',
    'network', 'neural', 'of', 'on', 'or', 'powered', 'project', 'real',
    'system', 'the', 'time', 'to', 'using', 'vision', 'with',
}


def _query_terms(query):
    terms = list(dict.fromkeys(
        term for term in re.findall(r'[a-z0-9]+', query.lower()) if term not in STOP_WORDS
    ))
    if not terms:
        terms = list(dict.fromkeys(re.findall(r'[a-z0-9]+', query.lower())))
    return terms


def _search_phrases(query):
    terms = _query_terms(query)
    if len(terms) < 2:
        return terms
    return [' '.join(terms[index:index + 2]) for index in range(0, len(terms), 2)][:4]


def _dataset_result(dataset):
    if not isinstance(dataset, dict) or dataset.get('disabled'):
        return None
    if dataset.get('gated') not in (None, False, 'false', ''):
        return None

    dataset_id = dataset.get('id')
    if not dataset_id:
        return None

    card_data = dataset.get('cardData') or {}
    title = card_data.get('pretty_name') or dataset_id.rsplit('/', 1)[-1]
    tags = [tag for tag in (dataset.get('tags') or []) if isinstance(tag, str)]
    return {
        'id': dataset_id,
        'title': title,
        'description': card_data.get('description'),
        'license': card_data.get('license'),
        'downloads': dataset.get('downloads'),
        'likes': dataset.get('likes'),
        'last_modified': dataset.get('lastModified'),
        'tags': tags[:8],
        'url': f'https://huggingface.co/datasets/{dataset_id}',
        '_search_text': ' '.join([
            title,
            dataset_id.rsplit('/', 1)[-1],
            card_data.get('description') or '',
            ' '.join(tags),
        ]),
    }


def _semantic_scores(query, documents):
    global _dataset_model
    if _dataset_model is None:
        from sentence_transformers import SentenceTransformer
        _dataset_model = SentenceTransformer(DATASET_MODEL_NAME)
    vectors = _dataset_model.encode([query, *documents], normalize_embeddings=True)
    return np.dot(vectors[1:], vectors[0]).tolist()


def search_datasets(query, limit=12):
    phrases = _search_phrases(query)
    if not phrases:
        return []

    datasets_by_id = {}
    for phrase in phrases:
        response = requests.get(
            DATASETS_API,
            params={
                'search': phrase,
                'limit': max(limit, 24),
                'sort': 'downloads',
                'direction': '-1',
            },
            timeout=15,
        )
        response.raise_for_status()
        datasets = response.json()
        if not isinstance(datasets, list):
            raise ValueError('Dataset catalog returned an unexpected response.')
        for dataset in datasets:
            result = _dataset_result(dataset)
            if result:
                datasets_by_id[result['id']] = result

    candidates = list(datasets_by_id.values())
    if not candidates:
        return []

    scores = _semantic_scores(query, [item['_search_text'] for item in candidates])
    results = []
    for item, score in zip(candidates, scores):
        if score < MIN_SIMILARITY:
            continue
        item['similarity_score'] = round(float(score) * 100, 1)
        del item['_search_text']
        results.append(item)
    results.sort(key=lambda item: (item['similarity_score'], item.get('downloads') or 0), reverse=True)
    results = results[:limit]
    return results
