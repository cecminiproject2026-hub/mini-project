from flask import Flask,request,jsonify,make_response
from flask_cors import CORS
from config import Config
from services.analysis import analyze
import mysql.connector, json, io
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
app=Flask(__name__); app.config.from_object(Config); CORS(app,origins=Config.CORS_ORIGINS.split(','))
#Test
def db():
 return mysql.connector.connect(**Config.MYSQL)
@app.get('/api/health')
def health(): return jsonify({'status':'ok'})
@app.post('/api/project/analyze')
def project_analyze():
 d=request.get_json(silent=True) or {}
 if not d.get('title','').strip() or not d.get('description','').strip(): return jsonify({'error':'Title and description are required'}),400
 result=analyze(d); result['project']={k:d.get(k) for k in ['title','description','domain','technologies','project_level']}
 try:
  conn=db(); cur=conn.cursor()
  cur.execute('INSERT INTO projects(title,description,domain,technologies,project_level) VALUES(%s,%s,%s,%s,%s)',(d['title'],d['description'],d.get('domain'),json.dumps(d.get('technologies',[])),d.get('project_level')))
  result['project_id']=cur.lastrowid
  conn.commit(); cur.close(); conn.close()
 except Exception as e: result['persistence']='Database unavailable; analysis returned without saving.'
 return jsonify(result)
@app.get('/api/research/search')
def search():
 from services.paper_search import search_papers
 q=request.args.get('q','').strip()
 if not q:return jsonify({'error':'q is required'}),400
 papers,errors=search_papers(q); return jsonify({'papers':papers,'errors':errors})
@app.post('/api/research/compare')
@app.post('/api/research/similarity')
def compare(): return project_analyze()
@app.post('/api/research/gaps')
@app.post('/api/project/innovations')
@app.post('/api/project/evaluate')
def derived(): return project_analyze()
@app.get('/api/project/report/<int:pid>')
def report(pid):
 # printable HTML/PDF generated from saved project is intentionally safe if DB is not configured
 try:
  conn=db(); cur=conn.cursor(dictionary=True); cur.execute('SELECT * FROM projects WHERE id=%s',(pid,)); p=cur.fetchone(); cur.close(); conn.close()
 except Exception: p=None
 if not p:return jsonify({'error':'Project not found or database unavailable'}),404
 buf=io.BytesIO(); c=canvas.Canvas(buf,pagesize=letter); y=750
 for line in ['AI-Powered Student Project Research & Innovation Platform','Project: '+p['title'],'Description: '+p['description'],'','This saved-project summary does not include an analysis snapshot. Run analysis again to generate a complete report.']:
  c.drawString(50,y,line[:105]); y-=24
 c.save(); buf.seek(0); resp=make_response(buf.read()); resp.headers['Content-Type']='application/pdf'; resp.headers['Content-Disposition']=f'attachment; filename=project-{pid}-report.pdf'; return resp
if __name__=='__main__': app.run(debug=True,port=5000)
