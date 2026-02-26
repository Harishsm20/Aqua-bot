"""
RAG Engine for Groundwater Chatbot
Handles: text chunking, TF-IDF/cosine retrieval (no external embedding service needed),
data-aware context injection, and prompt assembly.
"""

import json
import math
import re
from collections import Counter
from pathlib import Path
from typing import Any

from .knowledge_base import KNOWLEDGE_CHUNKS


# ─── Simple TF-IDF Retriever ────────────────────────────────────────────────────

def _tokenize(text: str) -> list[str]:
    """Lowercase, remove punctuation, split on whitespace."""
    text = re.sub(r"[^a-z0-9\s]", " ", text.lower())
    return [t for t in text.split() if len(t) > 1]


def _build_tfidf_index(chunks: list[dict]) -> tuple[list[Counter], dict]:
    """Build TF-IDF vectors for all chunks."""
    tf_vectors = []
    df: Counter = Counter()
    N = len(chunks)

    for chunk in chunks:
        combined = chunk["title"] + " " + chunk["content"] + " " + " ".join(chunk.get("keywords", []))
        tokens = _tokenize(combined)
        tf = Counter(tokens)
        tf_vectors.append(tf)
        for term in set(tokens):
            df[term] += 1

    idf = {term: math.log(N / (freq + 1)) + 1 for term, freq in df.items()}
    return tf_vectors, idf


def _tfidf_score(query_tokens: list[str], tf: Counter, idf: dict) -> float:
    score = 0.0
    query_tf = Counter(query_tokens)
    for term, qtf in query_tf.items():
        if term in tf and term in idf:
            score += (1 + math.log(tf[term] + 1)) * idf.get(term, 0) * qtf
    return score


