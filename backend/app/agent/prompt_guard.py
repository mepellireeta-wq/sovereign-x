import re

INJECTION_PATTERNS = [
    r"ignore\s+all\s+previous\s+instructions",
    r"disregard\s+system\s+prompt",
    r"send\s+this\s+data\s+to",
    r"curl\s+http",
    r"wget\s+http",
    r"http://",
    r"https://"
]

class PromptGuard:
    def sanitize_retrieved_context(self, context_text: str) -> str:
        sanitized = context_text
        for pattern in INJECTION_PATTERNS:
            sanitized = re.sub(pattern, "[UNTRUSTED_INSTRUCTION_REMOVED]", sanitized, flags=re.IGNORECASE)
        return f"\n<UNTRUSTED_DOCUMENT_DATA>\n{sanitized}\n</UNTRUSTED_DOCUMENT_DATA>\n"

prompt_guard = PromptGuard()
