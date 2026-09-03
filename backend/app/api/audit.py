from fastapi import APIRouter
from datetime import datetime

router = APIRouter(prefix="/audit", tags=["Audit Logs"])

SAMPLE_AUDIT_LOGS = [
    {"id": 1, "timestamp": "2026-08-28 10:42:03", "user": "k.sharma@mrpl.co.in", "action": "FILE_UPLOAD", "resource": "Pump_Inspection_Report.pdf", "status": "SUCCESS"},
    {"id": 2, "timestamp": "2026-08-28 10:42:05", "user": "SOVEREIGN-X Agent", "action": "OCR_EXTRACTION", "resource": "Pump_Inspection_Report.pdf", "status": "SUCCESS"},
    {"id": 3, "timestamp": "2026-08-28 10:42:07", "user": "SOVEREIGN-X Agent", "action": "RAG_SEARCH", "resource": "Pump_Maintenance_SOP.pdf", "status": "SUCCESS"},
    {"id": 4, "timestamp": "2026-08-28 10:42:12", "user": "SOVEREIGN-X Agent", "action": "VISION_ANALYSIS", "resource": "Pump_Image.jpg", "status": "SUCCESS"},
    {"id": 5, "timestamp": "2026-08-28 10:42:16", "user": "SOVEREIGN-X Agent", "action": "SANDBOX_PYTHON", "resource": "Pump_Sensor_Data.csv", "status": "SUCCESS"},
    {"id": 6, "timestamp": "2026-08-28 10:42:20", "user": "SOVEREIGN-X Agent", "action": "RECOMMENDATION_GEN", "resource": "P-102B Maintenance Note", "status": "PENDING_APPROVAL"},
    {"id": 7, "timestamp": "2026-08-28 10:42:23", "user": "SOVEREIGN-X Agent", "action": "DELIVERABLE_DOCX", "resource": "Maintenance_Approval_Note.docx", "status": "SUCCESS"},
    {"id": 8, "timestamp": "2026-08-28 10:42:30", "user": "Er. K. Sharma", "action": "HITL_HUMAN_APPROVAL", "resource": "P-102B Maintenance Note", "status": "APPROVED"}
]

@router.get("/")
def list_audit_logs():
    return {"audit_logs": SAMPLE_AUDIT_LOGS}
