from typing import List, Dict, Any

DEFAULT_MODELS = [
    {
        "id": 1,
        "name": "Qwen2.5-72B-Instruct-Q4 (General Reasoning)",
        "model_type": "general",
        "endpoint": "http://localhost:11434",
        "context_length": 32768,
        "quantization": "Q4_K_M",
        "is_active": True,
        "status": "Available",
        "memory_mb": 16384,
        "default_use_case": "General industrial reasoning, SOP evaluation, multi-step planning"
    },
    {
        "id": 2,
        "name": "DeepSeek-R1-Distill-Qwen-14B (Code & Calculations)",
        "model_type": "coding",
        "endpoint": "http://localhost:11434",
        "context_length": 16384,
        "quantization": "Q5_K_M",
        "is_active": True,
        "status": "Available",
        "memory_mb": 8192,
        "default_use_case": "Sandboxed Python synthesis, statistical calculations, data visualization"
    },
    {
        "id": 3,
        "name": "Llama-3.2-11B-Vision-Instruct (Multimodal & Drawings)",
        "model_type": "vision",
        "endpoint": "http://localhost:11434",
        "context_length": 8192,
        "quantization": "Q4_K_M",
        "is_active": True,
        "status": "Available",
        "memory_mb": 6144,
        "default_use_case": "P&ID diagram analysis, equipment photos, scanned document inspection"
    },
    {
        "id": 4,
        "name": "bge-m3-large (Industrial Knowledge Embeddings)",
        "model_type": "embedding",
        "endpoint": "http://localhost:11434",
        "context_length": 8192,
        "quantization": "FP16",
        "is_active": True,
        "status": "Available",
        "memory_mb": 2048,
        "default_use_case": "Local RAG semantic vector generation & document indexing"
    },
    {
        "id": 5,
        "name": "Mistral-7B-Instruct-v0.3 (Fast Document QA)",
        "model_type": "document",
        "endpoint": "http://localhost:11434",
        "context_length": 8192,
        "quantization": "Q4_K_M",
        "is_active": True,
        "status": "Available",
        "memory_mb": 4096,
        "default_use_case": "Fast document summarization, PDF extraction, table lookup"
    }
]

class ModelManager:
    def __init__(self):
        self.models = DEFAULT_MODELS

    def list_models(self) -> List[Dict[str, Any]]:
        return self.models

    def get_model_by_type(self, model_type: str) -> Dict[str, Any]:
        for model in self.models:
            if model["model_type"] == model_type and model["is_active"]:
                return model
        return self.models[0]

    def add_model(self, model_data: Dict[str, Any]) -> Dict[str, Any]:
        model_data["id"] = len(self.models) + 1
        model_data["status"] = "Available"
        self.models.append(model_data)
        return model_data

model_manager = ModelManager()
