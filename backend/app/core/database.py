from sqlalchemy import create_engine, Column, Integer, String, Text, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker, relationship
from datetime import datetime
import json
from app.core.config import settings

engine = create_engine(f"sqlite:///{settings.DB_PATH}", connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String, default="Engineer")  # Admin, Engineer, Reviewer, Auditor
    created_at = Column(DateTime, default=datetime.utcnow)

class AIModel(Base):
    __tablename__ = "models"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    model_type = Column(String)  # general, vision, embedding, coding, document
    endpoint = Column(String)
    context_length = Column(Integer, default=8192)
    quantization = Column(String, default="Q4_K_M")
    is_active = Column(Boolean, default=True)
    status = Column(String, default="Available")
    memory_mb = Column(Integer, default=4096)

class Document(Base):
    __tablename__ = "documents"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    filename = Column(String)
    file_path = Column(String)
    file_type = Column(String)
    uploaded_by = Column(String)
    word_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    chunks = relationship("DocumentChunk", back_populates="document", cascade="all, delete-orphan")

class DocumentChunk(Base):
    __tablename__ = "document_chunks"
    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, ForeignKey("documents.id"))
    chunk_index = Column(Integer)
    content = Column(Text)
    page_number = Column(Integer, default=1)
    metadata_json = Column(Text, default="{}")
    document = relationship("Document", back_populates="chunks")

class AgentRun(Base):
    __tablename__ = "agent_runs"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    user_id = Column(Integer)
    status = Column(String, default="RUNNING")  # RUNNING, COMPLETED, PENDING_APPROVAL, FAILED
    intent = Column(String)
    selected_model = Column(String)
    plan_json = Column(Text, default="[]")
    output_text = Column(Text, default="")
    created_at = Column(DateTime, default=datetime.utcnow)
    steps = relationship("AgentStep", back_populates="agent_run", cascade="all, delete-orphan")

class AgentStep(Base):
    __tablename__ = "agent_steps"
    id = Column(Integer, primary_key=True, index=True)
    run_id = Column(Integer, ForeignKey("agent_runs.id"))
    step_number = Column(Integer)
    step_name = Column(String)
    tool_name = Column(String)
    tool_input = Column(Text, default="")
    tool_output = Column(Text, default="")
    status = Column(String, default="COMPLETED")
    timestamp = Column(DateTime, default=datetime.utcnow)
    agent_run = relationship("AgentRun", back_populates="steps")

class Deliverable(Base):
    __tablename__ = "deliverables"
    id = Column(Integer, primary_key=True, index=True)
    run_id = Column(Integer)
    file_name = Column(String)
    file_type = Column(String)  # DOCX, XLSX, PPTX
    file_path = Column(String)
    download_url = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

class AuditLog(Base):
    __tablename__ = "audit_logs"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String)
    action = Column(String)
    resource = Column(String)
    details_json = Column(Text, default="{}")
    timestamp = Column(DateTime, default=datetime.utcnow)

class SecurityEvent(Base):
    __tablename__ = "security_events"
    id = Column(Integer, primary_key=True, index=True)
    event_type = Column(String)
    severity = Column(String)
    target = Column(String)
    action_taken = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)

class ApprovalRequest(Base):
    __tablename__ = "approvals"
    id = Column(Integer, primary_key=True, index=True)
    run_id = Column(Integer)
    title = Column(String)
    recommendation = Column(Text)
    evidence_json = Column(Text, default="[]")
    risk_level = Column(String, default="HIGH")
    confidence = Column(Float, default=0.92)
    status = Column(String, default="PENDING")  # PENDING, APPROVED, REJECTED
    reviewed_by = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

def init_db():
    Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
