# IMPLEMENTATION PLAN — SOVEREIGN-X (SIH26117)

## Sovereign Multimodal Agentic AI Workbench for Confidential Industrial Intelligence

### Problem Statement (SIH26117 - MRPL)
Refineries, PSUs, defense manufacturers, and government units handle sensitive knowledge work (P&ID diagrams, inspection reports, engineering calculations, internal SOPs). Policy prohibits sending data to external cloud AI tools (Claude, ChatGPT). **SOVEREIGN-X** delivers a 100% air-gapped, on-premise agentic AI workbench utilizing open-weight models, multimodal RAG, sandboxed tool execution, deliverable document generation, and zero external egress network security.

---

## 1. System Architecture

```
                          ┌───────────────────────────────────────┐
                          │    React Enterprise Dashboard (TS)    │
                          └───────────────────┬───────────────────┘
                                              │ HTTP / WS
                                              ▼
                          ┌───────────────────────────────────────┐
                          │       FastAPI Security & Backend      │
                          │   (Auth, RBAC, Network Guard, Audit)  │
                          └───────────────────┬───────────────────┘
                                              │
              ┌───────────────────────────────┼───────────────────────────────┐
              ▼                               ▼                               ▼
    ┌──────────────────┐            ┌──────────────────┐            ┌──────────────────┐
    │ Agentic AI       │            │ Local RAG &      │            │ Model Router &   │
    │ Orchestrator     │            │ Vector Store     │            │ Serving Layer    │
    │ (Planner/Tools)  │            │ (PyPDF, Chroma,  │            │ (Ollama / vLLM / │
    └─────────┬────────┘            │ Embeddings)      │            │ Local Engine)    │
              │                     └──────────────────┘            └──────────────────┘
              ▼
    ┌────────────────────────────────────────────────────────────────────────────────┐
    │                              LOCAL TOOL SUITE                                  │
    │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐  │
    │  │ Document OCR │  │ Data & Chart │  │ Sandboxed    │  │ DOCX / XLSX / PPTX │  │
    │  │ & Vision     │  │ Engine       │  │ Python       │  │ Generator          │  │
    │  └──────────────┘  └──────────────┘  └──────────────┘  └────────────────────┘  │
    └────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Key Modules & Specifications

### 2.1 Sovereignty Monitor & Zero-Egress Network Guard
- **Network Interceptor**: Intercepts and validates all outgoing requests at the Python runtime layer (`urllib`, `requests`, `httpx`, `socket`).
- **Sovereignty Dashboard**: Real-time stats on external calls blocked (target 0 allowed), local model calls, data egress tracking (0 MB), and security violation audit events.

### 2.2 Multi-Model Manager & Intelligent Router
- **Model Categories**:
  - `General Reasoning`: Complex decision making, synthesis, SOP comparison.
  - `Document QA`: Fast context reading, structured summary.
  - `Vision / OCR`: Diagram, photograph, scanned PDF inspection.
  - `Coding & Data Analysis`: Python script synthesis, statistical analysis.
  - `Embedding`: Semantic vector generation.
- **Routing Engine**: Auto-detects task intent and payload type (text, PDF, image, CSV) and routes to appropriate local model endpoint.

### 2.3 Agentic Orchestrator & Safe Tool System
- **Planner**: Generates structured JSON plan (`1. Read PDF -> 2. OCR -> 3. Sensor Analysis -> 4. SOP RAG -> 5. Risk Assessment -> 6. Approval Request -> 7. Generate DOCX`).
- **Tool Suite**:
  - `file_tools`: `read_file`, `write_file`, `list_files`, `search_files`
  - `doc_tools`: `parse_pdf`, `ocr_image`, `extract_tables`
  - `rag_tools`: `semantic_search`, `keyword_search`, `retrieve_context`
  - `data_tools`: `read_csv`, `statistical_analysis`, `chart_generator`
  - `code_tools`: `execute_python` (AST validated, restricted builtins, execution timeout, no network access)
  - `deliverable_tools`: `create_docx`, `create_xlsx`, `create_pptx`

### 2.4 RAG Pipeline & Industrial Knowledge Base
- Ingestion of PDF, DOCX, CSV, TXT, XLSX documents.
- Chunker with metadata tracking (filename, page number, section, uploader, version).
- Exact citation evidence generator ("Maintenance_SOP.pdf - Page 24").
- Fallback response when evidence confidence < threshold.

### 2.5 Multimodal "Inspection-to-Approval" Demo Workflow
- **Demo Data Set (`backend/demo_data/`)**:
  - `Pump_Inspection_Report.pdf` (Scanned inspection notes, vibration alert)
  - `Pump_Maintenance_SOP.pdf` (MRPL standard operating procedure for pumps)
  - `Pump_Manual.pdf` (Manufacturer engineering manual)
  - `Pump_Image.jpg` (Visual photograph showing bearing discoloration)
  - `Pump_Sensor_Data.csv` (Telemetry showing pressure and vibration spike)
- **Workflow Steps**:
  1. Inspect package & parse contents.
  2. OCR scanned pages & analyze equipment photograph.
  3. Run sandboxed Python analytics on sensor CSV (calculating mean, std dev, anomaly threshold, generating PNG chart).
  4. Search RAG knowledge base for maintenance SOP rules.
  5. Formulate risk assessment & maintenance recommendation.
  6. Present Human-in-the-Loop review card with confidence score & evidence.
  7. Upon Human Approval, auto-generate official downloadable DOCX Maintenance Approval Note & XLSX Data Analysis Sheet.

### 2.6 Role-Based Access Control & Immutable Audit Trail
- Roles: `Admin`, `Engineer`, `Reviewer`, `Auditor`.
- Audit Log capturing every event: login, file upload, OCR, RAG query, tool call, Python sandbox execution, human approval, document generation, blocked network attempt.

---

## 3. Database Schema

Tables (SQLite / PostgreSQL compatible SQLAlchemy models):
- `users`: ID, username, email, hashed_password, role, created_at
- `models`: ID, name, model_type, endpoint, is_active, context_window, quantization
- `documents`: ID, title, filename, file_path, file_type, upload_by, created_at, word_count
- `document_chunks`: ID, document_id, chunk_index, content, metadata_json, embedding_vector
- `agent_runs`: ID, title, user_id, status, intent, plan_json, output_text, created_at
- `agent_steps`: ID, run_id, step_number, step_name, tool_name, tool_input, tool_output, status
- `tool_calls`: ID, step_id, tool_name, duration_ms, status
- `deliverables`: ID, run_id, file_name, file_type, file_path, download_url, created_at
- `audit_logs`: ID, user_id, action, resource, details_json, ip_address, timestamp
- `security_events`: ID, event_type, severity, target_url, action_taken, timestamp
- `approvals`: ID, run_id, recommendation_title, risk_level, confidence, status, reviewed_by, timestamp

---

## 4. Execution Plan & Implementation Phases

- **Phase 1**: Project Structure, Environment Setup, Dependencies, & Config
- **Phase 2**: Core Security, Auth, RBAC, Network Interceptor Guard
- **Phase 3**: Local Model Manager, Multi-Model Abstraction Layer, Intelligent Router
- **Phase 4**: Document Parsing, OCR, Chunking, Vector Storage, Local RAG Pipeline
- **Phase 5**: Agent Orchestrator, Multi-Step Planner, Tool System, Secure Python Sandbox
- **Phase 6**: Deliverable Generators (DOCX, XLSX, PPTX) & Human-in-the-Loop Approval System
- **Phase 7**: Audit Logging & Sovereignty Network Monitor Dashboard
- **Phase 8**: React Enterprise Frontend (12 Interactive Views, SIH Guided Demo Mode)
- **Phase 9**: Synthetic Demo Dataset Generation (`/demo_data/`)
- **Phase 10**: Comprehensive Testing (Unit, Integration, Security, E2E) & Documentation
