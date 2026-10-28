import React from 'react';
import { ExternalLink, Search, Sparkles, Code2, ShieldAlert, CheckCircle2 } from 'lucide-react';
import GithubIcon from './GithubIcon';

export default function ProjectsTab({ form }) {
  const query = `${form.title} ${form.technologies.slice(0, 3).join(' ')}`;
  const ghSearchUrl = `https://github.com/search?q=${encodeURIComponent(query)}&type=repositories`;
  
  const suggestedQueries = [
    `${form.domain} benchmark repository`,
    `${form.technologies[0] || 'Python'} ${form.domain} implementation`,
    `${form.title.split(' ').slice(0, 4).join(' ')} open source`
  ];

  return (
    <div className="space-y-6">
      
      {/* Main card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                <GithubIcon className="w-5 h-5" />
              </span>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                Open Source & Repository Discovery
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
              To avoid hallucinating non-existent repositories or fabricating benchmark claims, ResearchLab links you directly to verified live open-source projects and codebases.
            </p>
          </div>

          <a
            href={ghSearchUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-xs font-bold transition-all shadow-xs shrink-0"
          >
            <span>Search GitHub Live</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Live Search Launcher */}
        <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Code2 className="w-5 h-5 text-indigo-500 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Active Discovery Query</p>
                <p className="text-xs font-mono text-indigo-600 dark:text-indigo-400 mt-0.5 break-all">
                  "{query}"
                </p>
              </div>
            </div>

            <a
              href={ghSearchUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto text-center inline-flex justify-center items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              Execute Live Query
            </a>
          </div>
        </div>

        {/* Suggested Queries */}
        <div className="mt-5">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
            Recommended GitHub Search Paths
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {suggestedQueries.map((sq, i) => (
              <a
                key={i}
                href={`https://github.com/search?q=${encodeURIComponent(sq)}&type=repositories`}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all text-xs group"
              >
                <div className="flex items-center justify-between text-slate-400 group-hover:text-indigo-500">
                  <span className="text-[10px] uppercase font-bold tracking-wider">Path 0{i + 1}</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
                <p className="font-semibold text-slate-800 dark:text-slate-200 mt-1 line-clamp-1">
                  {sq}
                </p>
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Engineering Best Practice Checklist */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
        <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-3 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          Recommended Open Source Architecture for "{form.title}"
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <b className="text-slate-900 dark:text-white">1. Modular Dataset Loader</b>
            <p className="text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Separate your data collection and pre-processing pipeline so future ablation studies can substitute new test splits effortlessly.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <b className="text-slate-900 dark:text-white">2. Standalone Benchmark Script</b>
            <p className="text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Include an automated Python script that logs latency (ms), parameter count, and F1-score to make your academic evaluation easily reproducible.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
