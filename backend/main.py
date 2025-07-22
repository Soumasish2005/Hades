from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
import uvicorn
import requests

app = FastAPI(title="Hades Backend", description="Backend API for Hades pentesting tool")

class CommandRequest(BaseModel):
    url: str
    action: Optional[str] = "test"
    parameters: Optional[dict] = {}

class CommandResponse(BaseModel):
    prompt: str

@app.get("/")
async def root():
    return {"message": "Hades Backend API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "hades-backend"}

@app.post("/api/v1/generateCommand", response_model=CommandResponse)
async def generate_command(request: CommandRequest):
    """
    Generate a command based on the provided URL and action.
    
    Args:
        request: CommandRequest containing URL, action, and parameters
        
    Returns:
        CommandResponse with the generated command and metadata
    """
    agentURL = 'http://localhost:8000/chat'
    
    try:
        response = requests.post(agentURL , {
            'user_id':'test_user',
            'message': request['prompt']
        })
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating command: {str(e)}")

@app.post("/test")
async def test_endpoint():
    """Test endpoint for debugging"""
    return {"message": "Test endpoint working", "timestamp": "2024-01-01T00:00:00Z"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000, reload=True) 