import React from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Database, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  FileCode,
  HardDrive
} from 'lucide-react';

interface DashboardProps {
  onNavigate?: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const systemStatus = [
    { label: 'AI Models', status: 'Online', color: 'emerald' },
    { label: 'Knowledge Base', status: 'Healthy', color: 'emerald' },
    { label: 'Vector Database', status: 'Healthy', color: 'emerald' },
    { label: 'Security', status: 'Protected', color: 'emerald' },
  ];

  const metrics = [
    { label: 'Active Agent Runs', value: '12', sub: '1 in execution' },
    { label: 'Documents Indexed', value: '1,284', sub: 'PDF, DOCX, CSV' },
    { label: 'Knowledge Queries', value: '348', sub: 'Local RAG search' },
    { label: 'Local Model Calls', value: '2,841', sub: '100% on-premise' },
  ];

  const recentDocs = [
    { name: 'Pump_Inspection_Report.pdf', type: 'PDF', status: 'Indexed', updated: '12 mins ago' },
    { name: 'Pump_Maintenance_SOP.pdf', type: 'PDF', status: 'Indexed', updated: '1 hour ago' },
    { name: 'Pump_Sensor_Data.csv', type: 'CSV', status: 'Processed', updated: '2 hours ago' },
    { name: 'Pump_Manual.pdf', type: 'PDF', status: 'Indexed', updated: 'Yesterday' },
  ];

