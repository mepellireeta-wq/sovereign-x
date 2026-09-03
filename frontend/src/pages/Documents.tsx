import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Bot, 
  AlertTriangle, 
  ExternalLink, 
  ChevronRight, 
  CheckCircle2,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Sparkles
} from 'lucide-react';

interface DocumentsProps {
  onNavigateToWorkbench?: (prompt: string) => void;
}

export const Documents: React.FC<DocumentsProps> = ({ onNavigateToWorkbench }) => {
  const [selectedPage, setSelectedPage] = useState(4);
  const [zoomLevel, setZoomLevel] = useState(100);

  const pages = [
    { num: 1, title: 'Cover & Meta' },
    { num: 2, title: 'Equipment Spec' },
    { num: 3, title: 'Vibration Logs' },
    { num: 4, title: 'Inspection Findings' },
    { num: 5, title: 'Thermography' },
    { num: 6, title: 'Sign-off' },
  ];

  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col overflow-hidden bg-[#0A0E17]">
      {/* Document Top Bar */}
      <div className="px-6 py-2.5 bg-[#0D131F] border-b border-[#1E293B] flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-3">
          <FileText className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-bold text-white font-mono">Pump_Inspection_Report.pdf</span>
          <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">PDF · 12 Pages · 720 KB</span>
        </div>

        <div className="flex items-center space-x-4 text-xs">
          <span className="text-[10px] font-mono font-bold text-slate-400 border border-[#1E293B] bg-[#0A0E17] px-2 py-0.5 rounded">
            SYNTHETIC DEMO DATA
          </span>
          <div className="flex items-center space-x-1 text-slate-400 bg-[#131B2A] border border-[#1E293B] rounded px-1.5 py-0.5">
            <button onClick={() => setZoomLevel(Math.max(75, zoomLevel - 15))} className="p-1 hover:text-white">
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[11px] px-1">{zoomLevel}%</span>
            <button onClick={() => setZoomLevel(Math.min(150, zoomLevel + 15))} className="p-1 hover:text-white">
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 3-Column Document Analysis Interface */}
      <div className="flex-1 flex overflow-hidden">
        {/* COLUMN 1: LEFT — Page Thumbnails (180px) */}
        <div className="w-44 bg-[#0A0E17] border-r border-[#1E293B] p-3 overflow-y-auto space-y-2 shrink-0 select-none">
          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-2 px-1">
            Page Thumbnails
          </div>
          {pages.map((p) => (
            <button
              key={p.num}
              onClick={() => setSelectedPage(p.num)}
              className={`w-full text-left p-2 rounded-lg border transition-all ${
                selectedPage === p.num
                  ? 'bg-[#152236] border-blue-500 shadow-sm'
                  : 'bg-[#0E1522] border-[#1E293B] hover:bg-[#121A2A]'
              }`}
            >
              <div className="aspect-[3/4] bg-[#080C14] rounded border border-[#1E293B] mb-1.5 p-1 flex flex-col justify-between overflow-hidden">
                <div className="space-y-1">
                  <div className="h-1 bg-slate-700 rounded w-3/4"></div>
                  <div className="h-0.5 bg-slate-800 rounded w-full"></div>
                  <div className="h-0.5 bg-slate-800 rounded w-5/6"></div>
                  {p.num === 4 && (
                    <div className="h-2 bg-amber-500/30 border border-amber-500/50 rounded w-full my-0.5"></div>
                  )}
                </div>
                <div className="text-[9px] font-mono text-right text-slate-500">P.{p.num}</div>
              </div>
              <div className="text-[11px] font-medium text-slate-300 truncate">Page {p.num}</div>
              <div className="text-[9px] text-slate-500 truncate">{p.title}</div>
            </button>
          ))}
        </div>

        {/* COLUMN 2: CENTER — Large Document Preview */}
        <div className="flex-1 bg-[#070A10] p-6 overflow-y-auto flex justify-center items-start">
          <div 
            className="w-full max-w-2xl bg-[#0F172A] border border-[#1E293B] rounded-lg p-8 shadow-2xl text-slate-300 font-sans text-xs space-y-6 leading-relaxed transition-all"
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
          >
            {/* Simulated Document Header */}
            <div className="border-b border-[#1E293B] pb-4 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">MRPL MECHANICAL MAINTENANCE DIVISION</div>
                <h2 className="text-base font-bold text-white mt-0.5">CRITICAL EQUIPMENT INSPECTION RECORD — P-102B</h2>
                <div className="text-[11px] text-slate-400 mt-0.5 font-mono">Location: Crude Distillation Unit 2 (CDU-2) · Unit Tag: 02-P-102B</div>
              </div>
              <div className="text-right font-mono text-[10px] text-slate-500">
                <div>DOC NO: MRPL-INSP-2026-088</div>
                <div>DATE: 12 AUG 2026</div>
                <div className="text-amber-400 font-bold">STATUS: ATTENTION REQ.</div>
              </div>
            </div>

            {/* Section 1: Findings Table */}
            <div className="space-y-2">
              <h3 className="font-bold text-slate-100 uppercase text-[11px] tracking-wider font-mono">1. VIBRATION VELOCITY READINGS (ISO 10816-3)</h3>
              <table className="w-full text-left font-mono text-[11px] border border-[#1E293B] rounded overflow-hidden">
                <thead className="bg-[#131E32] text-slate-300">
                  <tr>
                    <th className="p-2 border-b border-[#1E293B]">Measuring Point</th>
                    <th className="p-2 border-b border-[#1E293B]">Normal Limit</th>
                    <th className="p-2 border-b border-[#1E293B]">Recorded Value</th>
                    <th className="p-2 border-b border-[#1E293B]">Condition Zone</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E293B] text-slate-400">
                  <tr>
                    <td className="p-2">Drive End (DE) Horizontal</td>
                    <td className="p-2">&le; 2.8 mm/s</td>
                    <td className="p-2 font-bold text-slate-200">3.2 mm/s</td>
                    <td className="p-2 text-slate-300">Zone B (Acceptable)</td>
                  </tr>
                  <tr className="bg-amber-950/20">
                    <td className="p-2 font-bold text-amber-300">Non-Drive End (NDE) Vertical</td>
                    <td className="p-2">&le; 4.5 mm/s</td>
                    <td className="p-2 font-bold text-amber-400">6.80 mm/s [CRITICAL]</td>
                    <td className="p-2 font-bold text-amber-400">Zone D (Unacceptable)</td>
                  </tr>
                  <tr>
                    <td className="p-2">Casing Axial</td>
                    <td className="p-2">&le; 2.5 mm/s</td>
                    <td className="p-2">2.4 mm/s</td>
                    <td className="p-2 text-slate-300">Zone A (Good)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Section 2: Visual & Optical Observations */}
            <div className="space-y-2">
              <h3 className="font-bold text-slate-100 uppercase text-[11px] tracking-wider font-mono">2. OPTICAL & FIELD OBSERVATIONS</h3>
              <div className="bg-[#0A0E17] p-3 rounded border border-[#1E293B] space-y-1.5 font-mono text-[11px] text-slate-300">
                <p>• Visual inspection of NDE bearing housing reveals significant thermal discoloration (brown/amber halo) indicative of localized overheating &gt; 85°C.</p>
                <p>• Fine metallic debris observed at oil seal lip. Lube oil sample color darkened from light amber to dark brown, suggesting thermal oxidation and breakdown.</p>
                <p className="text-amber-400 font-bold">• Auditory feedback: High-pitch metal-on-metal chatter recorded at 1,480 RPM during shift handover.</p>
              </div>
            </div>

            {/* Section 3: Inspector Recommendation */}
            <div className="space-y-1 bg-[#131E32]/60 p-3 rounded border border-blue-900/60">
              <div className="font-bold text-blue-300 font-mono text-[11px]">3. INSPECTOR CONCLUSION</div>
              <p className="text-slate-300 text-[11px]">
                NDE bearing failure imminent if run continuously under current thermal regime. Recommend urgent changeover to standby pump 02-P-102A as per standard operating procedure MRPL-SOP-MECH-042.
              </p>
            </div>
          </div>
        </div>

        {/* COLUMN 3: RIGHT — AI Insights (320px) */}
        <div className="w-80 bg-[#0C111C] border-l border-[#1E293B] p-5 overflow-y-auto space-y-5 shrink-0">
          <div>
            <div className="flex items-center space-x-2 text-blue-400 mb-1">
              <Bot className="w-4 h-4" />
              <h2 className="text-xs font-bold uppercase tracking-wider font-mono">AI Insights</h2>
            </div>
            <p className="text-[11px] text-slate-400">Contextual intelligence extracted from document</p>
          </div>

          {/* Equipment */}
          <div className="bg-[#101726] p-3 rounded-lg border border-[#1E293B] space-y-1">
            <div className="text-[10px] font-mono uppercase text-slate-500">Equipment</div>
            <div className="text-sm font-bold text-white font-mono">Pump P-102</div>
            <div className="text-[10px] text-slate-400">Centrifugal Hydrocarbon Pump · CDU-2</div>
          </div>

          {/* Detected Issues */}
          <div className="bg-[#101726] p-3 rounded-lg border border-[#1E293B] space-y-2">
            <div className="text-[10px] font-mono uppercase text-slate-500">Detected Issues</div>
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2 text-xs text-amber-400 font-medium">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>High vibration (6.8 mm/s)</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-amber-400 font-medium">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>Bearing wear (NDE fatigue)</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-amber-400 font-medium">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>Oil leakage & thermal discoloration</span>
              </div>
            </div>
          </div>

          {/* Relevant Procedures */}
          <div className="bg-[#101726] p-3 rounded-lg border border-[#1E293B] space-y-1.5">
            <div className="text-[10px] font-mono uppercase text-slate-500">Relevant Procedures</div>
            <div className="text-xs font-bold text-slate-200 font-mono">Maintenance SOP — Page 24</div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Mandates controlled changeover when vibration velocity exceeds 4.5 mm/s.
            </p>
          </div>

          {/* Previous Inspection */}
          <div className="bg-[#101726] p-3 rounded-lg border border-[#1E293B] space-y-1.5">
            <div className="text-[10px] font-mono uppercase text-slate-500">Previous Inspection</div>
            <div className="text-xs font-bold text-slate-200 font-mono">Inspection Report — Page 4</div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Earlier check on 15 Jul 2026 showed baseline vibration of 3.2 mm/s (gradual degradation trend).
            </p>
          </div>

          {/* CTA Button */}
          <button 
            onClick={() => onNavigateToWorkbench && onNavigateToWorkbench('Analyze Pump_Inspection_Report.pdf and determine whether pump P-102 requires immediate maintenance.')}
            className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-sm transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask AI about this document</span>
          </button>
        </div>
      </div>
    </div>
  );
};
