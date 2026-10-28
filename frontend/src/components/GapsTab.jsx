import React from 'react';
import { Target, Compass, Sparkles, HelpCircle, Check, ArrowRight } from 'lucide-react';

export default function GapsTab({ gaps = [], setTab }) {
  return (
    <div className="space-y-6">
      
      {/* Intro Header Card */}
      <div className="bg-gradient-to-br from-indigo-500/10 via-cyan-500/5 to-transparent border border-indigo-200/60 dark:border-indigo-800/60 rounded-2xl p-5 sm:p-6">
        <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
          <Compass className="w-4 h-4" /> Research Opportunity Synthesis
        </div>
        <h3 className="font-extrabold text-slate-900 dark:text-white text-lg">
          Unaddressed Research Gaps in Contemporary Literature
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
          These research gaps are synthesized from the intersection of your project problem statement and the limitations documented in retrieved papers. Use these to frame your problem formulation and project novelty defense.
        </p>
      </div>

      {/* Gaps List */}
      {(!gaps || gaps.length === 0) ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-10 text-center">
          <Compass className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <h4 className="font-bold text-slate-700 dark:text-slate-200 text-sm">No research gaps synthesized</h4>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Provide a more detailed project description to help the AI identify specific experimental opportunities.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {gaps.map((gap, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs transition-all hover:border-indigo-300 dark:hover:border-indigo-700"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
                    {idx + 1}
                  </span>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">
                    {gap.title || `Research Gap ${idx + 1}`}
                  </h4>
                </div>

                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200/60 dark:border-cyan-800/60 self-start sm:self-auto">
                  High Defense Value
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed sm:text-sm">
                {gap.description}
              </p>

              {gap.basis && (
                <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> Synthesis Rationale:
                  </span>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                    {gap.basis}
                  </p>
                </div>
              )}

              {/* Action Plan */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                  <Check className="w-4 h-4" />
                  <span>Target for Experimental Evaluation Chapter</span>
                </div>

                <button
                  onClick={() => setTab('Innovation')}
                  className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  View Solution Innovations <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
