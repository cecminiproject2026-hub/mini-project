import React, { useState } from 'react';
import { Lightbulb, CheckCircle2, Circle, AlertCircle, Wrench, Sparkles, TrendingUp } from 'lucide-react';
// Support for recommendation feature
export default function InnovationsTab({ innovations = [] }) {
  const [selectedFeatures, setSelectedFeatures] = useState({});

  const toggleFeature = (index) => {
    setSelectedFeatures((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const getDifficultyBadge = (difficulty = 'Medium') => {
    const d = difficulty.toLowerCase();
    if (d.includes('easy') || d.includes('low')) {
      return 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
    }
    if (d.includes('hard') || d.includes('high')) {
      return 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800';
    }
    return 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800';
  };

  const selectedCount = Object.values(selectedFeatures).filter(Boolean).length;

  return (
    <div className="space-y-6">
      
      {/* Header Banner with Interactive Checklist Tracker */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1.5">
            <Lightbulb className="w-4 h-4" /> Innovation Roadmap
          </div>
          <h3 className="font-extrabold text-slate-900 dark:text-white text-lg">
            Actionable Features to Elevate Project Novelty
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Select recommendations to include in your project implementation milestone checklist.
          </p>
        </div>

        {/* Milestone tracker badge */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700 shrink-0">
          <div className="text-right">
            <span className="text-[11px] text-slate-400 block font-medium">Selected Milestones</span>
            <span className="text-base font-extrabold text-indigo-600 dark:text-indigo-400">
              {selectedCount} <span className="text-xs font-normal text-slate-400">of {innovations.length}</span>
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-950/80 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Innovation Cards Grid */}
      {(!innovations || innovations.length === 0) ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-10 text-center">
          <Lightbulb className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <h4 className="font-bold text-slate-700 dark:text-slate-200 text-sm">No innovation proposals available</h4>
        </div>
      ) : (
        <div className="space-y-4">
          {innovations.map((item, idx) => {
            const isChecked = !!selectedFeatures[idx];

            return (
              <div
                key={idx}
                onClick={() => toggleFeature(idx)}
                className={`cursor-pointer rounded-2xl border p-5 sm:p-6 transition-all duration-200 ${
                  isChecked
                    ? 'bg-indigo-50/40 dark:bg-indigo-950/20 border-indigo-300 dark:border-indigo-700 shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      className="mt-0.5 text-indigo-600 dark:text-indigo-400 focus:outline-hidden"
                      aria-label={isChecked ? 'Deselect milestone' : 'Select milestone'}
                    >
                      {isChecked ? (
                        <CheckCircle2 className="w-5 h-5 fill-indigo-600 text-white dark:fill-indigo-400 dark:text-slate-900" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                      )}
                    </button>

                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">
                        {item.feature}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed sm:text-sm">
                        {item.why}
                      </p>
                    </div>
                  </div>

                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border shrink-0 ${getDifficultyBadge(item.difficulty)}`}>
                    {item.difficulty} Difficulty
                  </span>
                </div>

                {/* Addressed Problem Banner */}
                {item.problem && (
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5 text-amber-500" />
                      <span><strong>Solves:</strong> {item.problem}</span>
                    </span>

                    <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">
                      {isChecked ? '✓ Added to Roadmap' : '+ Click card to adopt'}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}