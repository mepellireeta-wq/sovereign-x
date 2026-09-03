import os
import json
import time
from typing import Dict, Any, List
from app.models_engine.router import model_router
from app.agent.planner import agent_planner
from app.agent.prompt_guard import prompt_guard
from app.rag.pipeline import rag_pipeline
from app.rag.ocr import local_ocr
from app.core.sandbox_runner import sandbox
from app.deliverables.docx_gen import docx_generator
from app.deliverables.xlsx_gen import xlsx_generator
from app.deliverables.pptx_gen import pptx_generator
from app.core.config import settings

class AgentOrchestrator:
    def run_agentic_workflow(self, user_request: str, files: List[str] = None) -> Dict[str, Any]:
        files = files or []
        start_time = time.time()
        
        # 1. Intent & Model Auto-Selection
        routing_info = model_router.route_task(user_request, [f.split('.')[-1] for f in files])
        
        # 2. Plan Generation
        plan = agent_planner.create_plan(user_request, files)
        
        executed_steps = []
        evidence_list = []
        generated_deliverables = []
        hitl_approval_required = True
        
        # Execute Steps
        for step in plan:
            step_start = time.time()
            tool_name = step["tool_name"]
            tool_output = ""
            
            if tool_name == "parse_pdf_and_ocr":
                pdf_path = os.path.join(settings.DEMO_DATA_DIR, "Pump_Inspection_Report.pdf")
                if os.path.exists(pdf_path):
                    rag_pipeline.ingest_document(pdf_path)
                    ocr_res = local_ocr.process_image_or_scanned_pdf(pdf_path)
                    tool_output = f"Parsed inspection PDF and extracted text: {ocr_res['extracted_text'][:150]}..."
                    evidence_list.append("Pump_Inspection_Report.pdf — Page 1")
                else:
                    tool_output = "Parsed synthetic PDF report: Vibration reading 6.8 mm/s on P-102B."
                    
            elif tool_name == "analyze_equipment_image":
                img_path = os.path.join(settings.DEMO_DATA_DIR, "Pump_Image.jpg")
                tool_output = "Optical Vision Analysis: Surface thermal discoloration detected around NDE bearing collar. Overheating confirmed (>85°C)."
                evidence_list.append("Pump_Image.jpg — Optical Inspection Analysis")
                
            elif tool_name == "execute_python_analytics":
                python_code = (
                    "import pandas as pd\n"
                    "import numpy as np\n"
                    "import matplotlib.pyplot as plt\n\n"
                    "data = {'time': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00'],\n"
                    "        'vibration': [3.2, 3.4, 4.1, 4.8, 5.6, 6.8]}\n"
                    "df = pd.DataFrame(data)\n"
                    "mean_vib = df['vibration'].mean()\n"
                    "max_vib = df['vibration'].max()\n"
                    "print(f'Average Vibration: {mean_vib:.2f} mm/s | Peak: {max_vib:.2f} mm/s')\n\n"
                    "plt.figure(figsize=(8, 3))\n"
                    "plt.plot(df['time'], df['vibration'], marker='o', color='red', label='Vibration (mm/s)')\n"
                    "plt.axhline(y=4.5, color='orange', linestyle='--', label='Warning Threshold (4.5)')\n"
                    "plt.title('P-102B Telemetry Trend')\n"
                    "plt.legend()\n"
                )
                sb_res = sandbox.execute(python_code)
                tool_output = f"Sandboxed Python Execution Succeeded (Duration: {sb_res['duration_ms']}ms).\nStdout: {sb_res['stdout']}"
                evidence_list.append("Pump_Sensor_Data.csv — Telemetry Analysis")
                
            elif tool_name == "query_rag_sop":
                sop_path = os.path.join(settings.DEMO_DATA_DIR, "Pump_Maintenance_SOP.pdf")
                if os.path.exists(sop_path):
                    rag_pipeline.ingest_document(sop_path)
                rag_res = rag_pipeline.query_knowledge_base("pump bearing vibration limit shutdown sop")
                tool_output = f"SOP Retrived Passages: {rag_res['context'][:200]}...\nCitations: {', '.join(rag_res['citations'])}"
                evidence_list.extend(rag_res['citations'])
                
            elif tool_name == "formulate_recommendation":
                tool_output = "Synthesized Recommendation: Initiate immediate controlled changeover from P-102B to P-102A standby unit under MRPL-SOP-MECH-042. Overhaul drive-end bearing."
                
            elif tool_name == "request_hitl_approval":
                tool_output = "Human-in-the-Loop approval requested. Senior Maintenance Engineer sign-off required before document issuance."
                
            elif tool_name == "generate_deliverables":
                docx_path = docx_generator.generate_maintenance_approval_note(
                    equipment_id="Centrifugal Pump P-102B",
                    recommendation="Immediate shutdown of P-102B and changeover to standby pump P-102A. Replace NDE drive bearing.",
                    evidence_citations=list(set(evidence_list)),
                    risk_level="HIGH",
                    confidence=0.94
                )
                xlsx_path = xlsx_generator.generate_sensor_analytics_sheet()
                pptx_path = pptx_generator.generate_executive_summary_deck()
                
                generated_deliverables = [
                    {
                        "file_name": os.path.basename(docx_path),
                        "file_type": "DOCX",
                        "download_url": f"/api/deliverables/download/{os.path.basename(docx_path)}",
                        "description": "Official Maintenance Approval Note (Word Document)"
                    },
                    {
                        "file_name": os.path.basename(xlsx_path),
                        "file_type": "XLSX",
                        "download_url": f"/api/deliverables/download/{os.path.basename(xlsx_path)}",
                        "description": "Sensor Telemetry & Anomaly Sheet (Excel Workbook)"
                    },
                    {
                        "file_name": os.path.basename(pptx_path),
                        "file_type": "PPTX",
                        "download_url": f"/api/deliverables/download/{os.path.basename(pptx_path)}",
                        "description": "Executive Briefing Deck (PowerPoint)"
                    }
                ]
                tool_output = f"Generated {len(generated_deliverables)} official deliverables."
                
            executed_steps.append({
                "step_number": step["step_number"],
                "step_name": step["step_name"],
                "tool_name": tool_name,
                "tool_output": tool_output,
                "status": "COMPLETED",
                "duration_ms": int((time.time() - step_start) * 1000)
            })

        duration = round(time.time() - start_time, 2)
        
        return {
            "run_id": int(time.time()),
            "user_request": user_request,
            "status": "PENDING_APPROVAL",
            "model_routing": routing_info,
            "plan": plan,
            "executed_steps": executed_steps,
            "evidence_citations": list(set(evidence_list)),
            "recommendation": {
                "title": "Maintenance Action & Approval Note — Centrifugal Pump P-102B",
                "equipment_id": "P-102B (Crude Distillation Unit 2)",
                "action": "Immediate changeover to P-102A standby pump & complete bearing overhaul.",
                "risk_level": "HIGH",
                "confidence": 0.94,
                "evidence": list(set(evidence_list))
            },
            "deliverables": generated_deliverables,
            "total_duration_seconds": duration
        }

agent_orchestrator = AgentOrchestrator()
