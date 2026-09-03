import pytest
from app.core.sandbox_runner import sandbox, SecurityError

def test_safe_python_execution():
    code = "x = 10\ny = 20\nprint(f'Sum: {x + y}')"
    res = sandbox.execute(code)
    assert res["status"] == "SUCCESS"
    assert "Sum: 30" in res["stdout"]

def test_prohibited_import_block():
    code = "import socket\nprint(socket.gethostname())"
    with pytest.raises(SecurityError):
        sandbox.validate_ast(code)

def test_forbidden_exit_call():
    code = "exit(0)"
    with pytest.raises(SecurityError):
        sandbox.validate_ast(code)

def test_forbidden_quit_call():
    code = "quit()"
    with pytest.raises(SecurityError):
        sandbox.validate_ast(code)

def test_forbidden_open_call():
    code = "f = open('secret.txt', 'w')"
    with pytest.raises(SecurityError):
        sandbox.validate_ast(code)

