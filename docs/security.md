# Zero-Trust Air-Gap Security Model

## Security Pillars
1. **Zero External Egress Policy**: Intercepts all outgoing socket / HTTP requests and logs blocked attempts to audit storage.
2. **AST Sandboxed Python Execution**: Code is static-analyzed for forbidden AST imports (`socket`, `os`, `urllib`) before execution.
3. **Role-Based Access Control (RBAC)**: Admin, Engineer, Reviewer, Auditor permissions enforced in backend endpoints.
4. **Prompt Injection Guard**: Retrieved RAG document context is tagged as untrusted data to prevent prompt override attacks.
