import httpx
import logging
from typing import Dict, Any, Optional
from app.core.config import settings
from app.core.network_guard import guard
from app.models_engine.local_fallback import local_engine

logger = logging.getLogger("sovereign_x.ollama")

class OllamaClient:
    def __init__(self, endpoint: str = settings.OLLAMA_ENDPOINT):
        self.endpoint = endpoint.rstrip("/")

    async def is_available(self) -> bool:
        if not guard.validate_request(self.endpoint, "OllamaClient.is_available"):
            return False
        try:
            async with httpx.AsyncClient(timeout=2.0) as client:
                res = await client.get(f"{self.endpoint}/api/tags")
                return res.status_code == 200
        except Exception:
            return False

    async def generate(self, model: str, prompt: str, system_prompt: str = "") -> str:
        if not guard.validate_request(self.endpoint, "OllamaClient.generate"):
            return local_engine.generate_reasoning(prompt)
            
        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                payload = {
                    "model": model,
                    "prompt": prompt,
                    "system": system_prompt,
                    "stream": False
                }
                res = await client.post(f"{self.endpoint}/api/generate", json=payload)
                if res.status_code == 200:
                    return res.json().get("response", "")
        except Exception as e:
            logger.warning(f"Ollama call failed ({e}). Utilizing Local Air-Gapped Engine Fallback.")
            
        return local_engine.generate_reasoning(prompt)

ollama_client = OllamaClient()
