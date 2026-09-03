from fastapi import APIRouter
from pydantic import BaseModel
from app.core.sandbox_runner import sandbox

router = APIRouter(prefix="/sandbox", tags=["Sandbox"])

class CodeExecutionRequest(BaseModel):
    code: str

@router.post("/execute")
def execute_code(req: CodeExecutionRequest):
    return sandbox.execute(req.code)
