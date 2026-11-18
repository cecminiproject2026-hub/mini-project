# AI-Powered Student Project Research & Innovation Platform

A full-stack starter implementation: React + Vite + Tailwind + Recharts frontend, Flask REST API, MySQL schema, Semantic Scholar/OpenAlex retrieval, Hugging Face public dataset discovery, sentence-transformer semantic ranking, transparent heuristic analysis, and printable report.

## Quick start
1. Copy `backend/.env.example` to `backend/.env` and configure MySQL.
2. Create a database and run `mysql -u root -p < database/schema.sql`.
3. Backend: `cd backend && python -m venv .venv && source .venv/bin/activate` (Windows: `.venv\\Scripts\\activate`), `pip install -r requirements.txt`, `python app.py`.
4. Frontend: `cd frontend && npm install && npm run dev`.
5. Open the Vite URL (normally http://localhost:5173).

During development, Vite proxies `/api` requests to Flask at `http://localhost:5000`, avoiding browser cross-origin errors. For a separately hosted frontend, set `VITE_API_URL` in `frontend/.env` to the Flask API origin and configure `CORS_ORIGINS` in `backend/.env`.

## Notes
- Research records are fetched from public APIs; availability and abstracts vary.
- The Datasets tab finds public, ungated Hugging Face datasets and ranks them with the free `sentence-transformers/all-MiniLM-L12-v2` model. The model downloads on first use and then runs locally. Dataset licenses and download conditions vary; review each dataset card before using or redistributing data.
- Dataset search API: `GET /api/datasets/search?q=<topic>`.
- Similarity is semantic similarity, **not novelty**.
- Limitation/gap/score outputs are explicitly heuristic AI-assisted prototypes, not validated scientific measurements. Missing source facts are shown as unavailable.
- GitHub discovery is a live repository search and is best-effort.
- MySQL persistence is used when configured; the app can still run in demo/development mode without it.
