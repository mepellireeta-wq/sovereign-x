import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  FileText, 
  Download, 
  Eye, 
  CheckCircle2, 
  Presentation, 
  ExternalLink,
  Clock,
  Sparkles
} from 'lucide-react';

export const Deliverables: React.FC = () => {
  const [previewFile, setPreviewFile] = useState<any>(null);

  const deliverables = [
    {
      name: 'Maintenance_Approval_Note.docx',
      type: 'DOCX',
      created: '2 minutes ago',
      status: 'Ready',
      size: '28.4 KB',
      description: 'Official MRPL Engineering Authorization Note with embedded evidence citations and sign-off fields.',
      iconColor: 'text-blue-400 bg-blue-950/60 border-blue-800'
    },
    {
      name: 'Sensor_Analysis.xlsx',
      type: 'XLSX',
      created: '5 minutes ago',
      status: 'Ready',
      size: '18.2 KB',
      description: 'Tabular ISO-10816 vibration trend data with conditional formatting and peak velocity charts.',
      iconColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-800'
    },
    {
      name: 'Inspection_Summary.pptx',
      type: 'PPTX',
      created: '8 minutes ago',
      status: 'Ready',
      size: '42.1 KB',
      description: 'Executive briefing slide deck summarizing pump telemetry, thermal inspection photo, and SOP changeover.',
      iconColor: 'text-amber-400 bg-amber-950/60 border-amber-800'
    }
  ];

  const handleDownload = (fileName: string) => {
    window.location.href = `/api/deliverables/download/${fileName}`;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Generated Deliverables</h1>
          <p className="text-xs text-slate-400 mt-0.5">Automated document synthesis compiled strictly on-premise</p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono text-slate-400 bg-[#0E1624] px-3 py-1.5 rounded border border-[#1E293B]">
            All files cryptographically verified
          </span>
        </div>
      </div>

      {/* Deliverables List */}
      <div className="bg-[#0E1624] border border-[#1E293B] rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-[#1E293B] flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
            Artifacts from Run #102B
          </h2>
          <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
            3 FILES READY
          </span>
        </div>

        <div className="divide-y divide-[#1E293B]/60">
          {deliverables.map((file, idx) => (
            <div key={idx} className="p-5 hover:bg-[#121A2A] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* File Details */}
              <div className="flex items-start space-x-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono font-black text-xs border shrink-0 ${file.iconColor}`}>
                  {file.type}
                </div>
                <div>
                  <div className="flex items-center space-x-2.5">
                    <span className="font-bold text-white text-sm font-sans tracking-tight">{file.name}</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.2 rounded border border-emerald-900/60">
                      ● {file.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed font-sans">{file.description}</p>
                  <div className="flex items-center space-x-3 text-[10px] text-slate-500 font-mono mt-1.5">
                    <span>Created: {file.created}</span>
                    <span>•</span>
                    <span>Size: {file.size}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Preview, Open, Download */}
              <div className="flex items-center space-x-2 shrink-0 self-end md:self-center">
                <button
                  onClick={() => setPreviewFile(file)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-[#131B2A] hover:bg-[#1A2538] border border-[#1E293B] text-slate-300 hover:text-white text-xs font-medium transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  <span>Preview</span>
                </button>

                <button
                  onClick={() => handleDownload(file.name)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-[#131B2A] hover:bg-[#1A2538] border border-[#1E293B] text-slate-300 hover:text-white text-xs font-medium transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  <span>Open</span>
                </button>

                <button
                  onClick={() => handleDownload(file.name)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-sm transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-[#0E1624] border border-[#1E293B] rounded-xl max-w-xl w-full p-6 space-y-4 shadow-2xl animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
              <div className="flex items-center space-x-2 font-bold text-white font-mono text-sm">
                <span className={`px-2 py-0.5 rounded text-[10px] border ${previewFile.iconColor}`}>{previewFile.type}</span>
                <span>{previewFile.name}</span>
              </div>
              <button onClick={() => setPreviewFile(null)} className="text-slate-400 hover:text-white text-xs">
                ✕
              </button>
            </div>

            <div className="bg-[#0A0E17] border border-[#1E293B] rounded p-4 text-xs font-mono space-y-2 text-slate-300">
              <div className="text-slate-400 font-bold border-b border-[#1E293B] pb-1">DOCUMENT PREVIEW METADATA</div>
              <div>• Equipment: Centrifugal Pump P-102B (CDU-2)</div>
              <div>• Authorized By: Senior Maintenance Engineer (K. Sharma)</div>
              <div>• Recommended Action: Overhaul Non-Drive End Bearing Assembly</div>
              <div>• Generated Timestamp: Today 10:44 UTC</div>
              <div>• Security Clearance: CONFIDENTIAL — MRPL INTERNAL</div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setPreviewFile(null)}
                className="px-4 py-1.5 rounded bg-[#131B2A] text-slate-300 hover:text-white text-xs font-semibold border border-[#1E293B]"
              >
                Close
              </button>
              <button
                onClick={() => handleDownload(previewFile.name)}
                className="px-4 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
              >
                Download File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
