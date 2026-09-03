from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from app.rag.pipeline import rag_pipeline

router = APIRouter(prefix="/rag", tags=["RAG"])

class QueryRequest(BaseModel):
    query: str
    top_k: int = 4

@router.post("/query")
def query_rag(req: QueryRequest):
    return rag_pipeline.query_knowledge_base(req.query, top_k=req.top_k)
