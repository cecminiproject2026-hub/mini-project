import React from 'react';
import { Award, ShieldAlert, CheckCircle2, TrendingUp, HelpCircle, Layers } from 'lucide-react';

export default function EvaluationTab({ score = {}, explanations = {} }) {
  const scoreEntries = Object.entries(score);
  const totalScore = scoreEntries.length
    ? Math.round(scoreEntries.reduce((acc, [, val]) => acc + val, 0) / scoreEntries.length)
    : 0;

  const getScoreColor = (val) => {
    if (val >= 80) return 'from-emerald-500 to-teal-500';
    if (val >= 70) return 'from-indigo-500 to-cyan-500';
    if (val >= 60) return 'from-cyan-500 to-blue-500';
    return 'from-amber-500 to-orange-500';
  };

  const getScoreBadge = (val) => {
    if (val >= 80) return 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800';
    if (val >= 70) return 'text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800';
    return 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800';
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner with Composite Score */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1.5">
            <Award className="w-4 h-4" /> Multi-Dimensional Evaluation Index
          </div>
          <h3 className="font-extrabold text-slate-900 dark:text-white text-xl">
            Heuristic Innovation Readiness Assessment
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl leading-relaxed">
            Composite evaluation calculated across five academic parameters. Scores provide indicative benchmarks for thesis defense and research positioning.
          </p>
        </div>

        {/* Big circular or pill composite badge */}
        <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-700 shrink-0">
          <div className="text-right">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Overall Index</span>
            <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
              {totalScore}
              <span className="text-base font-normal text-slate-400">/100</span>
            </span>
          </div>
          <div className="h-12 w-px bg-slate-200 dark:bg-slate-700" />
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-900 dark:text-white block">Status: Strong</span>
            <span>Feasible with Gaps</span>
          </div>
        </div>
      </div>

      {/* 5 Dimension Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {scoreEntries.map(([metric, val]) => {
          const formattedName = metric.replaceAll('_', ' ');
          const explanation = explanations[metric] || 'Prototype heuristic based on project description and literature overlap.';

          return (
            <div
              key={metric}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs transition-all hover:border-slate-300 dark:hover:border-slate-700"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-slate-900 dark:text-white capitalize text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  {formattedName}
                </h4>

                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${getScoreBadge(val)}`}>
                  {val}/100
                </span>
              </div>

              {/* Animated Progress Bar */}
              <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden my-3">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${getScoreColor(val)} transition-all duration-700 ease-out`}
                  style={{ width: `${val}%` }}
                />
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-2">
                {explanation}
              </p>
            </div>
          );
        })}
      </div>

      {/* Scientific Transparency Disclaimer */}
      <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 flex items-start gap-3 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
        <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-700 dark:text-slate-300">Methodology & Transparency Notice:</strong> These evaluation scores are heuristic AI-assisted prototype indicators generated to help students spot weak areas early. They are not scientifically validated psychometric measurements. Crucially, <em>novelty is not calculated merely as 100 minus semantic similarity</em>, because two projects addressing the same domain can possess entirely novel architectures.
        </div>
      </div>

    </div>
  );
}
