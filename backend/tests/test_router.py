import pytest
from app.models_engine.router import model_router
from app.models_engine.manager import model_manager

def test_codellama_model_definition():
    models = model_manager.list_models()
    codellama = next((m for m in models if "CodeLlama-34B-Instruct" in m["name"]), None)
    assert codellama is not None
    assert codellama["name"] == "CodeLlama-34B-Instruct"
    assert codellama["model_type"] == "coding"
    assert codellama["is_active"] is True
    assert codellama["status"] == "Available"

def test_router_pid_engineering_drawings():
    res = model_router.route_task("P&ID engineering drawings")
    assert res["model_type"] == "vision"
    assert "Llama-3.2-11B-Vision-Instruct" in res["selected_model"]
    assert "P&ID" in res["detected_intent"] or "Vision" in res["detected_intent"]

def test_router_financial_audit_requests():
    res = model_router.route_task("financial audit requests")
    assert res["model_type"] == "document"
    assert "Mistral-7B-Instruct" in res["selected_model"]
    assert "Audit" in res["detected_intent"] or "Document" in res["detected_intent"]
