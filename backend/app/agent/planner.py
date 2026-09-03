import json
from typing import List, Dict, Any

class AgentPlanner:
    def create_plan(self, user_request: str, files: List[str] = None) -> List[Dict[str, Any]]:
        files = files or []
        req_lower = user_request.lower()
        
        # Inspection to Approval Multi-Step Plan
        if "inspection" in req_lower or "pump" in req_lower or "approval" in req_lower or "maintenance" in req_lower:
            return [
                {
                    "step_number": 1,
                    "step_name": "Inspect Uploaded Files & OCR PDF Reports",
                    "tool_name": "parse_pdf_and_ocr",
                    "description": "Parse PDF inspection notes and perform optical text extraction on scanned pages."
                },
                {
                    "step_number": 2,
                    "step_name": "Multimodal Visual Inspection",
                    "tool_name": "analyze_equipment_image",
                    "description": "Examine attached equipment photographs for thermal discoloration, oil leaks, or wear."
                },
                {
                    "step_number": 3,
                    "step_name": "Sandboxed Python Telemetry Analysis",
                    "tool_name": "execute_python_analytics",
                    "description": "Run Python data analysis on telemetry CSV to compute vibration trends, mean, and ISO threshold breaches."
                },
                {
                    "step_number": 4,
                    "step_name": "Search Local SOP Knowledge Base (RAG)",
                    "tool_name": "query_rag_sop",
                    "description": "Retrieve governing maintenance procedures from MRPL-SOP-MECH-042 with exact page citations."
                },
                {
                    "step_number": 5,
                    "step_name": "Synthesize Risk Assessment & Formulate Action",
                    "tool_name": "formulate_recommendation",
                    "description": "Combine findings across OCR, telemetry chart, and SOP rules to calculate confidence and risk level."
                },
                {
                    "step_number": 6,
                    "step_name": "Request Human-in-the-Loop Review",
                    "tool_name": "request_hitl_approval",
                    "description": "Present structured recommendation card to Senior Maintenance Engineer for formal authorization."
                },
                {
                    "step_number": 7,
                    "step_name": "Generate Final Downloadable Deliverables",
                    "tool_name": "generate_deliverables",
                    "description": "Synthesize official DOCX Maintenance Approval Note, XLSX Sensor Data Analytics, and PPTX Executive Briefing."
                }
            ]
        else:
            return [
                {
                    "step_number": 1,
                    "step_name": "Analyze Request & Route Task",
                    "tool_name": "route_task",
                    "description": "Identify intent and auto-select optimal local model."
                },
                {
                    "step_number": 2,
                    "step_name": "Retrieve RAG Context",
                    "tool_name": "query_rag_sop",
                    "description": "Search local documents for relevant passages."
                },
                {
                    "step_number": 3,
                    "step_name": "Formulate Answer & Verify Citations",
                    "tool_name": "formulate_recommendation",
                    "description": "Produce sovereign answer with grounded evidence."
                }
            ]

agent_planner = AgentPlanner()
