#!/usr/bin/env python3
"""
Hades Backend Server
FastAPI server running on port 8080
"""

import uvicorn
from main import app

if __name__ == "__main__":
    print("Starting Hades Backend Server...")
    print("Server will be available at: http://localhost:8080")
    print("API documentation at: http://localhost:8080/docs")
    uvicorn.run(app, host="0.0.0.0", port=8080, reload=True) 