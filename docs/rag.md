# Local RAG Knowledge Base Architecture

## Overview
SOVEREIGN-X utilizes a 100% on-premise RAG pipeline:
- Document Parsing (PyPDF, DOCX, CSV, TXT)
- Local OCR for scanned engineering reports
- Smart Chunker preserving page-level metadata
- Grounded Page Citations (`Pump_Maintenance_SOP.pdf — Page 24`)
- Fallback threshold when evidence is insufficient
