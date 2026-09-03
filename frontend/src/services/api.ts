const API_BASE = '/api';

export async function fetchHealth() {
  const res = await fetch(`${API_BASE}/system/health`);
  return res.json();
}

export async function fetchSovereigntyMetrics() {
  const res = await fetch(`${API_BASE}/sovereignty/metrics`);
  return res.json();
}

export async function testEgressBlock(targetUrl: string = 'http://api.openai.com/v1/chat') {
  const res = await fetch(`${API_BASE}/sovereignty/test-egress-block`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ target_url: targetUrl })
  });
  return res.json();
}

export async function fetchModels() {
  const res = await fetch(`${API_BASE}/models/`);
  return res.json();
}

export async function fetchDocuments() {
  const res = await fetch(`${API_BASE}/documents/`);
  return res.json();
}

export async function fetchDeliverables() {
  const res = await fetch(`${API_BASE}/deliverables/`);
  return res.json();
}

export async function fetchAuditLogs() {
  const res = await fetch(`${API_BASE}/audit/`);
  return res.json();
}

export async function runAgenticTask(user_request: string, files: string[] = []) {
  const res = await fetch(`${API_BASE}/agent/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_request, files })
  });
  return res.json();
}

export async function executeSandboxCode(code: string) {
  const res = await fetch(`${API_BASE}/sandbox/execute`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code })
  });
  return res.json();
}

export async function decideApproval(approval_id: number, decision: string, comments: string) {
  const res = await fetch(`${API_BASE}/approvals/decide`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ approval_id, decision, comments })
  });
  return res.json();
}
