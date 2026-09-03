from typing import Dict, Any, List
from app.models_engine.manager import model_manager

class ModelRouter:
    def route_task(self, prompt: str, file_types: List[str] = None) -> Dict[str, Any]:
        file_types = file_types or []
        prompt_lower = prompt.lower()
        
        # 1. Vision / Image / Diagram / P&ID Engineering Drawings
        if any(ext in file_types for ext in ['jpg', 'jpeg', 'png', 'bmp']) or any(kw in prompt_lower for kw in ['image', 'photo', 'diagram', 'p&id', 'drawing', 'visual', 'p&id engineering drawings', 'engineering drawings', 'engineering drawing']):
            selected = model_manager.get_model_by_type("vision")
            if any(kw in prompt_lower for kw in ['p&id engineering drawings', 'engineering drawings', 'engineering drawing']):
                detected_intent = "Multimodal / Vision & P&ID Engineering Drawings Analysis"
                reason = "Task involves optical image inspection or scanned P&ID engineering drawings."
            else:
                detected_intent = "Multimodal / Vision & Scanned Diagram Analysis"
                reason = "Task involves optical image inspection or scanned engineering drawings."
            return {
                "detected_intent": detected_intent,
                "selected_model": selected["name"],
                "model_type": "vision",
                "reason": reason
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

        # 3. Document RAG / PDF QA / Financial Audit Requests
        if any(ext in file_types for ext in ['pdf', 'docx', 'txt']) or any(kw in prompt_lower for kw in ['sop', 'manual', 'report', 'procedure', 'document', 'search', 'financial audit requests', 'financial audit request', 'financial audit', 'audit request', 'audit']):
            selected = model_manager.get_model_by_type("document")
            if any(kw in prompt_lower for kw in ['financial audit requests', 'financial audit request', 'financial audit', 'audit request']):
                detected_intent = "Document QA & Financial Audit Requests Analysis"
                reason = "Task requires financial audit verification, compliance checking, or expenditure document review."
            else:
                detected_intent = "Document QA & Knowledge Retrieval"
                reason = "Task requires searching internal organizational SOP manuals and PDF reports."
            return {
                "detected_intent": detected_intent,
                "selected_model": selected["name"],
                "model_type": "document",
                "reason": reason
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
