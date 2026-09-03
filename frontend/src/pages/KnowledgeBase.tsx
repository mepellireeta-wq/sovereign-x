import React, { useState } from 'react';
import { 
  Database, 
  Search, 
  Upload, 
  FileText, 
  FileSpreadsheet, 
  CheckCircle2, 
  Layers, 
  Plus, 
  Filter, 
  Trash2, 
  Clock, 
  X,
  FileCheck
} from 'lucide-react';

export const KnowledgeBase: React.FC = () => {
  const [filterType, setFilterType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newDocName, setNewDocName] = useState('');

  const initialDocs = [
    {
      id: 1,
      name: 'Maintenance SOP — MRPL-SOP-MECH-042',
      type: 'PDF',
      pages: 42,
      chunks: '1,840 vectors',
      status: 'Indexed',
      updated: '12 Aug 2026',
      sha: 'SHA256: 8a1e..31fd'
    },
    {
      id: 2,
      name: 'Pump Manual — Sulzer OH2 Process Pump',
      type: 'PDF',
      pages: 128,
      chunks: '12,400 vectors',
      status: 'Indexed',
      updated: '10 Aug 2026',
      sha: 'SHA256: e552..99b3'
    },
    {
      id: 3,
      name: 'Inspection Report — CDU-2 Unit P-102',
      type: 'PDF',
      pages: 12,
      chunks: '3,120 vectors',
      status: 'Indexed',
      updated: '24m ago',
      sha: 'SHA256: 4b21..c89a'
    },
    {
      id: 4,
      name: 'Pump Sensor Data — Continuous 10-Day Telemetry',
      type: 'CSV',
      pages: '—',
      chunks: '144,000 datapoints',
      status: 'Processed',
      updated: '3h ago',
      sha: 'SHA256: 09fc..ee41'
    },
    {
      id: 5,
      name: 'ISO 10816-3 Vibration Severity Guidelines',
      type: 'PDF',
      pages: 36,
      chunks: '1,420 vectors',
      status: 'Indexed',
      updated: '05 Aug 2026',
      sha: 'SHA256: b34f..11a7'
    },
    {
      id: 6,
      name: 'Crude Charge Pump P-102 Component Assembly',
      type: 'Images',
      pages: 8,
      chunks: '8 vision embeddings',
      status: 'Indexed',
      updated: '08 Aug 2026',
      sha: 'SHA256: aa92..71c0'
    }
  ];

  const [docs, setDocs] = useState(initialDocs);

  const filteredDocs = docs.filter(doc => {
    const matchesFilter = filterType === 'All' || doc.type.toLowerCase() === filterType.toLowerCase();
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAddMockDoc = () => {
    if (!newDocName.trim()) return;
    const newDoc = {
      id: Date.now(),
      name: newDocName,
      type: 'PDF',
      pages: 16,
      chunks: '640 vectors',
      status: 'Indexed',
      updated: 'Just now',
      sha: `SHA256: ${Math.random().toString(36).substring(2, 8)}..`
    };
    setDocs([newDoc, ...docs]);
    setNewDocName('');
    setShowUploadModal(false);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-emerald-400 font-bold">AIRGAP VECTOR STORE</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Milvus / Chroma Local</span>
          </div>
          <h1 className="text-2xl font-black text-white mt-1 tracking-tight">Knowledge Base</h1>
          <p className="text-xs text-slate-400">
            Maintenance & Engineering · On-premise chunked and embedded confidential documents
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 font-bold text-white text-xs font-mono shadow-md shadow-blue-600/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>UPLOAD DOCUMENTS</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search procedures, manuals, inspection reports..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-sans"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex items-center space-x-1.5 self-start sm:self-auto overflow-x-auto">
          {['All', 'PDF', 'DOCX', 'XLSX', 'Images'].map((ft) => (
            <button
              key={ft}
              onClick={() => setFilterType(ft)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                filterType === ft
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {ft}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-slate-950/80 border-b border-slate-800 font-mono text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4 font-bold">Document</th>
                <th className="py-3 px-4 font-bold">Type</th>
                <th className="py-3 px-4 font-bold">Pages</th>
                <th className="py-3 px-4 font-bold">Vector Chunks</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold">Last Updated</th>
                <th className="py-3 px-4 font-bold">Integrity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-950/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white flex items-center space-x-2.5">
                    {doc.type === 'CSV' ? (
                      <FileSpreadsheet className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <FileText className="w-4 h-4 text-blue-400 shrink-0" />
                    )}
                    <span className="truncate max-w-xs">{doc.name}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">
                    <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px]">
                      {doc.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">{doc.pages}</td>
                  <td className="py-3.5 px-4 text-blue-400">{doc.chunks}</td>
                  <td className="py-3.5 px-4">
                    <span className="flex items-center space-x-1 text-emerald-400 font-bold text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span>{doc.status}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">{doc.updated}</td>
                  <td className="py-3.5 px-4 text-slate-500 text-[10px]">{doc.sha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Vector DB Summary footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 gap-2">
          <div className="flex items-center space-x-2">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span>TOTAL VECTORS IN LOCAL CHROMA/MILVUS: <strong className="text-white">19,428</strong></span>
          </div>
          <div>EMBEDDING MODEL: <span className="text-emerald-400">BAAI/bge-large-en-v1.5 (Local FP16)</span></div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm uppercase font-mono">Upload Confidential Engineering Document</h3>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 font-sans text-xs">
              <div>
                <label className="text-slate-400 block mb-1 font-mono uppercase text-[10px]">Document Title</label>
                <input
                  type="text"
                  value={newDocName}
                  onChange={(e) => setNewDocName(e.target.value)}
                  placeholder="e.g. Compressor_C204_Overhaul_SOP.pdf"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-mono text-xs"
                />
              </div>

              {/* Drag Drop Area */}
              <div className="border-2 border-dashed border-slate-800 rounded-xl p-8 text-center space-y-2 bg-slate-950/60">
                <Upload className="w-8 h-8 text-slate-500 mx-auto" />
                <p className="text-slate-300 font-medium">Drag & drop technical documents here</p>
                <span className="text-[10px] text-slate-500 font-mono block">Supports PDF, DOCX, XLSX, TIFF (Max 250 MB per file)</span>
              </div>

              <div className="p-3 bg-emerald-950/50 border border-emerald-800/60 rounded-lg text-[11px] font-mono text-emerald-300">
                ● Ingestion Guarantee: Files are chunked and vectorized locally. Zero data leaves this workstation.
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 rounded bg-slate-950 border border-slate-700 text-slate-300 text-xs font-mono"
              >
                CANCEL
              </button>
              <button
                onClick={handleAddMockDoc}
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold"
              >
                INGEST & VECTORIZE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
