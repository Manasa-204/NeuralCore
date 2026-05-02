/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  GraduationCap, 
  LayoutDashboard, 
  Settings, 
  LogOut,
  Bell,
  Search,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import ChatInterface from './components/ChatInterface';
import GraphView from './components/GraphView';
import UploadManager from './components/UploadManager';
import Metrics from './components/Metrics';
import { cn } from './lib/utils';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showCorpus, setShowCorpus] = useState(false);
  const [corpusData, setCorpusData] = useState<any>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);
  const [showArchitecture, setShowArchitecture] = useState(false);

  const handleViewLogs = () => {
    fetch('http://localhost:8000/logs')
      .then(res => res.json())
      .then(data => {
        console.log('System Logs:', data);
        alert(`System Logs:\n\nTotal Queries: ${data.total_queries}\nDocuments: ${data.documents}\nGraph Nodes: ${data.graph_nodes}\nGraph Links: ${data.graph_links}\n\nCheck console for full logs.`);
      })
      .catch(err => console.error('Failed to fetch logs:', err));
  };

  const handleExportRAG = () => {
    fetch('http://localhost:8000/export')
      .then(res => res.json())
      .then(data => {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `rag-export-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      })
      .catch(err => console.error('Failed to export RAG data:', err));
  };

  const handleShowCorpus = () => {
    fetch('http://localhost:8000/documents')
      .then(res => res.json())
      .then(data => {
        setCorpusData(data);
        setShowCorpus(true);
      })
      .catch(err => console.error('Failed to fetch corpus:', err));
  };

  const handleShowSearch = () => {
    setShowSearch(true);
  };

  const handleShowAlerts = () => {
    setShowAlerts(true);
  };

  const handleShowArchitecture = () => {
    setShowArchitecture(true);
  };

  return (
    <div className="flex h-screen w-full bg-dash-bg font-sans selection:bg-dash-accent/20 overflow-hidden">
      {/* Sidebar */}
      <aside className={cn(
        "bg-white border-r border-dash-line flex flex-col transition-all duration-300 z-20 shadow-sm",
        sidebarOpen ? "w-64" : "w-16"
      )}>
        <div className="p-4 border-b border-dash-line">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shrink-0 shadow-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="text-sm font-bold text-dash-text">Smart Tutor</h1>
                <p className="text-xs text-dash-muted mt-0.5">AI Learning Assistant</p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-1 mt-6">
          <NavItem icon={<LayoutDashboard />} label="Dashboard" active sidebarOpen={sidebarOpen} />
          <NavItem icon={<GraduationCap />} label="Knowledge Base" sidebarOpen={sidebarOpen} onClick={handleShowCorpus} />
          <NavItem icon={<Search />} label="Search" sidebarOpen={sidebarOpen} onClick={handleShowSearch} />
        </nav>

        <div className="px-3 pb-4 space-y-1">
          <NavItem icon={<Bell />} label="Notifications" badge="2" sidebarOpen={sidebarOpen} onClick={handleShowAlerts} />
          <NavItem icon={<Settings />} label="Settings" sidebarOpen={sidebarOpen} onClick={handleShowArchitecture} />
          <div className="h-px bg-dash-line my-3" />
          <NavItem icon={<LogOut />} label="Sign Out" sidebarOpen={sidebarOpen} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        {/* Header */}
        <header className="h-16 border-b border-dash-line flex items-center justify-between px-6 bg-white shrink-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-dash-surface rounded-lg transition-colors text-dash-muted hover:text-dash-text"
            >
              {sidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
            </button>
            <div className="h-6 w-px bg-dash-line mx-1" />
            <div>
               <h1 className="text-sm font-semibold text-dash-text">Neural Architectures Session</h1>
               <p className="text-xs text-dash-muted">Learning Module 4</p>
            </div>
          </div>
          
          <div className="flex gap-3">
             <button 
               onClick={handleViewLogs}
               className="h-9 px-4 bg-white border border-dash-line rounded-lg flex items-center justify-center text-xs text-dash-text hover:bg-dash-surface cursor-pointer transition-colors"
             >
               View Logs
             </button>
             <button 
               onClick={handleExportRAG}
               className="h-9 px-4 gradient-bg rounded-lg flex items-center justify-center text-xs text-white font-medium hover:opacity-90 transition-opacity cursor-pointer shadow-md"
             >
               Export Data
             </button>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="flex-1 p-6 overflow-auto bg-dash-bg" style={{ minHeight: 0 }}>
           <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
              {/* Chat Interface - Takes 2 columns */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-md border border-dash-line overflow-hidden flex flex-col" style={{ minHeight: 0 }}>
                 <ChatInterface />
              </div>

              {/* Right Column - Graph and Metrics */}
              <div className="flex flex-col gap-6" style={{ minHeight: 0 }}>
                 {/* Graph View */}
                 <div className="bg-white rounded-2xl shadow-md border border-dash-line overflow-hidden" style={{ height: '400px' }}>
                    <GraphView />
                 </div>
                 
                 {/* Metrics */}
                 <div className="bg-white rounded-2xl shadow-md border border-dash-line overflow-hidden flex-1" style={{ minHeight: 0 }}>
                    <Metrics />
                 </div>
              </div>
              
              {/* Upload Manager - Full Width Bottom */}
              <div className="lg:col-span-3 bg-white rounded-2xl shadow-md border border-dash-line overflow-hidden" style={{ height: '280px' }}>
                 <UploadManager />
              </div>
           </div>
        </div>
        
        {/* Footer info Bar */}
        <footer className="h-10 bg-white border-t border-dash-line px-6 flex items-center justify-between">
           <span className="text-xs text-dash-muted">Docker: 4 containers running</span>
           <div className="flex gap-2 items-center">
              <span className="text-xs text-dash-muted">Status:</span>
              {[0,1,2,3].map(i => (
                <div key={i} className="w-2 h-2 rounded-full bg-emerald-500" />
              ))}
           </div>
        </footer>
      </main>

      {/* Knowledge Corpus Modal */}
      {showCorpus && corpusData && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowCorpus(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-dash-line flex items-center justify-between">
              <h2 className="text-lg font-bold text-dash-text">Knowledge Base</h2>
              <button onClick={() => setShowCorpus(false)} className="text-dash-muted hover:text-dash-text text-xl">✕</button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)]">
              <p className="text-sm text-dash-muted mb-4">Total Documents: {corpusData.count}</p>
              <div className="space-y-3">
                {corpusData.documents.map((doc: any, i: number) => (
                  <div key={i} className="bg-dash-surface border border-dash-line p-4 rounded-xl hover:shadow-md transition-shadow">
                    <h3 className="text-sm font-bold text-dash-text mb-2">{doc.filename}</h3>
                    <div className="text-xs text-dash-muted space-y-1">
                      <p>Type: {doc.type} | Size: {(doc.size / 1024).toFixed(2)} KB</p>
                      <p>Concepts: {doc.concepts.join(', ')}</p>
                      <p className="mt-2 text-xs font-mono bg-white p-3 rounded-lg border border-dash-line">{doc.preview}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* System Search Modal */}
      {showSearch && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setShowSearch(false)}>
          <div className="bg-dash-panel border border-dash-line rounded-lg max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-dash-line flex items-center justify-between">
              <h2 className="text-sm font-bold text-dash-text">System Search</h2>
              <button onClick={() => setShowSearch(false)} className="text-dash-muted hover:text-dash-text">✕</button>
            </div>
            <div className="p-4">
              <input 
                type="text" 
                placeholder="Search documents, queries, concepts..." 
                className="w-full bg-dash-bg border border-dash-line rounded-md py-2 px-3 text-xs focus:outline-none focus:border-dash-accent"
              />
              <p className="text-[10px] text-dash-muted mt-3">Search across all uploaded documents and query history</p>
            </div>
          </div>
        </div>
      )}

      {/* System Alerts Modal */}
      {showAlerts && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setShowAlerts(false)}>
          <div className="bg-dash-panel border border-dash-line rounded-lg max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-dash-line flex items-center justify-between">
              <h2 className="text-sm font-bold text-dash-text">System Alerts</h2>
              <button onClick={() => setShowAlerts(false)} className="text-dash-muted hover:text-dash-text">✕</button>
            </div>
            <div className="p-4 space-y-2">
              <div className="bg-yellow-500/10 border border-yellow-500/30 p-3 rounded">
                <p className="text-xs text-yellow-400 font-bold">⚠ High Query Latency</p>
                <p className="text-[10px] text-dash-muted mt-1">Average response time increased to 450ms</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded">
                <p className="text-xs text-blue-400 font-bold">ℹ New Document Uploaded</p>
                <p className="text-[10px] text-dash-muted mt-1">UNIT 3.pdf successfully indexed</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Architecture Modal */}
      {showArchitecture && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setShowArchitecture(false)}>
          <div className="bg-dash-panel border border-dash-line rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-dash-line flex items-center justify-between">
              <h2 className="text-sm font-bold text-dash-text">System Architecture</h2>
              <button onClick={() => setShowArchitecture(false)} className="text-dash-muted hover:text-dash-text">✕</button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[calc(80vh-80px)]">
              <div className="space-y-4 text-xs text-dash-text">
                <div>
                  <h3 className="font-bold text-dash-accent mb-2">Multi-Modal RAG Pipeline</h3>
                  <p className="text-dash-muted">1. Document Ingestion → 2. Vector Embedding → 3. Graph Construction → 4. Hybrid Retrieval → 5. Reranking → 6. LLM Generation</p>
                </div>
                <div>
                  <h3 className="font-bold text-dash-accent mb-2">Components</h3>
                  <ul className="text-dash-muted space-y-1 list-disc list-inside">
                    <li>Vector Store: In-memory document embeddings</li>
                    <li>Knowledge Graph: Concept relationships and traversal</li>
                    <li>Cross-Encoder: Result reranking for relevance</li>
                    <li>LLM: Ollama integration for answer generation</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-dash-accent mb-2">Ranking Algorithm</h3>
                  <ul className="text-dash-muted space-y-1 list-disc list-inside">
                    <li>Exact Match: +100 points</li>
                    <li>Word Frequency: +5 per occurrence</li>
                    <li>Proximity Bonus: +20 for nearby terms</li>
                    <li>Results sorted by score (highest first)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NavItem({ 
  icon, 
  label, 
  active = false, 
  badge, 
  sidebarOpen,
  onClick
}: { 
  icon: React.ReactNode; 
  label: string; 
  active?: boolean; 
  badge?: string;
  sidebarOpen: boolean;
  onClick?: () => void;
}) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
        active ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md" : "hover:bg-dash-surface text-dash-muted hover:text-dash-text"
      )}
    >
      <div className={cn(
        "shrink-0",
        active ? "text-white" : "text-dash-muted group-hover:text-dash-accent"
      )}>
        {React.cloneElement(icon as React.ReactElement<{ size?: number }>, { size: 18 })}
      </div>
      {sidebarOpen && (
        <>
          <span className="text-sm font-medium flex-1 text-left">{label}</span>
          {badge && (
            <span className="px-2 py-0.5 rounded-full bg-dash-accent text-white text-xs font-semibold">
              {badge}
            </span>
          )}
        </>
      )}
    </button>
  );
}


