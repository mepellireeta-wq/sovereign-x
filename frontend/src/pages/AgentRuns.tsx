import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Circle, 
  Cpu, 
  Activity, 
  ArrowRight,
  TrendingUp,
  FileCheck,
  AlertTriangle,
  Play
} from 'lucide-react';

export const AgentRuns: React.FC = () => {
  const [activeStep, setActiveStep] = useState(5);

  const steps = [
    { num: '01', title: 'Document Analysis', status: 'complete', summary: 'Parsed Pump_Inspection_Report.pdf and extracted text telemetry.' },
    { num: '02', title: 'OCR Processing', status: 'complete', summary: 'Local Tesseract OCR parsed handwritten inspector remarks on bearing collar.' },
    { num: '03', title: 'Image Analysis', status: 'complete', summary: 'Local Vision Model identified thermal discoloration & lubricant breakdown.' },
    { num: '04', title: 'Knowledge Retrieval', status: 'complete', summary: 'Retrieved MRPL-SOP-MECH-042 (Page 24) vibration threshold 4.5 mm/s.' },
    { num: '05', title: 'Sensor Analysis', status: 'running', summary: 'Executing sandboxed Python analysis on Pump_Sensor_Data.csv (128 readings).' },
    { num: '06', title: 'Risk Assessment', status: 'waiting', summary: 'Synthesize risk level based on telemetry anomalies and ISO 10816 standards.' },
    { num: '07', title: 'Recommendation', status: 'waiting', summary: 'Formulate maintenance changeover plan to standby pump P-102A.' },
    { num: '08', title: 'Report Generation', status: 'waiting', summary: 'Generate official DOCX Approval Note and XLSX Telemetry Sheet.' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="bg-[#0E1624] border border-[#1E293B] rounded-xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400">Agent Execution Monitor</div>
          <h1 className="text-xl font-bold text-white tracking-tight mt-0.5">Inspection-to-Approval</h1>
          <p className="text-xs text-slate-400 mt-1">Autonomous multi-step pipeline executing on isolated local runtime</p>
        </div>

        <div className="flex items-center space-x-6">
          <div className="text-left">
            <div className="text-[10px] font-mono uppercase text-slate-500">Equipment Target</div>
            <div className="text-sm font-bold text-slate-200 font-mono">Pump P-102 (CDU-2)</div>
          </div>

          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-blue-950/60 border border-blue-800 text-blue-300 text-xs font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            <span>● Running (Step 5 of 8)</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Vertical Timeline (Left) & Current Operation (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Vertical Execution Timeline (7 Cols) */}
        <div className="lg:col-span-7 bg-[#0E1624] border border-[#1E293B] rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
            <h2 className="text-sm font-bold text-white tracking-tight">Execution Timeline</h2>
            <span className="text-xs font-mono text-slate-400">Deterministic Step Engine</span>
          </div>

          <div className="space-y-4 relative">
            {/* Connecting line */}
            <div className="absolute left-[17px] top-3 bottom-3 w-0.5 bg-[#1E293B]"></div>

            {steps.map((st) => {
              const isComplete = st.status === 'complete';
              const isRunning = st.status === 'running';
              const isWaiting = st.status === 'waiting';

              return (
                <div key={st.num} className="relative flex items-start space-x-4 group">
                  {/* Status Indicator Bubble */}
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 z-10 font-mono text-xs font-bold ${
                    isComplete
                      ? 'bg-emerald-950 border border-emerald-600 text-emerald-400'
                      : isRunning
                      ? 'bg-blue-950 border-2 border-blue-400 text-blue-300 shadow-md shadow-blue-500/20 animate-pulse'
                      : 'bg-[#101726] border border-[#1E293B] text-slate-600'
                  }`}>
                    {isComplete ? '✓' : st.num}
                  </div>

                  {/* Step Card */}
                  <div className={`flex-1 p-3.5 rounded-lg border transition-all ${
                    isRunning 
                      ? 'bg-[#121E32] border-blue-500/60 shadow-sm' 
                      : isComplete 
                      ? 'bg-[#0A0E17] border-[#1E293B]' 
                      : 'bg-[#0A0E17]/60 border-[#1E293B]/50'
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`text-xs font-bold font-sans ${
                        isRunning ? 'text-white' : isComplete ? 'text-slate-200' : 'text-slate-500'
                      }`}>
                        {st.title}
                      </h3>
                      <span className={`text-[10px] font-mono uppercase font-semibold px-2 py-0.5 rounded ${
                        isComplete
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-900/60'
                          : isRunning
                          ? 'bg-blue-950/60 text-blue-300 border border-blue-800'
                          : 'text-slate-600'
                      }`}>
                        {isComplete ? '✓ Complete' : isRunning ? '● Running' : '○ Waiting'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                      {st.summary}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Current Operation & Telemetry Findings (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Current Operation Panel */}
          <div className="bg-[#0E1624] border border-[#1E293B] rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                Current Operation
              </div>
              <span className="text-[10px] text-blue-400 font-mono bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800">
                SANDBOX ISOLATED
              </span>
            </div>

            <div>
              <div className="text-lg font-bold text-white tracking-tight">Analyzing sensor trends</div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Reading time-series CSV data via AST-validated local Python sandbox to compute mean vibration, peak velocity, and anomalous temperature excursions.
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-[#0A0E17] p-3 rounded-lg border border-[#1E293B]">
                <div className="text-[10px] font-mono uppercase text-slate-500">Processed</div>
                <div className="text-xl font-bold font-mono text-white mt-1">128</div>
                <div className="text-[10px] text-slate-500 font-mono">telemetry readings</div>
              </div>

              <div className="bg-[#0A0E17] p-3 rounded-lg border border-[#1E293B]">
                <div className="text-[10px] font-mono uppercase text-amber-500">Anomalies</div>
                <div className="text-xl font-bold font-mono text-amber-400 mt-1">2</div>
                <div className="text-[10px] text-slate-500 font-mono">&gt; 4.5 mm/s ISO limit</div>
              </div>
            </div>

            {/* Concise Sandbox Action Summary */}
            <div className="bg-[#0A0E17] p-3 rounded-lg border border-[#1E293B] space-y-2">
              <div className="text-[10px] font-mono text-slate-400 font-bold uppercase">Sandbox Execution Summary</div>
              <div className="text-xs font-mono text-slate-300 space-y-1 bg-[#06080F] p-2.5 rounded border border-[#162032]">
                <div>• Vibration Mean: 4.83 mm/s</div>
                <div>• Vibration Peak: 6.80 mm/s (13:00 UTC)</div>
                <div>• Temperature Mean: 84.2°C (Warning &gt; 80°C)</div>
                <div className="text-amber-400">• ISO 10816 Zone C/D violation confirmed</div>
              </div>
            </div>
          </div>

          {/* Governing SOP Constraint */}
          <div className="bg-[#0E1624] border border-[#1E293B] rounded-xl p-5 shadow-sm space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Governing Constraint</div>
            <div className="text-xs font-bold text-slate-200">MRPL-SOP-MECH-042 (Page 24)</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              "Any centrifugal pump exhibiting vibration velocity &gt; 4.5 mm/s sustained for &gt; 60 minutes must undergo immediate controlled changeover to the standby unit."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
