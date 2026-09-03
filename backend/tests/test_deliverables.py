import os
from app.deliverables.docx_gen import docx_generator
from app.deliverables.xlsx_gen import xlsx_generator
from app.deliverables.pptx_gen import pptx_generator

def test_docx_generation():
    path = docx_generator.generate_maintenance_approval_note()
    assert os.path.exists(path)
    assert path.endswith(".docx")

def test_xlsx_generation():
    path = xlsx_generator.generate_sensor_analytics_sheet()
    assert os.path.exists(path)
    assert path.endswith(".xlsx")

def test_pptx_generation():
    path = pptx_generator.generate_executive_summary_deck()
    assert os.path.exists(path)
    assert path.endswith(".pptx")
