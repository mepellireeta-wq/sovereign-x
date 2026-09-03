from typing import List, Dict, Any

class SmartChunker:
    def chunk_document(self, filename: str, pages: List[Dict[str, Any]], chunk_size: int = 400, overlap: int = 50) -> List[Dict[str, Any]]:
        chunks = []
        chunk_idx = 0
        
        for p in pages:
            page_num = p["page"]
            text = p["text"]
            words = text.split()
            
            if not words:
                continue
                
            for i in range(0, len(words), chunk_size - overlap):
                chunk_words = words[i:i + chunk_size]
                chunk_text = " ".join(chunk_words)
                chunks.append({
                    "chunk_index": chunk_idx,
                    "filename": filename,
                    "page_number": page_num,
                    "content": chunk_text
                })
                chunk_idx += 1
                
        return chunks

chunker = SmartChunker()
