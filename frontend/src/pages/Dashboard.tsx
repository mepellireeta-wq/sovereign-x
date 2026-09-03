import React from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Database, 
  FileText, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Activity,
  HardDrive,
  Lock
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
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

      {/* Greeting Title */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-white tracking-tight">Good morning, Engineer</h2>
          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono text-[10px] border border-emerald-800/60 font-bold">
            ● CLUSTER STABLE
          </span>
        </div>
        <p className="text-slate-400 text-[11px]">
          Your sovereign AI environment is ready. Zero outbound connectivity verified.
        </p>
      </div>

      {/* Quick Status Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[10px]">
        <div className="bg-slate-900/80 border border-slate-800 p-2 rounded flex items-center justify-between">
          <span className="text-slate-400">🤖 AI MODELS</span>
          <span className="text-emerald-400 font-bold">● ONLINE</span>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 p-2 rounded flex items-center justify-between">
          <span className="text-slate-400">📚 KNOWLEDGE BASE</span>
          <span className="text-emerald-400 font-bold">● HEALTHY</span>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 p-2 rounded flex items-center justify-between">
          <span className="text-slate-400">⚡ VECTOR DB</span>
          <span className="text-emerald-400 font-bold">● HEALTHY</span>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 p-2 rounded flex items-center justify-between">
          <span className="text-slate-400">🛡 SECURITY</span>
          <span className="text-emerald-400 font-bold">● PROTECTED</span>
        </div>
      </div>

      {/* Telemetry Metrics */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span className="uppercase font-bold tracking-wider">TELEMETRY METRICS</span>
          <span>REFRESH: 1000ms</span>
        </div>
        <div className="grid grid-cols-2 gap-2 font-mono">
          <div className="bg-slate-900/90 border border-slate-800/80 p-3 rounded space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-[10px]">
              <span>AGENT RUNS</span>
              <Activity className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="text-xl font-black text-white">12</div>
            <div className="text-[9px] text-slate-400">4 running • 8 queued</div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800/80 p-3 rounded space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-[10px]">
              <span>DOCS INDEXED</span>
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-xl font-black text-white">1,284</div>
            <div className="text-[9px] text-slate-400">PDFs, SOPs, CSVs</div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800/80 p-3 rounded space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-[10px]">
              <span>KNOWLEDGE QUERIES</span>
              <Database className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div className="text-xl font-black text-white">348</div>
            <div className="text-[9px] text-slate-400">Local RAG Pipeline</div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800/80 p-3 rounded space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-[10px]">
              <span>MODEL INVOCATIONS</span>
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-xl font-black text-white">2,841</div>
            <div className="text-[9px] text-slate-400">On-Premise VRAM</div>
          </div>
        </div>
      </div>

      {/* Sovereignty Status Box */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded p-4 space-y-3 font-mono">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>SOVEREIGNTY STATUS</span>
          </div>
          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[9px] border border-emerald-800">
            ● PROTECTED (STRICT AIR-GAP)
          </span>
        </div>

        <div className="space-y-1.5 text-[10px] text-slate-300">
          <div className="flex justify-between">
            <span className="text-slate-400">External API Calls</span>
            <span className="text-emerald-400 font-bold">0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Outbound Data Egress</span>
            <span className="text-emerald-400 font-bold">0 MB</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">External Network Requests</span>
            <span className="text-emerald-400 font-bold">0</span>
          </div>
          <div className="flex justify-between text-rose-300">
            <span className="text-slate-400">Blocked Ingress/Egress (DNS LEAK DEFUSED)</span>
            <span className="font-bold text-rose-400">2</span>
          </div>
          <div className="flex justify-between border-t border-slate-800/60 pt-1.5">
            <span className="text-slate-400">Local Sovereign Calls</span>
            <span className="text-white font-bold">2,841</span>
          </div>
        </div>

        <button 
          onClick={() => onNavigate('security')}
          className="w-full py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded font-bold text-slate-300 text-[10px] flex items-center justify-center space-x-1 transition-all"
        >
          <span>VIEW SECURITY MONITOR</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Active Agent Unit Box */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded p-4 space-y-3 font-mono">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
          <div>
            <div className="text-[9px] text-slate-400 uppercase">ACTIVE AGENT UNIT</div>
            <h3 className="font-bold text-white text-sm">Inspection-to-Approval</h3>
            <p className="text-[10px] text-slate-400">Equipment: Pump P-102 (Crude Distillation Unit)</p>
          </div>
          <span className="bg-slate-950 px-2 py-0.5 rounded text-[9px] text-slate-400 border border-slate-800">NODE #04</span>
        </div>

        {/* Equipment Pump Image Placeholder */}
        <div className="relative rounded overflow-hidden border border-slate-800 h-28 bg-slate-950 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
          <div className="text-center z-10 space-y-1">
            <div className="w-12 h-12 rounded-full border-2 border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400 bg-slate-900/80">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
            <div className="text-[10px] text-emerald-400 font-bold">BEARING_NODE_2 [FAIL_RISK_HIGH]</div>
          </div>
        </div>

        {/* Live Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] font-bold text-emerald-400">
            <span>● LIVE TELEMETRY ANALYSIS</span>
            <span>82% COMPLETE</span>
          </div>
          <div className="w-full bg-slate-950 h-2 rounded overflow-hidden">
            <div className="bg-emerald-500 h-full w-[82%] transition-all duration-500"></div>
          </div>
        </div>

        {/* Execution Steps List */}
        <div className="space-y-1.5 text-[10px]">
          <div className="flex items-center justify-between text-slate-300">
            <span className="flex items-center space-x-1.5 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Inspection report processed</span>
            </span>
            <span className="text-slate-500 font-mono">0.42s</span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span className="flex items-center space-x-1.5 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Maintenance SOP retrieved</span>
            </span>
            <span className="text-slate-500 font-mono">0.18s</span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span className="flex items-center space-x-1.5 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Equipment image analyzed</span>
            </span>
            <span className="text-slate-500 font-mono">1.21s</span>
          </div>
          <div className="flex items-center justify-between text-blue-400 font-bold">
            <span className="flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-400 animate-spin" />
              <span>Sensor data analysis</span>
            </span>
            <span className="text-blue-400 uppercase font-mono">PROCESSING</span>
          </div>
          <div className="flex items-center justify-between text-slate-500">
            <span>○ Risk assessment</span>
            <span>QUEUED</span>
          </div>
          <div className="flex items-center justify-between text-slate-500">
            <span>○ Recommendation formulation</span>
            <span>QUEUED</span>
          </div>
          <div className="flex items-center justify-between text-slate-500">
            <span>○ Report generation & signing</span>
            <span>QUEUED</span>
          </div>
        </div>

        <button 
          onClick={() => onNavigate('runs')}
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded text-xs flex items-center justify-center space-x-1 shadow-lg shadow-blue-600/20 transition-all"
        >
          <span>OPEN AGENT RUN EXECUTION</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Recent Indexed Assets */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded p-4 space-y-3 font-mono">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 text-[10px]">
          <div className="flex items-center space-x-2 text-white font-bold">
            <FileText className="w-4 h-4 text-blue-400" />
            <span>RECENT INDEXED ASSETS</span>
          </div>
          <span className="text-slate-500">AIR-GAPPED STORAGE</span>
        </div>

        <div className="space-y-2 text-[10px]">
          <div className="bg-slate-950 p-2 rounded border border-slate-800/60 flex items-center justify-between">
            <div>
              <div className="font-bold text-white">PDF Pump_Inspection_Report.pdf</div>
              <div className="text-[9px] text-emerald-400">● Vector Indexed (3,120 chunks)</div>
            </div>
            <div className="text-right text-[9px] text-slate-500">
              <div>24m ago</div>
              <div>SHA256: 4b21..</div>
            </div>
          </div>

          <div className="bg-slate-950 p-2 rounded border border-slate-800/60 flex items-center justify-between">
            <div>
              <div className="font-bold text-white">PDF Pump_Maintenance_SOP.pdf</div>
              <div className="text-[9px] text-emerald-400">● Vector Indexed (1,840 chunks)</div>
            </div>
            <div className="text-right text-[9px] text-slate-500">
              <div>2h ago</div>
              <div>SHA256: 8a1e..</div>
            </div>
          </div>

          <div className="bg-slate-950 p-2 rounded border border-slate-800/60 flex items-center justify-between">
            <div>
              <div className="font-bold text-white">CSV Pump_Sensor_Data.csv</div>
              <div className="text-[9px] text-emerald-400">● Processed (144,000 pts)</div>
            </div>
            <div className="text-right text-[9px] text-slate-500">
              <div>3h ago</div>
              <div>SHA256: 09fc..</div>
            </div>
          </div>

          <div className="bg-slate-950 p-2 rounded border border-slate-800/60 flex items-center justify-between">
            <div>
              <div className="font-bold text-white">PDF Pump_Manual_OEM_Rev4.pdf</div>
              <div className="text-[9px] text-emerald-400">● Vector Indexed (12,400 chunks)</div>
            </div>
            <div className="text-right text-[9px] text-slate-500">
              <div>1d ago</div>
              <div>SHA256: e552..</div>
            </div>
          </div>
        </div>

        {/* GPU Footer Badge */}
        <div className="bg-slate-950 p-2 rounded border border-slate-800 flex items-center justify-between text-[10px] text-slate-300">
          <span className="flex items-center space-x-1.5">
            <HardDrive className="w-3.5 h-3.5 text-blue-400" />
            <span>NVIDIA RTX 6000 ADA (48GB)</span>
          </span>
          <span className="text-emerald-400 font-bold">VRAM: 32.4 GB / 48 GB | 68%</span>
        </div>
      </div>
    </div>
  );
};
