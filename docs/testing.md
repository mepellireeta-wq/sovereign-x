# Testing & Quality Assurance Suite

## Automated Test Execution
Run all backend unit, integration, and security tests:
```bash
cd backend
pytest tests/
```

## Coverage
- `test_auth.py`: Password hashing & JWT verification
- `test_sovereignty.py`: Airgap network guard & external call blocking
- `test_sandbox.py`: Python AST static analysis & execution safety
- `test_deliverables.py`: DOCX, XLSX, and PPTX file generation
- `test_agent_workflow.py`: Multi-step inspection-to-approval workflow
