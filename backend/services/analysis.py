from services.embedding_service import embeddings,cosine
from services.paper_search import search_papers
def analyze(data):
 query=(data['title']+' '+data['description']+' '+data.get('domain',''))
 papers,errors=search_papers(query)
 docs=[(p.get('title') or '')+' '+(p.get('abstract') or '') for p in papers]
 vectors=embeddings([query]+docs)
 ranked=[]
 for p,v in zip(papers,vectors[1:]):
  p['similarity_score']=round(max(0,min(1,cosine(vectors[0],v)))*100,1)
  p['methodology']=None; p['dataset']=None; p['limitations']=None
  ranked.append(p)
 ranked.sort(key=lambda x:x['similarity_score'],reverse=True)
 # Transparent phrase-based signals only; do not represent as facts stated in papers.
 limitation_signals=[]
 corpus=' '.join((p.get('abstract') or '').lower() for p in papers)
 for phrase,label in [('small dataset','dataset size'),('limited dataset','dataset diversity/size'),('computational cost','computational cost'),('low-light','lighting robustness'),('real-world','real-world validation')]:
  if phrase in corpus: limitation_signals.append({'theme':label,'type':'AI-identified possible limitation','evidence':'Phrase detected in retrieved abstracts; verify in full text.'})
 gaps=[]
 if len(papers):
  gaps=[{'title':'Potential Research Gap','description':'Investigate whether the proposed system can improve robustness, resource efficiency, and evaluation across realistic conditions. This is a hypothesis to validate against full papers, not a confirmed novelty claim.','basis':'AI-assisted synthesis of the project description and retrieved abstracts.'}]
 innovations=[
 {'feature':'Benchmark on a diverse, documented dataset','why':'Makes performance claims more reproducible.','problem':'Potential dataset coverage gaps','difficulty':'Medium'},
 {'feature':'Measure latency and resource use on target hardware','why':'Tests practical deployment constraints.','problem':'Unverified real-time/edge performance','difficulty':'Medium'},
 {'feature':'Evaluate under varied environmental conditions','why':'Reveals robustness limitations beyond curated data.','problem':'Potential domain shift','difficulty':'Medium'}]
 scores={'novelty':50,'innovation':60,'feasibility':70,'research_potential':65,'impact':60}
 explanations={k:'Prototype heuristic based on the submitted description and retrieved metadata; not a validated measurement.' for k in scores}
 return {'papers':ranked,'similarity_results':[{'title':p['title'],'score':p['similarity_score'],'url':p.get('url')} for p in ranked],
 'comparison':[{k:p.get(k) or 'Information unavailable' for k in ['title','year','source','methodology','dataset','limitations','url']} for p in ranked[:6]],
 'limitations':limitation_signals,'research_gaps':gaps,'innovations':innovations,
 'evaluation':scores,'evaluation_explanations':explanations,'api_status':errors,
 'notice':'Similarity is semantic similarity, not novelty. Analyses are AI-assisted prototypes.'}
