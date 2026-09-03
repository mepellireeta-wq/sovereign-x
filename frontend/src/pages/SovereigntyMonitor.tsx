import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  AlertTriangle, 
  Activity, 
  Server, 
  Zap, 
  ArrowRight,
  WifiOff,
  CheckCircle2,
  XCircle,
  Radio
} from 'lucide-react';

export const SovereigntyMonitor: React.FC = () => {
  const [testUrl, setTestUrl] = useState('http://api.openai.com/v1/chat');
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const metrics = [
    { label: 'External API Calls', value: '0', note: 'Strictly 0 allowed', color: 'emerald' },
    { label: 'Outbound Connections', value: '0', note: 'TCP / UDP / DNS', color: 'emerald' },
    { label: 'Data Sent Outside', value: '0 MB', note: 'Zero egress policy', color: 'emerald' },
    { label: 'Local Model Calls', value: '2,841', note: '100% on-premise', color: 'slate' },
    { label: 'Blocked Requests', value: '2', note: 'Egress attempts killed', color: 'amber' },
  ];

  const networkActivity = [
    { time: '10:42:01', event: 'Local model request', target: 'http://localhost:11434/api/generate', status: 'Allowed', isBlocked: false },
    { time: '10:42:04', event: 'Vector database query', target: 'http://localhost:8000/api/rag/query', status: 'Allowed', isBlocked: false },
    { time: '10:42:07', event: 'External request attempt', target: 'http://api.openai.com/v1/chat', status: 'Blocked', isBlocked: true },
    { time: '10:42:08', event: 'Security policy enforced', target: 'Airgap socket interceptor terminated outbound SYN packet', status: 'Enforced', isBlocked: true },
  ];

  const policies = [
    { name: 'External AI APIs', status: 'Blocked', desc: 'OpenAI, Anthropic, Gemini, HuggingFace external endpoints', active: true },
    { name: 'External Data Transfer', status: 'Blocked', desc: 'Outbound TCP sockets, telemetry, and file uploads', active: true },
    { name: 'Local Models', status: 'Allowed', desc: 'Local localhost / on-premise private GPU clusters only', active: true },
    { name: 'Internal Knowledge Access', status: 'Controlled', desc: 'RBAC enforced document retrieval and encrypted vector embeddings', active: true },
  ];

  const handleSimulateEgress = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setTestResult('ACTION: BLOCKED_BY_AIRGAP_POLICY | Target: ' + testUrl + ' | Data Sent: 0.00 MB | Socket Closed');
      setIsSimulating(false);
    }, 600);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-[#0E1624] border border-[#1E293B] rounded-xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Zero-Egress Air-Gap Controller</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight mt-1">Sovereignty Monitor</h1>
          <p className="text-xs text-slate-400 mt-1">No external communication detected · 100% confidential industrial compliance</p>
        </div>

        {/* Large Status Card */}
        <div className="flex items-center space-x-3 px-5 py-3 rounded-xl bg-emerald-950/50 border border-emerald-700/60 shrink-0">
          <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-black font-mono tracking-wider text-emerald-400">● PROTECTED</div>
            <div className="text-[10px] text-emerald-300/80 font-mono">Air-Gap Policy Active</div>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {metrics.map((m, idx) => (
          <div key={idx} className="bg-[#121A2A] border border-[#1E293B] rounded-lg p-4">
            <div className="text-xs text-slate-400 font-medium truncate">{m.label}</div>
            <div className={`text-2xl font-bold font-mono mt-1 ${
              m.color === 'emerald' ? 'text-emerald-400' : m.color === 'amber' ? 'text-amber-400' : 'text-white'
            }`}>
              {m.value}
            </div>
            <div className="text-[10px] text-slate-500 font-mono mt-1 truncate">{m.note}</div>
          </div>
        ))}
      </div>

      {/* Main Grid: Network Activity (Left) & Security Policy (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Network Activity Log (7 Cols) */}
        <div className="lg:col-span-7 bg-[#0E1624] border border-[#1E293B] rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-blue-400" />
              <h2 className="text-sm font-bold text-white">Network Activity</h2>
            </div>
            <span className="text-[10px] font-mono text-slate-500">REAL-TIME EGRESS TRACE</span>
          </div>

          <div className="space-y-2">
            {networkActivity.map((log, idx) => (
              <div 
                key={idx} 
                className={`p-3 rounded-lg border text-xs flex items-center justify-between transition-colors ${
                  log.isBlocked 
                    ? 'bg-amber-950/20 border-amber-900/60 text-amber-200' 
                    : 'bg-[#0A0E17] border-[#1E293B] text-slate-300'
                }`}
              >
                <div className="space-y-0.5 max-w-[70%]">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-slate-500 text-[11px]">{log.time}</span>
                    <span className={`font-semibold ${log.isBlocked ? 'text-amber-300 font-mono font-bold' : 'text-slate-200'}`}>
                      {log.event}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 truncate">{log.target}</div>
                </div>

                <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                  log.isBlocked 
                    ? 'bg-amber-950 text-amber-400 border border-amber-800' 
                    : 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                }`}>
                  {log.status}
                </span>
              </div>
            ))}
          </div>

          {/* Interactive Airgap Verification Test */}
          <div className="mt-4 pt-4 border-t border-[#1E293B] space-y-3">
            <div className="text-xs font-bold text-slate-300 font-mono">Test Live Air-Gap Protection</div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={testUrl}
                onChange={(e) => setTestUrl(e.target.value)}
                placeholder="Enter external URL..."
                className="flex-1 bg-[#0A0E17] border border-[#1E293B] rounded px-3 py-1.5 text-xs text-slate-200 font-mono"
              />
              <button
                onClick={handleSimulateEgress}
                disabled={isSimulating}
                className="px-4 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shrink-0"
              >
                {isSimulating ? 'Intercepting...' : 'Simulate Egress'}
              </button>
            </div>

            {testResult && (
              <div className="p-3 bg-amber-950/30 border border-amber-800/80 rounded text-amber-300 text-[11px] font-mono leading-relaxed">
                {testResult}
              </div>
            )}
          </div>
        </div>

        {/* Right: Security Policy (5 Cols) */}
        <div className="lg:col-span-5 bg-[#0E1624] border border-[#1E293B] rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
            <h2 className="text-sm font-bold text-white">Security Policy</h2>
            <span className="text-[10px] font-mono text-emerald-400">HARD ENFORCED</span>
          </div>

          <div className="space-y-3">
            {policies.map((pol, idx) => (
              <div key={idx} className="bg-[#0A0E17] border border-[#1E293B] rounded-lg p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-200">{pol.name}</h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    pol.status === 'Blocked'
                      ? 'bg-rose-950/80 text-rose-300 border border-rose-800'
                      : pol.status === 'Allowed'
                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                      : 'bg-blue-950/80 text-blue-300 border border-blue-800'
                  }`}>
                    {pol.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{pol.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