  const timelineSteps = [
    { name: 'Inspection report processed', status: 'complete' },
    { name: 'Maintenance SOP retrieved', status: 'complete' },
    { name: 'Equipment image analyzed', status: 'complete' },
    { name: 'Sensor data analysis', status: 'running' },
    { name: 'Risk assessment', status: 'waiting' },
    { name: 'Recommendation', status: 'waiting' },
    { name: 'Report generation', status: 'waiting' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold text-slate-100 tracking-tight">Good morning, Engineer</h1>
          <p className="text-xs text-slate-400 mt-0.5">Your sovereign AI environment is ready.</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-[10px] text-slate-500 font-mono border border-[#1E293B] px-2 py-1 rounded bg-[#0D131F]">
            SYNTHETIC DEMO DATA · MRPL REFINERY
          </span>
        </div>
      </div>

      {/* Compact System-Status Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {systemStatus.map((item) => (
          <div key={item.label} className="bg-[#121A2A] border border-[#1E293B] rounded-lg px-4 py-3 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">{item.label}</span>
            <div className="flex items-center space-x-1.5 text-xs font-semibold text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{item.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Meaningful Operational Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {metrics.map((m) => (
          <div key={m.label} className="bg-[#121A2A] border border-[#1E293B] rounded-lg p-4">
            <div className="text-xs text-slate-400 font-medium">{m.label}</div>
            <div className="text-2xl font-bold text-white font-mono mt-1">{m.value}</div>
            <div className="text-[10px] text-slate-500 font-mono mt-1">{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Main Grid: Sovereignty Status (Left) & Active Agent (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sovereignty Status Panel (Strongest Visual Element) */}
        <div className="lg:col-span-6 bg-[#0E1624] border border-[#1E293B] rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
            <div className="flex items-center space-x-2.5">
              <div className="p-1.5 bg-emerald-950/60 rounded border border-emerald-900/60 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-white tracking-tight">Sovereignty Status</h2>
            </div>
            <span className="flex items-center space-x-1.5 text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>● Protected</span>
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Zero external egress policy enforced at OS socket and Python runtime interceptors. All model weights execute strictly on local GPU hardware.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
            <div className="bg-[#0A0E17] p-3 rounded-lg border border-[#1E293B]">
              <div className="text-[11px] text-slate-400 font-medium">External API Calls</div>
              <div className="text-xl font-bold font-mono text-emerald-400 mt-1">0</div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">Strictly 0 allowed</div>
            </div>

            <div className="bg-[#0A0E17] p-3 rounded-lg border border-[#1E293B]">
              <div className="text-[11px] text-slate-400 font-medium">Outbound Data</div>
              <div className="text-xl font-bold font-mono text-emerald-400 mt-1">0 MB</div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">Airgap locked</div>
            </div>

            <div className="bg-[#0A0E17] p-3 rounded-lg border border-[#1E293B]">
              <div className="text-[11px] text-slate-400 font-medium">External Requests</div>
              <div className="text-xl font-bold font-mono text-emerald-400 mt-1">0</div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">DNS / HTTP / SSL</div>
            </div>

            <div className="bg-[#0A0E17] p-3 rounded-lg border border-[#1E293B]">
              <div className="text-[11px] text-slate-400 font-medium">Blocked Requests</div>
              <div className="text-xl font-bold font-mono text-amber-400 mt-1">2</div>
              <div className="text-[10px] text-amber-400/80 font-mono mt-0.5">Intercepted & logged</div>
            </div>

            <div className="bg-[#0A0E17] p-3 rounded-lg border border-[#1E293B] sm:col-span-2">
              <div className="text-[11px] text-slate-400 font-medium">Local Model Requests</div>
              <div className="text-xl font-bold font-mono text-white mt-1">2,841</div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">Served by on-premise Ollama / vLLM</div>
            </div>
          </div>

          <div className="pt-2">
            <button 
              onClick={() => onNavigate && onNavigate('security')}
              className="w-full flex items-center justify-center space-x-2 py-2 px-4 rounded bg-[#162234] hover:bg-[#1C2C44] text-blue-400 text-xs font-semibold border border-blue-900/60 transition-colors"
            >
              <span>View Security Monitor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Active Agent Section */}
        <div className="lg:col-span-6 bg-[#0E1624] border border-[#1E293B] rounded-xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
              <div>
                <div className="text-xs text-slate-400 font-mono uppercase">Active Agent Workflow</div>
                <h3 className="text-sm font-bold text-white">Inspection-to-Approval</h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">Equipment: </span>
                <span className="text-xs font-bold text-slate-200 font-mono">Pump P-102</span>
              </div>
            </div>

            <div className="mt-3 bg-[#0A0E17] p-3 rounded-lg border border-[#1E293B] flex items-center justify-between">
              <div>
                <div className="text-[11px] text-slate-400">Current Phase</div>
                <div className="text-xs font-bold text-blue-400 mt-0.5 flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                  <span>Analyzing sensor data</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[11px] text-slate-400">Progress</div>
                <div className="text-xs font-mono font-bold text-white mt-0.5">82%</div>
              </div>
            </div>

            {/* Execution Timeline */}
            <div className="mt-4 space-y-2">
              <div className="text-[10px] uppercase tracking-wider font-mono text-slate-500 font-semibold">
                Execution Steps
              </div>
              <div className="space-y-1.5">
                {timelineSteps.map((step, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs">
                    {step.status === 'complete' && (
                      <span className="text-emerald-400 font-mono font-bold w-4 text-center">✓</span>
                    )}
                    {step.status === 'running' && (
                      <span className="text-blue-400 font-mono font-bold w-4 text-center animate-pulse">●</span>
                    )}
                    {step.status === 'waiting' && (
                      <span className="text-slate-600 font-mono w-4 text-center">○</span>
                    )}
                    <span className={
                      step.status === 'complete' 
                        ? 'text-slate-300' 
                        : step.status === 'running' 
                        ? 'text-white font-semibold' 
                        : 'text-slate-500'
                    }>
                      {step.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#1E293B]">
            <button 
              onClick={() => onNavigate && onNavigate('agent-runs')}
              className="w-full flex items-center justify-center space-x-2 py-2 px-4 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <span>Open Agent Run</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Recent Documents Section */}
      <div className="bg-[#0E1624] border border-[#1E293B] rounded-xl p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-slate-400" />
            <h3 className="text-sm font-bold text-white">Recent Documents</h3>
          </div>
          <button 
            onClick={() => onNavigate && onNavigate('documents')}
            className="text-xs text-blue-400 hover:text-blue-300 font-medium"
          >
            View all documents →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead>
              <tr className="border-b border-[#1E293B] text-slate-500 font-mono text-[11px] uppercase">
                <th className="py-2.5 px-3">Document</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E293B]/50 font-sans">
              {recentDocs.map((doc, idx) => (
                <tr key={idx} className="hover:bg-[#131D2E] transition-colors">
                  <td className="py-2.5 px-3 font-medium text-slate-200 flex items-center space-x-2">
                    <FileCode className="w-3.5 h-3.5 text-slate-400" />
                    <span>{doc.name}</span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-400">{doc.type}</td>
                  <td className="py-2.5 px-3">
                    <span className="inline-flex items-center space-x-1.5 text-[11px] font-mono font-medium text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span>{doc.status}</span>
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-400">{doc.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
