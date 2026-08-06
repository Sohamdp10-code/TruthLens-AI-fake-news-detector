from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine

app = FastAPI(
    title="TruthLens API",
    version="2.0.0",
    description="AI Powered Fake News Detection API"
)

# Create tables
Base.metadata.create_all(bind=engine)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # Change later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "project": "TruthLens",
        "version": "2.0",
        "status": "Running"
    }

@app.get("/health")
def health():
    return {
        "status": "Healthy"
    }
