import os

class Settings:
    PROJECT_NAME: str = "SOVEREIGN-X"
    VERSION: str = "1.0.0"
    ORGANIZATION: str = "Mangalore Refinery and Petrochemicals Limited (MRPL)"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "sovereign_x_confidential_mrpl_secret_key_2026")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours
    
    # Paths
    BASE_DIR: str = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    DATA_DIR: str = os.path.join(BASE_DIR, "data")
    DEMO_DATA_DIR: str = os.path.join(BASE_DIR, "demo_data")
    UPLOAD_DIR: str = os.path.join(DATA_DIR, "uploads")
    DELIVERABLES_DIR: str = os.path.join(DATA_DIR, "deliverables")
    DB_PATH: str = os.path.join(DATA_DIR, "sovereign_x.db")
    
    # Model Server Endpoints (Local Air-Gapped)
    OLLAMA_ENDPOINT: str = os.getenv("OLLAMA_ENDPOINT", "http://localhost:11434")
    VLLM_ENDPOINT: str = os.getenv("VLLM_ENDPOINT", "http://localhost:8000")
    LLAMA_CPP_ENDPOINT: str = os.getenv("LLAMA_CPP_ENDPOINT", "http://localhost:8080")
    
    # Air-Gap Enforcement
    ALLOW_EXTERNAL_NETWORK: bool = False
    
settings = Settings()

# Ensure directories exist
os.makedirs(settings.DATA_DIR, exist_ok=True)
os.makedirs(settings.DEMO_DATA_DIR, exist_ok=True)
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
os.makedirs(settings.DELIVERABLES_DIR, exist_ok=True)
