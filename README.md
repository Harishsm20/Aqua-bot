# 💧 AquaBot – Groundwater RAG Chatbot

AI-powered groundwater information system built with **Retrieval-Augmented Generation (RAG)**, FastAPI, and Google Gemini. Covers water levels, hydrogeology, water quality, resource assessment, NOC guidance, management practices, and more — grounded in CGWB data.

---

## 🏗️ Architecture

```
User Query
    │
    ▼
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND (React + Vite)                  │
│  ChatWindow ──► API call ──► /chat or /report               │
│  Sidebar: State/District selector, Station viewer           │
│  SourceBadge: shows which knowledge chunks were retrieved   │
└─────────────────────────────────────────────────────────────┘
    │  HTTP POST
    ▼
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND (FastAPI)                          │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              RAG ENGINE                               │  │
│  │                                                       │  │
│  │  1. RETRIEVE                                         │  │
│  │     TF-IDF index over 25+ knowledge chunks          │  │
│  │     Categories: water_level, hydrogeology,           │  │
│  │     water_quality, resource_assessment,              │  │
│  │     noc_regulation, management, definitions,         │  │
│  │     training, reports, comprehensive_report          │  │
│  │                                                       │  │
│  │  2. AUGMENT                                          │  │
│  │     Inject retrieved chunks + real-time WRIS data   │  │
│  │     + chat history + district context               │  │
│  │                                                       │  │
│  │  3. GENERATE                                         │  │
│  │     Gemini 2.5 Flash generates grounded answer      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │   DATA LAYER                                          │  │
│  │   data/GWATERLVL.json  ── Telemetric readings        │  │
│  │   (India-WRIS API data, Jan-Feb 2026)                │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────┐
│                  KNOWLEDGE BASE (25+ chunks)                 │
│                                                             │
│  📍 Water Level Monitoring (3 chunks)                       │
│     - National framework, interpretation, Coimbatore data  │
│  🗺️  Hydrogeology (4 chunks)                               │
│     - Aquifer types, Coimbatore setting, recharge/discharge,│
│       Tamil Nadu hydrology                                  │
│  🧪 Water Quality (3 chunks)                               │
│     - BIS/WHO standards, national problems, Coimbatore     │
│  📊 Resource Assessment (3 chunks)                          │
│     - GEC 2015 methodology, categorization, TN status      │
│  📋 NOC & Regulation (4 chunks)                            │
│     - CGWA framework, application steps, conditions, TN    │
│  🌱 Management (3 chunks)                                   │
│     - Best practices, artificial recharge, over-exploited  │
│  📖 Definitions (3 chunks)                                  │
│     - Glossary A-G, H-R, S-Z                               │
│  🎓 Training (3 chunks)                                     │
│     - CGWB/NIH courses, online, driller training           │
│  📚 Reports (3 chunks)                                      │
│     - CGWB publications, India-WRIS, district reports      │
│  📄 Comprehensive Report (1 chunk)                          │
│     - 13-section report structure template                 │
└─────────────────────────────────────────────────────────────┘
```

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **RAG Retrieval** | TF-IDF semantic search over curated groundwater knowledge base |
| **Real-time Data** | Injects live water level readings from India-WRIS telemetric stations |
| **Area Context** | District/State filter — answers are location-aware |
| **Comprehensive Reports** | One-click 13-section area report (GW Resource Assessment, NOC, Management, etc.) |
| **Source Transparency** | Every answer shows which knowledge chunks were retrieved |
| **Chat History** | Multi-turn conversation with context window management |
| **Quick Queries** | Pre-built buttons for common groundwater questions |
| **Station Viewer** | Browse active CGWB monitoring stations in your district |

---

## 🚀 Setup & Run

