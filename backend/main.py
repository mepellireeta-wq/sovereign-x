import os
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import init_db
from app.api import auth, models, documents, rag, agent, sandbox, deliverables, audit, sovereignty, approvals, system

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Sovereign Multimodal Agentic AI Workbench for Confidential Industrial Work (SIH26117 — MRPL)"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router, prefix="/api")
app.include_router(models.router, prefix="/api")
app.include_router(documents.router, prefix="/api")
app.include_router(rag.router, prefix="/api")
app.include_router(agent.router, prefix="/api")
app.include_router(sandbox.router, prefix="/api")
app.include_router(deliverables.router, prefix="/api")
app.include_router(audit.router, prefix="/api")
app.include_router(sovereignty.router, prefix="/api")
app.include_router(approvals.router, prefix="/api")
app.include_router(system.router, prefix="/api")

@app.on_event("startup")
def startup_event():
    init_db()

@app.get("/")
def root():
    return {
        "app": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "organization": settings.ORGANIZATION,
        "status": "OPERATIONAL",
        "airgap_enforced": True
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
