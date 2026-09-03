import os
import csv
from PIL import Image, ImageDraw

demo_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "demo_data")
os.makedirs(demo_dir, exist_ok=True)

# 1. Pump_Sensor_Data.csv
csv_path = os.path.join(demo_dir, "Pump_Sensor_Data.csv")
with open(csv_path, "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["timestamp", "vibration_mms", "bearing_temp_c", "pressure_bar", "flow_m3h"])
    rows = [
        ["2026-08-28 08:00", 3.2, 65.4, 12.1, 450.0],
        ["2026-08-28 09:00", 3.4, 66.8, 12.0, 451.2],
        ["2026-08-28 10:00", 4.1, 71.2, 11.9, 448.5],
        ["2026-08-28 11:00", 4.8, 77.5, 11.8, 445.0],
        ["2026-08-28 12:00", 5.6, 82.1, 11.5, 440.0],
        ["2026-08-28 13:00", 6.8, 88.3, 11.2, 432.0],
    ]
    writer.writerows(rows)
print(f"Generated {csv_path}")

# 2. Pump_Image.jpg
img_path = os.path.join(demo_dir, "Pump_Image.jpg")
img = Image.new("RGB", (600, 400), color=(230, 235, 240))
draw = ImageDraw.Draw(img)
draw.rectangle([50, 50, 550, 350], outline=(11, 60, 93), width=4)
draw.ellipse([250, 150, 350, 250], fill=(200, 50, 50), outline=(0, 0, 0))
img.save(img_path)
print(f"Generated {img_path}")

# 3. Create Documents
docs = {
    "Pump_Inspection_Report.pdf": (
        "MRPL PETROCHEMICALS FIELD INSPECTION REPORT\n"
        "Equipment ID: Centrifugal Pump P-102B (Crude Distillation Unit 2)\n"
        "Date of Inspection: 2026-08-28\n"
        "Inspector: Er. K. Sharma (Senior Maintenance Engineer)\n"
        "Observations: Abnormally elevated acoustic noise and localized vibration observed at drive-end bearing housing. "
        "Vibration meter reading: 6.8 mm/s RMS (Threshold warning: 4.5 mm/s).\n"
        "Visual check: Thermal discoloration on bearing housing collar; minor lubricant breakdown observed."
    ),
    "Pump_Maintenance_SOP.pdf": (
        "MANGALORE REFINERY AND PETROCHEMICALS LIMITED (MRPL)\n"
        "STANDARD OPERATING PROCEDURE: MRPL-SOP-MECH-042\n"
        "TITLE: CENTRIFUGAL PUMP BEARING MAINTENANCE & SHUTDOWN THRESHOLDS\n\n"
        "Page 24 - Section 4.2: Vibration Criteria (ISO 10816 Class II)\n"
        "1. Vibration < 3.0 mm/s: Satisfactory continuous operation.\n"
        "2. Vibration 3.0 - 4.5 mm/s: Allowable for short term; monitor weekly.\n"
        "3. Vibration > 4.5 mm/s: WARNING threshold. Perform oil analysis and prepare standby pump.\n"
        "4. Vibration > 6.0 mm/s: MANDATORY SHUTDOWN. Immediate changeover to standby unit P-102A required. "
        "Complete overhaul of non-drive-end bearing assembly required prior to re-commissioning."
    ),
    "Pump_Manual.pdf": (
        "SULZER HEAVY INDUSTRIAL PUMP TECHNICAL MANUAL\n"
        "Model: CPT-200 Centrifugal Heavy Duty Slurry Pump\n"
        "Max Operating Temperature: 90°C\n"
        "Recommended Bearing Grease: Mobilith SHC 220\n"
        "Recommended Alignment Tolerance: < 0.05 mm TIR"
    )
}

for fname, content in docs.items():
    file_p = os.path.join(demo_dir, fname)
    with open(file_p, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Generated {file_p}")

print("Demo Dataset generation completed successfully.")
