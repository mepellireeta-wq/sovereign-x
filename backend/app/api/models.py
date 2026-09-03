from fastapi import APIRouter, Depends
from typing import List, Dict, Any
from app.models_engine.manager import model_manager
from app.models_engine.router import model_router
from pydantic import BaseModel

router = APIRouter(prefix="/models", tags=["Models"])

class RouteRequest(BaseModel):
    prompt: str
    file_types: List[str] = []

@router.get("/")
def list_models():
    return {"models": model_manager.list_models()}

@router.post("/route")
def route_model(req: RouteRequest):
    return model_router.route_task(req.prompt, req.file_types)
