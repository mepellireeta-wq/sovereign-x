import os
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from typing import List
from app.core.config import settings
from app.rag.pipeline import rag_pipeline
from pydantic import BaseModel

router = APIRouter(prefix="/documents", tags=["Documents"])

@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    target_path = os.path.join(settings.UPLOAD_DIR, file.filename)
    with open(target_path, "wb") as f:
        content = await file.read()
        f.write(content)
        
    ingest_res = rag_pipeline.ingest_document(target_path)
    return {
        "message": "File uploaded and indexed into local RAG knowledge base",
        "filename": file.filename,
        "path": target_path,
        "details": ingest_res
    }

@router.get("/")
def list_documents():
    uploads = os.listdir(settings.UPLOAD_DIR)
    demos = os.listdir(settings.DEMO_DATA_DIR)
    
    docs = []
    for fn in uploads:
        docs.append({"filename": fn, "source": "Uploaded Document", "path": os.path.join(settings.UPLOAD_DIR, fn)})
    for fn in demos:
        docs.append({"filename": fn, "source": "Internal SOP / Demo Package", "path": os.path.join(settings.DEMO_DATA_DIR, fn)})
        
    return {"documents": docs, "total_count": len(docs)}
