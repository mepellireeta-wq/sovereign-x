import React, { useState } from 'react';
import { 
  Database, 
  Search, 
  Upload, 
  FileText, 
  FileSpreadsheet, 
  Image as ImageIcon,
  CheckCircle2,
  Clock,
  Filter,
  Eye,
  Trash2,
  FolderOpen
} from 'lucide-react';

export const KnowledgeBase: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'PDF', 'DOCX', 'XLSX', 'Images'];

  const documents = [
    { name: 'Pump_Maintenance_SOP.pdf', title: 'Maintenance SOP', type: 'PDF', pages: 42, status: 'Indexed', updated: 'Today, 09:15', category: 'Standard Operating Procedures', size: '1.8 MB' },
    { name: 'Pump_Manual.pdf', title: 'Pump Manual', type: 'PDF', pages: 128, status: 'Indexed', updated: 'Yesterday, 16:30', category: 'OEM Equipment Specs', size: '8.4 MB' },
    { name: 'Pump_Inspection_Report.pdf', title: 'Inspection Report', type: 'PDF', pages: 12, status: 'Indexed', updated: 'Today, 10:10', category: 'Field Routine Inspections', size: '720 KB' },
    { name: 'Pump_Sensor_Data.csv', title: 'Sensor Data', type: 'CSV', pages: '—', status: 'Processed', updated: 'Today, 10:30', category: 'SCADA Telemetry Logs', size: '14 KB' },
    { name: 'Pump_Image.jpg', title: 'Bearing Visual Inspection', type: 'Images', pages: '1', status: 'Indexed', updated: 'Today, 10:15', category: 'Optical Photos', size: '1.2 MB' },
    { name: 'Crude_Distillation_CDU2_PID.pdf', title: 'CDU-2 P&ID Engineering Drawing', type: 'PDF', pages: 8, status: 'Indexed', updated: '28 Aug 2026', category: 'Engineering Drawings', size: '5.1 MB' },
    { name: 'Financial_Audit_Procurement_Q2.docx', title: 'Financial Audit & Maintenance Log', type: 'DOCX', pages: 26, status: 'Indexed', updated: '15 Aug 2026', category: 'Audit & Compliance', size: '940 KB' },
  ];

  const filteredDocs = documents.filter(doc => {
    const matchesFilter = activeFilter === 'All' || doc.type === activeFilter || (activeFilter === 'Images' && doc.type === 'Images');
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Knowledge Base</h1>
          <p className="text-xs text-slate-400 mt-0.5">Maintenance & Engineering · On-premise vector embeddings</p>
        </div>

        <button className="flex items-center space-x-2 px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-sm transition-colors shrink-0">
          <Upload className="w-3.5 h-3.5" />
          <span>+ Upload Documents</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-[#0E1624] border border-[#1E293B] rounded-xl p-4 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Field */}
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search procedures, manuals, inspection reports…"
              className="w-full bg-[#0A0E17] border border-[#1E293B] rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-sans"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-1 overflow-x-auto pb-1 md:pb-0">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1.5 rounded text-xs font-medium font-sans whitespace-nowrap transition-colors ${
                  activeFilter === f
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'bg-[#131B2A] text-slate-400 hover:text-slate-200 border border-[#1E293B]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Information-Dense Table */}
      <div className="bg-[#0E1624] border border-[#1E293B] rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead>
              <tr className="border-b border-[#1E293B] bg-[#0A0E17] text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4 font-semibold">Document</th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th className="py-3 px-4 font-semibold">Type</th>
                <th className="py-3 px-4 font-semibold">Pages</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E293B]/50 font-sans">
              {filteredDocs.map((doc, idx) => (
                <tr key={idx} className="hover:bg-[#131D2E] transition-colors group">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {doc.title}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">{doc.name} · {doc.size}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-400 font-sans">{doc.category}</td>
                  <td className="py-3 px-4 font-mono">
                    <span className="bg-[#121A2A] px-2 py-0.5 rounded border border-[#1E293B] text-[10px] font-bold text-slate-300">
                      {doc.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-300">{doc.pages}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center space-x-1.5 text-[11px] font-mono font-medium text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span>● {doc.status}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-slate-400">{doc.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
