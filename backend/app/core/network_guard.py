import socket
import logging
from datetime import datetime
from typing import List, Dict, Any

logger = logging.getLogger("sovereign_x.network_guard")

class NetworkGuard:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(NetworkGuard, cls).__new__(cls)
            cls._instance.blocked_attempts = []
            cls._instance.local_calls_count = 0
            cls._instance.external_calls_count = 0
            cls._instance.data_sent_outside_mb = 0.0
            cls._instance.enabled = True
        return cls._instance

    def log_local_call(self, endpoint: str, payload_size_bytes: int = 0):
        self.local_calls_count += 1
        logger.info(f"[SOVEREIGNTY MONITOR] Local Call Authorized -> Endpoint: {endpoint} ({payload_size_bytes} bytes)")

    def is_local_address(self, host: str) -> bool:
        local_hosts = ["localhost", "127.0.0.1", "0.0.0.0", "::1"]
        if host in local_hosts:
            return True
        if host.startswith("192.168.") or host.startswith("10.") or host.startswith("172.16."):
            return True  # Internal LAN
        return False

    def validate_request(self, target_url_or_host: str, tool_name: str = "SystemProcess") -> bool:
        host = target_url_or_host.split("://")[-1].split("/")[0].split(":")[0]
        if self.is_local_address(host):
            self.log_local_call(target_url_or_host)
            return True
        
        # External target detected -> BLOCK
        self.external_calls_count += 1
        event = {
            "timestamp": datetime.now().isoformat(),
            "event_type": "EXTERNAL_NETWORK_BLOCKED",
            "severity": "CRITICAL",
            "tool_name": tool_name,
            "target": target_url_or_host,
            "action_taken": "BLOCKED",
            "reason": "SOVEREIGN-X Zero-Trust Policy prohibits external internet egress"
        }
        self.blocked_attempts.append(event)
        logger.warning(f"[SECURITY ALERT - BLOCKED] External egress attempt to {target_url_or_host} by {tool_name}")
        return False

    def get_metrics(self) -> Dict[str, Any]:
        return {
            "external_api_calls": 0,
            "external_network_requests": self.external_calls_count,
            "blocked_requests": len(self.blocked_attempts),
            "data_sent_outside_mb": self.data_sent_outside_mb,
            "local_model_calls": self.local_calls_count,
            "airgap_status": "ENFORCED",
            "blocked_events": self.blocked_attempts[-10:]
        }

guard = NetworkGuard()
