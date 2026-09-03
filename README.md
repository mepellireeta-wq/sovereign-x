# SOVEREIGN-X — Sovereign Multimodal Agentic AI Workbench

**SIH 2026 Problem Statement ID**: 26117  
**Title**: Sovereign On-Premise Agentic AI Workbench using Open-Weight Multimodal LLMs for Confidential Industrial Work  
**Organization**: Mangalore Refinery and Petrochemicals Limited (MRPL)  
**Theme**: Smart Automation  

---

## 🌟 Executive Summary

**SOVEREIGN-X** is an enterprise-grade, 100% air-gapped, on-premise agentic AI workbench purpose-built for industrial refineries, defense units, PSUs, and government organizations. It empowers engineers to automate routine but highly sensitive knowledge work—including scanned inspection report analysis, P&ID drawing verification, Python sandbox telemetry analytics, and governing SOP RAG search—without exposing confidential data to cloud AI services.

---

## 🚀 Key Features & Architectural Innovations

1. **Zero-Trust Sovereign Air-Gapped Network Guard**:
   - Outbound network interceptor enforcing 0 MB egress.
   - Real-time Sovereignty Monitor tracking local vs external network calls.
   - Immediate security audit logging of blocked external requests.

2. **Multi-Model Manager & Intelligent Task Router**:
   - Configurable registry of open-weight models (Qwen2.5-72B, DeepSeek-R1-14B, Llama-3.2-Vision, bge-m3-large).
   - Auto-detects task intent (Vision/Diagrams, Code/Data Analytics, Document RAG, General Reasoning) and routes payload dynamically.
   - High-fidelity offline model engine fallback for low-resource or air-gapped hardware.

3. **Multi-Step Agentic AI Orchestrator**:
   - Structured JSON planning loop (`Intent` → `Plan` → `Tool Execution` → `Observation` → `Verification` → `Human Approval` → `Deliverables`).
   - Human-in-the-Loop (HITL) review card displaying confidence scores, evidence, and risk levels (`Approve`, `Modify`, `Reject`).

4. **Local Tool Suite & Secure Python AST Sandbox**:
   - `file_tools`, `doc_tools` (PyPDF, OCR), `rag_tools`, `data_tools`.
   - Isolated Python runner with AST static analysis, process timeout, network blocking, and captured Matplotlib charts.

5. **Real Deliverable Generation**:
   - Auto-synthesizes official downloadable `.docx` Maintenance Approval Notes, `.xlsx` Sensor Telemetry Workbooks, and `.pptx` Executive Briefings.

6. **SIH 2026 11-Step Guided Walkthrough**:
   - Built-in interactive presentation controller designed for hackathon judges (5-8 minute seamless demo).

---

## 🏗 System Architecture

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
          └─────────┬────────┘            └──────────────────┘            └──────────────────┘
                    │
                    ▼
          ┌────────────────────────────────────────────────────────────────────────────────┐
          │                              LOCAL TOOL SUITE                                  │
          │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐  │
          │  │ Document OCR │  │ Data & Chart │  │ Sandboxed    │  │ DOCX / XLSX / PPTX │  │
          │  └──────────────┘  └──────────────┘  └──────────────┘  └────────────────────┘  │
          └────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠 Quickstart Guide

### Prerequisites
- Python 3.10+
- Node.js v18+ & npm

### 1. Start Backend API
```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
python backend/generate_demo_data.py
python backend/main.py
```
Backend will run at `http://localhost:8000`.

### 2. Start Frontend UI
```bash
cd frontend
npm install
npm run dev
```
Frontend will run at `http://localhost:3000`.

---

## 🧪 Running Automated Test Suite

```bash
cd backend
pytest tests/
```

Tests verify:
- Password hashing & JWT authentication (`test_auth.py`)
- Zero-egress network blocking & audit logging (`test_sovereignty.py`)
- AST Python sandbox security (`test_sandbox.py`)
- DOCX/XLSX/PPTX file generation (`test_deliverables.py`)
- Inspection-to-Approval multi-step workflow (`test_agent_workflow.py`)

---

## 👥 Team Role Division (SIH 2026 Matrix)

| Team Role | Lead Responsibilities | Deliverables |
| :--- | :--- | :--- |
| **Admin / Team Lead** | System Architecture, FastAPI Setup, Air-Gap Guard | `main.py`, `network_guard.py`, Docker setup |
| **Member 1 (AI & Router)** | Model Manager, Task Intent Router, Fallback Engine | `manager.py`, `router.py`, `local_fallback.py` |
| **Member 2 (RAG & OCR)** | Local RAG Pipeline, PDF Ingestion, Page Citations | `parser.py`, `ocr.py`, `vector_store.py`, `pipeline.py` |
| **Member 3 (Agent & Sandbox)** | Multi-step Agent Planner, AST Python Sandbox | `planner.py`, `orchestrator.py`, `sandbox_runner.py` |
| **Member 4 (Deliverables)** | Document Generators (DOCX, XLSX, PPTX) & Demo Data | `docx_gen.py`, `xlsx_gen.py`, `demo_data/` |
| **Member 5 (Frontend UI)** | React Enterprise Dashboard, SIH 11-Step Demo Mode | `SIHDemo.tsx`, `SovereigntyMonitor.tsx`, `App.tsx` |
