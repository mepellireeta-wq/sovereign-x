import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  ZoomIn, 
  ZoomOut, 
  ChevronLeft, 
  ChevronRight, 
  Bot, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink,
  Layers,
  Sparkles,
  Maximize2
} from 'lucide-react';

interface DocumentsProps {
  setActiveTab?: (tab: string) => void;
}

export const Documents: React.FC<DocumentsProps> = ({ setActiveTab }) => {
  const [selectedPage, setSelectedPage] = useState(4);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [showOcrOverlay, setShowOcrOverlay] = useState(true);

  const pages = [
    { num: 1, label: 'Title & Summary' },
    { num: 2, label: 'Pump Specs & Baseline' },
    { num: 3, label: 'Acoustic Scan Data' },
    { num: 4, label: 'Vibration Telemetry Plot' },
    { num: 5, label: 'Lubricant Analysis' },
    { num: 6, label: 'Sign-Off & Certs' }
  ];

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] overflow-hidden font-sans">
      {/* Column 1: Page Thumbnails Sidebar (Left) */}
      <div className="w-full lg:w-56 bg-slate-950 border-r border-slate-800 p-4 space-y-4 overflow-y-auto shrink-0 font-mono">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-xs font-bold text-white uppercase tracking-wider">Pages ({pages.length})</span>
          <span className="text-[10px] text-slate-500">PDF RENDER</span>
        </div>

        <div className="space-y-3">
          {pages.map((p) => (
            <div
              key={p.num}
              onClick={() => setSelectedPage(p.num)}
              className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                selectedPage === p.num
                  ? 'bg-blue-950/70 border-blue-500 text-white shadow-md'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="flex justify-between items-center text-[10px] mb-1.5">
                <span className="font-bold">PAGE {p.num}</span>
                {p.num === 4 && (
                  <span className="px-1 py-0.2 bg-rose-950 text-rose-400 text-[8px] rounded border border-rose-800 font-bold">
                    FLAGGED
                  </span>
                )}
              </div>
              <div className="h-16 bg-slate-950 rounded border border-slate-800/80 flex items-center justify-center text-[9px] text-slate-500 p-1 text-center">
                {p.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Column 2: Large Document Preview (Center) */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-900 overflow-hidden">
        {/* Document Viewer Toolbar */}
        <div className="p-3 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between shrink-0 font-mono text-xs">
          <div className="flex items-center space-x-2 truncate">
            <FileText className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="font-bold text-white truncate">Pump_Inspection_Report.pdf</span>
            <span className="text-[10px] text-slate-500 hidden sm:inline">(Page {selectedPage} of {pages.length})</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowOcrOverlay(!showOcrOverlay)}
              className={`px-2.5 py-1 rounded text-[10px] font-bold border transition-all ${
                showOcrOverlay
                  ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                  : 'bg-slate-900 text-slate-400 border-slate-700'
              }`}
            >
              {showOcrOverlay ? 'OCR LAYER: ON' : 'OCR LAYER: OFF'}
            </button>

            <div className="flex items-center space-x-1 bg-slate-900 px-2 py-1 rounded border border-slate-800 text-[11px]">
              <button onClick={() => setZoomLevel(prev => Math.max(75, prev - 10))} className="hover:text-white">
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="px-1 text-slate-300 font-bold">{zoomLevel}%</span>
              <button onClick={() => setZoomLevel(prev => Math.min(150, prev + 10))} className="hover:text-white">
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Document Preview Canvas */}
        <div className="flex-1 overflow-y-auto p-6 flex justify-center bg-slate-950/60">
          <div
            className="w-full max-w-3xl bg-slate-950 border border-slate-800 rounded-xl p-8 space-y-6 shadow-2xl transition-transform"
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
          >
            {/* Header within synthetic PDF Document */}
            <div className="border-b-2 border-slate-800 pb-4 flex justify-between items-start font-mono">
              <div>
                <span className="text-[10px] text-blue-400 uppercase font-bold tracking-wider">
                  MRPL REFINERY INDUSTRIAL INSPECTION RECORD
                </span>
                <h2 className="text-xl font-black text-white mt-1">EQUIPMENT TRIAGE REPORT: P-102B</h2>
                <p className="text-xs text-slate-400">ATMOSPHERIC CRUDE DISTILLATION UNIT · SECTOR 4</p>
              </div>
              <span className="text-right text-[10px] text-slate-500">
                DATE: 12 AUG 2026<br />INSPECTOR ID: #ENG-489
              </span>
            </div>

            {/* Document Content */}
            <div className="space-y-4 text-xs font-mono text-slate-300 leading-relaxed">
              <div className="p-3 rounded bg-slate-900/90 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">1. VISUAL & NDT INSPECTION SUMMARY</span>
                <p className="font-sans text-slate-300">
                  On-site ultrasonic measurement on outboard bearing cage indicates localized surface flaking. Non-drive-end housing temperature is observed at 68.4°C, well above steady-state target.
                </p>
              </div>

              {/* Highlighted Bounding Box (simulating OCR and visual inspection findings) */}
              <div className={`p-4 rounded-lg transition-all ${
                showOcrOverlay
                  ? 'bg-rose-950/40 border-2 border-rose-500/80 shadow-lg shadow-rose-950/50'
                  : 'bg-slate-900 border border-slate-800'
              }`}>
                <div className="flex justify-between items-center text-[10px] text-rose-400 font-bold mb-1.5">
                  <span>[OCR DETECTED DEFECT ANOMALY]</span>
                  <span>CONFIDENCE: 99.4%</span>
                </div>
                <div className="text-white font-bold text-sm">
                  PEAK RADIAL VELOCITY: 4.82 mm/s RMS (BREACH LIMIT: 3.50 mm/s)
                </div>
                <p className="text-[11px] text-slate-300 mt-1 font-sans">
                  "Continuous broadband high-frequency acoustic emissions detected between 40 kHz and 100 kHz. Probability of inner-race micro-spalling evaluated as Critical."
                </p>
              </div>

              <div className="p-3 rounded bg-slate-900/90 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">2. LUBRICATION & BEARING STATUS</span>
                <p className="font-sans text-slate-300">
                  ISO VG 46 synthetic oil shows moderate particulate discoloration. Kinematic viscosity reduction estimated at -12% due to elevated bearing frictional heating.
                </p>
              </div>
            </div>

            {/* Synthetic Footer */}
            <div className="pt-6 border-t border-slate-800 flex justify-between text-[10px] font-mono text-slate-500">
              <span>DOCUMENT AUTH HASH: 4b21c89af10091..</span>
              <span>CLASSIFICATION: CONFIDENTIAL REFINERY DATA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Column 3: AI Insights Panel (Right) */}
      <div className="w-full lg:w-80 bg-slate-950 border-t lg:border-t-0 lg:border-l border-slate-800 p-5 space-y-5 overflow-y-auto shrink-0 font-sans">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-mono font-bold uppercase text-white tracking-wider flex items-center space-x-2">
            <Bot className="w-4 h-4 text-blue-400" />
            <span>AI INSIGHTS</span>
          </span>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
            AIRGAP LOCAL
          </span>
        </div>

        {/* Equipment Profile */}
        <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 space-y-1 font-mono text-xs">
          <span className="text-[10px] text-slate-500 uppercase block">Equipment</span>
          <span className="font-bold text-white block text-sm">Pump P-102 (CDU)</span>
          <span className="text-[10px] text-blue-400">Class II Induction Centrifugal</span>
        </div>

        {/* Detected Issues */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider block">
            DETECTED ISSUES (OCR & VISION)
          </span>
          <div className="space-y-1.5 font-mono text-xs">
            <div className="p-2.5 rounded bg-rose-950/40 border border-rose-800/60 text-rose-300 flex items-start space-x-2">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-rose-400" />
              <div>
                <span className="font-bold block">High Vibration</span>
                <span className="text-[10px] text-slate-300 font-sans">4.82 mm/s RMS (exceeds API 610 threshold)</span>
              </div>
            </div>

            <div className="p-2.5 rounded bg-amber-950/40 border border-amber-800/60 text-amber-300 flex items-start space-x-2">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
              <div>
                <span className="font-bold block">Bearing Wear</span>
                <span className="text-[10px] text-slate-300 font-sans">BPFI harmonic peaks indicate spalling</span>
              </div>
            </div>

            <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-300 flex items-start space-x-2">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-400" />
              <div>
                <span className="font-bold block">Oil Discoloration</span>
                <span className="text-[10px] text-slate-400 font-sans">Thermal degradation of ISO VG 46 lubricant</span>
              </div>
            </div>
          </div>
        </div>

        {/* Relevant Procedures */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider block">
            RELEVANT PROCEDURES
          </span>
          <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-xs font-mono space-y-1">
            <span className="font-bold text-white block">Maintenance SOP — Page 24</span>
            <p className="text-[11px] text-slate-400 font-sans">
              Procedure #SOP-MNT-204 outlines bearing tolerances and mechanical seal teardown requirements.
            </p>
          </div>
        </div>

        {/* Previous Inspection */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider block">
            HISTORICAL BASELINE
          </span>
          <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-xs font-mono">
            <span className="font-bold text-white block">Inspection Report — Page 4</span>
            <span className="text-[10px] text-slate-400">Baseline reading: 1.82 mm/s (Normal Range)</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setActiveTab && setActiveTab('workbench')}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 font-bold text-white text-xs font-mono shadow-md shadow-blue-600/20 transition-all"
        >
          <Bot className="w-4 h-4" />
          <span>ASK AI ABOUT THIS DOCUMENT</span>
        </button>

        <div className="pt-2 text-center">
          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
            SYNTHETIC DEMO DATA · ISO 17025 VERIFIED
          </span>
        </div>
      </div>
    </div>
  );
};
