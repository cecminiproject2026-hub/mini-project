import React from 'react';
import { AlertTriangle, ShieldCheck, Info, CheckCircle2 } from 'lucide-react';

export default function LimitationsTab({ limitations = [] }) {
  return (
    <div className="space-y-5">
      
      {/* Informational Banner */}
      <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
          <p className="font-bold mb-1">Transparent AI Heuristic Notice:</p>
          <p>
            These limitation signals are detected via transparent phrase matching against retrieved public abstracts (e.g. phrases indicating "small dataset", "computational cost", or "lighting robustness"). They highlight common architectural bottlenecks in similar papers so you can design solutions before final project defense.
          </p>
        </div>
      </div>

      {/* Limitations Cards */}
      {(!limitations || limitations.length === 0) ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-10 text-center">
          <ShieldCheck className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
          <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">
            No clear limitation keywords detected
          </h4>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Retrieved abstracts do not contain common bottleneck phrases. We recommend reviewing the full paper PDFs for specialized experimental caveats.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {limitations.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs transition-all hover:border-amber-300 dark:hover:border-amber-700/80"
            >
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white capitalize text-sm">
                    {item.theme || 'Bottleneck Area'}
                  </h4>
                </div>

                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300">
                  {item.type ? 'AI Detected' : 'Heuristic'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 my-3">
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  "{item.evidence || item.description || 'Keyword detected in abstract corpus.'}"
                </p>
              </div>

              {/* Student Defense Advice */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Mitigation:</strong> Document this risk in your methodology chapter and present proactive ablation tests.
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
