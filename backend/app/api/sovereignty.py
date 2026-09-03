from fastapi import APIRouter
from app.core.network_guard import guard
from pydantic import BaseModel

router = APIRouter(prefix="/sovereignty", tags=["Sovereignty Monitor"])

class SimulateViolationRequest(BaseModel):
    target_url: str = "http://api.openai.com/v1/chat/completions"

@router.get("/metrics")
def get_sovereignty_metrics():
    return guard.get_metrics()

@router.post("/test-egress-block")
def test_egress_block(req: SimulateViolationRequest):
    allowed = guard.validate_request(req.target_url, tool_name="TestEgressTool")
    return {
        "target": req.target_url,
        "allowed": allowed,
        "action": "ALLOWED" if allowed else "BLOCKED_BY_AIRGAP_POLICY",
        "current_metrics": guard.get_metrics()
    }
