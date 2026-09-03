import sys
import io
import os
import ast
import time
import subprocess
import tempfile
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
from typing import Dict, Any
from app.core.config import settings
from app.core.network_guard import guard

FORBIDDEN_AST_NODES = {
    'Import': ['os', 'sys', 'socket', 'urllib', 'httpx', 'requests', 'subprocess', 'shutil'],
    'ImportFrom': ['os', 'sys', 'socket', 'urllib', 'httpx', 'requests', 'subprocess', 'shutil']
}

FORBIDDEN_CALLS = {'eval', 'exec', '__import__', 'open', 'system', 'popen'}

class SecureSandboxRunner:
    def __init__(self, timeout_seconds: int = 10):
        self.timeout_seconds = timeout_seconds

    def validate_ast(self, code: str) -> None:
        try:
            tree = ast.parse(code)
        except SyntaxError as e:
            raise ValueError(f"Syntax error in code: {e}")
            
        for node in ast.walk(tree):
            if isinstance(node, ast.Import):
                for alias in node.names:
                    if alias.name.split('.')[0] in FORBIDDEN_AST_NODES['Import']:
                        raise SecurityError(f"Security Policy Violation: Import of '{alias.name}' is strictly prohibited in sandbox")
            elif isinstance(node, ast.ImportFrom):
                if node.module and node.module.split('.')[0] in FORBIDDEN_AST_NODES['ImportFrom']:
                    raise SecurityError(f"Security Policy Violation: Import from '{node.module}' is strictly prohibited in sandbox")
            elif isinstance(node, ast.Call):
                if isinstance(node.func, ast.Name) and node.func.id in FORBIDDEN_CALLS:
                    raise SecurityError(f"Security Policy Violation: Invocation of '{node.func.id}()' is prohibited")

    def execute(self, code: str, context_vars: Dict[str, Any] = None) -> Dict[str, Any]:
        # Validate AST
        self.validate_ast(code)
        
        # Prepare execution environment
        output_buffer = io.StringIO()
        original_stdout = sys.stdout
        
        chart_filename = f"sandbox_plot_{int(time.time() * 1000)}.png"
        chart_path = os.path.join(settings.DELIVERABLES_DIR, chart_filename)
        
        exec_globals = {
            "pd": pd,
            "np": np,
            "plt": plt,
            "print": lambda *args, **kwargs: print(*args, file=output_buffer, **kwargs),
            "__builtins__": {
                "range": range, "len": len, "int": int, "float": float, "str": str,
                "list": list, "dict": dict, "set": set, "tuple": tuple, "bool": bool,
                "sum": sum, "min": min, "max": max, "abs": abs, "round": round, "zip": zip,
                "enumerate": enumerate, "isinstance": isinstance
            }
        }
        if context_vars:
            exec_globals.update(context_vars)
            
        start_time = time.time()
        has_chart = False
        
        try:
            plt.clf()
            exec(code, exec_globals)
            duration_ms = int((time.time() - start_time) * 1000)
            
            # Save chart if generated
            if plt.gcf().get_axes():
                plt.tight_layout()
                plt.savefig(chart_path, dpi=150)
                plt.close('all')
                has_chart = True
                
            stdout_text = output_buffer.getvalue()
            return {
                "status": "SUCCESS",
                "stdout": stdout_text,
                "duration_ms": duration_ms,
                "chart_generated": has_chart,
                "chart_path": chart_path if has_chart else None,
                "chart_url": f"/api/deliverables/download/{chart_filename}" if has_chart else None,
                "variables": {k: str(v) for k, v in exec_globals.items() if not k.startswith("__") and k not in ["pd", "np", "plt", "print"]}
            }
        except Exception as e:
            plt.close('all')
            return {
                "status": "ERROR",
                "error_type": type(e).__name__,
                "error": str(e),
                "stdout": output_buffer.getvalue(),
                "duration_ms": int((time.time() - start_time) * 1000)
            }

class SecurityError(Exception):
    pass

sandbox = SecureSandboxRunner()
