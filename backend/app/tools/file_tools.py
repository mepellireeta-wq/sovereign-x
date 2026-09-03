import os
from typing import Dict, Any, List
from app.core.config import settings

class FileTools:
    def read_file(self, file_path: str) -> str:
        if not os.path.exists(file_path):
            return f"Error: File not found at {file_path}"
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            return f.read()

    def list_files(self, directory: str = settings.DEMO_DATA_DIR) -> List[str]:
        if not os.path.exists(directory):
            return []
        return os.listdir(directory)

    def write_file(self, filename: str, content: str) -> str:
        target_path = os.path.join(settings.DATA_DIR, filename)
        with open(target_path, "w", encoding="utf-8") as f:
            f.write(content)
        return f"File written successfully to {target_path}"

file_tools = FileTools()
