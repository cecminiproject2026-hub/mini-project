import requests
S2='https://api.semanticscholar.org/graph/v1/paper/search'
OA='https://api.openalex.org/works'
def search_papers(query, limit=15):
 out=[]
 try:
  r=requests.get(S2,params={'query':query,'limit':limit,'fields':'title,abstract,authors,year,url,externalIds,fieldsOfStudy'},timeout=18)
  if r.status_code==429: raise RuntimeError('Semantic Scholar rate limit reached')
  r.raise_for_status()
  for p in r.json().get('data',[]):
   out.append({'title':p.get('title'),'abstract':p.get('abstract'),'authors':[a.get('name') for a in p.get('authors',[])],
    'year':p.get('year'),'url':p.get('url'),'doi':(p.get('externalIds') or {}).get('DOI'),
    'keywords':p.get('fieldsOfStudy') or [],'source':'Semantic Scholar'})
 except Exception as e: s2_error=str(e)
 else: s2_error=None
 try:
  r=requests.get(OA,params={'search':query,'per-page':limit,'select':'id,doi,title,publication_year,authorships,abstract_inverted_index,primary_location'},timeout=18)
  r.raise_for_status()
  for p in r.json().get('results',[]):
   inv=p.get('abstract_inverted_index') or {}; words=['']*(max((max(v) for v in inv.values()),default=-1)+1)
   for word,positions in inv.items():
    for i in positions: words[i]=word
   loc=p.get('primary_location') or {}; src=loc.get('landing_page_url') or p.get('doi')
   out.append({'title':p.get('title'),'abstract':' '.join(words) if words else None,
    'authors':[a.get('author',{}).get('display_name') for a in p.get('authorships',[])],
    'year':p.get('publication_year'),'url':src,'doi':p.get('doi'),'keywords':[],'source':'OpenAlex'})
 except Exception as e: oa_error=str(e)
 else: oa_error=None
 seen=set(); unique=[]
 for p in out:
  key=(p.get('doi') or p.get('title') or '').lower().strip()
  if key and key not in seen: seen.add(key); unique.append(p)
 return unique, {'semantic_scholar':s2_error,'openalex':oa_error}
