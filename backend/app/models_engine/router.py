from typing import Dict, Any, List
from app.models_engine.manager import model_manager

class ModelRouter:
    def route_task(self, prompt: str, file_types: List[str] = None) -> Dict[str, Any]:
        file_types = file_types or []
        prompt_lower = prompt.lower()
        
        # 1. Vision / Image / Diagram
        if any(ext in file_types for ext in ['jpg', 'jpeg', 'png', 'bmp']) or any(kw in prompt_lower for kw in ['image', 'photo', 'diagram', 'p&id', 'drawing', 'visual']):
            selected = model_manager.get_model_by_type("vision")
            return {
                "detected_intent": "Multimodal / Vision & Scanned Diagram Analysis",
                "selected_model": selected["name"],
                "model_type": "vision",
                "reason": "Task involves optical image inspection or scanned engineering drawings."
            }

        # 2. Coding / Calculation / Data Analysis
        if any(ext in file_types for ext in ['csv', 'xlsx']) or any(kw in prompt_lower for kw in ['calculate', 'python', 'code', 'trend', 'statistic', 'vibration', 'plot', 'chart', 'data analysis']):
            selected = model_manager.get_model_by_type("coding")
            return {
                "detected_intent": "Code Execution & Data Analytics",
                "selected_model": selected["name"],
                "model_type": "coding",
                "reason": "Task requires statistical calculation, tabular analysis, or Python sandbox plotting."
            }

        # 3. Document RAG / PDF QA
        if any(ext in file_types for ext in ['pdf', 'docx', 'txt']) or any(kw in prompt_lower for kw in ['sop', 'manual', 'report', 'procedure', 'document', 'search']):
            selected = model_manager.get_model_by_type("document")
            return {
                "detected_intent": "Document QA & Knowledge Retrieval",
                "selected_model": selected["name"],
                "model_type": "document",
                "reason": "Task requires searching internal organizational SOP manuals and PDF reports."
            }

        # 4. General Reasoning (Default)
        selected = model_manager.get_model_by_type("general")
        return {
            "detected_intent": "General Industrial Reasoning",
            "selected_model": selected["name"],
            "model_type": "general",
            "reason": "Task requires complex multi-step reasoning, synthesis, or approval drafting."
        }

model_router = ModelRouter()
