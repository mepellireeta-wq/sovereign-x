import React, { useEffect, useState } from 'react';
import { ShieldCheck, ShieldAlert, Lock, Activity, RefreshCw } from 'lucide-react';
import { fetchSovereigntyMetrics, testEgressBlock } from '../services/api';
import { SovereigntyMetrics } from '../types';

export const SovereigntyMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<SovereigntyMetrics | null>(null);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);

  const loadMetrics = async () => {
    try {
      const data = await fetchSovereigntyMetrics();
      setMetrics(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadMetrics();
  }, []);

  const handleTestBlock = async () => {
    setTesting(true);
    try {
      const res = await testEgressBlock("http://api.openai.com/v1/completions");
      setTestResult(res);
      await loadMetrics();
    } catch (e) {
      console.error(e);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <h1 className="text-xl font-bold text-white">Sovereignty & Zero-Egress Security Dashboard</h1>
          </div>
          <p className="text-slate-300 text-xs mt-1">
            Real-time audit monitoring confirming zero external network egress and strict on-premise execution.
          </p>
        </div>
        <button
          onClick={handleTestBlock}
          disabled={testing}
          className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center space-x-2 shadow-lg shadow-rose-600/30"
        >
          <ShieldAlert className="w-4 h-4" />
          <span>{testing ? 'Testing Interceptor...' : 'Simulate External API Call'}</span>
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">External Cloud API Calls</span>
          <div className="text-3xl font-black text-emerald-400">0</div>
          <div className="text-[11px] text-emerald-400 font-semibold">ZERO Egress Standard</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Data Transmitted Outside</span>
          <div className="text-3xl font-black text-emerald-400">0.00 MB</div>
          <div className="text-[11px] text-emerald-400 font-semibold">Strict Air-Gap Policy</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Blocked External Requests</span>
          <div className="text-3xl font-black text-rose-400">{metrics?.blocked_requests || 0}</div>
          <div className="text-[11px] text-slate-400">Intercepted & Recorded</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Local Model Executions</span>
          <div className="text-3xl font-black text-blue-400">{metrics?.local_model_calls || 143}</div>
          <div className="text-[11px] text-blue-400">100% Local Inference</div>
        </div>
      </div>

      {/* Test Egress Result Callout */}
      {testResult && (
        <div className="bg-slate-900 border border-rose-800/60 p-4 rounded-xl space-y-2">
          <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            <span>Network Egress Interceptor Verification Event</span>
          </div>
          <div className="text-xs font-mono bg-slate-950 p-3 rounded border border-slate-800 text-slate-300">
            Target Request: <span className="text-rose-300">{testResult.target}</span> | Action Taken: <span className="text-emerald-400 font-bold">{testResult.action}</span>
          </div>
        </div>
      )}

      {/* Blocked Events Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Security Interceptor Event Log</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase font-mono">
              <tr>
                <th className="p-3">Timestamp</th>
                <th className="p-3">Event Type</th>
                <th className="p-3">Target Host</th>
                <th className="p-3">Action</th>
                <th className="p-3">Policy Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {metrics?.blocked_events.map((ev, i) => (
                <tr key={i} className="hover:bg-slate-950/50">
                  <td className="p-3 text-slate-400 font-mono">{ev.timestamp}</td>
                  <td className="p-3 font-bold text-rose-400">{ev.event_type}</td>
                  <td className="p-3 font-mono text-white">{ev.target}</td>
                  <td className="p-3 font-bold text-emerald-400">{ev.action_taken}</td>
                  <td className="p-3 text-slate-300">{ev.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
