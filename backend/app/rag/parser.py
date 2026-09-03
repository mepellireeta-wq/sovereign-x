import os
from typing import List, Dict, Any

class DocumentParser:
    def parse_file(self, file_path: str) -> List[Dict[str, Any]]:
        ext = os.path.splitext(file_path)[1].lower()
        if ext == ".pdf":
            return self._parse_pdf(file_path)
        elif ext in [".txt", ".csv", ".json", ".log"]:
            return self._parse_text(file_path)
        elif ext == ".docx":
            return self._parse_docx(file_path)
        else:
            return [{"page": 1, "text": f"[File content extracted from {os.path.basename(file_path)}]"}]

    def _parse_pdf(self, file_path: str) -> List[Dict[str, Any]]:
        try:
            import pypdf
            reader = pypdf.PdfReader(file_path)
            pages = []
            for idx, page in enumerate(reader.pages):
                text = page.extract_text() or ""
                pages.append({"page": idx + 1, "text": text.strip()})
            if pages and any(p["text"] for p in pages):
                return pages
        except Exception:
            pass

        # Fallback reading text if PDF is plain text or fallback synthetic file
        return self._parse_text(file_path)

    def _parse_text(self, file_path: str) -> List[Dict[str, Any]]:
        try:
            with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
            return [{"page": 1, "text": content}]
        except Exception as e:
            return [{"page": 1, "text": f"Error reading text: {e}"}]

    def _parse_docx(self, file_path: str) -> List[Dict[str, Any]]:
        try:
            import docx
            doc = docx.Document(file_path)
            full_text = "\n".join([p.text for p in doc.paragraphs if p.text])
            return [{"page": 1, "text": full_text}]
        except Exception:
            return self._parse_text(file_path)

doc_parser = DocumentParser()
