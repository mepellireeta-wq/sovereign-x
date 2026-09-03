from app.agent.orchestrator import agent_orchestrator
from app.agent.planner import agent_planner


def test_full_inspection_to_approval_workflow():
    req = "Analyze uploaded inspection report for P-102B pump, execute telemetry python code, search SOP, and prepare maintenance recommendation approval note."
    res = agent_orchestrator.run_agentic_workflow(req, ["Pump_Inspection_Report.pdf", "Pump_Sensor_Data.csv", "Pump_Image.jpg"])
    
    assert res["status"] == "PENDING_APPROVAL"
    assert len(res["executed_steps"]) >= 5
    assert len(res["deliverables"]) == 3
    assert res["recommendation"]["equipment_id"] == "P-102B (Crude Distillation Unit 2)"
    assert res["recommendation"]["confidence"] >= 0.90

def test_financial_audit_planner_template():
    plan = agent_planner.create_plan("Perform financial audit and ledger reconciliation for Q3 tax compliance.")
    assert len(plan) == 6
    assert plan[0]["tool_name"] == "parse_pdf_and_ocr"

def test_pid_drawing_review_planner_template():
    plan = agent_planner.create_plan("Review P&ID diagram and piping schematic for refinery CDU unit.")
    assert len(plan) == 7
    assert plan[0]["tool_name"] == "parse_pdf_and_ocr"

