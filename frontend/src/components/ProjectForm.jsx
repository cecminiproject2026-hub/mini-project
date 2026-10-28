import React, { useState } from 'react';
import { 
  ArrowRight, 
  LoaderCircle, 
  Sparkles, 
  Tag, 
  X, 
  Plus, 
  Layers, 
  BookOpen, 
  FileText, 
  Zap,
  RotateCcw
} from 'lucide-react';
import { DOMAINS, PROJECT_LEVELS, POPULAR_TECH_TAGS, PRESET_PROJECTS } from '../data/presets';

export default function ProjectForm({
  form,
  onChange,
  onSubmit,
  busy,
  error,
  onLoadPreset,
  onUseDemo
}) {
  const [techInput, setTechInput] = useState('');

  const handleAddTech = (tech) => {
    const clean = tech.trim();
    if (clean && !form.technologies.includes(clean)) {
      onChange('technologies', [...form.technologies, clean]);
    }
    setTechInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTech(techInput);
    }
  };

  const removeTech = (indexToRemove) => {
    onChange(
      'technologies',
      form.technologies.filter((_, i) => i !== indexToRemove)
    );
  };

  return (
    <aside className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm shadow-slate-200/40 dark:shadow-none transition-colors duration-200 relative lg:sticky lg:top-20 z-10">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-500" />
            Project Setup
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Define your technical problem statement
          </p>
        </div>

        {/* Quick Reset to defaults */}
        <button
          type="button"
          onClick={() => onLoadPreset(PRESET_PROJECTS[0])}
          className="text-xs text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Reset to default project"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Quick Ideas Chips */}
      <div className="mb-5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" /> Quick Templates
          </span>
          <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">1-Click Fill</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {PRESET_PROJECTS.map((preset) => {
            const isSelected = form.title === preset.title;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => onLoadPreset(preset)}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-700/80 text-slate-700 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-600 border border-slate-200 dark:border-slate-600'
                }`}
              >
                {preset.domain}
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        
        {/* Project Title */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
            Project Title <span className="text-rose-500">*</span>
          </label>
          <input
            required
            type="text"
            value={form.title}
            onChange={(e) => onChange('title', e.target.value)}
            placeholder="e.g., AI-Powered Waste Segregation System"
            className="w-full text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 px-3.5 py-2.5 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
          />
        </div>

        {/* Project Description */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Description / Abstract <span className="text-rose-500">*</span>
            </label>
            <span className="text-[11px] text-slate-400">
              {form.description.length} chars
            </span>
          </div>
          <textarea
            required
            rows={4}
            value={form.description}
            onChange={(e) => onChange('description', e.target.value)}
            placeholder="Clearly describe the objective, approach, and target architecture..."
            className="w-full text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 p-3 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all resize-none leading-relaxed"
          />
        </div>

        {/* Domain & Project Level Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
              Domain
            </label>
            <select
              value={form.domain}
              onChange={(e) => onChange('domain', e.target.value)}
              className="w-full text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 px-3 py-2.5 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
            >
              {DOMAINS.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
              Level
            </label>
            <select
              value={form.project_level}
              onChange={(e) => onChange('project_level', e.target.value)}
              className="w-full text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 px-3 py-2.5 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
            >
              {PROJECT_LEVELS.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Technologies - Interactive Tags */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
            Key Technologies & Frameworks
          </label>
          
          <div className="flex gap-1.5 mb-2">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add tech & press Enter (e.g. PyTorch)"
              className="flex-1 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 px-3 py-2 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
            />
            <button
              type="button"
              onClick={() => handleAddTech(techInput)}
              className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>

          {/* Active Tags */}
          <div className="flex flex-wrap gap-1.5 min-h-[32px] p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/50">
            {form.technologies.length === 0 ? (
              <span className="text-xs text-slate-400 italic">No technologies added yet</span>
            ) : (
              form.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 group animate-fadeIn"
                >
                  <Tag className="w-2.5 h-2.5 opacity-60" />
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTech(idx)}
                    className="hover:text-rose-500 dark:hover:text-rose-400 p-0.5 rounded-full"
                    title={`Remove ${tech}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))
            )}
          </div>

          {/* Suggested Tech Pills */}
          <div className="mt-2 flex flex-wrap gap-1 items-center">
            <span className="text-[10px] text-slate-400 font-medium mr-1">Suggestions:</span>
            {POPULAR_TECH_TAGS.slice(0, 7).map((tech) => (
              <button
                key={tech}
                type="button"
                onClick={() => handleAddTech(tech)}
                disabled={form.technologies.includes(tech)}
                className={`text-[11px] px-2 py-0.5 rounded-md font-medium transition-colors ${
                  form.technologies.includes(tech)
                    ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                +{tech}
              </button>
            ))}
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={busy}
            className="w-full relative group overflow-hidden bg-gradient-to-r from-indigo-600 via-indigo-700 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white rounded-xl py-3.5 px-4 font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-600/25 transition-all duration-200 active:scale-[0.98] disabled:opacity-75 disabled:cursor-wait"
          >
            {busy ? (
              <>
                <LoaderCircle className="w-4 h-4 animate-spin" />
                <span>Searching & Computing Similarity...</span>
              </>
            ) : (
              <>
                <span>ANALYZE RESEARCH & INNOVATION</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </div>

      </form>

      {/* Error alert with fallback suggestion */}
      {error && (
        <div className="mt-4 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs">
          <p className="font-semibold mb-1">Backend Connection Notice:</p>
          <p className="mb-2 leading-relaxed">{error}</p>
          <button
            type="button"
            onClick={onUseDemo}
            className="w-full py-1.5 px-3 rounded-lg bg-rose-600 text-white font-medium hover:bg-rose-700 flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <Zap className="w-3.5 h-3.5" />
            Switch to Interactive Demo Showcase
          </button>
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 dark:text-slate-500 flex items-start gap-1.5 leading-relaxed">
        <Sparkles className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
        <span>
          Queries OpenAlex & Semantic Scholar APIs with sentence-transformer embeddings.
        </span>
      </div>

    </aside>
  );
}
