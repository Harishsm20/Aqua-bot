from fastapi import FastAPI
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

# GROUNDWATER_KEYWORDS = []

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
    # This is the actual call to the Gemini API
    response = client.models.generate_content(
        model="gemini-2.5-flash", 
        contents=prompt
    )
    return response.text
# def call_ai(user_message):

    url = "https://api.openai.com/v1/chat/completions"

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {
                "role": "system",
                "content": """
You are Aquabot, an AI assistant specialized in groundwater information.

Only answer questions related to:
- Water level scenario
- Hydrogeology
- Water quality
- Groundwater resource assessment
- NOC for groundwater extraction
- Groundwater management practices

If the question is unrelated, reply:
'Please ask questions related to groundwater only.'
"""
            },
            {
                "role": "user",
                "content": user_message
            }
        ]
    }

    response = requests.post(url, headers=headers, json=data)

    if response.status_code == 200:
        return response.json()["choices"][0]["message"]["content"]
    else:
        return "Error connecting to AI service."


@app.get("/")
def home():
    return {"message": "Aquabot Backend Running Successfully"}


# @app.post("/chat")
# def chat(query: Query):

#     user_message = query.message.lower()

#     # Keyword restriction
#     if not any(keyword in user_message for keyword in GROUNDWATER_KEYWORDS):
#         return {
#             "reply": "Please ask questions related to groundwater only."
#         }

#     ai_reply = call_ai(user_message)

#     return {"reply": ai_reply}

@app.post("/chat")
def chat(query: Query):
    user_message = query.message.lower()

    # Keyword restriction
    if not any(keyword in user_message for keyword in GROUNDWATER_KEYWORDS):
        return {"reply": "Please ask questions related to groundwater only."}

    ai_reply = call_ai(user_message)
    return {"reply": ai_reply}