import os
import pptx
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from datetime import datetime
from app.core.config import settings

class PPTXGenerator:
    def generate_executive_summary_deck(self, title: str = "P-102B Maintenance Strategy Briefing") -> str:
        prs = pptx.Presentation()
        
        # Slide 1: Title Slide
        slide_layout = prs.slide_layouts[0]
        slide = prs.slides.add_slide(slide_layout)
        title_box = slide.shapes.title
        subtitle_box = slide.placeholders[1]
        
        title_box.text = "SOVEREIGN-X INDUSTRIAL AI ANALYSIS"
        subtitle_box.text = f"{title}\nMangalore Refinery and Petrochemicals Limited (MRPL)\nAir-Gapped Confidential Briefing — {datetime.now().strftime('%Y-%m-%d')}"
        
        # Slide 2: Anomaly Findings & SOP
        slide_layout = prs.slide_layouts[1]
        slide2 = prs.slides.add_slide(slide_layout)
        slide2.shapes.title.text = "Key Findings & Recommendation"
        
        tf = slide2.placeholders[1].text_frame
        tf.text = "1. Equipment Status: Centrifugal Pump P-102B (CDU-2)"
        
        p = tf.add_paragraph()
        p.text = "• Vibration Level: 6.8 mm/s RMS (Limit: 4.5 mm/s)"
        p.level = 1
        
        p2 = tf.add_paragraph()
        p2.text = "• Local Vision OCR: Thermal discoloration at drive-end bearing"
        p2.level = 1
        
        p3 = tf.add_paragraph()
        p3.text = "2. Recommended Action:"
        p3.level = 0
        
        p4 = tf.add_paragraph()
        p4.text = "• Execute changeover to P-102A immediately."
        p4.level = 1
        p5 = tf.add_paragraph()
        p5.text = "• Overhaul NDE bearing assembly under MRPL-SOP-MECH-042."
        p5.level = 1
        
        filename = f"Executive_Summary_{int(datetime.now().timestamp())}.pptx"
        file_path = os.path.join(settings.DELIVERABLES_DIR, filename)
        prs.save(file_path)
        return file_path

pptx_generator = PPTXGenerator()
