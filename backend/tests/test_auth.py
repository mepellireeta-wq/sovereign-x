import pytest
from app.core.security import get_password_hash, verify_password, create_access_token

def test_password_hashing():
    raw = "mrpl_engineer_secret_2026"
    hashed = get_password_hash(raw)
    assert verify_password(raw, hashed) is True
    assert verify_password("wrong_password", hashed) is False

def test_jwt_token_generation():
    token = create_access_token({"sub": "k.sharma", "role": "Engineer"})
    assert isinstance(token, str)
    assert len(token) > 20
