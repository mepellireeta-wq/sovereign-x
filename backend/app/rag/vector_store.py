import math
from typing import List, Dict, Any

class LocalVectorStore:
    def __init__(self):
        self.chunks: List[Dict[str, Any]] = []

    def clear(self):
        self.chunks = []

    def add_chunks(self, new_chunks: List[Dict[str, Any]]):
        self.chunks.extend(new_chunks)

    def search(self, query: str, top_k: int = 4) -> List[Dict[str, Any]]:
        if not self.chunks:
            return []
            
        query_terms = set(query.lower().split())
        scored_chunks = []
        
        for c in self.chunks:
            content_lower = c["content"].lower()
            score = 0.0
            for term in query_terms:
                if len(term) > 2 and term in content_lower:
                    score += content_lower.count(term) * 1.5
            
            # Boost matches on filename keywords (e.g. SOP, Manual)
            for term in query_terms:
                if term in c["filename"].lower():
                    score += 2.0
                    
            if score > 0:
                scored_chunks.append({
                    "score": round(score, 3),
                    "chunk": c,
                    "citation": f"{c['filename']} — Page {c['page_number']}"
                })
                
        scored_chunks.sort(key=lambda x: x["score"], reverse=True)
        return scored_chunks[:top_k]

vector_store = LocalVectorStore()
