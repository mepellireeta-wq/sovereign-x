import React from 'react';

export const Settings: React.FC = () => {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <h1 className="text-xl font-bold text-white">System Configuration</h1>
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 text-xs">
        <div className="flex justify-between border-b border-slate-800 pb-3">
          <span className="text-slate-400 font-bold">Organization</span>
          <span className="text-white font-mono">Mangalore Refinery and Petrochemicals Limited</span>
        </div>
        <div className="flex justify-between border-b border-slate-800 pb-3">
          <span className="text-slate-400 font-bold">Problem Statement</span>
          <span className="text-blue-400 font-mono">SIH26117 — Sovereign Multimodal Agentic AI Workbench</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400 font-bold">Network Guard Mode</span>
          <span className="text-emerald-400 font-bold">AIRGAP STRICT ZERO EGRESS</span>
        </div>
      </div>
    </div>
  );
};
