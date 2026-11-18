import unittest
from unittest.mock import Mock, patch

from services.dataset_search import search_datasets


class DatasetSearchTests(unittest.TestCase):
    @patch('services.dataset_search._semantic_scores', return_value=[0.83, 0.12])
    @patch('services.dataset_search.requests.get')
    def test_semantically_ranks_open_datasets_and_filters_irrelevant_results(self, get, _scores):
        response = Mock()
        response.json.return_value = [
            {'id': 'datasets/waste-segregation', 'downloads': 10, 'tags': ['image']},
            {'id': 'datasets/computer-vision-general', 'downloads': 1000, 'tags': ['image']},
            {'id': 'datasets/gated-waste-segregation', 'gated': True, 'tags': []},
        ]
        get.return_value = response

        datasets = search_datasets('waste segregation')

        self.assertEqual([dataset['id'] for dataset in datasets], ['datasets/waste-segregation'])
        self.assertEqual(datasets[0]['similarity_score'], 83.0)
        self.assertEqual(get.call_args.kwargs['params']['search'], 'waste segregation')

    @patch('services.dataset_search._semantic_scores', return_value=[0.8, 0.19])
    @patch('services.dataset_search.requests.get')
    def test_filters_low_semantic_similarity(self, get, _scores):
        response = Mock()
        response.json.return_value = [
            {'id': 'datasets/weather-forecasting', 'downloads': 1, 'tags': []},
            {'id': 'datasets/neural-network-demo', 'downloads': 5000, 'tags': []},
        ]
        get.return_value = response

        datasets = search_datasets('weather forecasting neural network')

        self.assertEqual([dataset['id'] for dataset in datasets], ['datasets/weather-forecasting'])


if __name__ == '__main__':
    unittest.main()
