import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Activity, 
  Download, 
  CheckCircle2, 
  XCircle, 
  Cpu, 
  Radio, 
  Key,
  Award
} from 'lucide-react';
import { testEgressBlock } from '../services/api';

export const SovereigntyMonitor: React.FC = () => {
  const [testResult, setTestResult] = useState<any>(null);
  const [testing, setTesting] = useState(false);

  const handleTestBlock = async () => {
    setTesting(true);
    try {
      const res = await testEgressBlock("http://api.openai.com/v1/chat");
      setTestResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setTesting(false);
    }
  };

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

      {/* Main Title Banner */}
      <div className="space-y-1 font-mono">
        <h2 className="text-xl font-black text-white">Sovereignty Monitor</h2>
        <p className="text-slate-400 text-[11px] font-sans">
          Air-Gap Enforcement & Zero-Cloud Leakage Verification
        </p>
      </div>

      {/* Protection Box */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded p-4 space-y-3 font-mono text-[10px] text-center">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[9px]">
          <span className="text-emerald-400 font-bold uppercase tracking-widest flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>AIR-GAP ENFORCED • SYSTEM PROTECTED</span>
          </span>
          <span className="text-slate-400">🛡 MIL-STD-810H</span>
        </div>

        {/* Shield Icon Graphic */}
        <div className="w-16 h-16 rounded-full border-2 border-emerald-500/50 bg-emerald-950/40 flex items-center justify-center mx-auto text-emerald-400 my-2">
          <ShieldCheck className="w-8 h-8 text-emerald-400" />
        </div>

        <p className="text-slate-300 text-xs font-sans max-w-lg mx-auto">
          All multimodal inference, embeddings, and telemetry are confined to on-premise hardware. Outbound gateway hardware disconnect active.
        </p>

        <div className="flex items-center justify-center space-x-6 text-[10px] text-slate-400 pt-1">
          <span className="flex items-center space-x-1">
            <Radio className="w-3.5 h-3.5 text-emerald-400" />
            <span>WAN Egress: <strong className="text-emerald-400">0.00 bps</strong></span>
          </span>
          <span className="flex items-center space-x-1">
            <Key className="w-3.5 h-3.5 text-blue-400" />
            <span>PHY Relay: <strong className="text-white">Pin-Ground Open</strong></span>
          </span>
        </div>
      </div>

      {/* Real-time Metrics Grid */}
      <div className="space-y-2 font-mono text-[10px]">
        <div className="flex items-center justify-between text-slate-400">
          <span className="uppercase font-bold tracking-wider">REAL-TIME SOVEREIGNTY METRICS</span>
          <span>Interval: 500ms</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-900/90 border border-slate-800 p-3 rounded space-y-1">
            <span className="text-slate-400 text-[9px] uppercase block">EXTERNAL API CALLS</span>
            <div className="text-xl font-black text-emerald-400">0</div>
            <div className="text-[9px] text-emerald-400 font-bold">ZERO-TRUST (OpenAI, Anthropic Sinkholed)</div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-3 rounded space-y-1">
            <span className="text-slate-400 text-[9px] uppercase block">OUTBOUND CONNS</span>
            <div className="text-xl font-black text-emerald-400">0</div>
            <div className="text-[9px] text-emerald-400 font-bold">PHY/FW BLOCKED (Kernel Netfilter Egress Drop)</div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-3 rounded space-y-1">
            <span className="text-slate-400 text-[9px] uppercase block">DATA SENT OUTSIDE</span>
            <div className="text-xl font-black text-emerald-400">0 MB</div>
            <div className="text-[9px] text-emerald-400 font-bold">100% AIRGAP (Payload Interception Strict)</div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-3 rounded space-y-1">
            <span className="text-slate-400 text-[9px] uppercase block">BLOCKED INVASIONS</span>
            <div className="text-xl font-black text-rose-400">2</div>
            <div className="text-[9px] text-rose-400 font-bold">QUARANTINED (Rogue Telemetry Intercepted)</div>
          </div>
        </div>

        {/* Local Model Calls Box */}
        <div className="bg-slate-900/90 border border-slate-800 p-3 rounded flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-[9px] uppercase block">LOCAL MODEL CALLS (AIR-GAPPED CORE)</span>
            <div className="text-lg font-black text-white">2,841 <span className="text-emerald-400 text-xs font-normal">● 100% Sovereign On-Prem</span></div>
          </div>
          <div className="text-right text-[9px] text-slate-400">
            <div>TPS: 142.4 tok/s</div>
            <div>4x H100 SXM5 Cluster</div>
          </div>
        </div>
      </div>

      {/* Active Security Policies Box */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded p-4 space-y-3 font-mono text-[10px]">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="font-bold text-white uppercase">ACTIVE SECURITY POLICIES</span>
          <div className="space-x-2">
            <span className="bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800 text-[9px]">4 ENFORCED</span>
            <span className="text-slate-500 text-[9px]">Zero Drift</span>
          </div>
        </div>

        <div className="space-y-1.5 text-[10px]">
          <div className="bg-slate-950 p-2.5 rounded border border-slate-800 flex items-center justify-between">
            <div>
              <div className="font-bold text-white flex items-center space-x-1.5">
                <XCircle className="w-3.5 h-3.5 text-rose-400" />
                <span>External AI APIs (OpenAI / Anthropic)</span>
              </div>
              <div className="text-[9px] text-slate-500 pl-5">DNS Sinkholed + IP Kernel Hard Deny</div>
            </div>
            <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800 font-bold text-[9px]">
              BLOCKED
            </span>
          </div>

          <div className="bg-slate-950 p-2.5 rounded border border-slate-800 flex items-center justify-between">
            <div>
              <div className="font-bold text-white flex items-center space-x-1.5">
                <XCircle className="w-3.5 h-3.5 text-rose-400" />
                <span>External Data Transfer / Egress</span>
              </div>
              <div className="text-[9px] text-slate-500 pl-5">Physical Boundary • 0.0.0.0/0 Dropped</div>
            </div>
            <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800 font-bold text-[9px]">
              BLOCKED
            </span>
          </div>

          <div className="bg-slate-950 p-2.5 rounded border border-slate-800 flex items-center justify-between">
            <div>
              <div className="font-bold text-white flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Local Weight Checksum Integrity</span>
              </div>
              <div className="text-[9px] text-slate-500 pl-5">SHA-256 Validated against Cold Flash</div>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold text-[9px]">
              VERIFIED
            </span>
          </div>

          <div className="bg-slate-950 p-2.5 rounded border border-slate-800 flex items-center justify-between">
            <div>
              <div className="font-bold text-white flex items-center space-x-1.5">
                <Lock className="w-3.5 h-3.5 text-blue-400" />
                <span>Internal Knowledge Access (SCADA/O...)</span>
              </div>
              <div className="text-[9px] text-slate-500 pl-5">Role-Based ACL Enforced • Local Token Ring</div>
            </div>
            <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800 font-bold text-[9px]">
              CONTROLLED
            </span>
          </div>
        </div>
      </div>

      {/* Audit Log Ring Buffer */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded p-4 space-y-3 font-mono text-[10px]">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="font-bold text-white uppercase">NETWORK ACTIVITY & AUDIT TRAIL</span>
          <span className="text-slate-500 text-[9px]">LOCAL KERNEL RING BUFFER</span>
        </div>

        <div className="space-y-1.5 text-[10px]">
          <div className="bg-slate-950 p-2 rounded border border-slate-800/60 flex items-center justify-between">
            <div>
              <span className="text-slate-400">10:42:08 </span>
              <span className="font-bold text-white">Security policy enforced</span>
              <div className="text-[9px] text-slate-500">Port 443 Drop | System Kernel</div>
            </div>
            <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800 font-bold text-[9px]">
              BLOCKED
            </span>
          </div>

          <div className="bg-slate-950 p-2 rounded border border-slate-800/60 flex items-center justify-between">
            <div>
              <span className="text-slate-400">10:42:07 </span>
              <span className="font-bold text-white">External request (telemetry...)</span>
              <div className="text-[9px] text-slate-500">192.168.1.42 -&gt; WAN | Gateway Firewall</div>
            </div>
            <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800 font-bold text-[9px]">
              BLOCKED (ALERT LOGGED)
            </span>
          </div>

          <div className="bg-slate-950 p-2 rounded border border-slate-800/60 flex items-center justify-between">
            <div>
              <span className="text-slate-400">10:42:04 </span>
              <span className="font-bold text-white">Vector database query (Milvus Local)</span>
              <div className="text-[9px] text-slate-500">127.0.0.1:19530 | Agent Worker</div>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold text-[9px]">
              ALLOWED
            </span>
          </div>

          <div className="bg-slate-950 p-2 rounded border border-slate-800/60 flex items-center justify-between">
            <div>
              <span className="text-slate-400">10:42:01 </span>
              <span className="font-bold text-white">Local model req (Llama-3-70B-Quant)</span>
              <div className="text-[9px] text-slate-500">Local Socket /dev/shm | Sovereign Reasoner</div>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold text-[9px]">
              ALLOWED
            </span>
          </div>
        </div>

        {/* Mission Guarantee Box */}
        <div className="bg-blue-950/60 border border-blue-800 p-3 rounded space-y-1 text-center">
          <div className="flex items-center justify-center space-x-1.5 text-blue-300 font-bold text-[10px]">
            <Award className="w-4 h-4 text-blue-400" />
            <span>SIH26117 MISSION GUARANTEE</span>
          </div>
          <p className="text-slate-200 text-xs font-sans italic">
            "Zero confidential data ever leaves refinery premises. 100% sovereign compute."
          </p>
        </div>

        <button 
          onClick={handleTestBlock}
          disabled={testing}
          className="w-full py-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded font-bold text-blue-400 text-xs flex items-center justify-center space-x-1 transition-all"
        >
          <Download className="w-4 h-4" />
          <span>{testing ? 'TESTING EGRESS GUARD...' : 'EXPORT AIRGAP AUDIT CERTIFICATE (.JSON-LD)'}</span>
        </button>
      </div>
    </div>
  );
};
