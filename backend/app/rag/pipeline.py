import os
from typing import List, Dict, Any
from app.rag.parser import doc_parser
from app.rag.chunker import chunker
from app.rag.vector_store import vector_store
from app.rag.ocr import local_ocr

class LocalRAGPipeline:
    def ingest_document(self, file_path: str) -> Dict[str, Any]:
        filename = os.path.basename(file_path)
        pages = doc_parser.parse_file(file_path)
        
        # Perform OCR if page text is minimal
        total_text_len = sum(len(p["text"]) for p in pages)
        if total_text_len < 50:
            ocr_res = local_ocr.process_image_or_scanned_pdf(file_path)
            pages = [{"page": 1, "text": ocr_res["extracted_text"]}]
            
        doc_chunks = chunker.chunk_document(filename, pages)
        vector_store.add_chunks(doc_chunks)
        
        return {
            "filename": filename,
            "page_count": len(pages),
            "chunk_count": len(doc_chunks),
            "status": "INDEXED"
        }

    def query_knowledge_base(self, query: str, top_k: int = 4) -> Dict[str, Any]:
        results = vector_store.search(query, top_k=top_k)
        
        if not results:
            return {
                "answer": "Insufficient evidence in the available local knowledge base to answer this query safely.",
                "citations": [],
                "confidence": 0.0,
                "sufficient_evidence": False
            }
            
        citations = [r["citation"] for r in results]
        context_str = "\n---\n".join([f"Source: {r['citation']}\n{r['chunk']['content']}" for r in results])
        
        return {
            "answer": f"Retrieved {len(results)} relevant context passages from internal manuals.",
            "context": context_str,
            "citations": list(set(citations)),
            "passages": results,
            "confidence": 0.92,
            "sufficient_evidence": True
        }

rag_pipeline = LocalRAGPipeline()
