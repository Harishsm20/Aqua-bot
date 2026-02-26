from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import os
from google import genai
from dotenv import load_dotenv

# Load API key
load_dotenv()
API_KEY = os.getenv("API_KEY")

client = genai.Client(api_key=os.environ.get("API_KEY"))

app = FastAPI()

# ✅ CORS Middleware — allows browser requests from your React app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],        # Allow all origins (use specific URL in production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model
class Query(BaseModel):
    message: str

# Groundwater keywords
GROUNDWATER_KEYWORDS = [
    "groundwater",
    "water level",
    "hydrogeology",
    "water quality",
    "noc",
    "extraction",
    "aquifer",
    "ground water",
    "resource assessment",
    "management",
    "well",
    "aquifer",
    "borehole",
    "water table",
    "pump"
]

# AI Call Function
def call_ai(prompt: str):
    response = client.models.generate_content(
        model="gemini-2.5-flash", 
        contents=prompt
    )
    return response.text


@app.get("/")
def home():
    return {"message": "Aquabot Backend Running Successfully"}


@app.post("/chat")
def chat(query: Query):
    user_message = query.message.lower()

    # Keyword restriction
    if not any(keyword in user_message for keyword in GROUNDWATER_KEYWORDS):
        return {"reply": "Please ask questions related to groundwater only."}

    ai_reply = call_ai(user_message)
    return {"reply": ai_reply}