class GroundwaterRAG:
    def __init__(self):
        self.chunks = KNOWLEDGE_CHUNKS
        self._tf_vectors, self._idf = _build_tfidf_index(self.chunks)
        self._water_level_data: list[dict] | None = None

    # ─── Data Loading ────────────────────────────────────────────────────────

    def load_water_level_data(self, file_path: str) -> None:
        """Load telemetric water level JSON data from India-WRIS."""
        try:
            with open(file_path, "r") as f:
                raw = json.load(f)
            self._water_level_data = raw if isinstance(raw, list) else raw.get("data", [])
        except Exception as e:
            print(f"[RAG] Could not load water level data: {e}")
            self._water_level_data = []

    # ─── Retrieval ──────────────────────────────────────────────────────────

    def retrieve(self, query: str, top_k: int = 4) -> list[dict]:
        """Retrieve top_k most relevant knowledge chunks for the query."""
        query_tokens = _tokenize(query)
        if not query_tokens:
            return []

        scored = []
        for i, (chunk, tf) in enumerate(zip(self.chunks, self._tf_vectors)):
            score = _tfidf_score(query_tokens, tf, self._idf)
            # Boost if category keyword in query
            cat_keywords = {
                "water_level": ["level", "water table", "depth", "mbgl", "trend"],
                "hydrogeology": ["hydrogeology", "aquifer", "geology", "formation", "fracture"],
                "water_quality": ["quality", "fluoride", "tds", "nitrate", "arsenic", "contamination"],
                "resource_assessment": ["assessment", "gec", "stage", "resources", "exploitation"],
                "noc_regulation": ["noc", "permit", "extraction", "regulation", "cgwa", "license"],
                "management": ["management", "recharge", "harvesting", "conservation"],
                "definitions": ["definition", "meaning", "what is", "glossary", "term"],
                "training": ["training", "course", "learn", "certification", "workshop"],
                "reports": ["report", "publication", "data", "brochure", "download"],
                "comprehensive_report": ["comprehensive", "full report", "complete", "generate report"],
            }
            for cat, kws in cat_keywords.items():
                if chunk["category"] == cat and any(kw in query.lower() for kw in kws):
                    score *= 1.5

            scored.append((score, i))

        scored.sort(reverse=True)
        return [self.chunks[i] for score, i in scored[:top_k] if score > 0]

    # ─── Water Level Context ─────────────────────────────────────────────────

    def get_water_level_context(self, district: str | None = None,
                                station_code: str | None = None) -> str:
        """Summarise telemetric data for context injection."""
        if not self._water_level_data:
            return ""

        records = self._water_level_data
        if district:
            records = [r for r in records if district.lower() in r.get("district", "").lower()]
        if station_code:
            records = [r for r in records if r.get("stationCode", "") == station_code]

        if not records:
            return ""

        # Group by station
        stations: dict[str, list] = {}
        for r in records:
            key = r.get("stationCode", "Unknown")
            stations.setdefault(key, []).append(r)

        lines = ["**Real-time Water Level Data (India-WRIS)**"]
        for code, obs in list(stations.items())[:5]:
            sample = obs[0]
            values = [o["dataValue"] for o in obs if o.get("dataValue") is not None]
            if values:
                avg_val = sum(values) / len(values)
                min_val = min(values)
                max_val = max(values)
                latest = sorted(obs, key=lambda x: (
                    x.get("dataTime", {}).get("year", 0),
                    x.get("dataTime", {}).get("monthValue", 0),
                    x.get("dataTime", {}).get("dayOfMonth", 0)
                ))[-1]
                lines.append(
                    f"- Station {code} ({sample.get('stationName', '')}, "
                    f"{sample.get('district', '')}, depth {sample.get('wellDepth', '?')} m): "
                    f"Latest reading {latest['dataValue']} m | "
                    f"Range [{min_val:.2f}, {max_val:.2f}] m | "
                    f"Avg {avg_val:.2f} m ({len(values)} readings)"
                )
        return "\n".join(lines)

    # ─── Prompt Assembly ─────────────────────────────────────────────────────

    def build_prompt(
        self,
        user_query: str,
        chat_history: list[dict] | None = None,
        district: str | None = None,
        report_mode: bool = False,
    ) -> str:
        """Assemble RAG-enhanced prompt for the LLM."""

        # 1. Retrieve relevant knowledge chunks
        relevant_chunks = self.retrieve(user_query, top_k=5 if report_mode else 4)
        knowledge_context = "\n\n".join(
            f"[{c['category'].upper()} – {c['title']}]\n{c['content']}"
            for c in relevant_chunks
        )

        # 2. Real-time water level data (if available)
        wl_context = self.get_water_level_context(district=district)

        # 3. Chat history (last 3 turns)
        history_text = ""
        if chat_history:
            turns = chat_history[-6:]  # 3 user + 3 assistant
            history_text = "\n".join(
                f"{'User' if m['role'] == 'user' else 'Assistant'}: {m['content']}"
                for m in turns
            )

        # 4. Build full prompt
        system_prompt = (
            "You are AquaBot, an expert AI assistant for groundwater information in India, "
            "developed for CGWB and state ground water departments. "
            "Answer ONLY questions related to: groundwater levels, hydrogeology, water quality, "
            "groundwater resource assessment, categorization of areas, groundwater management, "
            "NOC/permits for extraction, groundwater reports, definitions, and training. "
            "If a question is unrelated to groundwater, politely redirect. "
            "Always cite CGWB, GEC 2015, India-WRIS, or relevant government sources. "
            "Be concise but technically accurate. Use metric units. "
            "When generating a comprehensive report, follow the standard 13-section structure."
        )

        prompt_parts = [f"SYSTEM: {system_prompt}\n"]

        if knowledge_context:
            prompt_parts.append(f"RETRIEVED KNOWLEDGE:\n{knowledge_context}\n")

        if wl_context:
            prompt_parts.append(f"{wl_context}\n")

        if history_text:
            prompt_parts.append(f"CONVERSATION HISTORY:\n{history_text}\n")

        if district:
            prompt_parts.append(f"USER'S AREA OF INTEREST: {district}\n")

        if report_mode:
            prompt_parts.append(
                "TASK: Generate a COMPREHENSIVE GROUNDWATER REPORT for the specified area "
                "covering all 13 standard sections. Use the retrieved knowledge and real-time data. "
                "Format with clear headings.\n"
            )

        prompt_parts.append(f"USER QUERY: {user_query}\n\nASSISTANT:")

        return "\n".join(prompt_parts)
