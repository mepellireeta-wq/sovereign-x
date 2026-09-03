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
import { AuditLogs } from './pages/AuditLogs';
import { SovereigntyMonitor } from './pages/SovereigntyMonitor';
import { SIHDemo } from './pages/SIHDemo';
import { Settings } from './pages/Settings';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('sih-demo');

  const renderContent = () => {
    switch (activeTab) {
      case 'sih-demo':
        return <SIHDemo />;
      case 'dashboard':
        return <Dashboard />;
      case 'workbench':
        return <AIWorkbench />;
      case 'agent-runs':
        return <AgentRuns />;
      case 'knowledge-base':
        return <KnowledgeBase />;
      case 'documents':
        return <Documents />;
      case 'models':
        return <ModelManager />;
      case 'tools':
        return <ToolsPage />;
      case 'deliverables':
        return <Deliverables />;
      case 'audit-logs':
        return <AuditLogs />;
      case 'sovereignty':
        return <SovereigntyMonitor />;
      case 'settings':
        return <Settings />;
      default:
        return <SIHDemo />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-900/60">
        <Navbar activeTab={activeTab} />
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
