import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Pause, 
  FileText, 
  Database, 
  Terminal, 
  Activity, 
  AlertTriangle,
  Cpu,
  Layers,
  ArrowRight
} from 'lucide-react';

export const AgentRuns: React.FC = () => {
  return (
    <div className="p-4 space-y-4 max-w-4xl mx-auto font-sans text-xs bg-slate-950 min-h-screen text-slate-100 pb-16">
      {/* Subheader */}
      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-b border-slate-900 pb-2">
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span className="text-emerald-400 font-bold uppercase tracking-wider">AIRGAP ENFORCED</span>
          <span className="text-slate-600">|</span>
          <span>Zero Egress</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-slate-400 font-mono">Elapsed: 01:45</span>
          <span className="bg-slate-900 px-2 py-0.5 rounded text-slate-300 font-mono">NODE #04</span>
        </div>
      </div>

      {/* Main Title Banner */}
      <div className="space-y-1 font-mono">
        <h2 className="text-xl font-black text-white">Inspection-to-Approval</h2>
        <p className="text-slate-400 text-[11px] font-sans">
          Automated Root-Cause & Maintenance Triage Agent
        </p>
      </div>

      {/* Target Asset Box */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded p-3 flex items-center justify-between font-mono text-[10px]">
        <div>
          <span className="text-slate-400 uppercase">TARGET ASSET</span>
          <div className="font-bold text-white text-[11px]">Pump P-102 (CDU)</div>
        </div>
        <div className="text-right">
          <span className="text-slate-400 uppercase">LOCAL HOST</span>
          <div className="font-bold text-emerald-400 text-[11px]">Node-04 • 2x A6000</div>
        </div>
      </div>

      {/* Active Sandboxed Subroutine Box */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded p-4 space-y-3 font-mono text-[10px]">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-slate-400 uppercase font-bold">ACTIVE SANDBOXED SUBROUTINE</span>
          <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800 font-bold">
            PY311_AIRGAP_BOX
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-slate-400 uppercase text-[9px]">EXECUTING OPERATION</span>
            <div className="font-bold text-white text-xs">Step 05: Sensor Analysis</div>
          </div>
          <div className="text-right">
            <span className="text-emerald-400 font-bold">RMS VIBRATION CHECK</span>
            <div className="text-slate-400 text-[9px]">Threshold: 4.5 mm/s</div>
          </div>
        </div>

        {/* Live Telemetry Chart Graphic */}
        <div className="bg-slate-950 border border-slate-800/80 rounded p-3 space-y-2">
          <div className="flex items-center justify-between text-[9px]">
            <span className="text-slate-400">Tri-Axial RMS Telemetry (Pump_Sensor_Data.csv)</span>
            <span className="text-rose-400 font-bold">2 Anomalies Detected</span>
          </div>

          {/* SVG Line Chart Representation */}
          <div className="h-24 w-full relative flex items-end pt-4 pb-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 300 80">
              {/* Threshold line */}
              <line x1="0" y1="40" x2="300" y2="40" stroke="#64748b" strokeDasharray="4 4" strokeWidth="1" />
              {/* Green Telemetry Curve */}
              <path
                d="M 0 60 Q 30 58 60 55 T 120 50 T 150 20 T 180 50 T 210 15 T 240 50 T 300 55"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
              />
              {/* Anomaly Pink Points */}
              <circle cx="150" cy="20" r="4" fill="#f43f5e" />
              <circle cx="210" cy="15" r="4" fill="#f43f5e" />
            </svg>
          </div>

          {/* Telemetry Stats Bar */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-900 text-center text-[10px]">
            <div>
              <span className="text-slate-500 text-[9px] block">Ingested</span>
              <span className="font-bold text-slate-200">129 pts</span>
            </div>
            <div>
              <span className="text-slate-500 text-[9px] block">Max Velocity</span>
              <span className="font-bold text-rose-400">6.82 mm/s</span>
            </div>
            <div>
              <span className="text-slate-500 text-[9px] block">Confidence</span>
              <span className="font-bold text-emerald-400">99.8%</span>
            </div>
          </div>
        </div>

        {/* Information Callout */}
        <div className="bg-slate-950 p-2.5 rounded border border-slate-800/80 text-[9px] text-slate-300 flex items-start space-x-2">
          <Activity className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <span>
            Isolating high-frequency harmonics at 14:22:01 UTC. Correlating with bearing defect frequency (BPFI = 108.4 Hz). Zero outbound traffic initiated.
          </span>
        </div>

        {/* Action Controls */}
        <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-[9px]">
          <button className="py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-300 font-bold flex items-center justify-center space-x-1 hover:bg-slate-800">
            <Pause className="w-3 h-3 text-slate-400" />
            <span>PAUSE</span>
          </button>
          <button className="py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-300 font-bold flex items-center justify-center space-x-1 hover:bg-slate-800">
            <FileText className="w-3 h-3 text-slate-400" />
            <span>RAW DATA</span>
          </button>
          <button className="py-1.5 bg-blue-600/30 border border-blue-500/50 rounded text-blue-300 font-bold flex items-center justify-center space-x-1 hover:bg-blue-600/50">
            <Terminal className="w-3 h-3" />
            <span>LOGS</span>
          </button>
        </div>
      </div>

      {/* Execution Trace Steps */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded p-4 space-y-3 font-mono text-[10px]">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="font-bold text-white uppercase">DETERMINISTIC EXECUTION TRACE</span>
          <span className="text-emerald-400 text-[9px]">ISO-17025 VERIFIED</span>
        </div>

        <div className="space-y-2 text-[10px]">
          {/* Step 1 */}
          <div className="bg-slate-950 p-2.5 rounded border border-slate-800 space-y-1">
            <div className="flex items-center justify-between font-bold text-white">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>01 DOCUMENT ANALYSIS</span>
              </div>
              <span className="text-emerald-400 font-mono text-[9px]">Complete - 1.2s</span>
            </div>
            <p className="text-slate-400 text-[9px] pl-5 font-sans">
              Parsed 14 pages of field maintenance logs. Key identified: Bearing casing seal check.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-950 p-2.5 rounded border border-slate-800 space-y-1">
            <div className="flex items-center justify-between font-bold text-white">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>02 OCR PROCESSING</span>
              </div>
              <span className="text-emerald-400 font-mono text-[9px]">Complete - 0.8s</span>
            </div>
            <p className="text-slate-400 text-[9px] pl-5 font-sans">
              Extracted vibration spectrum matrix with 99.4% confidence rating via local TrOCR engine.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-950 p-2.5 rounded border border-slate-800 space-y-1">
            <div className="flex items-center justify-between font-bold text-white">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>03 IMAGE ANALYSIS</span>
              </div>
              <span className="text-emerald-400 font-mono text-[9px]">Complete - 2.1s</span>
            </div>
            <p className="text-slate-400 text-[9px] pl-5 font-sans">
              Thermal vision model identified bearing outboard housing hotspot (+18.4°C over baseline delta).
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-slate-950 p-2.5 rounded border border-slate-800 space-y-1">
            <div className="flex items-center justify-between font-bold text-white">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>04 KNOWLEDGE RETRIEVAL</span>
              </div>
              <span className="text-emerald-400 font-mono text-[9px]">Complete - 0.4s</span>
            </div>
            <p className="text-slate-400 text-[9px] pl-5 font-sans">
              Fetched SOP Sec 4.2 from local Milvus store. Vector Euclidean Distance: 0.114 (Exact Match).
            </p>
          </div>

          {/* Step 5 (Executing) */}
          <div className="bg-slate-950 p-2.5 rounded border border-blue-500/50 space-y-1">
            <div className="flex items-center justify-between font-bold text-blue-400">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping"></span>
                <span>05 SENSOR ANALYSIS</span>
              </div>
              <span className="text-blue-400 uppercase font-mono text-[9px]">EXECUTING...</span>
            </div>
            <p className="text-slate-300 text-[9px] pl-5 font-sans">
              Running Python sandbox algorithm on CSV telemetry. Evaluating peak wave velocities against standard envelopes.
            </p>
          </div>

          {/* Queued Steps */}
          <div className="bg-slate-950/60 p-2 rounded border border-slate-900 flex items-center justify-between text-slate-500">
            <span>○ 06 RISK ASSESSMENT</span>
            <span>QUEUED</span>
          </div>
          <div className="bg-slate-950/60 p-2 rounded border border-slate-900 flex items-center justify-between text-slate-500">
            <span>○ 07 RECOMMENDATION</span>
            <span>QUEUED</span>
          </div>
          <div className="bg-slate-950/60 p-2 rounded border border-slate-900 flex items-center justify-between text-slate-500">
            <span>○ 08 REPORT GENERATION</span>
            <span>QUEUED</span>
          </div>
        </div>

        {/* Resource Telemetry */}
        <div className="bg-slate-950 p-2.5 rounded border border-slate-800 flex items-center justify-between text-[9px]">
          <span className="text-slate-400">NODE-04 GPU VRAM RESERVED</span>
          <span className="text-emerald-400 font-bold">18.4 GB / 48.0 GB (38%)</span>
        </div>
        <div className="flex justify-between text-[9px] text-slate-500 pt-1 font-mono">
          <span>IPC: /ipc/p102_stream.sock</span>
          <span>Latency: 4.2ms</span>
        </div>
      </div>
    </div>
  );
};
