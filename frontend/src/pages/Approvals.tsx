import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  AlertTriangle, 
  FileText, 
  ShieldCheck, 
  Clock, 
  UserCheck,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';

export const Approvals: React.FC = () => {
  const [decision, setDecision] = useState<string | null>(null);
  const [comment, setComment] = useState('');

  const evidence = [
    { doc: 'Maintenance SOP', ref: 'Page 24', detail: 'Mandates controlled changeover when vibration velocity exceeds 4.5 mm/s limit.' },
    { doc: 'Inspection Report', ref: 'Page 4', detail: 'Inspector recorded physical metal-on-metal chattering and oil seal weeping.' },
    { doc: 'Sensor Data', ref: '12 Aug 2026', detail: '128 telemetry points calculated; peak velocity sustained at 6.80 mm/s.' },
  ];

  const handleDecision = (type: string) => {
    setDecision(type);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400">Human-In-The-Loop Governance</div>
          <h1 className="text-xl font-bold text-white tracking-tight mt-0.5">Maintenance Recommendation</h1>
          <p className="text-xs text-slate-400 mt-1">Authorized engineering authorization required prior to document issuance</p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 rounded bg-rose-950/80 border border-rose-800 text-rose-300 font-mono text-xs font-bold">
            HIGH PRIORITY
          </span>
        </div>
      </div>

      {/* Main Review Card */}
      <div className="bg-[#0E1624] border border-[#1E293B] rounded-xl p-6 shadow-sm space-y-6">
        {/* Top Details Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b border-[#1E293B]">
          <div className="bg-[#0A0E17] p-3 rounded-lg border border-[#1E293B]">
            <div className="text-[10px] font-mono uppercase text-slate-500">Target Equipment</div>
            <div className="text-sm font-bold text-white font-mono mt-0.5">Pump P-102</div>
            <div className="text-[10px] text-slate-400">Crude Distillation Unit 2 (CDU-2)</div>
          </div>

          <div className="bg-[#0A0E17] p-3 rounded-lg border border-[#1E293B]">
            <div className="text-[10px] font-mono uppercase text-slate-500">Risk Assessment</div>
            <div className="text-sm font-bold text-rose-400 font-mono mt-0.5">HIGH (Zone D)</div>
            <div className="text-[10px] text-slate-400">ISO 10816-3 Threshold Exceeded</div>
          </div>

          <div className="bg-[#0A0E17] p-3 rounded-lg border border-[#1E293B]">
            <div className="text-[10px] font-mono uppercase text-slate-500">AI Confidence</div>
            <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">87%</div>
            <div className="text-[10px] text-slate-400">Deterministic Multi-Source Agreement</div>
          </div>
        </div>

        {/* Core Recommendation & Reason */}
        <div className="space-y-2">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
            Synthesized Recommendation
          </div>
          <div className="bg-[#121E32] border border-blue-900/80 rounded-lg p-4 text-xs space-y-2">
            <div className="text-sm font-bold text-white">Schedule maintenance inspection.</div>
            <p className="text-slate-300 leading-relaxed">
              Abnormal vibration and bearing wear were identified across the available inspection evidence. Sustained velocity of 6.8 mm/s on NDE bearing violates safe running threshold (4.5 mm/s). Immediate controlled changeover to standby pump P-102A is advised.
            </p>
          </div>
        </div>

        {/* Supporting Evidence (3 Sources) */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
              Supporting Evidence
            </h2>
            <span className="text-[10px] text-slate-500 font-mono">3 sources verified</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {evidence.map((ev, idx) => (
              <div key={idx} className="bg-[#0A0E17] border border-[#1E293B] rounded-lg p-3.5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200 text-xs font-mono truncate">{ev.doc}</span>
                  <span className="text-[10px] text-blue-400 font-mono bg-blue-950/60 px-1.5 py-0.2 rounded border border-blue-900/60">
                    {ev.ref}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                  {ev.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Decision State or Prominent Action Buttons */}
        {decision ? (
          <div className={`p-4 rounded-lg border text-center space-y-1 text-xs font-semibold ${
            decision === 'APPROVE'
              ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
              : decision === 'CHANGES'
              ? 'bg-amber-950/60 border-amber-800 text-amber-300'
              : 'bg-rose-950/60 border-rose-800 text-rose-300'
          }`}>
            <div className="text-sm font-bold font-mono">Decision Recorded: {decision}</div>
            <p className="text-[11px] text-slate-300">Authorized by Engineer K. Sharma at 10:44 AM UTC. Deliverables unlocked for signing.</p>
          </div>
        ) : (
          <div className="pt-3 border-t border-[#1E293B] space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => handleDecision('APPROVE')}
                className="py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-900/30 transition-all flex items-center justify-center space-x-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Approve</span>
              </button>

              <button
                onClick={() => handleDecision('CHANGES')}
                className="py-2.5 px-4 rounded-lg bg-[#162234] hover:bg-[#1E2E44] border border-blue-800 text-blue-300 font-bold text-xs transition-all flex items-center justify-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Request Changes</span>
              </button>

              <button
                onClick={() => handleDecision('REJECT')}
                className="py-2.5 px-4 rounded-lg bg-[#221319] hover:bg-[#2D1A22] border border-rose-900/80 text-rose-300 font-bold text-xs transition-all flex items-center justify-center space-x-2"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject</span>
              </button>
            </div>
          </div>
        )}

        {/* Enterprise Governance Disclaimer */}
        <div className="flex items-center space-x-2 pt-2 text-[11px] text-slate-500 font-sans border-t border-[#1E293B]">
          <Info className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span>AI-generated recommendation. Final decision remains with authorized personnel.</span>
        </div>
      </div>
    </div>
  );
};
