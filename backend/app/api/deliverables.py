import os
from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from app.core.config import settings

router = APIRouter(prefix="/deliverables", tags=["Deliverables"])

@router.get("/")
def list_deliverables():
    files = os.listdir(settings.DELIVERABLES_DIR)
    results = []
    for f in files:
        ext = f.split(".")[-1].upper()
        results.append({
            "file_name": f,
            "file_type": ext,
            "download_url": f"/api/deliverables/download/{f}",
            "created_at": os.path.getctime(os.path.join(settings.DELIVERABLES_DIR, f))
        })
    return {"deliverables": results}

@router.get("/download/{filename}")
def download_deliverable(filename: str):
    file_path = os.path.join(settings.DELIVERABLES_DIR, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(file_path, filename=filename)