### Prerequisites
- Python 3.11+
- Node.js 18+
- Gemini API key (get free at [aistudio.google.com](https://aistudio.google.com))

### Backend

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Configure API key
cp .env.example .env
# Edit .env and set API_KEY=your_gemini_key

# Start server
uvicorn main:app --reload --port 8000
```

Backend runs at: `http://localhost:8000`
API docs at: `http://localhost:8000/docs`

### Frontend

```bash
cd frontend/groundwater-chatbot

# Install dependencies
npm install

# Set backend URL (default: http://localhost:8000)
echo "VITE_API_URL=http://localhost:8000" > .env

# Start dev server
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 📡 API Endpoints

### `POST /chat`
Main chat endpoint with RAG.

```json
{
  "message": "What are NOC conditions for groundwater extraction?",
  "district": "Coimbatore",
  "state": "Tamil Nadu",
  "history": [{"role": "user", "content": "..."}, ...],
  "report_mode": false
}
```

Response:
```json
{
  "reply": "...",
  "sources": ["NOC_REGULATION: NOC Application Process – Step by Step"],
  "data_used": true
}
```

### `POST /report`
Generate comprehensive 13-section area report.

```json
{
  "area": "Coimbatore, Tamil Nadu",
  "district": "Coimbatore",
  "include_realtime": true
}
```

### `GET /water-levels?district=Coimbatore`
Raw telemetric water level data.

### `GET /stations?district=Coimbatore`
Active monitoring stations.

### `GET /knowledge?category=noc_regulation`
Browse knowledge chunks.

---

## 📚 Knowledge Base Categories

| Category | Chunks | Description |
|----------|--------|-------------|
| `water_level` | 3 | Monitoring network, data interpretation, Coimbatore readings |
| `hydrogeology` | 4 | Aquifer types, Coimbatore geology, recharge, TN hydrology |
| `water_quality` | 3 | BIS/WHO standards, national issues, Coimbatore quality |
| `resource_assessment` | 3 | GEC 2015 methodology, categorization, TN block status |
| `noc_regulation` | 4 | CGWA framework, step-by-step process, conditions, TN rules |
| `management` | 3 | Best practices, recharge techniques, over-exploited strategy |
| `definitions` | 3 | Complete glossary (A–Z) of groundwater terms |
| `training` | 3 | CGWB/NIH courses, online learning, driller programs |
| `reports` | 3 | CGWB publications, India-WRIS portal, district brochures |
| `comprehensive_report` | 1 | 13-section report structure |

---

## 🔧 Extending the RAG System

### Add More Knowledge Chunks
Edit `backend/rag/knowledge_base.py` and add new dict entries to `KNOWLEDGE_CHUNKS`:

```python
{
    "id": "wq_004",
    "category": "water_quality",
    "title": "Arsenic Remediation Methods",
    "content": "...",
    "keywords": ["arsenic", "remediation", "treatment"]
}
```

### Add More Data Files
In `backend/main.py`, load additional files:

```python
rag.load_water_level_data("data/your_file.json")
```

### Upgrade to Vector Embeddings
Replace the TF-IDF retriever in `rag_engine.py` with:

```python
# Using sentence-transformers (when network available):
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np

model = SentenceTransformer("all-MiniLM-L6-v2")
embeddings = model.encode([c["content"] for c in chunks])
index = faiss.IndexFlatL2(embeddings.shape[1])
index.add(np.array(embeddings))
```

---

## 🗂️ Project Structure

```
groundwater-rag/
├── backend/
│   ├── main.py                  # FastAPI app, routes, LLM calls
│   ├── requirements.txt
│   ├── .env.example
│   ├── rag/
│   │   ├── __init__.py
│   │   ├── rag_engine.py        # TF-IDF retrieval, prompt assembly
│   │   └── knowledge_base.py   # 25+ domain knowledge chunks
│   └── data/
│       └── GWATERLVL (2).json  # India-WRIS telemetric data
├── frontend/
│   └── groundwater-chatbot/
│       └── src/
│           ├── components/
│           │   ├── ChatWindow.jsx   # Main chat UI, API calls
│           │   ├── Sidebar.jsx      # State/District selector
│           │   ├── MessageBubble.jsx
│           │   ├── ChatInput.jsx
│           │   ├── TypingIndicator.jsx
│           │   └── SourceBadge.jsx
│           └── pages/
│               └── Home.jsx
└── README.md
```

---

## 📊 Sample Queries

```
💧 "What is the current water level in Coimbatore district?"
🗺️ "Explain the hydrogeology of hard-rock aquifers in Tamil Nadu"
🧪 "Is fluoride a problem in Coimbatore? What are safe levels?"
📊 "How is groundwater resource assessment done under GEC 2015?"
📋 "What documents do I need to apply for NOC from CGWA?"
🌱 "What artificial recharge methods work in hard-rock terrain?"
📖 "What is transmissivity and how is it calculated?"
🎓 "What CGWB training courses are available for hydrogeologists?"
📚 "Where can I download groundwater reports for Coimbatore?"
📄 "Generate a comprehensive groundwater report for Coimbatore"
```
