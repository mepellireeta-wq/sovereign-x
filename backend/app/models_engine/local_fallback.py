import re
import json
from typing import Dict, Any, List

class LocalFallbackEngine:
    """High-fidelity air-gapped reasoning engine fallback for demonstration."""
    
    def generate_reasoning(self, prompt: str, context: str = "") -> str:
        prompt_lower = prompt.lower()
        
        if "pump" in prompt_lower or "inspection" in prompt_lower or "maintenance" in prompt_lower:
            return (
                "### Industrial Knowledge Analysis — MRPL Centrifugal Pump Unit P-102B\n\n"
                "**1. Findings Summary:**\n"
                "- High vibration detected at NDE bearing housing (6.8 mm/s vs ISO 10816 limit of 4.5 mm/s).\n"
                "- Visual inspection reveals thermal discoloration and lubrication degradation.\n"
                "- Telemetry telemetry indicates localized temperature elevation to 88°C.\n\n"
                "**2. SOP Compliance Check (MRPL-SOP-MECH-042):**\n"
                "- Mandatory shutdown required when vibration exceeds 6.0 mm/s for > 2 hours.\n"
                "- Bearing overhaul and alignment check mandatory prior to restart.\n\n"
                "**3. Strategic Recommendation:**\n"
                "Initiate immediate scheduled changeover to standby pump P-102A, perform complete bearing replacement on P-102B, and submit Maintenance Approval Note."
            )
        elif "code" in prompt_lower or "calculate" in prompt_lower or "vibration" in prompt_lower:
            return (
                "```python\n"
                "import pandas as pd\n"
                "import numpy as np\n"
                "import matplotlib.pyplot as plt\n\n"
                "# Load telemetry data\n"
                "df = pd.read_csv('demo_data/Pump_Sensor_Data.csv')\n"
                "mean_vib = df['vibration_mms'].mean()\n"
                "max_vib = df['vibration_mms'].max()\n"
                "anomalies = df[df['vibration_mms'] > 4.5]\n\n"
                "print(f'Mean Vibration: {mean_vib:.2f} mm/s')\n"
                "print(f'Max Vibration: {max_vib:.2f} mm/s')\n"
                "print(f'Anomaly Readings Count: {len(anomalies)}')\n\n"
                "# Plot trend\n"
                "plt.figure(figsize=(10, 4))\n"
                "plt.plot(df['timestamp'], df['vibration_mms'], label='Vibration (mm/s)', color='red')\n"
                "plt.axhline(y=4.5, color='orange', linestyle='--', label='Warning Threshold (4.5)')\n"
                "plt.title('P-102B Bearing Vibration Trend Telemetry')\n"
                "plt.xlabel('Time')\n"
                "plt.ylabel('Vibration (mm/s)')\n"
                "plt.legend()\n"
                "```"
            )
        else:
            return (
                f"### Sovereign Knowledge Assistant Response\n\n"
                f"Processed confidential request on-premise without external communication.\n\n"
                f"**Context Retrieved:** {context[:200]}...\n\n"
                f"Analysis completed in accordance with MRPL industrial compliance protocols."
            )

    def analyze_image(self, image_path: str, prompt: str = "") -> Dict[str, Any]:
        return {
            "image_path": image_path,
            "detected_objects": ["Centrifugal Pump Housing", "Bearing Flange", "Thermal Discoloration", "Oil Leak Marks"],
            "inspection_notes": "Surface discoloration near drive-end bearing indicates operational overheating (>85°C). Seal integrity compromised.",
            "severity": "HIGH",
            "confidence": 0.91
        }

local_engine = LocalFallbackEngine()
