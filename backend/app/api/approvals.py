from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/approvals", tags=["Approvals"])

class ApprovalDecisionRequest(BaseModel):
    approval_id: int = 1
    decision: str  # APPROVED, REJECTED, MODIFIED
    reviewer: str = "Er. K. Sharma (Senior Maintenance Engineer)"
    comments: str = "Approved for changeover to P-102A and NDE bearing replacement."

@router.get("/")
def list_pending_approvals():
    return {
        "pending_approvals": [
            {
                "id": 1,
                "title": "Maintenance Action & Approval Note — Centrifugal Pump P-102B",
                "equipment_id": "P-102B (Crude Distillation Unit 2)",
                "action": "Immediate changeover to P-102A standby pump & complete bearing overhaul.",
                "risk_level": "HIGH",
                "confidence": 0.94,
                "status": "PENDING",
                "evidence": [
                    "Pump_Inspection_Report.pdf — Page 1",
                    "Pump_Maintenance_SOP.pdf — Page 24",
                    "Pump_Sensor_Data.csv — Telemetry Window"
                ]
            }
        ]
    }

@router.post("/decide")
def process_approval(req: ApprovalDecisionRequest):
    return {
        "approval_id": req.approval_id,
        "status": req.decision,
        "reviewer": req.reviewer,
        "comments": req.comments,
        "message": f"Recommendation successfully {req.decision.lower()} by {req.reviewer}."
    }
