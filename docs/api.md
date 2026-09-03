# REST API Endpoint Documentation

## Key Endpoints
- `POST /api/auth/login`: User login & JWT issuance
- `GET /api/models/`: List registered open-weight models
- `POST /api/models/route`: Auto-select model by query intent
- `POST /api/documents/upload`: Ingest & index document into RAG
- `POST /api/rag/query`: Search knowledge base with citations
- `POST /api/agent/run`: Run multi-step agentic task
- `POST /api/sandbox/execute`: Execute Python code in sandbox
- `GET /api/deliverables/download/{filename}`: Download DOCX/XLSX/PPTX
- `GET /api/sovereignty/metrics`: Get zero-egress network metrics
- `POST /api/sovereignty/test-egress-block`: Test air-gap network interceptor
