import numpy as np
_model=None
def embeddings(texts):
 global _model
 try:
  from sentence_transformers import SentenceTransformer
  if _model is None:
   from config import Config
   _model=SentenceTransformer(Config.MODEL_NAME)
  return _model.encode(texts, normalize_embeddings=True).tolist()
 except Exception:
  # Deterministic lexical fallback keeps local demos usable; clearly not a transformer.
  import re
  vocab={}
  rows=[]
  for text in texts:
   tokens=re.findall(r'[a-z0-9]+', (text or '').lower()); v={}
   for t in tokens: v[t]=v.get(t,0)+1
   rows.append(v)
  keys=sorted({k for r in rows for k in r})
  return [[r.get(k,0) for k in keys] for r in rows]
def cosine(a,b):
 a=np.array(a,dtype=float); b=np.array(b,dtype=float)
 den=np.linalg.norm(a)*np.linalg.norm(b)
 return float(np.dot(a,b)/den) if den else 0.0
