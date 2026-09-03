import React, { useState } from 'react';
import { 
  Cpu, 
  Activity, 
  Play, 
  Pause, 
  FileText, 
  Terminal, 
  CheckCircle2, 
  Clock, 
  Layers, 
  AlertTriangle,
  Server,
  Zap,
  ChevronRight,
  Database
} from 'lucide-react';

export const AgentRuns: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [activeTab, setActiveTab] = useState<'chart' | 'raw' | 'logs'>('chart');

  const traceSteps = [
    {
      num: '01',
      name: 'DOCUMENT ANALYSIS',
      status: 'Complete · 1.2s',
      desc: 'Parsed 14 pages of field maintenance logs. Key identified: Bearing casing seal check.',
      state: 'done'
    },
    {
      num: '02',
      name: 'OCR PROCESSING',
      status: 'Complete · 0.8s',
      desc: 'Extracted vibration spectrum matrix with 99.4% confidence rating via local TrOCR engine.',
      state: 'done'
    },
    {
      num: '03',
      name: 'IMAGE ANALYSIS',
      status: 'Complete · 2.1s',
      desc: 'Thermal vision model identified bearing outboard housing hotspot (+18.4°C over baseline delta).',
      state: 'done'
    },
    {
      num: '04',
      name: 'KNOWLEDGE RETRIEVAL',
      status: 'Complete · 0.4s',
      desc: 'Fetched SOP Sec 4.2 from local Milvus store. Vector Euclidean Distance: 0.114 (Exact Match).',
      state: 'done'
    },
    {
      num: '05',
      name: 'SENSOR ANALYSIS',
      status: 'EXECUTING...',
      desc: 'Running Python sandbox algorithm on CSV telemetry. Evaluating peak wave velocities against standard envelopes.',
      state: 'active'
    },
    {
      num: '06',
      name: 'RISK ASSESSMENT',
      status: 'QUEUED',
      desc: 'Pending input from Step 05. Will evaluate severity classification against API 610 tolerance matrix.',
      state: 'queued'
    },
    {
      num: '07',
      name: 'RECOMMENDATION',
      status: 'QUEUED',
      desc: 'Synthesizing formal human-in-the-loop sign-off recommendation with component part numbers.',
      state: 'queued'
    },
    {
      num: '08',
      name: 'REPORT GENERATION',
      status: 'QUEUED',
      desc: 'Compilation of signed cryptographically sealed work order export (DOCX/PDF).',
      state: 'queued'
    }
  ];

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto font-sans">
      {/* Run Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-emerald-400 font-bold">AIRGAP ENFORCED</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Zero Egress</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">NODE #04</span>
          </div>
          <h1 className="text-2xl font-black text-white mt-1 tracking-tight">Inspection-to-Approval</h1>
          <p className="text-xs text-slate-400 font-mono">Automated Root-Cause & Maintenance Triage Agent</p>
        </div>

        <div className="flex items-center space-x-4 text-xs font-mono">
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-500 block uppercase">Target Asset</span>
            <span className="text-white font-bold">Pump P-102 (CDU)</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-500 block uppercase">Elapsed Time</span>
            <span className="text-emerald-400 font-bold">01:45</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-500 block uppercase">Local Host</span>
            <span className="text-blue-400 font-bold">Node-04 · 2x A6000</span>
          </div>
        </div>
      </div>

      {/* Active Sandboxed Subroutine Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-mono uppercase font-bold text-white tracking-wider">
              ACTIVE SANDBOXED SUBROUTINE
            </span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
            PY311_AIRGAP_BOX
          </span>
        </div>

        {/* Subroutine Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-mono text-slate-500 uppercase block">EXECUTING OPERATION</span>
            <h2 className="text-base font-bold text-white font-mono">Step 05: Sensor Analysis</h2>
          </div>
          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="text-slate-400">RMS VIBRATION CHECK</span>
            <span className="text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/50">
              Threshold: 4.5 mm/s
            </span>
          </div>
        </div>

        {/* Live SVG Waveform Canvas */}
        {activeTab === 'chart' && (
          <div className="bg-slate-950 p-5 rounded-lg border border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-400">Tri-Axial RMS Telemetry (Pump_Sensor_Data.csv)</span>
              <span className="text-rose-400 font-bold flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                <span>2 Anomalies Detected</span>
              </span>
            </div>

            {/* SVG Telemetry Chart */}
            <div className="h-44 relative flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 500 120">
                {/* Grid Lines */}
                <line x1="0" y1="20" x2="500" y2="20" stroke="#1e293b" strokeDasharray="3 3" />
                <line x1="0" y1="60" x2="500" y2="60" stroke="#1e293b" strokeDasharray="3 3" />
                <line x1="0" y1="100" x2="500" y2="100" stroke="#1e293b" strokeDasharray="3 3" />

                {/* Threshold Line (4.5 mm/s) */}
                <line x1="0" y1="40" x2="500" y2="40" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4 4" />
                <text x="5" y="35" fill="#f43f5e" fontSize="8" fontFamily="monospace">API 610 LIMIT (4.50 mm/s)</text>

                {/* Vibration Wave */}
                <path
                  d="M 0 90 Q 25 80, 50 88 T 100 85 T 150 82 T 200 25 T 230 75 T 280 80 T 350 20 T 380 78 T 450 82 T 500 80"
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* Anomaly Points */}
                <circle cx="200" cy="25" r="5" fill="#f43f5e" className="animate-pulse" />
                <text x="180" y="15" fill="#f43f5e" fontSize="9" fontFamily="monospace" fontWeight="bold">6.12 mm/s</text>

                <circle cx="350" cy="20" r="5" fill="#f43f5e" className="animate-pulse" />
                <text x="330" y="10" fill="#f43f5e" fontSize="9" fontFamily="monospace" fontWeight="bold">6.82 mm/s</text>
              </svg>
            </div>

            {/* Metrics Triplet */}
            <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-800 text-center font-mono">
              <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block">Ingested</span>
                <span className="text-sm font-bold text-white">129 pts</span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block">Max Velocity</span>
                <span className="text-sm font-bold text-rose-400">6.82 mm/s</span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block">Confidence</span>
                <span className="text-sm font-bold text-emerald-400">99.8%</span>
              </div>
            </div>

            {/* Explanatory Callout */}
            <div className="text-xs text-slate-300 font-sans p-3 bg-slate-900 rounded border border-slate-800 flex items-start space-x-2">
              <span className="text-blue-400 font-bold font-mono">[SANDBOX]:</span>
              <p>
                Isolating high-frequency harmonics at 14:22:01 UTC. Correlating with bearing defect frequency (BPFI = 108.4 Hz). Zero outbound traffic initiated.
              </p>
            </div>
          </div>
        )}

        {/* Raw Data Tab */}
        {activeTab === 'raw' && (
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 h-52 overflow-y-auto space-y-1">
            <div className="text-slate-500">TIMESTAMP, AXIS_X_RMS, AXIS_Y_RMS, AXIS_Z_RMS, TEMP_C, FREQ_HZ</div>
            <div>2026-08-12T10:00:00Z, 2.14, 1.82, 1.10, 48.2, 59.8</div>
            <div>2026-08-12T10:15:00Z, 2.85, 2.11, 1.25, 51.4, 60.1</div>
            <div>2026-08-12T10:30:00Z, 4.82, 3.91, 2.14, 64.8, 108.4 [BREACH]</div>
            <div>2026-08-12T10:45:00Z, 6.82, 5.12, 2.80, 68.4, 108.4 [CRITICAL]</div>
          </div>
        )}

        {/* Logs Tab */}
        {activeTab === 'logs' && (
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 font-mono text-xs text-emerald-400 h-52 overflow-y-auto space-y-1">
            <div>[00:00:01] Spawned isolated microvm worker sandbox PID 4092.</div>
            <div>[00:00:03] Bound /dev/shm shared memory ring buffer. Memory cap: 512MB.</div>
            <div>[00:00:15] Ingested 14,400 rows from /data/scada/Pump_Sensor_Data.csv.</div>
            <div>[00:00:32] scipy.signal.welch PSD execution complete. Harmonics peak at 108.4 Hz.</div>
            <div>[00:01:10] Egress firewall policy drop check: 0 packets leaked.</div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-slate-950 border border-slate-700 text-xs font-mono text-slate-200 hover:bg-slate-800 transition-all"
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5 text-amber-400" />}
              <span>{isPaused ? 'RESUME' : 'PAUSE'}</span>
            </button>

            <button
              onClick={() => setActiveTab('raw')}
              className={`px-3 py-1.5 rounded border text-xs font-mono transition-all ${
                activeTab === 'raw' ? 'bg-blue-600 border-blue-400 text-white' : 'bg-slate-950 border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              RAW DATA
            </button>

            <button
              onClick={() => setActiveTab('logs')}
              className={`px-3 py-1.5 rounded border text-xs font-mono transition-all ${
                activeTab === 'logs' ? 'bg-blue-600 border-blue-400 text-white' : 'bg-slate-950 border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              LOGS
            </button>
          </div>

          <span className="text-[10px] font-mono text-slate-500">ISO-17025 VERIFIED ENGINE</span>
        </div>
      </div>

      {/* Deterministic Execution Trace (Vertical Timeline) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-xs font-mono uppercase font-bold text-white tracking-wider">
            DETERMINISTIC EXECUTION TRACE
          </h3>
          <span className="text-[10px] font-mono text-emerald-400">ALL ACTIONS REPLAYABLE</span>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {traceSteps.map((s) => (
            <div
              key={s.num}
              className={`p-3 rounded-lg border transition-all ${
                s.state === 'done'
                  ? 'bg-slate-950 border-slate-800/80'
                  : s.state === 'active'
                  ? 'bg-blue-950/40 border-blue-800/70 shadow-md'
                  : 'bg-slate-950/40 border-slate-800/40 opacity-70'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {s.state === 'done' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  {s.state === 'active' && (
                    <span className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></span>
                  )}
                  {s.state === 'queued' && <span className="w-4 h-4 rounded-full border border-slate-700"></span>}
                  <span className="font-bold text-white">{s.num} {s.name}</span>
                </div>
                <span className={`text-[10px] font-bold ${
                  s.state === 'done' ? 'text-emerald-400' : s.state === 'active' ? 'text-blue-400' : 'text-slate-500'
                }`}>
                  {s.status}
                </span>
              </div>
              <p className="text-slate-400 text-[11px] font-sans pl-6 pt-1 leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Hardware Gauge */}
        <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <span>NODE-04 GPU VRAM RESERVED:</span>
            <span className="text-emerald-400 font-bold">18.4 GB / 48.0 GB (38%)</span>
          </div>
          <div>IPC: <span className="text-blue-400">/ipc/p102_stream.sock</span> · LATENCY: <span className="text-white">4.2ms</span></div>
        </div>
      </div>
    </div>
  );
};
