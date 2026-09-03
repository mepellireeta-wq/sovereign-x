import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { AIWorkbench } from './pages/AIWorkbench';
import { AgentRuns } from './pages/AgentRuns';
import { KnowledgeBase } from './pages/KnowledgeBase';
import { Documents } from './pages/Documents';
import { ModelManager } from './pages/ModelManager';
import { ToolsPage } from './pages/ToolsPage';
import { Deliverables } from './pages/Deliverables';
import { Approvals } from './pages/Approvals';
import { AuditLogs } from './pages/AuditLogs';
import { SovereigntyMonitor } from './pages/SovereigntyMonitor';
import { SIHDemo } from './pages/SIHDemo';
import { Settings } from './pages/Settings';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} />;
      case 'workbench':
        return <AIWorkbench />;
      case 'agent-runs':
        return <AgentRuns />;
      case 'knowledge-base':
        return <KnowledgeBase />;
      case 'documents':
        return <Documents setActiveTab={setActiveTab} />;
      case 'models':
        return <ModelManager />;
      case 'tools':
        return <ToolsPage />;
      case 'deliverables':
        return <Deliverables />;
      case 'approvals':
        return <Approvals />;
      case 'audit-logs':
        return <AuditLogs />;
      case 'sovereignty':
        return <SovereigntyMonitor />;
      case 'settings':
        return <Settings />;
      case 'sih-demo':
        return <SIHDemo />;
      default:
        return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans select-none antialiased">
      {/* Left Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-900/60">
        <Navbar activeTab={activeTab} />
        <main className="flex-1 overflow-y-auto bg-[#0b101d]">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
