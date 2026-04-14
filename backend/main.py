"""
AquaBot – Groundwater Chatbot Backend
FastAPI + RAG + Gemini (google-generativeai)

Run:
    uvicorn main:app --reload --port 8000
"""

import os
import time
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from google import genai

from rag import GroundwaterRAG

# ─── Config ──────────────────────────────────────────────────────────────────────

load_dotenv()
API_KEY = os.getenv("API_KEY")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
FALLBACK_MODELS = [model.strip() for model in os.getenv("FALLBACK_MODELS", "").split(",") if model.strip()]
MAX_RETRIES = int(os.getenv("LLM_MAX_RETRIES", "3"))
RETRY_DELAY_SECONDS = float(os.getenv("LLM_RETRY_DELAY_SECONDS", "1.0"))
DATA_DIR = Path(__file__).parent / "data"

# ─── Global RAG instance ─────────────────────────────────────────────────────────

rag = GroundwaterRAG()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Load data files on startup."""
    water_level_file = DATA_DIR / "GWATERLVL (2).json"
    if water_level_file.exists():
        rag.load_water_level_data(str(water_level_file))
        print(f"[startup] Loaded water level data from {water_level_file}")
    else:
        print("[startup] Water level data file not found – real-time context disabled")
    yield


# ─── App ─────────────────────────────────────────────────────────────────────────

app = FastAPI(
    title="AquaBot – Groundwater Information System",
    version="2.0.0",
    description="RAG-powered chatbot for groundwater queries (CGWB, India)",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Gemini client ───────────────────────────────────────────────────────────────

gemini_client = genai.Client(api_key=API_KEY) if API_KEY else None


def call_llm(prompt: str) -> str:
    """Call Gemini with retries and fallback model support."""
    if not gemini_client:
        return "⚠️ LLM not configured. Set API_KEY in .env file."

    models_to_try = [GEMINI_MODEL] + [m for m in FALLBACK_MODELS if m != GEMINI_MODEL]
    last_error = None

    for model in models_to_try:
        for attempt in range(1, MAX_RETRIES + 1):
            try:
                response = gemini_client.models.generate_content(
                    model=model,
                    contents=prompt,
                )
                return response.text
            except Exception as e:
                last_error = e
                if attempt < MAX_RETRIES:
                    delay = RETRY_DELAY_SECONDS * (2 ** (attempt - 1))
                    time.sleep(delay)
                    continue
                break

    error_message = str(last_error) if last_error else "unknown error"
    model_list = ", ".join(models_to_try)
    return (
        f"Error calling LLM after {MAX_RETRIES} attempts on {model_list}: {error_message}"
    )


# ─── Request / Response Models ───────────────────────────────────────────────────

class ChatMessage(BaseModel):
    role: str  # "user" or "assistant"
    content: str


class ChatRequest(BaseModel):
    message: str
    district: str | None = None
    state: str | None = None
    history: list[ChatMessage] | None = []
    report_mode: bool = False  # True = generate comprehensive report


class ChatResponse(BaseModel):
    reply: str
    sources: list[str] = []
    data_used: bool = False


class ReportRequest(BaseModel):
    area: str          # e.g. "Coimbatore, Tamil Nadu"
    district: str | None = None
    include_realtime: bool = True


# ─── Routes ──────────────────────────────────────────────────────────────────────

@app.get("/")
def health():
    return {
        "status": "running",
        "service": "AquaBot Groundwater RAG API v2.0",
        "knowledge_chunks": len(rag.chunks),
        "realtime_data": rag._water_level_data is not None,
    }


@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    """Main chat endpoint – uses RAG to answer groundwater queries."""

    # Build RAG prompt
    history = [m.model_dump() for m in (req.history or [])]
    prompt = rag.build_prompt(
        user_query=req.message,
        chat_history=history,
        district=req.district,
        report_mode=req.report_mode,
    )

    # Retrieve sources for transparency
    retrieved = rag.retrieve(req.message, top_k=4)
    sources = [f"{c['category'].upper()}: {c['title']}" for c in retrieved]

    # Check if real-time data was injected
    wl_ctx = rag.get_water_level_context(district=req.district)
    data_used = bool(wl_ctx)

    # Call LLM
    reply = call_llm(prompt)

    return ChatResponse(reply=reply, sources=sources, data_used=data_used)


@app.post("/report", response_model=ChatResponse)
def generate_report(req: ReportRequest):
    """Generate a comprehensive groundwater report for a specified area."""
    query = (
        f"Generate a comprehensive groundwater report for {req.area}. "
        f"Include all sections: hydrogeological setting, water level scenario, "
        f"resource assessment, categorization, water quality, management practices, "
        f"NOC conditions, available reports, training opportunities, and glossary."
    )

    prompt = rag.build_prompt(
        user_query=query,
        district=req.district,
        report_mode=True,
    )

    retrieved = rag.retrieve(query, top_k=6)
    sources = [f"{c['category'].upper()}: {c['title']}" for c in retrieved]
    wl_ctx = rag.get_water_level_context(district=req.district)

    reply = call_llm(prompt)
    return ChatResponse(reply=reply, sources=sources, data_used=bool(wl_ctx))


@app.get("/water-levels")
def get_water_levels(district: str | None = None, station: str | None = None):
    """Return raw water level data for a district/station."""
    if rag._water_level_data is None:
        raise HTTPException(status_code=503, detail="Water level data not loaded")

    records = rag._water_level_data
    if district:
        records = [r for r in records if district.lower() in r.get("district", "").lower()]
    if station:
        records = [r for r in records if r.get("stationCode", "").upper() == station.upper()]

    return {"count": len(records), "data": records[:200]}


@app.get("/stations")
def get_stations(district: str | None = None):
    """Return unique monitoring stations."""
    if not rag._water_level_data:
        return {"stations": []}

    seen = {}
    for r in rag._water_level_data:
        code = r.get("stationCode")
        if code and code not in seen:
            seen[code] = {
                "code": code,
                "name": r.get("stationName"),
                "district": r.get("district"),
                "tehsil": r.get("tehsil"),
                "latitude": r.get("latitude"),
                "longitude": r.get("longitude"),
                "wellDepth": r.get("wellDepth"),
                "status": r.get("stationStatus"),
            }

    stations = list(seen.values())
    if district:
        stations = [s for s in stations if district.lower() in (s.get("district") or "").lower()]

    return {"count": len(stations), "stations": stations}


@app.get("/knowledge")
def list_knowledge(category: str | None = None):
    """List available knowledge chunks (for admin/debug)."""
    chunks = rag.chunks
    if category:
        chunks = [c for c in chunks if c["category"] == category]
    return {
        "total": len(chunks),
        "categories": list({c["category"] for c in rag.chunks}),
        "chunks": [{"id": c["id"], "category": c["category"], "title": c["title"]} for c in chunks],
    }
