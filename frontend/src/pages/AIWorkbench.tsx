import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Paperclip, 
  Database, 
  Code, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  FileText, 
  Eye, 
  Cpu,
  Layers,
  ArrowRight
} from 'lucide-react';
import { runAgenticTask } from '../services/api';

export const AIWorkbench: React.FC = () => {
  const [prompt, setPrompt] = useState('Analyze the inspection report and determine whether maintenance is required.');
  const [loading, setLoading] = useState(false);
  const [activeModel, setActiveModel] = useState('Sovereign Reasoning Model (Q4_K_M - 8GB VRAM)');

  const handleRunAgent = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      await runAgenticTask(prompt, ["Pump_Inspection_Report.pdf", "Pump_Sensor_Data.csv", "Pump_Image.jpg"]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
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
        <span className="bg-slate-900 px-2 py-0.5 rounded text-slate-300 font-mono">NODE #04</span>
      </div>

      <div className="text-[11px] text-slate-400 font-mono">
        Private AI environment • Local hardware inference
      </div>

      {/* Active Model Switcher Box */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded p-3 flex items-center justify-between font-mono text-[10px]">
        <div className="flex items-center space-x-2">
          <Cpu className="w-4 h-4 text-blue-400" />
          <div>
            <span className="text-slate-400 uppercase">ACTIVE MODEL</span>
            <div className="font-bold text-white text-[11px]">{activeModel}</div>
          </div>
        </div>
        <button className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-700 rounded text-slate-300 font-bold text-[9px] uppercase">
          SWITCH
        </button>
      </div>

      {/* Agent Header Badge */}
      <div className="bg-slate-900/80 border border-slate-800/80 rounded p-2.5 flex items-center justify-between font-mono text-[10px]">
        <div className="flex items-center space-x-2 text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Industrial Analysis Agent • Autonomous Rig PID #4092</span>
        </div>
        <button className="text-blue-400 flex items-center space-x-1 hover:underline text-[9px]">
          <span>📁 3 Docs • 1 Img • 1 CSV</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Chat Thread */}
      <div className="space-y-4 font-sans">
        {/* User Prompt Message */}
        <div className="bg-slate-900/90 border border-slate-800 rounded p-3 space-y-1.5 font-mono text-[11px]">
          <div className="flex items-center justify-between text-slate-400 text-[9px]">
            <span className="font-bold text-blue-400">👤 CHIEF RELIABILITY ENGINEER</span>
            <span>10:41:22 AM - TTY_LOCAL_0</span>
          </div>
          <div className="text-white font-sans text-xs">{prompt}</div>
        </div>

        {/* Agent Response Box */}
        <div className="bg-slate-900/90 border border-slate-800/80 rounded p-4 space-y-3 font-mono text-[11px]">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold">
              <Bot className="w-4 h-4 text-emerald-400" />
              <span>SOVEREIGN REASONER</span>
            </div>
            <div className="flex items-center space-x-2 text-[9px]">
              <span className="bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800 font-mono">
                18.4 tokens/sec
              </span>
              <span className="bg-slate-950 text-slate-300 px-2 py-0.5 rounded border border-slate-800 font-mono">
                Local GPU
              </span>
            </div>
          </div>

          <p className="text-slate-300 text-xs font-sans">
            I reviewed the inspection report, equipment image, sensor data, and relevant maintenance procedure.
          </p>

          {/* Identified Diagnostic Indicators Box */}
          <div className="bg-slate-950 p-3 rounded border border-slate-800/80 space-y-2 text-[10px]">
            <div className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">
              IDENTIFIED DIAGNOSTIC INDICATORS
            </div>
            <div className="space-y-1.5 text-slate-200">
              <div className="flex items-start space-x-2 text-amber-300">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Abnormal vibration:</strong> RMS velocity exceeded 4.5 mm/s on Bearing #2 (Acceptable threshold: 2.8 mm/s).
                </span>
              </div>
              <div className="flex items-start space-x-2 text-amber-300">
                <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Bearing wear:</strong> Acoustic emission spikes detected in high-frequency spectrum (40–100 kHz).
                </span>
              </div>
              <div className="flex items-start space-x-2 text-amber-300">
                <Layers className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Increased temperature:</strong> Stator housing delta +14°C above steady-state baseline.
                </span>
              </div>
            </div>
          </div>

          {/* Action Verdict Banner */}
          <div className="bg-emerald-950/40 border border-emerald-800/60 p-3 rounded text-xs space-y-1">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold uppercase tracking-wider text-[10px]">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>ACTION VERDICT</span>
            </div>
            <p className="text-emerald-200 font-bold">
              I recommend sending the equipment for maintenance inspection immediately.
            </p>
          </div>

          {/* Thermal & Acoustic Sensor Overlay Image Box */}
          <div className="bg-slate-950 border border-slate-800 rounded p-3 space-y-2">
            <div className="text-[9px] font-bold text-slate-400 uppercase">THERMAL & ACOUSTIC SENSOR OVERLAY</div>
            <div className="relative rounded overflow-hidden h-36 bg-slate-900 border border-slate-800 flex items-center justify-center">
              <div className="text-center space-y-1">
                <div className="w-16 h-16 rounded-full border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400 bg-emerald-950/40 animate-pulse">
                  <Eye className="w-8 h-8" />
                </div>
                <div className="text-[10px] text-emerald-400 font-mono font-bold bg-slate-950 px-2 py-0.5 rounded border border-emerald-800 inline-block">
                  BEARING_NODE_2 [FAIL_RISK_HIGH] SENSOR_ID #9914
                </div>
              </div>
            </div>
          </div>

          {/* Evidence Citations Section */}
          <div className="space-y-2 pt-2 border-t border-slate-800 text-[10px]">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-300 uppercase">EVIDENCE CITATIONS (LOCAL VERIFIED)</span>
              <span className="text-emerald-400 font-mono text-[9px] flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Zero Egress Verified</span>
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="bg-slate-950 p-2 rounded border border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center space-x-2 truncate">
                  <FileText className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span className="truncate text-slate-200">Maintenance_SOP.pdf — Page 24 (Sec 4.2 Bearing Limits)</span>
                </div>
                <button className="px-2 py-0.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-[9px] rounded font-bold uppercase shrink-0 border border-slate-700">
                  VIEW EXCERPT
                </button>
              </div>

              <div className="bg-slate-950 p-2 rounded border border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center space-x-2 truncate">
                  <FileText className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span className="truncate text-slate-200">Inspection_Report.pdf — Page 4 (Vibration Spectrum Plot)</span>
                </div>
                <button className="px-2 py-0.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-[9px] rounded font-bold uppercase shrink-0 border border-slate-700">
                  VIEW EXCERPT
                </button>
              </div>

              <div className="bg-slate-950 p-2 rounded border border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center space-x-2 truncate">
                  <FileText className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span className="truncate text-slate-200">Pump_Manual.pdf — Page 87 (Lubrication Tolerances)</span>
                </div>
                <button className="px-2 py-0.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-[9px] rounded font-bold uppercase shrink-0 border border-slate-700">
                  VIEW EXCERPT
                </button>
              </div>
            </div>
          </div>

          {/* Checksums & Hardware Stats */}
          <div className="bg-slate-950 p-2 rounded border border-slate-800 text-[9px] text-slate-400 flex items-center justify-between font-mono">
            <span>DETERMINISM & CHECKSUMS: SHA256: e3b0c4429bf...</span>
            <div className="space-x-3 text-slate-300">
              <span>TEMP 0.0 (Strict)</span>
              <span>LATENCY 314 ms</span>
              <span className="text-emerald-400 font-bold">HARDWARE RTX-A6000 #0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Input Action Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded p-3 space-y-2 font-mono text-[10px]">
        {/* Quick Toolbar */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-slate-300 text-[9px]">
          <button className="px-2 py-1 bg-slate-950 border border-slate-800 rounded flex items-center space-x-1 hover:bg-slate-800">
            <Paperclip className="w-3 h-3 text-slate-400" />
            <span>+ ATTACH</span>
          </button>
          <button className="px-2 py-1 bg-slate-950 border border-slate-800 rounded flex items-center space-x-1 hover:bg-slate-800 text-blue-400">
            <Database className="w-3 h-3" />
            <span>📚 KB: MAINTENANCE</span>
          </button>
          <button className="px-2 py-1 bg-slate-950 border border-slate-800 rounded flex items-center space-x-1 hover:bg-slate-800 text-indigo-400">
            <Code className="w-3 h-3" />
            <span>&lt;&gt; OCR / PYTHON</span>
          </button>
          <button className="px-2 py-1 bg-slate-950 border border-slate-800 rounded flex items-center space-x-1 hover:bg-slate-800 text-emerald-400 font-bold">
            <Zap className="w-3 h-3" />
            <span>⚡ 8B REAS...</span>
          </button>
        </div>

        {/* Input Text Box & Execute Button */}
        <div className="flex space-x-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-sans"
            placeholder="Ask about documents, equipment, procedures..."
          />
          <button
            onClick={handleRunAgent}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded flex items-center space-x-1 shadow-lg shadow-blue-600/30 transition-all font-mono"
          >
            <span>{loading ? 'RUNNING...' : 'RUN AGENT'}</span>
            <Zap className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
