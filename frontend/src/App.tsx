import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { Dashboard } from './pages/Dashboard';
import { AIWorkbench } from './pages/AIWorkbench';
import { AgentRuns } from './pages/AgentRuns';
import { SovereigntyMonitor } from './pages/SovereigntyMonitor';
import { ApprovalsPage } from './pages/ApprovalsPage';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('status');

  const renderPage = () => {
    switch (activeTab) {
      case 'status':
        return <Dashboard onNavigate={setActiveTab} />;
      case 'workbench':
        return <AIWorkbench />;
      case 'runs':
        return <AgentRuns />;
      case 'security':
        return <SovereigntyMonitor />;
      case 'approvals':
        return <ApprovalsPage />;
      default:
        return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Header Navbar */}
      <Navbar title="SOVEREIGN-X" subtitle="PRIVATE INDUSTRIAL AI" />

      {/* Main Active Page View */}
      <main className="flex-1 overflow-y-auto">
        {renderPage()}
      </main>

      {/* Fixed Bottom Navigation Bar (5 Tabs matching Images) */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;
