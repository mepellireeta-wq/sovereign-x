import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Clock, 
  Wrench, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  XCircle, 
  Activity, 
  UserCheck,
  Search
} from 'lucide-react';
import { decideApproval } from '../services/api';

export const ApprovalsPage: React.FC = () => {
  const [decision, setDecision] = useState<string | null>(null);
  const [comments, setComments] = useState('');

  const handleDecision = async (status: string) => {
    try {
      await decideApproval(1, status, comments || `Engineer action: ${status}`);
      setDecision(status);
    } catch (e) {
      console.error(e);
    }
  };

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
        <div className="flex items-center space-x-3 font-mono">
          <span className="text-emerald-400 font-bold">ACTIVE ● VERIFIED</span>
          <span className="bg-slate-900 px-2 py-0.5 rounded text-slate-300 font-mono">NODE #04</span>
        </div>
      </div>

      {/* Decision Gate Banner */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded p-4 space-y-3 font-mono text-[10px]">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-slate-400 uppercase font-bold">STAGE 04 // DECISION GATE</span>
          <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-bold text-[9px] flex items-center space-x-1">
            <AlertTriangle className="w-3 h-3 text-rose-400" />
            <span>HIGH PRIORITY (CRITICAL ASSET)</span>
          </span>
        </div>

        <div>
          <h2 className="text-xl font-black text-white tracking-tight">Maintenance Recommendation</h2>
          <p className="text-slate-400 text-[11px] font-sans">Pump P-102 (Crude Distillation Unit)</p>
        </div>

        <div className="bg-slate-950 p-2.5 rounded border border-slate-800 text-amber-300 font-bold flex items-center space-x-2 text-[10px]">
          <Clock className="w-4 h-4 text-amber-400" />
          <span>STATUS: AWAITING AUTHORIZED HUMAN SIGN-OFF</span>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-950 p-3 rounded border border-slate-800 space-y-1">
            <span className="text-slate-500 text-[9px] uppercase block">BEARING VIBRATION</span>
            <div className="text-lg font-black text-rose-400">4.82 mm/s</div>
            <div className="text-[9px] text-slate-400">API 610 Max: 3.50 mm/s</div>
          </div>

          <div className="bg-slate-950 p-3 rounded border border-slate-800 space-y-1">
            <span className="text-slate-500 text-[9px] uppercase block">ESTIMATED TTF</span>
            <div className="text-lg font-black text-amber-400">72.0 HRS</div>
            <div className="text-[9px] text-amber-400 font-bold uppercase">CRITICAL FAILURE WINDOW</div>
          </div>
        </div>
      </div>

      {/* Primary Directive Box */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded p-4 space-y-2 font-mono text-[10px]">
        <div className="flex items-center space-x-2 text-blue-400 font-bold text-xs uppercase">
          <Wrench className="w-4 h-4 text-blue-400" />
          <span>PRIMARY DIRECTIVE</span>
        </div>

        <h3 className="text-sm font-bold text-white font-sans">
          Recommended Action: Schedule Immediate Maintenance Inspection
        </h3>

        <div className="bg-slate-950 p-3 rounded border border-slate-800/80 space-y-1 font-sans text-xs">
          <span className="font-bold text-slate-400 text-[10px] uppercase font-mono block">REASONING &amp; DIAGNOSIS</span>
          <p className="text-slate-200 leading-relaxed text-[11px]">
            Abnormal vibration (<strong className="text-rose-400">4.82 mm/s RMS</strong>) and bearing acoustic wear were identified across the inspection evidence, exceeding <strong className="text-white">API 610 safe operating envelope</strong>. Continued unmonitored operation risks catastrophic seal failure within <strong className="text-amber-400">72 operating hours</strong>.
          </p>
        </div>
      </div>

      {/* Audit Provenance // Consensus */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded p-4 space-y-3 font-mono text-[10px]">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[9px]">
          <span className="font-bold text-slate-300 uppercase">AUDIT PROVENANCE // CONSENSUS</span>
          <span className="text-emerald-400 font-bold">100% AIRGAP VERIFIED</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
            <span className="text-slate-500 text-[9px] block">CONFIDENCE</span>
            <span className="text-base font-black text-emerald-400">87%</span>
            <span className="text-[8px] text-slate-500 block">Optimal Delta</span>
          </div>

          <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
            <span className="text-slate-500 text-[9px] block">CONSENSUS</span>
            <span className="text-base font-black text-white">3 / 3</span>
            <span className="text-[8px] text-slate-500 block">Local Nodes</span>
          </div>

          <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
            <span className="text-slate-500 text-[9px] block">HALLUCINATION</span>
            <span className="text-base font-black text-emerald-400">0.0%</span>
            <span className="text-[8px] text-slate-500 block">Zero Extraneous</span>
          </div>
        </div>

        {/* Model Consensus List */}
        <div className="space-y-1 text-[10px] font-mono">
          <div className="bg-slate-950 p-2 rounded border border-slate-800 flex items-center justify-between">
            <span className="flex items-center space-x-1.5 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>DeepSeek-R1 (Local Reasoner)</span>
            </span>
            <span className="text-emerald-400 font-bold">AGREED (91%)</span>
          </div>

          <div className="bg-slate-950 p-2 rounded border border-slate-800 flex items-center justify-between">
            <span className="flex items-center space-x-1.5 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Qwen-2.5-VL (Thermal/Acoustic Spectrogram)</span>
            </span>
            <span className="text-emerald-400 font-bold">AGREED (84%)</span>
          </div>

          <div className="bg-slate-950 p-2 rounded border border-slate-800 flex items-center justify-between">
            <span className="flex items-center space-x-1.5 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Chronos-Bolt (Vibration Trend Agent)</span>
            </span>
            <span className="text-emerald-400 font-bold">AGREED (86%)</span>
          </div>
        </div>
      </div>

      {/* Supporting Evidence Matrix */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded p-4 space-y-3 font-mono text-[10px]">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="font-bold text-white uppercase">SUPPORTING EVIDENCE MATRIX</span>
          <span className="text-slate-400 text-[9px]">3 CHUNKS MOUNTED</span>
        </div>

        <div className="space-y-2 font-sans text-xs">
          {/* Item 1 */}
          <div className="bg-slate-950 p-3 rounded border border-slate-800 space-y-1">
            <div className="flex items-center justify-between font-mono text-[10px]">
              <div className="flex items-center space-x-2 font-bold text-white">
                <span className="text-slate-500">01</span>
                <span>Maintenance SOP — Page 24</span>
              </div>
              <span className="text-emerald-400 text-[9px] font-bold">SHA-256 MATCH</span>
            </div>
            <div className="text-[10px] font-mono text-slate-400">Procedure #SOP-MNT-204: Bearing Tolerances</div>
            <p className="text-slate-300 text-[10px] leading-relaxed">
              Clause 4.12: Radial velocity exceeding 4.5 mm/s RMS on heavy pump bearing housings requires immediate schedule intervention.
            </p>
          </div>

          {/* Item 2 */}
          <div className="bg-slate-950 p-3 rounded border border-slate-800 space-y-1">
            <div className="flex items-center justify-between font-mono text-[10px]">
              <div className="flex items-center space-x-2 font-bold text-white">
                <span className="text-slate-500">02</span>
                <span>Inspection Report — Page 4</span>
              </div>
              <span className="text-emerald-400 text-[9px] font-bold">SHA-256 MATCH</span>
            </div>
            <div className="text-[10px] font-mono text-slate-400">Ultrasonic Scan &amp; Thermal Imaging Report</div>
            <p className="text-slate-300 text-[10px] leading-relaxed">
              Hotspot localized on NDE bearing housing (68.4°C vs baseline 48.0°C). High frequency demodulation peaks confirmed metal spalling.
            </p>
          </div>

          {/* Item 3 */}
          <div className="bg-slate-950 p-3 rounded border border-slate-800 space-y-1">
            <div className="flex items-center justify-between font-mono text-[10px]">
              <div className="flex items-center space-x-2 font-bold text-white">
                <span className="text-slate-500">03</span>
                <span>Sensor Data — 12 Aug 2026</span>
              </div>
              <span className="text-emerald-400 text-[9px] font-bold">SHA-256 MATCH</span>
            </div>
            <div className="text-[10px] font-mono text-slate-400">Continuous 10-day Vibration Trend CSV</div>
            <p className="text-slate-300 text-[10px] leading-relaxed">
              Telemetry ingestion stream: 14,400 samples at 100Hz. Exponential acceleration curve fit observed starting 09 Aug 2026.
            </p>
          </div>
        </div>
      </div>

      {/* Human Sign-Off & Dispatch Section */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded p-4 space-y-3 font-mono text-[10px]">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center space-x-1.5 text-emerald-400 font-bold">
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span>HUMAN SIGN-OFF &amp; DISPATCH</span>
          </div>
          <span className="text-slate-400 text-[9px]">KEY #ENCLAVE-66</span>
        </div>

        <div className="bg-slate-950 p-3 rounded border border-slate-800 text-[10px] space-y-1">
          <div className="text-slate-400 font-bold uppercase text-[9px]">AUTHORIZATION SIGNER</div>
          <div className="font-bold text-white text-xs font-sans">R. Sharma (Senior Plant Engineer)</div>
          <div className="text-[9px] text-emerald-400 font-mono">PSU Certificate: #INC-ENG-9042-CRUDE</div>
        </div>

        {/* Engineer Notes Input */}
        <div className="space-y-1">
          <label className="text-slate-400 text-[9px] uppercase font-bold block">
            ENGINEER NOTES / WORK ORDER DISPATCH COMMENTS
          </label>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows={2}
            className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-sans"
            placeholder="Enter dispatch directives, work permit clearance number, or diagnostic holds..."
          />
        </div>

        {/* Decision Action Buttons */}
        {decision ? (
          <div className="bg-emerald-950/80 border border-emerald-700 text-emerald-300 p-3 rounded text-center text-xs font-bold font-sans">
            ✔ Decision Authorized: {decision}
          </div>
        ) : (
          <div className="space-y-2 pt-1 font-sans">
            <button
              onClick={() => handleDecision('APPROVED')}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-1.5 font-mono uppercase"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>APPROVE MAINTENANCE WORK ORDER</span>
            </button>

            <button
              onClick={() => handleDecision('MORE_TESTS_REQUESTED')}
              className="w-full py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold rounded text-xs flex items-center justify-center space-x-1.5 font-mono text-[10px]"
            >
              <Search className="w-3.5 h-3.5 text-blue-400" />
              <span>REQUEST ADDITIONAL DIAGNOSTIC TESTS</span>
            </button>

            <button
              onClick={() => handleDecision('REJECTED')}
              className="w-full py-1.5 bg-slate-950 hover:bg-rose-950/50 border border-rose-900/60 text-rose-400 font-bold rounded text-[10px] flex items-center justify-center space-x-1 font-mono uppercase"
            >
              <XCircle className="w-3.5 h-3.5 text-rose-400" />
              <span>REJECT RECOMMENDATION</span>
            </button>
          </div>
        )}

        {/* Disclaimer Footer */}
        <p className="text-[8px] text-slate-500 text-center pt-2 border-t border-slate-900 font-sans leading-tight">
          🔒 AI-generated recommendation. Final decision remains strictly with authorized certified plant personnel under PSU / SIH Safety Guidelines. SYNTHETIC DEMO DATA | ISO-55000 / API-610 AUDIT LOG #4902
        </p>
      </div>
    </div>
  );
};
