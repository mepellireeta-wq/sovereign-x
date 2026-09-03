import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  Activity, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  ExternalLink, 
  UserCheck, 
  Lock,
  ChevronRight,
  Cpu,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';

export const Approvals: React.FC = () => {
  const [signedState, setSignedState] = useState<'pending' | 'approved' | 'rejected' | 'changes_requested'>('pending');
  const [engineerNotes, setEngineerNotes] = useState('');
  const [selectedEvidence, setSelectedEvidence] = useState<any>(null);

  const evidenceList = [
    {
      id: '01',
      title: 'Maintenance SOP — Page 24',
      code: 'Procedure #SOP-MNT-204: Bearing Tolerances',
      excerpt: 'Clause 4.12: Radial velocity exceeding 4.5 mm/s RMS on heavy pump bearing housings requires immediate schedule intervention to prevent catastrophic cage failure and seal breach.',
      sha: 'e89f41b2c... MATCH',
      fullText: 'Section 4.12 Bearing Vibration Severity Standards:\nFor ISO Class II machinery (15 kW to 300 kW pumps mounted on rigid foundations), allowable continuous operation RMS velocity threshold is 2.80 mm/s. Measurements above 4.50 mm/s represent "Zone C/D - Unacceptable for continuous operation" requiring immediate inspection, lubricant replacement, and bearing alignment verification within 72 operating hours.'
    },
    {
      id: '02',
      title: 'Inspection Report — Page 4',
      code: 'Ultrasonic Scan & Thermal Imaging Report (Field Unit CDU-2)',
      excerpt: 'Hotspot localized on NDE bearing housing (68.4°C vs baseline 48.0°C). High frequency demodulation peaks confirmed inner/outer raceway metal spalling.',
      sha: '7c40d12a9... MATCH',
      fullText: 'FLIR Thermal Analysis Unit CDU-2 Pump P-102B:\nMeasured casing temperature: 68.4°C at drive-end and non-drive-end bearing seals (ambient 32°C). Baseline operating benchmark: 48.0°C (+20.4°C delta). Acoustic emission stethoscope detected intermittent metallic clicking indicative of early fatigue flaking on the 6312 deep-groove ball bearing raceway.'
    },
    {
      id: '03',
      title: 'Sensor Data — 12 Aug 2026',
      code: 'Continuous 10-day Vibration Telemetry CSV (Stream ID #P102-VIB)',
      excerpt: 'Telemetry ingestion stream: 14,400 samples at 100Hz. Exponential acceleration curve fit observed starting 09 Aug 2026 (Peak: 4.82 mm/s RMS).',
      sha: '3f92b4510... MATCH',
      fullText: 'SCADA Telemetry Digest (Node #04 Ingestion):\n10-day tri-axial vibration dataset. X-axis RMS: 4.82 mm/s (Peak), Y-axis RMS: 3.91 mm/s, Z-axis RMS: 2.14 mm/s. Fast Fourier Transform (FFT) reveals dominant spectral peak at 108.4 Hz matching Ball Pass Frequency Inner Race (BPFI) of OEM bearing assembly.'
    }
  ];

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto font-sans">
      {/* Top Banner / Decision Gate Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded bg-blue-900/60 text-blue-400 text-[10px] font-mono font-bold tracking-wider uppercase border border-blue-800/60">
              STAGE 04 // DECISION GATE
            </span>
            <span className="px-2 py-0.5 rounded bg-rose-950/70 text-rose-400 text-[10px] font-mono font-bold tracking-wider uppercase border border-rose-800/60 flex items-center space-x-1">
              <AlertTriangle className="w-3 h-3 inline" />
              <span>HIGH PRIORITY (CRITICAL ASSET)</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 text-[10px] font-mono font-bold tracking-wider uppercase border border-emerald-800/50">
              NODE #04
            </span>
          </div>
          <h1 className="text-2xl font-black text-white mt-2 tracking-tight">Maintenance Recommendation</h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Equipment: <span className="text-slate-200 font-bold">Pump P-102 (Crude Distillation Unit)</span> · Asset ID: #MRPL-CDU-P102
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-slate-950 px-4 py-3 rounded-lg border border-slate-800">
          <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-mono">Workflow Status</span>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
              {signedState === 'pending' && 'Awaiting Authorized Human Sign-Off'}
              {signedState === 'approved' && 'Work Order Dispatched & Signed'}
              {signedState === 'rejected' && 'Recommendation Rejected by Plant Engineer'}
              {signedState === 'changes_requested' && 'Additional Diagnostic Testing Requested'}
            </span>
          </div>
        </div>
      </div>

      {/* Critical Telemetry Gauge & TTF Window */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Metric 1 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono uppercase text-[11px] font-semibold">Bearing Radial Vibration (RMS)</span>
            <span className="text-rose-400 font-mono text-[10px] bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/50">
              +37.7% OVER THRESHOLD
            </span>
          </div>
          <div className="flex items-baseline space-x-3">
            <span className="text-3xl font-black text-white font-mono">4.82</span>
            <span className="text-xs text-slate-400 font-mono">mm/s velocity</span>
            <span className="text-xs text-slate-500 font-mono ml-auto">API 610 Max: 3.50 mm/s</span>
          </div>

          {/* Mini Sparkline Chart */}
          <div className="pt-2">
            <svg className="w-full h-12 stroke-rose-400 fill-none" viewBox="0 0 300 40">
              <path
                d="M 0 30 Q 30 28, 60 27 T 120 25 T 180 22 T 220 18 T 260 10 T 300 6"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <line x1="0" y1="20" x2="300" y2="20" stroke="#475569" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>01 Aug (Normal 1.8mm/s)</span>
              <span className="text-rose-400">12 Aug (4.82mm/s Peak Breach)</span>
            </div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono uppercase text-[11px] font-semibold">Estimated Time to Failure (TTF)</span>
            <span className="text-amber-400 font-mono text-[10px] bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/50">
              EXPONENTIAL DECAY
            </span>
          </div>
          <div className="flex items-baseline space-x-3">
            <span className="text-3xl font-black text-rose-400 font-mono">72.0</span>
            <span className="text-xs text-slate-400 font-mono">Operating Hours</span>
            <span className="text-xs text-slate-500 font-mono ml-auto">Failure Window: 15 Aug 2026</span>
          </div>

          <div className="pt-2 space-y-1">
            <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
              <div className="bg-gradient-to-r from-amber-500 to-rose-500 h-2 rounded-full w-3/4"></div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>Current Status: Degrading</span>
              <span className="text-rose-400 font-bold">Catastrophic Seizure Risk High</span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Directive & Diagnosis */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 shadow-lg">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 rounded-lg bg-blue-900/50 border border-blue-700/60 flex items-center justify-center text-blue-400 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase font-bold text-blue-400 tracking-wider">PRIMARY DIRECTIVE</span>
            <h2 className="text-lg font-black text-white tracking-tight">
              Recommended Action: Schedule Immediate Maintenance Inspection
            </h2>
          </div>
        </div>

        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2 text-xs text-slate-300 leading-relaxed font-sans">
          <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider block">REASONING & DIAGNOSIS</span>
          <p>
            Abnormal vibration (<span className="text-rose-400 font-bold font-mono">4.82 mm/s RMS</span>) and bearing acoustic wear were identified across multimodal inspection evidence, exceeding the <span className="text-blue-300 font-semibold">API 610 safe operating envelope</span>. Continued unmonitored operation risks catastrophic mechanical seal failure within <span className="text-amber-400 font-bold font-mono">72 operating hours</span>, potentially causing crude charge leakage in the atmospheric distillation unit.
          </p>
        </div>

        {/* Audit Provenance & Tri-Model Consensus */}
        <div className="pt-2 border-t border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase font-bold text-slate-400 tracking-wider">AUDIT PROVENANCE // LOCAL CONSENSUS</span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
              100% AIR-GAP VERIFIED · ZERO EGRESS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">CONFIDENCE</span>
                <span className="text-base font-black text-emerald-400 font-mono">87%</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Optimal Delta</span>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">CONSENSUS</span>
                <span className="text-base font-black text-blue-400 font-mono">3 / 3 Nodes</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Local Quorum</span>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">HALLUCINATION SCORE</span>
                <span className="text-base font-black text-emerald-400 font-mono">0.0%</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Strictly Grounded</span>
            </div>
          </div>

          {/* Model Consensus List */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs bg-slate-950/70 p-2.5 rounded border border-slate-800/80">
              <div className="flex items-center space-x-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-mono text-[11px]">DeepSeek-R1 (Local Sovereign Reasoner)</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded">AGREED (91% confidence)</span>
            </div>

            <div className="flex items-center justify-between text-xs bg-slate-950/70 p-2.5 rounded border border-slate-800/80">
              <div className="flex items-center space-x-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-mono text-[11px]">Qwen-2.5-VL (Thermal & Visual Spectrogram Agent)</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded">AGREED (84% confidence)</span>
            </div>

            <div className="flex items-center justify-between text-xs bg-slate-950/70 p-2.5 rounded border border-slate-800/80">
              <div className="flex items-center space-x-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-mono text-[11px]">Chronos-Bolt (Telemetry Python Sandbox Analyzer)</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded">AGREED (86% confidence)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Supporting Evidence Matrix */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <Layers className="w-4 h-4 text-blue-400" />
            <span>Supporting Evidence Matrix (3 Chunks Mounted)</span>
          </h3>
          <span className="text-[10px] font-mono text-slate-400">Cryptographic Integrity Checked</span>
        </div>

        <div className="space-y-3">
          {evidenceList.map((ev) => (
            <div key={ev.id} className="bg-slate-950 border border-slate-800 rounded-lg p-4 space-y-2 hover:border-slate-700 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 rounded bg-blue-900/60 text-blue-300 font-mono text-[10px] flex items-center justify-center font-bold">
                    {ev.id}
                  </span>
                  <span className="font-bold text-white text-xs">{ev.title}</span>
                  <span className="text-[10px] text-slate-400 font-mono hidden md:inline">({ev.code})</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
                  SHA-256 MATCH
                </span>
              </div>
              <p className="text-xs text-slate-300 pl-7 leading-relaxed font-sans">
                {ev.excerpt}
              </p>
              <div className="pl-7 pt-1">
                <button
                  onClick={() => setSelectedEvidence(ev)}
                  className="text-[11px] text-blue-400 hover:text-blue-300 font-mono flex items-center space-x-1"
                >
                  <span>[VERIFY SOURCE FILE & EXCERPT]</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Human Sign-Off & Dispatch Section */}
      <div className="bg-slate-900 border border-blue-900/40 rounded-xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <UserCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Human Sign-Off & Work Order Dispatch</h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
            KEY #ENCLAVE-66-SIGN
          </span>
        </div>

        {/* Authorized Signer Identity */}
        <div className="flex items-center justify-between bg-slate-950 p-3.5 rounded-lg border border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center font-bold text-blue-300">
              RS
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block">AUTHORIZATION SIGNER</span>
              <span className="text-xs font-bold text-white">R. Sharma (Senior Plant Engineer)</span>
              <span className="text-[10px] text-emerald-400 block font-mono">PSU Certificate: #IND-ENG-9042-CRUDE</span>
            </div>
          </div>
          <span className="text-[10px] font-mono bg-emerald-950/60 text-emerald-300 px-2 py-1 rounded border border-emerald-800/40">
            RBAC: LEVEL-4 CLEARANCE
          </span>
        </div>

        {/* Engineer Notes Textarea */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-mono uppercase text-slate-400 block">
            ENGINEER NOTES / WORK ORDER DISPATCH DIRECTIVES
          </label>
          <textarea
            value={engineerNotes}
            onChange={(e) => setEngineerNotes(e.target.value)}
            placeholder="Enter maintenance directives, work permit clearance number, replacement bearing part number (e.g., SKF 6312/C3), or diagnostic holds..."
            rows={3}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 font-mono"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => setSignedState('approved')}
            disabled={signedState === 'approved'}
            className="flex-1 flex items-center justify-center space-x-2 px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-emerald-700 font-bold text-white shadow-lg shadow-blue-600/20 text-xs transition-all"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{signedState === 'approved' ? 'WORK ORDER #WO-9921 APPROVED' : 'APPROVE MAINTENANCE WORK ORDER'}</span>
          </button>

          <button
            onClick={() => setSignedState('changes_requested')}
            className="flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold transition-all"
          >
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>REQUEST ADDITIONAL DIAGNOSTIC TESTS</span>
          </button>

          <button
            onClick={() => setSignedState('rejected')}
            className="flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-slate-950 hover:bg-rose-950/40 border border-rose-900/60 text-rose-400 text-xs font-semibold transition-all"
          >
            <XCircle className="w-4 h-4" />
            <span>REJECT RECOMMENDATION</span>
          </button>
        </div>

        {/* State Notification */}
        {signedState === 'approved' && (
          <div className="p-4 rounded-lg bg-emerald-950/60 border border-emerald-700/60 text-emerald-300 text-xs space-y-1">
            <div className="font-bold flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Work Order #WO-9921-P102 Dispatched to Plant SAP/ERP</span>
            </div>
            <p className="text-[11px] text-slate-300 font-mono">
              Signed by R. Sharma at {new Date().toLocaleTimeString()} IST. Generated deliverables (DOCX approval note & XLSX sensor workbook) sealed with SHA-256 airgap timestamp.
            </p>
          </div>
        )}

        {signedState === 'changes_requested' && (
          <div className="p-4 rounded-lg bg-amber-950/60 border border-amber-700/60 text-amber-300 text-xs space-y-1">
            <div className="font-bold flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Additional Tests Requested</span>
            </div>
            <p className="text-[11px] text-slate-300 font-mono">
              Autonomous agent instructed to run secondary acoustic demodulation and oil ferrography analysis.
            </p>
          </div>
        )}

        {signedState === 'rejected' && (
          <div className="p-4 rounded-lg bg-rose-950/60 border border-rose-700/60 text-rose-300 text-xs space-y-1">
            <div className="font-bold flex items-center space-x-2">
              <XCircle className="w-4 h-4 text-rose-400" />
              <span>Recommendation Overruled</span>
            </div>
            <p className="text-[11px] text-slate-300 font-mono">
              Overrule logged into Immutable Audit Trail with cryptographic timestamp. Equipment will continue on scheduled inspection cycle.
            </p>
          </div>
        )}

        {/* Enterprise Governance Disclaimer */}
        <div className="pt-3 border-t border-slate-800 text-center">
          <p className="text-[10px] text-slate-500 font-mono">
            AI-generated recommendation. Final decision remains strictly with authorized certified plant personnel under PSU / SIH Safety Guidelines. ISO-55000 / API-610 AUDIT LOG #4902 · SYNTHETIC DEMO DATA
          </p>
        </div>
      </div>

      {/* Modal for Verifying Evidence */}
      {selectedEvidence && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-2xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-sm">{selectedEvidence.title}</h3>
                <span className="text-[10px] text-blue-400 font-mono">{selectedEvidence.code}</span>
              </div>
              <button
                onClick={() => setSelectedEvidence(null)}
                className="text-slate-400 hover:text-white text-xs font-mono px-2 py-1 bg-slate-800 rounded"
              >
                ESC / CLOSE
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2">
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>ON-PREMISE VECTOR CHUNK EXCERPT</span>
                <span className="text-emerald-400">STATUS: ZERO EGRESS VERIFIED</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-mono whitespace-pre-wrap">
                {selectedEvidence.fullText}
              </p>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-800">
              <span>SHA-256 HASH: {selectedEvidence.sha}</span>
              <span>STORAGE: /data/knowledge/refinery_sops/</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
