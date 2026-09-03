from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional
from app.agent.orchestrator import agent_orchestrator

router = APIRouter(prefix="/agent", tags=["Agent"])

class AgentRunRequest(BaseModel):
    user_request: str
    files: Optional[List[str]] = []

@router.post("/run")
def run_agent(req: AgentRunRequest):
    return agent_orchestrator.run_agentic_workflow(req.user_request, req.files)
