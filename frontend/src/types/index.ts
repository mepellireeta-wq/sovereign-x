export interface Model {
  id: number;
  name: string;
  model_type: string;
  endpoint: string;
  context_length: number;
  quantization: string;
  is_active: boolean;
  status: string;
  memory_mb: number;
  default_use_case: string;
}

export interface AgentStep {
  step_number: number;
  step_name: string;
  tool_name: string;
  tool_output: string;
  status: string;
  duration_ms: number;
}

export interface Deliverable {
  file_name: string;
  file_type: string;
  download_url: string;
  description?: string;
}

export interface AgentRunResult {
  run_id: number;
  user_request: string;
  status: string;
  model_routing: {
    detected_intent: string;
    selected_model: string;
    model_type: string;
    reason: string;
  };
  executed_steps: AgentStep[];
  evidence_citations: string[];
  recommendation: {
    title: string;
    equipment_id: string;
    action: string;
    risk_level: string;
    confidence: number;
    evidence: string[];
  };
  deliverables: Deliverable[];
  total_duration_seconds: number;
}

export interface SovereigntyMetrics {
  external_api_calls: number;
  external_network_requests: number;
  blocked_requests: number;
  data_sent_outside_mb: number;
  local_model_calls: number;
  airgap_status: string;
  blocked_events: Array<{
    timestamp: string;
    event_type: string;
    severity: string;
    tool_name: string;
    target: string;
    action_taken: string;
    reason: string;
  }>;
}
