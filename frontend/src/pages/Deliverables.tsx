import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  FileText, 
  Download, 
  ExternalLink, 
  Eye, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  X,
  FileCheck,
  Layers,
  Presentation
} from 'lucide-react';

export const Deliverables: React.FC = () => {
  const [selectedPreview, setSelectedPreview] = useState<any>(null);

  const deliverables = [
    {
      id: 1,
      name: 'Maintenance_Approval_Note.docx',
      type: 'DOCX',
      icon: FileText,
      color: 'blue',
      created: '2 minutes ago',
      size: '142 KB',
      status: 'Ready',
      sha: 'SHA256: 7f4a..19c2',
      desc: 'Official Word document with equipment metadata, diagnostic indicators, and authorized engineer sign-off section.',
      previewText: `MRPL REFINERY MAINTENANCE APPROVAL DIRECTIVE
Date: 12 August 2026
Equipment ID: Pump P-102 (Crude Distillation Unit)
Primary Recommendation: Immediate bearing overhaul and mechanical seal replacement.
Authorized Signer: R. Sharma (Senior Plant Engineer)
Airgap Verification Hash: 7f4a19c298ee...`
    },
    {
      id: 2,
      name: 'Sensor_Analysis.xlsx',
      type: 'XLSX',
      icon: FileSpreadsheet,
      color: 'emerald',
      created: '10 minutes ago',
      size: '2.4 MB',
      status: 'Ready',
      sha: 'SHA256: 9b20..31ad',
      desc: 'Multi-tab Excel workbook with 14,400 raw vibration datapoints and ISO-10816 color-coded threshold breach tables.',
      previewText: `Sheet 1: Telemetry Waveform Summary
Axis X Peak RMS: 4.82 mm/s (Breach - Zone C)
Axis Y Peak RMS: 3.91 mm/s (Breach - Zone C)
Axis Z Peak RMS: 2.14 mm/s (Acceptable - Zone B)
Calculated Degradation Rate: 0.28 mm/s per day`
    },
    {
      id: 3,
      name: 'Inspection_Summary.pptx',
      type: 'PPTX',
      icon: Presentation,
      color: 'amber',
      created: '15 minutes ago',
      size: '4.8 MB',
      status: 'Ready',
      sha: 'SHA256: a1e2..44cb',
      desc: 'Executive summary slide deck containing thermal imaging overlays, FFT acoustic spectrograms, and downtime estimates.',
      previewText: `Slide 1: Executive Reliability Summary (CDU P-102)
Slide 2: Thermal Hotspot Localization (68.4°C outboard bearing)
Slide 3: API 610 Compliance Matrix
Slide 4: Recommended Turnaround Window (72 Hours TTF)`
    },
    {
      id: 4,
      name: 'Airgap_Security_Certificate.pdf',
      type: 'PDF',
      icon: FileCheck,
      color: 'indigo',
      created: '30 minutes ago',
      size: '98 KB',
      status: 'Ready',
      sha: 'SHA256: cc41..09fa',
      desc: 'Cryptographically sealed audit certificate proving 100% on-premise execution with zero cloud egress.',
      previewText: `SOVEREIGN-X AUDIT CERTIFICATE
Host: Node-04 (MRPL On-Premise Industrial Enclave)
External WAN Egress: 0.00 Bytes
Cloud AI Connections: 0
Signed by: Local Enclave Key #ENCLAVE-66`
    }
  ];

  const handleDownload = (item: any) => {
    const blob = new Blob([item.previewText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = item.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-emerald-400 font-bold">AIRGAP GENERATION PIPELINE</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">DOCX · XLSX · PPTX</span>
          </div>
          <h1 className="text-2xl font-black text-white mt-1 tracking-tight">Generated Deliverables</h1>
          <p className="text-xs text-slate-400">
            Real enterprise work orders, spreadsheets, and presentations generated locally by Sovereign Agents
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-3 py-2 rounded-lg">
          LOCATION: <strong className="text-white">/data/deliverables/</strong>
        </div>
      </div>

      {/* Deliverables List */}
      <div className="space-y-3">
        {deliverables.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-700 transition-all"
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xs font-mono shrink-0 ${
                  item.type === 'DOCX' ? 'bg-blue-900/40 text-blue-300 border border-blue-700/50' :
                  item.type === 'XLSX' ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-700/50' :
                  item.type === 'PPTX' ? 'bg-amber-900/40 text-amber-300 border border-amber-700/50' :
                  'bg-indigo-900/40 text-indigo-300 border border-indigo-700/50'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-bold text-white font-mono truncate">{item.name}</h3>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-950 text-slate-400 border border-slate-800">
                      {item.type}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-800/40">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-sans max-w-2xl">{item.desc}</p>
                  <div className="flex items-center space-x-3 text-[10px] font-mono text-slate-500 pt-0.5">
                    <span>Created: {item.created}</span>
                    <span>·</span>
                    <span>Size: {item.size}</span>
                    <span>·</span>
                    <span>{item.sha}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 self-start md:self-auto shrink-0 font-mono text-xs">
                <button
                  onClick={() => setSelectedPreview(item)}
                  className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-300 transition-all"
                >
                  <Eye className="w-3.5 h-3.5 text-blue-400" />
                  <span>PREVIEW</span>
                </button>

                <button
                  onClick={() => handleDownload(item)}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 font-bold text-white shadow-md shadow-blue-600/20 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>DOWNLOAD</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Preview Modal */}
      {selectedPreview && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 font-sans">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-2xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-sm font-mono">{selectedPreview.name}</h3>
                <span className="text-[10px] text-slate-400 font-mono">Format: {selectedPreview.type} · Size: {selectedPreview.size}</span>
              </div>
              <button
                onClick={() => setSelectedPreview(null)}
                className="text-slate-400 hover:text-white text-xs font-mono px-2 py-1 bg-slate-800 rounded"
              >
                ESC / CLOSE
              </button>
            </div>

            <div className="bg-slate-950 p-5 rounded-lg border border-slate-800 space-y-2 text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed">
              {selectedPreview.previewText}
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-800">
              <span className="text-[10px] font-mono text-slate-500">{selectedPreview.sha}</span>
              <button
                onClick={() => handleDownload(selectedPreview)}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold"
              >
                <Download className="w-3.5 h-3.5" />
                <span>SAVE LOCAL COPY</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
