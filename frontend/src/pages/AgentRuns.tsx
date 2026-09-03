import React from 'react';
import { Cpu, CheckCircle2, Clock } from 'lucide-react';

export const AgentRuns: React.FC = () => {
  const sampleRuns = [
    {
      id: 101,
      title: 'P-102B Pump Inspection & Maintenance Note Synthesis',
      user: 'Er. K. Sharma',
      status: 'PENDING_APPROVAL',
      intent: 'Multimodal Inspection to Approval',
      model: 'Qwen2.5-72B-Instruct-Q4',
      duration: '4.82s',
      time: '2026-08-28 10:42:00'
    },
    {
      id: 102,
      title: 'Crude Distillation Unit 2 Sensor Anomaly Detection',
      user: 'SOVEREIGN-X Agent',
      status: 'COMPLETED',
      intent: 'Code Execution & Data Analytics',
      model: 'DeepSeek-R1-Distill-Qwen-14B',
      duration: '2.15s',
      time: '2026-08-28 09:15:00'
    }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <h1 className="text-xl font-bold text-white">Agent Task Execution Runs</h1>
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-400 font-mono uppercase">
            <tr>
              <th className="p-4">Run ID</th>
              <th className="p-4">Title / Request</th>
              <th className="p-4">Intent</th>
              <th className="p-4">Selected Model</th>
              <th className="p-4">Status</th>
              <th className="p-4">Duration</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {sampleRuns.map((r) => (
              <tr key={r.id} className="hover:bg-slate-950/50">
                <td className="p-4 font-mono text-slate-400">#{r.id}</td>
                <td className="p-4 font-bold text-white">{r.title}</td>
                <td className="p-4 text-blue-300">{r.intent}</td>
                <td className="p-4 font-mono text-slate-300">{r.model}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
                    {r.status}
                  </span>
                </td>
                <td className="p-4 font-mono text-slate-400">{r.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
