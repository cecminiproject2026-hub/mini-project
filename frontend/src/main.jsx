import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  LayoutDashboard, 
  BookOpen, 
  Database,
  FileSpreadsheet, 
  AlertTriangle, 
  Compass, 
  Lightbulb, 
  Award, 
  FileText, 
  Search, 
  Sparkles, 
  ArrowRight, 
  Zap, 
  Check, 
  Layers,
  FlaskConical
} from 'lucide-react';

import './index.css';
import { PRESET_PROJECTS } from './data/presets';
import Header from './components/Header';
import ProjectForm from './components/ProjectForm';
import GithubIcon from './components/GithubIcon';
import OverviewTab from './components/OverviewTab';
import PapersTab from './components/PapersTab';
import DatasetsTab from './components/DatasetsTab';
import ComparisonTab from './components/ComparisonTab';
import ProjectsTab from './components/ProjectsTab';
import LimitationsTab from './components/LimitationsTab';
import GapsTab from './components/GapsTab';
import InnovationsTab from './components/InnovationsTab';
import EvaluationTab from './components/EvaluationTab';
import ReportTab from './components/ReportTab';

const API = import.meta.env.VITE_API_URL || '';

function App() {
  // Theme state
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('researchlab_theme');
    if (saved) return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Project form state
  const [form, setForm] = useState({
    title: PRESET_PROJECTS[0].title,
    description: PRESET_PROJECTS[0].description,
    domain: PRESET_PROJECTS[0].domain,
    technologies: [...PRESET_PROJECTS[0].technologies],
    project_level: PRESET_PROJECTS[0].project_level
  });

  const [data, setData] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [tab, setTab] = useState('Overview');
  const [apiStatus, setApiStatus] = useState('checking');
  const [isDemoActive, setIsDemoActive] = useState(false);

  // Sync theme to document
  useEffect(() => {
    localStorage.setItem('researchlab_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [theme]);

  // Check Flask API health on mount
  useEffect(() => {
    fetch(`${API}/api/health`)
      .then((res) => {
        if (res.ok) setApiStatus('online');
        else setApiStatus('offline');
      })
      .catch(() => setApiStatus('offline'));
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleUpdateForm = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // Load preset project into form
  const handleLoadPreset = (preset) => {
    setForm({
      title: preset.title,
      description: preset.description,
      domain: preset.domain,
      technologies: [...preset.technologies],
      project_level: preset.project_level
    });
    setError('');

    // If demo showcase is currently open or user wants preview, load preset analysis
    if (isDemoActive || !data) {
      setData(preset.sampleAnalysis);
      setIsDemoActive(true);
      setTab('Overview');
    }
  };

  // Toggle sample demo showcase data
  const handleToggleDemo = () => {
    if (isDemoActive) {
      setIsDemoActive(false);
      setData(null);
    } else {
      const match = PRESET_PROJECTS.find((p) => p.title === form.title) || PRESET_PROJECTS[0];
      setData(match.sampleAnalysis);
      setIsDemoActive(true);
      setError('');
      setTab('Overview');
    }
  };

  // Analyze via Flask backend
  const handleRunAnalysis = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setBusy(true);
    setError('');
    setIsDemoActive(false);

    try {
      const response = await fetch(`${API}/api/project/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error || 'Project analysis request failed.');
      setData(json);
      setTab('Overview');
      setApiStatus('online');
    } catch (err) {
      setError(`${err.message} — Check that Flask is running${API ? ` at ${API}` : ' and restart the Vite dev server'}, or use Demo Showcase.`);
      setApiStatus('offline');
    } finally {
      setBusy(false);
    }
  };

  // Tab definitions with icons and live counters
  const tabsList = [
    { id: 'Overview', label: 'Overview', icon: LayoutDashboard, count: null },
    { id: 'Research Papers', label: 'Research Papers', icon: BookOpen, count: data?.papers?.length },
    { id: 'Datasets', label: 'Datasets', icon: Database, count: null },
    { id: 'Paper Comparison', label: 'Paper Comparison', icon: FileSpreadsheet, count: data?.comparison?.length },
    { id: 'Existing Projects', label: 'Existing Projects', icon: GithubIcon, count: null },
    { id: 'Limitations', label: 'Limitations', icon: AlertTriangle, count: data?.limitations?.length },
    { id: 'Research Gaps', label: 'Research Gaps', icon: Compass, count: data?.research_gaps?.length },
    { id: 'Innovation', label: 'Innovation', icon: Lightbulb, count: data?.innovations?.length },
    { id: 'Evaluation', label: 'Evaluation', icon: Award, count: null },
    { id: 'Final Report', label: 'Final Report', icon: FileText, count: null }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* Top Navigation Bar */}
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        presets={PRESET_PROJECTS}
        onLoadPreset={handleLoadPreset}
        apiStatus={apiStatus}
        onToggleDemo={handleToggleDemo}
        isDemoActive={isDemoActive}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1 w-full">
        
        {/* Hero Section */}
        <section className="mb-8 relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900/10 via-cyan-900/10 to-indigo-900/5 dark:from-indigo-950/40 dark:via-cyan-950/30 dark:to-slate-900/40 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100/80 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-widest mb-3 border border-indigo-200/60 dark:border-indigo-800/60">
              <Sparkles className="w-3.5 h-3.5" />
              Research · Compare · Validate · Innovate
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
              Turn student project ideas into{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-cyan-600 to-teal-500 dark:from-indigo-400 dark:via-cyan-300 dark:to-teal-300 bg-clip-text text-transparent">
                research-driven innovation.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
              Discover real academic papers from OpenAlex and Semantic Scholar, rank semantic similarity, synthesize critical research gaps, and build defensible capstone innovations.
            </p>

            {/* Quick feature tags */}
            <div className="flex flex-wrap gap-2 mt-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/70 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60">
                <Check className="w-3.5 h-3.5 text-cyan-500" /> Vector Cosine Ranking
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/70 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60">
                <Check className="w-3.5 h-3.5 text-indigo-500" /> Literature Matrix Table
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/70 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60">
                <Check className="w-3.5 h-3.5 text-emerald-500" /> Print-Ready Report
              </span>
            </div>
          </div>
        </section>

        {/* 2-Column Responsive Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 items-start">
          
          {/* Left Column: Project Setup Form */}
          <ProjectForm
            form={form}
            onChange={handleUpdateForm}
            onSubmit={handleRunAnalysis}
            busy={busy}
            error={error}
            onLoadPreset={handleLoadPreset}
            onUseDemo={handleToggleDemo}
          />

          {/* Right Column: Interactive Results Hub */}
          <section className="min-w-0 space-y-5">
            
            {/* Quick Access Tab Bar */}
            <div className="no-print bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-2 shadow-xs overflow-x-auto">
              <nav className="flex space-x-1 min-w-max" aria-label="Analysis Tabs">
                {tabsList.map((t) => {
                  const Icon = t.icon;
                  const isActive = tab === t.id;

                  return (
                    <button
                      key={t.id}
                      onClick={() => setTab(t.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-150 ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{t.label}</span>
                      {typeof t.count === 'number' && (
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {t.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Content Display: Empty Welcome Screen OR Active Tab */}
            {!data ? (
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 sm:p-12 text-center shadow-xs">
                <div className="inline-flex p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 mb-4 ring-8 ring-indigo-50/50 dark:ring-indigo-950/30">
                  <FlaskConical className="w-8 h-8" />
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Your Research Workspace is Ready
                </h2>

                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-2 leading-relaxed">
                  Submit your problem statement to retrieve verified research papers from OpenAlex and Semantic Scholar, rank semantic closeness, and unlock transparent heuristic evaluations.
                </p>

                {/* 3 Step Onboarding Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-8 text-left max-w-2xl mx-auto">
                  <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">Step 01</span>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white mt-1">Discover Research</h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      Retrieve peer-reviewed literature across public indexes.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                    <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">Step 02</span>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white mt-1">Compare Methods</h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      Inspect dataset sizes, models, and benchmark gaps.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Step 03</span>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white mt-1">Defend Innovation</h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      Export executive PDF reports for advisors and reviews.
                    </p>
                  </div>
                </div>

                {/* Instant Try Demo Button */}
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={handleToggleDemo}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition-all active:scale-95"
                  >
                    <Zap className="w-4 h-4 fill-white" />
                    <span>Explore Interactive Demo Showcase</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                
                {/* Active Demo Badge if in showcase mode */}
                {isDemoActive && (
                  <div className="no-print p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/80 flex items-center justify-between text-xs text-amber-800 dark:text-amber-200">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>
                        <strong>Demo Showcase Active:</strong> Showing interactive sample analysis for "{form.title}".
                      </span>
                    </div>
                    <button
                      onClick={handleRunAnalysis}
                      disabled={busy}
                      className="font-bold underline hover:text-amber-950 dark:hover:text-white ml-2"
                    >
                      Run Live API Analysis →
                    </button>
                  </div>
                )}

                {/* Tab Views */}
                {tab === 'Overview' && (
                  <OverviewTab 
                    data={data} 
                    form={form} 
                    theme={theme} 
                    setTab={setTab} 
                  />
                )}

                {tab === 'Research Papers' && (
                  <PapersTab papers={data.papers} />
                )}

                {tab === 'Datasets' && (
                  <DatasetsTab form={form} />
                )}

                {tab === 'Paper Comparison' && (
                  <ComparisonTab comparison={data.comparison} />
                )}

                {tab === 'Existing Projects' && (
                  <ProjectsTab form={form} />
                )}

                {tab === 'Limitations' && (
                  <LimitationsTab limitations={data.limitations} />
                )}

                {tab === 'Research Gaps' && (
                  <GapsTab gaps={data.research_gaps} setTab={setTab} />
                )}

                {tab === 'Innovation' && (
                  <InnovationsTab innovations={data.innovations} />
                )}

                {tab === 'Evaluation' && (
                  <EvaluationTab 
                    score={data.evaluation} 
                    explanations={data.evaluation_explanations} 
                  />
                )}

                {tab === 'Final Report' && (
                  <ReportTab data={data} form={form} />
                )}

                {/* Transparency Notice Footer */}
                {data.notice && (
                  <p className="no-print text-xs text-slate-400 dark:text-slate-500 text-center pt-2">
                    {data.notice}
                  </p>
                )}

              </div>
            )}

          </section>

        </div>

      </main>

      {/* Footer */}
      <footer className="no-print mt-12 border-t border-slate-200/80 dark:border-slate-800/80 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            ResearchLab AI — Student Project Research & Innovation Intelligence Platform
          </p>
          <p className="text-slate-400 dark:text-slate-500">
            Powered by Semantic Scholar, OpenAlex & Sentence Transformers
          </p>
        </div>
      </footer>

    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);