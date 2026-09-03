import React from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Database, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Layers, 
  Activity, 
  Lock,
  FileSpreadsheet,
  AlertTriangle,
  Server,
  Zap
} from 'lucide-react';

interface DashboardProps {
  setActiveTab?: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ setActiveTab }) => {
  const onNavigate = (tab: string) => {
    if (setActiveTab) setActiveTab(tab);
  };

  const recentDocs = [
    {
      name: 'Pump_Inspection_Report.pdf',
      type: 'PDF',
      status: 'Vector Indexed (3,120 chunks)',
      time: '24m ago',
      sha: 'SHA256: 4b21..c89a'
    },
    {
      name: 'Pump_Maintenance_SOP.pdf',
      type: 'PDF',
      status: 'Vector Indexed (1,840 chunks)',
      time: '2h ago',
      sha: 'SHA256: 8a1e..31fd'
    },
    {
      name: 'Pump_Sensor_Data.csv',
      type: 'CSV',
      status: 'Processed (144,000 pts)',
      time: '3h ago',
      sha: 'SHA256: 09fc..ee41'
    },
    {
      name: 'Pump_Manual_OEM_Rev4.pdf',
      type: 'PDF',
      status: 'Vector Indexed (12,400 chunks)',
      time: '1d ago',
      sha: 'SHA256: e552..99b3'
    }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Top Node & Airgap Status Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-slate-800/80">
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-emerald-400 font-bold">AIRGAP ENFORCED</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">Zero Egress Verified</span>
        </div>
        <div className="flex items-center space-x-3 text-xs font-mono">
          <span className="text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
            NODE #04
          </span>
          <span className="text-emerald-400 font-bold flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>CLUSTER STABLE</span>
          </span>
        </div>
      </div>

      {/* Main Greeting Banner */}
      <div className="space-y-1">
        <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
          Good morning, Engineer
        </h1>
        <p className="text-xs text-slate-400 font-sans max-w-3xl">
          Your sovereign AI environment is ready. Zero outbound connectivity verified across all industrial subroutines.
        </p>
      </div>

      {/* Compact System Status Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-slate-950/80 border border-slate-800/80 p-3 rounded-lg flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Cpu className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-mono text-slate-300">AI MODELS</span>
          </div>
          <span className="text-[11px] font-mono font-bold text-emerald-400 flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>ONLINE</span>
          </span>
        </div>

        <div className="bg-slate-950/80 border border-slate-800/80 p-3 rounded-lg flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Database className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-mono text-slate-300">KNOWLEDGE BASE</span>
          </div>
          <span className="text-[11px] font-mono font-bold text-emerald-400 flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>HEALTHY</span>
          </span>
        </div>

        <div className="bg-slate-950/80 border border-slate-800/80 p-3 rounded-lg flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono text-slate-300">VECTOR DB</span>
          </div>
          <span className="text-[11px] font-mono font-bold text-emerald-400 flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>HEALTHY</span>
          </span>
        </div>

        <div className="bg-slate-950/80 border border-slate-800/80 p-3 rounded-lg flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono text-slate-300">SECURITY</span>
          </div>
          <span className="text-[11px] font-mono font-bold text-emerald-400 flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>PROTECTED</span>
          </span>
        </div>
      </div>

      {/* Telemetry Metrics */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-mono uppercase font-bold text-slate-500 tracking-wider">
            TELEMETRY METRICS
          </span>
          <span className="text-[10px] font-mono text-slate-500">REFRESH: 1000ms</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>AGENT RUNS</span>
              <Activity className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-3xl font-black text-white font-mono">12</div>
            <div className="text-[11px] text-emerald-400 font-mono">
              4 running <span className="text-slate-500">· 8 queued</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>DOCS INDEXED</span>
              <FileText className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-3xl font-black text-white font-mono">1,284</div>
            <div className="text-[11px] text-slate-400 font-mono">PDFs, SOPs, CSVs</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>KNOWLEDGE QUERIES</span>
              <Database className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-black text-white font-mono">348</div>
            <div className="text-[11px] text-slate-400 font-mono">Local RAG Pipeline</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>MODEL INVOCATIONS</span>
              <Zap className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-white font-mono">2,841</div>
            <div className="text-[11px] text-slate-400 font-mono">On-Premise VRAM</div>
          </div>
        </div>
      </div>

      {/* Sovereignty Status Panel (Core Security Hero) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-950/70 border border-emerald-800/80 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-white tracking-tight uppercase font-mono">SOVEREIGNTY STATUS</h2>
              <span className="text-[11px] text-slate-400">Strict on-premise hardware isolation</span>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 text-xs font-mono font-bold flex items-center space-x-1.5 self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>PROTECTED (STRICT AIR-GAP)</span>
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 py-1">
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">External API Calls</span>
            <span className="text-xl font-black text-emerald-400 font-mono">0</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">Outbound Data Egress</span>
            <span className="text-xl font-black text-emerald-400 font-mono">0 MB</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">External Network Requests</span>
            <span className="text-xl font-black text-emerald-400 font-mono">0</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80">
            <span className="text-[10px] font-mono text-rose-400 block uppercase">Blocked Ingress/Egress</span>
            <span className="text-xl font-black text-rose-400 font-mono">2</span>
            <span className="text-[9px] text-slate-500 font-mono block">DNS Leak Defused</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 col-span-2 md:col-span-1">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">Local Sovereign Calls</span>
            <span className="text-xl font-black text-blue-400 font-mono">2,841</span>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={() => onNavigate('sovereignty')}
            className="flex items-center space-x-1.5 text-xs font-mono font-bold text-blue-400 hover:text-blue-300 transition-all group"
          >
            <span>VIEW SECURITY MONITOR</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Active Agent Section & Recent Documents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Agent Unit (2 cols) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-500 block">ACTIVE AGENT UNIT</span>
              <h3 className="text-base font-bold text-white">Inspection-to-Approval</h3>
              <p className="text-xs text-slate-400 font-mono">Equipment: Pump P-102 (Crude Distillation Unit)</p>
            </div>
            <span className="text-[10px] font-mono bg-slate-950 text-slate-400 px-2 py-1 rounded border border-slate-800">
              NODE #04
            </span>
          </div>

          {/* Synthetic Equipment Visual Graphic */}
          <div className="relative rounded-lg bg-slate-950 border border-slate-800 p-4 overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>LIVE TELEMETRY ANALYSIS</span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400">82% COMPLETE</span>
            </div>

            {/* Simulated Equipment Schematic / Sensor Mesh */}
            <div className="bg-slate-900/90 rounded border border-slate-800 p-4 mb-3 font-mono text-xs">
              <div className="flex justify-between items-center text-slate-400 text-[11px] mb-2">
                <span>[SENSOR_NODE_02] PUMP_BEARING_HOUSING</span>
                <span className="text-amber-400">HOTSPOT: 68.4°C (+20.4°C)</span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
                <div className="bg-gradient-to-r from-blue-600 via-emerald-500 to-emerald-400 h-2.5 rounded-full w-[82%]"></div>
              </div>
            </div>

            {/* Vertical Workflow Steps */}
            <div className="space-y-2 pt-1 font-mono text-xs">
              <div className="flex items-center justify-between bg-slate-900/60 p-2 rounded border border-slate-800/80">
                <div className="flex items-center space-x-2 text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Inspection report processed</span>
                </div>
                <span className="text-[10px] text-slate-500">0.42s</span>
              </div>

              <div className="flex items-center justify-between bg-slate-900/60 p-2 rounded border border-slate-800/80">
                <div className="flex items-center space-x-2 text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Maintenance SOP retrieved</span>
                </div>
                <span className="text-[10px] text-slate-500">0.18s</span>
              </div>

              <div className="flex items-center justify-between bg-slate-900/60 p-2 rounded border border-slate-800/80">
                <div className="flex items-center space-x-2 text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Equipment image analyzed</span>
                </div>
                <span className="text-[10px] text-slate-500">1.21s</span>
              </div>

              <div className="flex items-center justify-between bg-blue-950/40 p-2 rounded border border-blue-800/50">
                <div className="flex items-center space-x-2 text-blue-300 font-bold">
                  <span className="w-3.5 h-3.5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></span>
                  <span>Sensor data analysis</span>
                </div>
                <span className="text-[10px] text-blue-400 font-bold uppercase">PROCESSING</span>
              </div>

              <div className="flex items-center justify-between bg-slate-950/40 p-2 rounded border border-slate-800/40 text-slate-500">
                <div className="flex items-center space-x-2">
                  <span className="w-3.5 h-3.5 rounded-full border border-slate-700"></span>
                  <span>Risk assessment</span>
                </div>
                <span className="text-[10px]">QUEUED</span>
              </div>

              <div className="flex items-center justify-between bg-slate-950/40 p-2 rounded border border-slate-800/40 text-slate-500">
                <div className="flex items-center space-x-2">
                  <span className="w-3.5 h-3.5 rounded-full border border-slate-700"></span>
                  <span>Recommendation formulation</span>
                </div>
                <span className="text-[10px]">QUEUED</span>
              </div>

              <div className="flex items-center justify-between bg-slate-950/40 p-2 rounded border border-slate-800/40 text-slate-500">
                <div className="flex items-center space-x-2">
                  <span className="w-3.5 h-3.5 rounded-full border border-slate-700"></span>
                  <span>Report generation & signing</span>
                </div>
                <span className="text-[10px]">QUEUED</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('agent-runs')}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 font-bold text-white text-xs shadow-md shadow-blue-600/20 font-mono transition-all"
          >
            <span>OPEN AGENT RUN EXECUTION</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Recent Indexed Assets (1 col) */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-mono uppercase font-bold text-white tracking-wider flex items-center space-x-2">
                <FileText className="w-4 h-4 text-blue-400" />
                <span>RECENT INDEXED ASSETS</span>
              </h3>
              <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/50">
                AIR-GAPPED
              </span>
            </div>

            <div className="space-y-2.5">
              {recentDocs.map((doc, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs truncate max-w-[170px]">{doc.name}</span>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-blue-900/50 text-blue-300">
                      {doc.type}
                    </span>
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono">{doc.status}</div>
                  <div className="flex justify-between text-[9px] text-slate-500 font-mono pt-0.5">
                    <span>{doc.time}</span>
                    <span>{doc.sha}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GPU VRAM Telemetry Bar at bottom */}
          <div className="pt-4 border-t border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-400 flex items-center space-x-1.5">
                <Server className="w-3.5 h-3.5 text-blue-400" />
                <span>NVIDIA RTX 6000 ADA (48GB)</span>
              </span>
              <span className="text-emerald-400 font-bold">VRAM: 32.4 / 48 GB (68%)</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800">
              <div className="bg-gradient-to-r from-blue-500 to-emerald-500 h-1.5 rounded-full w-[68%]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
