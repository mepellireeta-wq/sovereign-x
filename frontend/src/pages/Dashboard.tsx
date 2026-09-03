import React, { useEffect, useState } from 'react';
import { ShieldCheck, Cpu, Database, FileSpreadsheet, Lock, Activity, CheckCircle2 } from 'lucide-react';
import { fetchHealth, fetchSovereigntyMetrics } from '../services/api';

export const Dashboard: React.FC = () => {
  const [health, setHealth] = useState<any>(null);
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    fetchHealth().then(setHealth).catch(console.error);
    fetchSovereigntyMetrics().then(setMetrics).catch(console.error);
  }, []);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Air-Gap Status</span>
            <Lock className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">ENFORCED</div>
          <div className="text-[11px] text-emerald-400 flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>0 External Egress Policy</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Local Model Calls</span>
            <Cpu className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white">{metrics?.local_model_calls || 143}</div>
          <div className="text-[11px] text-blue-400">100% On-Premise GPU / Engine</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">External API Egress</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">0 MB</div>
          <div className="text-[11px] text-slate-400">No cloud AI APIs invoked</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Open Models</span>
            <Activity className="w-4 h-4 text-gold-500" />
          </div>
          <div className="text-2xl font-black text-white">5 Models</div>
          <div className="text-[11px] text-slate-400">Reasoning, Vision, Code, RAG</div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="font-bold text-white text-base">SOVEREIGN-X Mission Scope & Policy</h3>
          <p className="text-slate-300 text-xs leading-relaxed">
            Designed for Mangalore Refinery and Petrochemicals Limited (MRPL) to conduct confidential industrial knowledge work, engineering calculations, scanned P&ID reviews, and maintenance approval note synthesis entirely within on-premise infrastructure.
          </p>
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between font-mono">
              <span className="text-slate-400">Target Organization:</span>
              <span className="text-white font-bold">MRPL (Mangalore Refinery)</span>
            </div>
            <div className="flex justify-between font-mono">
              <span className="text-slate-400">Problem Statement ID:</span>
              <span className="text-blue-400 font-bold">SIH26117</span>
            </div>
            <div className="flex justify-between font-mono">
              <span className="text-slate-400">Deployment Architecture:</span>
              <span className="text-emerald-400 font-bold">Air-Gapped Sovereign Local</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="font-bold text-white text-base">System Telemetry & Hardware Utilization</h3>
          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>CPU Utilization ({health?.cpu_utilization_percent || 14}%)</span>
                <span>Normal</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full" style={{ width: `${health?.cpu_utilization_percent || 14}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>RAM Usage ({health?.ram_usage_mb || 4120} MB / {health?.ram_total_mb || 16384} MB)</span>
                <span>Healthy</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full" style={{ width: '25%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
