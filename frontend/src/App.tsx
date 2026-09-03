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
        return <Dashboard onNavigate={setActiveTab} />;
      case 'workbench':
        return <AIWorkbench />;
      case 'agent-runs':
        return <AgentRuns />;
      case 'knowledge-base':
        return <KnowledgeBase />;
      case 'documents':
        return <Documents onNavigateToWorkbench={() => setActiveTab('workbench')} />;
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
      case 'security':
      case 'sovereignty':
        return <SovereigntyMonitor />;
      case 'settings':
        return <Settings />;
      case 'sih-demo':
        return <SIHDemo />;
      default:
        return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#0A0E17] text-slate-100 overflow-hidden font-sans">
      {/* Persistent Left Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content Area with Top Navigation */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#0A0E17]">
        <Navbar activeTab={activeTab} />
        <main className="flex-1 overflow-y-auto bg-[#070A10]">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
