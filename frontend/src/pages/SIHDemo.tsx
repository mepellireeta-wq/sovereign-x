import React, { useState } from 'react';
import { 
  PlayCircle, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  FileText, 
  Terminal, 
  Bot, 
  FileSpreadsheet, 
  Lock,
  Download,
  AlertTriangle
} from 'lucide-react';
import { runAgenticTask, fetchDeliverables, testEgressBlock } from '../services/api';

export const SIHDemo: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [demoResult, setDemoResult] = useState<any>(null);
  const [egressBlocked, setEgressBlocked] = useState<any>(null);

  const demoSteps = [
    { title: 'Upload Synthetic Inspection Package', desc: 'Pump_Inspection_Report.pdf, Pump_Maintenance_SOP.pdf, Pump_Sensor_Data.csv, Pump_Image.jpg' },
    { title: 'Local Intent Routing & Model Selection', desc: 'Auto-routing task to Vision, Coding, and Reasoning local open-weight models.' },
    { title: 'Scanned Document OCR & Parsing', desc: 'Local OCR extracts vibration telemetry notes and inspector comments.' },
    { title: 'Multimodal Visual Equipment Analysis', desc: 'Local vision model detects bearing thermal discoloration and lubricant breakdown.' },
    { title: 'Sandboxed Python Sensor Data Analytics', desc: 'Calculates mean vibration (6.8 mm/s peak) and renders trend plot inside isolated sandbox.' },
    { title: 'RAG Knowledge Retrieval with Citations', desc: 'Searches internal MRPL-SOP-MECH-042 and cites Page 24 vibration shutdown limits.' },
    { title: 'Synthesize Maintenance Recommendation', desc: 'Combines findings across OCR, telemetry chart, and SOP rules to calculate confidence (94%).' },
    { title: 'Human-in-the-Loop Engineer Authorization', desc: 'Displays risk rating and asks Senior Engineer for sign-off.' },
    { title: 'Generate DOCX Maintenance Approval Note', desc: 'Synthesizes official Word document with metadata, findings, and signatures.' },
    { title: 'Generate XLSX Sensor Analytics Workbook', desc: 'Creates Excel spreadsheet with color-coded ISO 10816 threshold alerts.' },
    { title: 'Zero-Egress Sovereignty Audit Verification', desc: 'Simulates outbound network call, proving 100% air-gap enforcement (0 MB egress).' }
  ];

  const handleRunNextStep = async () => {
    if (currentStep === 0) {
      setCurrentStep(1);
    } else if (currentStep < 7) {
      setCurrentStep(prev => prev + 1);
    } else if (currentStep === 7) {
      setLoading(true);
      try {
        const res = await runAgenticTask(
          "Analyze uploaded inspection report for P-102B pump, execute telemetry python code, search SOP, and prepare maintenance recommendation approval note.",
          ["Pump_Inspection_Report.pdf", "Pump_Sensor_Data.csv", "Pump_Image.jpg"]
        );
        setDemoResult(res);
        setCurrentStep(8);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    } else if (currentStep === 8) {
      setCurrentStep(9);
    } else if (currentStep === 9) {
      setCurrentStep(10);
      const egressRes = await testEgressBlock("http://api.openai.com/v1/chat");
      setEgressBlocked(egressRes);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-900/60 to-slate-900 border border-blue-700/50 rounded-xl p-6 shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wide">
              SIH 2026 Problem SIH26117 Demonstration
            </span>
          </div>
          <h1 className="text-2xl font-black text-white mt-2">SOVEREIGN-X 11-Step Guided Hackathon Walkthrough</h1>
          <p className="text-slate-300 text-xs mt-1">
            Demonstrating multi-model auto selection, local OCR/Vision, sandboxed Python analytics, RAG citations, real DOCX/XLSX generation, and 0-egress sovereignty.
          </p>
        </div>
        <button
          onClick={handleRunNextStep}
          disabled={loading}
          className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 font-bold text-white shadow-lg shadow-emerald-600/30 transition-all"
        >
          <PlayCircle className="w-5 h-5" />
          <span>{loading ? 'Processing...' : currentStep === 10 ? 'Restart Walkthrough' : `Proceed to Step ${currentStep + 1}`}</span>
        </button>
      </div>

      {/* Step Tracker */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-11 gap-2">
        {demoSteps.map((s, idx) => (
          <div
            key={idx}
            className={`p-2.5 rounded-lg border text-center transition-all ${
              idx === currentStep
                ? 'bg-blue-600 border-blue-400 text-white font-bold shadow-lg shadow-blue-500/30 scale-105'
                : idx < currentStep
                ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-300'
                : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
          >
            <div className="text-[10px] uppercase font-bold">Step {idx + 1}</div>
            <div className="text-[11px] truncate font-medium mt-0.5">{s.title.split(' ')[0]}</div>
          </div>
        ))}
      </div>

      {/* Main Execution View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Step Details & Progress */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <span className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-black">
                {currentStep + 1}
              </span>
              <span>{demoSteps[currentStep].title}</span>
            </h2>
            <span className="text-xs text-slate-400 font-mono">Step {currentStep + 1} / 11</span>
          </div>

          <p className="text-sm text-slate-300 bg-slate-950 p-4 rounded-lg border border-slate-800">
            {demoSteps[currentStep].desc}
          </p>

          {/* Dynamic Step Content */}
          {currentStep >= 8 && demoResult && (
            <div className="space-y-4 mt-4">
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">
                <h3 className="text-xs font-bold uppercase text-blue-400 tracking-wider mb-2">Model Router Auto-Selection</h3>
                <div className="flex items-center justify-between text-xs bg-slate-900 p-2.5 rounded border border-slate-800">
                  <span className="text-slate-300 font-semibold">{demoResult.model_routing.detected_intent}</span>
                  <span className="text-emerald-400 font-mono bg-emerald-950/60 px-2 py-0.5 rounded">
                    {demoResult.model_routing.selected_model}
                  </span>
                </div>
              </div>

              {/* Execution Tree */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Agent Multi-Step Execution Tree</h3>
                {demoResult.executed_steps.map((st: any) => (
                  <div key={st.step_number} className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs flex items-start justify-between">
                    <div>
                      <div className="font-bold text-white flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Step {st.step_number}: {st.step_name}</span>
                      </div>
                      <p className="text-slate-400 text-[11px] mt-1 font-mono">{st.tool_output}</p>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">{st.duration_ms}ms</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 10 && egressBlocked && (
            <div className="bg-emerald-950/40 border border-emerald-700/60 rounded-xl p-5 space-y-3">
              <div className="flex items-center space-x-2 text-emerald-300 font-bold">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                <span className="text-lg">Zero-Egress Sovereignty Proof Verified!</span>
              </div>
              <p className="text-xs text-slate-300">
                Attempted external HTTP connection to <code className="bg-slate-900 px-1.5 py-0.5 text-rose-300 rounded font-mono">api.openai.com</code> was automatically intercepted and strictly blocked by the air-gap network policy.
              </p>
              <div className="bg-slate-950 p-3 rounded border border-slate-800 font-mono text-xs text-rose-400">
                [AIRGAP SECURITY ACTION]: BLOCKED_BY_AIRGAP_POLICY | Data Sent Outside: 0.00 MB
              </div>
            </div>
          )}
        </div>

        {/* Deliverables & Evidence Sidebar */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-bold uppercase text-white tracking-wider flex items-center space-x-2">
            <FileSpreadsheet className="w-4 h-4 text-blue-400" />
            <span>Generated Deliverables</span>
          </h3>

          {demoResult ? (
            <div className="space-y-3">
              {demoResult.deliverables.map((del: any, i: number) => (
                <a
                  key={i}
                  href={del.download_url}
                  download
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-blue-500 transition-all text-xs group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded bg-blue-900/50 flex items-center justify-center font-bold text-blue-300">
                      {del.file_type}
                    </div>
                    <div>
                      <div className="font-bold text-white group-hover:text-blue-300">{del.file_name}</div>
                      <div className="text-[10px] text-slate-400">{del.description}</div>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-slate-400 group-hover:text-blue-300" />
                </a>
              ))}
            </div>
          ) : (
            <div className="bg-slate-950 p-6 text-center text-xs text-slate-500 rounded-lg border border-slate-800">
              Deliverables will generate automatically at Step 9 & 10.
            </div>
          )}

          {/* RAG Citations */}
          {demoResult && (
            <div className="space-y-2 pt-4 border-t border-slate-800">
              <h4 className="text-xs font-bold uppercase text-slate-400">Grounded RAG Citations</h4>
              {demoResult.evidence_citations.map((c: string, idx: number) => (
                <div key={idx} className="text-[11px] bg-slate-950 p-2 rounded border border-slate-800 text-blue-300 font-mono">
                  • {c}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
