import { FlaskConical, Moon, Sun, Sparkles, Server, Zap } from 'lucide-react';

export default function Header({ 
  theme, 
  toggleTheme, 
  onLoadPreset, 
  presets, 
  apiStatus, 
  onToggleDemo, 
  isDemoActive 
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
        
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-cyan-500 to-teal-400 text-white shadow-md shadow-cyan-500/20">
            <FlaskConical className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 dark:from-white dark:via-cyan-200 dark:to-slate-200 bg-clip-text text-transparent">
                RESEARCH<span className="text-cyan-600 dark:text-cyan-400">LAB</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
                AI v2.0
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              Student Project Research & Innovation Intelligence
            </p>
          </div>
        </div>

        {/* Quick action controls & Theme toggle */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          
          {/* Quick Preset Selector */}
          <div className="hidden md:flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
            <span className="text-xs font-semibold px-2 text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Presets:
            </span>
            {presets.slice(0, 3).map((p) => (
              <button
                key={p.id}
                onClick={() => onLoadPreset(p)}
                title={`Load "${p.title}"`}
                className="text-xs px-2.5 py-1 rounded-lg font-medium transition-all text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 hover:shadow-xs active:scale-95"
              >
                {p.id.split('-')[0].charAt(0).toUpperCase() + p.id.split('-')[0].slice(1)}
              </button>
            ))}
          </div>

          {/* Quick Demo Preview Toggle */}
          <button
            onClick={onToggleDemo}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all shadow-xs ${
              isDemoActive
                ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700/60 ring-2 ring-amber-400/20'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'
            }`}
            title="Toggle interactive sample showcase data instantly"
          >
            <Zap className={`w-3.5 h-3.5 ${isDemoActive ? 'text-amber-500 fill-amber-500' : 'text-slate-400'}`} />
            <span className="hidden sm:inline">Showcase</span> Demo
          </button>

          {/* API Status Pill */}
          <div
            className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${
              apiStatus === 'online'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
            }`}
            title={apiStatus === 'online' ? 'Connected to Flask API on localhost:5000' : 'Flask offline — app supports instant demo preview'}
          >
            <span className={`w-2 h-2 rounded-full ${apiStatus === 'online' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
            {apiStatus === 'online' ? 'Flask API: Online' : 'Flask: Local/Offline'}
          </div>

          {/* Dark / Light Mode Switch */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark/light theme"
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700/80 transition-all duration-200 active:scale-95 shadow-xs"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600 transition-transform duration-300 rotate-0 hover:-rotate-12" />
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
