from fastapi import FastAPI, Request
from pydantic import BaseModel
from vertexai import agent_engines
import vertexai
import os
from dotenv import load_dotenv

# Load GCP config from .env
load_dotenv()

vertexai.init(
    project=os.getenv("GOOGLE_CLOUD_PROJECT"),
    location=os.getenv("GOOGLE_CLOUD_LOCATION"),
    staging_bucket=os.getenv("GOOGLE_CLOUD_STAGING_BUCKET"),
)

# Load the deployed agent
AGENT_RESOURCE_ID = os.getenv("AGENT_RESOURCE_ID")
remote_app = agent_engines.get(AGENT_RESOURCE_ID)

app = FastAPI()

class ChatRequest(BaseModel):
    user_id: str = "test_user"
    session_id: str | None = None
    message: str

@app.post("/chat")
async def chat(req: ChatRequest):
    if req.session_id:
        session_id = req.session_id
    else:
        session = remote_app.create_session(user_id=req.user_id)
        session_id = session["id"]

    response_text = ""

    for event in remote_app.stream_query(
        user_id=req.user_id,
        session_id=session_id,
        message=req.message,
    ):
        print("DEBUG event:", event)

        if "content" in event and "parts" in event["content"]:
            for part in event["content"]["parts"]:
                if "text" in part:
                    response_text += part["text"]

    return {
            "session_id": session_id,
            "response": response_text.strip(),
    }


