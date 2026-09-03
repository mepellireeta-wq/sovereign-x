from app.core.network_guard import guard

def test_airgap_local_address():
    assert guard.is_local_address("localhost") is True
    assert guard.is_local_address("127.0.0.1") is True
    assert guard.is_local_address("192.168.1.50") is True
    assert guard.is_local_address("api.openai.com") is False

def test_external_egress_block_logging():
    initial_blocked = len(guard.blocked_attempts)
    allowed = guard.validate_request("http://api.anthropic.com/v1/messages", tool_name="TestTool")
    assert allowed is False
    assert len(guard.blocked_attempts) == initial_blocked + 1
    metrics = guard.get_metrics()
    assert metrics["airgap_status"] == "ENFORCED"
    assert metrics["data_sent_outside_mb"] == 0.0
