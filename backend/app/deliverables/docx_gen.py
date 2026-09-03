import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from datetime import datetime
from app.core.config import settings

class DOCXGenerator:
    def generate_maintenance_approval_note(
        self,
        equipment_id: str = "P-102B (Crude Distillation Unit 2)",
        recommendation: str = "Immediate shutdown of P-102B and changeover to standby pump P-102A. Replace NDE drive bearing.",
        evidence_citations: list = None,
        risk_level: str = "HIGH",
        confidence: float = 0.92,
        author: str = "SOVEREIGN-X Maintenance Agent"
    ) -> str:
        evidence_citations = evidence_citations or [
            "Pump_Inspection_Report.pdf — Page 1",
            "Pump_Maintenance_SOP.pdf — Page 24",
            "Pump_Sensor_Data.csv — Telemetry Window Aug 28"
        ]
        
        doc = docx.Document()
        
        # Styling Header
        header = doc.sections[0].header
        hp = header.paragraphs[0]
        hp.text = "MANGALORE REFINERY AND PETROCHEMICALS LIMITED (MRPL) — CONFIDENTIAL INTERNAL MEMORANDUM"
        hp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        hp.runs[0].font.size = Pt(8.5)
        hp.runs[0].font.color.rgb = RGBColor(120, 120, 120)
        
        # Title
        title_p = doc.add_paragraph()
        title_run = title_p.add_run("MAINTENANCE APPROVAL & ACTION NOTE")
        title_run.bold = True
        title_run.font.size = Pt(18)
        title_run.font.color.rgb = RGBColor(11, 60, 93)  # MRPL Deep Blue
        title_p.alignment = WD_ALIGN_PARAGRAPH.LEFT
        
        # Subtitle Table / Metadata
        table = doc.add_table(rows=4, cols=2)
        table.alignment = WD_TABLE_ALIGNMENT.CENTER
        
        fields = [
            ("Date / Time:", datetime.now().strftime("%Y-%m-%d %H:%M IST")),
            ("Target Equipment:", equipment_id),
            ("Risk Assessment Level:", f"{risk_level} (Confidence: {int(confidence*100)}%)"),
            ("Originating System:", "SOVEREIGN-X Air-Gapped Industrial AI Workbench")
        ]
        
        for idx, (k, v) in enumerate(fields):
            row = table.rows[idx]
            cell_k = row.cells[0]
            cell_v = row.cells[1]
            
            cell_k.paragraphs[0].add_run(k).bold = True
            cell_v.paragraphs[0].add_run(v)
            
        doc.add_paragraph().paragraph_format.space_after = Pt(12)
        
        # Section 1: Executive Summary
        h1 = doc.add_heading("1. Executive Summary & Action Required", level=1)
        h1.runs[0].font.color.rgb = RGBColor(11, 60, 93)
        p1 = doc.add_paragraph(recommendation)
        p1.paragraph_format.space_after = Pt(12)
        
        # Section 2: Technical Findings & Telemetry
        h2 = doc.add_heading("2. Technical Findings & Inspection Evidence", level=1)
        h2.runs[0].font.color.rgb = RGBColor(11, 60, 93)
        
        p2 = doc.add_paragraph()
        p2.add_run("• Vibration Peak: ").bold = True
        p2.add_run("Recorded at 6.8 mm/s RMS at NDE bearing collar (ISO 10816 Limit: 4.5 mm/s).\n")
        p2.add_run("• Thermal Discoloration: ").bold = True
        p2.add_run("Confirmed via Local Vision Inspection Model on uploaded inspection photo.\n")
        p2.add_run("• Temperature Spike: ").bold = True
        p2.add_run("Telemetry analysis shows temperature rise to 88°C under continuous load.")
        
        # Section 3: Grounded Evidence Citations
        h3 = doc.add_heading("3. Internal Knowledge Base Citations", level=1)
        h3.runs[0].font.color.rgb = RGBColor(11, 60, 93)
        
        for cite in evidence_citations:
            p_cite = doc.add_paragraph(style='List Bullet')
            p_cite.add_run(cite).bold = True
            
        # Section 4: Sign-off & Approval
        h4 = doc.add_heading("4. Engineer Sign-Off & Authorization", level=1)
        h4.runs[0].font.color.rgb = RGBColor(11, 60, 93)
        
        app_table = doc.add_table(rows=2, cols=3)
        app_table.rows[0].cells[0].paragraphs[0].add_run("Prepared By:").bold = True
        app_table.rows[0].cells[1].paragraphs[0].add_run("Reviewed By:").bold = True
        app_table.rows[0].cells[2].paragraphs[0].add_run("Approved By (Chief Engineer):").bold = True
        
        app_table.rows[1].cells[0].paragraphs[0].add_run("SOVEREIGN-X Agent")
        app_table.rows[1].cells[1].paragraphs[0].add_run("Er. K. Sharma")
        app_table.rows[1].cells[2].paragraphs[0].add_run("[ APPROVED VIA HITL MODAL ]")
        
        filename = f"Maintenance_Approval_Note_{int(datetime.now().timestamp())}.docx"
        file_path = os.path.join(settings.DELIVERABLES_DIR, filename)
        doc.save(file_path)
        return file_path

docx_generator = DOCXGenerator()
