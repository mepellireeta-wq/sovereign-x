import React, { useState } from 'react';
import { Send, Bot, FileText, CheckCircle2, ShieldCheck, Download, AlertTriangle, Cpu, Sparkles } from 'lucide-react';
import { runAgenticTask, decideApproval } from '../services/api';

export const AIWorkbench: React.FC = () => {
  const [prompt, setPrompt] = useState('Analyze the inspection report for pump P-102B, calculate sensor telemetry statistics, check maintenance SOP, and generate approval note.');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [approvalStatus, setApprovalStatus] = useState<string | null>(null);

  const handleExecute = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await runAgenticTask(prompt, ["Pump_Inspection_Report.pdf", "Pump_Sensor_Data.csv", "Pump_Image.jpg"]);
      setResult(res);
      setApprovalStatus(null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (decision: string) => {
    try {
      await decideApproval(1, decision, `Engineer authorized recommendation as ${decision}`);
      setApprovalStatus(decision);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Search & Prompt Panel */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-blue-400 font-bold text-sm">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <span>Sovereign Agentic Assistant Workspace</span>
          </div>
          <span className="text-xs bg-slate-950 px-2.5 py-1 rounded text-emerald-400 border border-emerald-900/60 font-mono">
            AIR-GAPPED 100% LOCAL
          </span>
        </div>

        <div className="flex space-x-3">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-sans"
            placeholder="Type industrial task instruction (e.g., Analyze pump inspection notes, calculate telemetry trend, cite SOP...)"
          />
          <button
            onClick={handleExecute}
            disabled={loading}
            className="px-6 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex flex-col items-center justify-center space-y-1 shadow-lg shadow-blue-600/30 transition-all"
          >
            <Send className="w-4 h-4" />
            <span>{loading ? 'Planning...' : 'Run Agent'}</span>
          </button>
        </div>
      </div>

      {/* Output Panel */}
      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Execution Flow */}
          <div className="lg:col-span-2 space-y-6">
            {/* Model Router Callout */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Intelligent Model Router Decision</span>
                <span className="text-xs px-2.5 py-0.5 rounded bg-blue-950 text-blue-300 font-mono border border-blue-800">
                  {result.model_routing.selected_model}
                </span>
              </div>
              <div className="text-xs text-slate-300 bg-slate-950 p-3 rounded border border-slate-800">
                <span className="font-bold text-white">Task Intent: </span>{result.model_routing.detected_intent}<br/>
                <span className="text-slate-400">{result.model_routing.reason}</span>
              </div>
            </div>

            {/* Agent Steps */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Multi-Step Execution Plan & Tool Output</h3>
              <div className="space-y-3">
                {result.executed_steps.map((st: any) => (
                  <div key={st.step_number} className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-white">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Step {st.step_number}: {st.step_name}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">{st.duration_ms}ms</span>
                    </div>
                    <p className="text-slate-400 text-[11px] font-mono whitespace-pre-wrap pl-6">{st.tool_output}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* HITL Review & Deliverables Panel */}
          <div className="space-y-6">
            {/* Recommendation & Approval Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">Human-in-the-Loop Approval</h3>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-rose-950 text-rose-300 border border-rose-800">
                  {result.recommendation.risk_level} RISK
                </span>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 text-xs space-y-2">
                <div className="font-bold text-white">{result.recommendation.title}</div>
                <p className="text-slate-300 leading-relaxed text-[11px]">{result.recommendation.action}</p>
                <div className="text-[10px] text-emerald-400 font-mono">
                  AI Confidence Score: {int(result.recommendation.confidence * 100)}%
                </div>
              </div>

              {approvalStatus ? (
                <div className="bg-emerald-950/60 border border-emerald-800 text-emerald-300 p-3 rounded-lg text-xs font-bold text-center">
                  Decision Authorized: {approvalStatus}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => handleApprove('APPROVED')}
                    className="py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow"
                  >
                    Approve & Issue
                  </button>
                  <button
                    onClick={() => handleApprove('REJECTED')}
                    className="py-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>

            {/* Generated Deliverables */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">Downloadable Deliverables</h3>
              <div className="space-y-2">
                {result.deliverables.map((del: any, idx: number) => (
                  <a
                    key={idx}
                    href={del.download_url}
                    download
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-blue-500 text-xs text-white"
                  >
                    <div className="font-bold">{del.file_name}</div>
                    <Download className="w-4 h-4 text-blue-400" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function int(val: number) {
  return Math.round(val);
}
