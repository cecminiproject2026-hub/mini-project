import os
from dotenv import load_dotenv
load_dotenv()
class Config:
 SECRET_KEY=os.getenv('SECRET_KEY','dev-only-change-me')
 CORS_ORIGINS=os.getenv('CORS_ORIGINS','http://localhost:5173')
 MODEL_NAME=os.getenv('MODEL_NAME','sentence-transformers/all-MiniLM-L6-v2')
 MYSQL={k:os.getenv('MYSQL_'+k,v) for k,v in [('HOST','localhost'),('PORT','3306'),('USER','root'),('PASSWORD',''),('DATABASE','student_research')]}
