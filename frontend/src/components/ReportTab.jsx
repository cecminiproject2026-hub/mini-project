import React, { useState } from 'react';
import { 
  Printer, Download, Copy, Check, FileText, 
  Sparkles, CheckCircle2, Award, Calendar, Layers 
} from 'lucide-react';

export default function ReportTab({ data, form }) {
  const [copied, setCopied] = useState(false);
  const score = data?.evaluation || {};
  const gaps = data?.research_gaps || [];
  const innovations = data?.innovations || [];
  const papers = data?.papers || [];

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const payload = {
      project: form,
      analysis: data,
      generated_at: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${form.title.toLowerCase().replace(/\s+/g, '_')}_analysis_report.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyMarkdown = () => {
    const md = `# Research & Innovation Analysis Report
**Project Title:** ${form.title}  
**Domain:** ${form.domain} | **Level:** ${form.project_level}  
**Technologies:** ${form.technologies.join(', ')}  
**Date:** ${new Date().toLocaleDateString()}

## Problem Description
${form.description}

## Potential Research Gaps
${gaps.map((g, i) => `${i + 1}. **${g.title}**: ${g.description}`).join('\n')}

## Recommended Innovations
${innovations.map((inv, i) => `${i + 1}. **${inv.feature}** (${inv.difficulty}): ${inv.why} (Solves: ${inv.problem})`).join('\n')}

## Evaluation Scores
${Object.entries(score).map(([k, v]) => `- **${k.replace('_', ' ')}**: ${v}/100`).join('\n')}

## Primary Research Sources
${papers.map((p, i) => `${i + 1}. *${p.title}* (${p.year || 'n.d.'}) - Similarity: ${p.similarity_score || p.score}%\n   ${p.url || 'No URL'}`).join('\n')}
`;

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Action Toolbar */}
      <div className="no-print bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-500" />
            Executive Innovation Report
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Formatted summary ready for review meetings, advisor consultation, and PDF export.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Print PDF Button */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-xs font-bold transition-all shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>

          {/* Copy Markdown */}
          <button
            onClick={handleCopyMarkdown}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 text-xs font-semibold transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-500">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Markdown</span>
              </>
            )}
          </button>

          {/* Download JSON */}
          <button
            onClick={handleDownloadJSON}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 text-xs font-semibold transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>JSON</span>
          </button>
        </div>
      </div>

      {/* Printable Report Document Sheet */}
      <div className="print-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-sm text-slate-900 dark:text-white space-y-8">
        
        {/* Document Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-widest font-extrabold text-indigo-600 dark:text-indigo-400">
                ResearchLab AI Report
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {form.project_level}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {form.title}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Domain: <strong className="text-slate-800 dark:text-slate-200">{form.domain}</strong>
            </p>
          </div>

          <div className="text-left sm:text-right text-xs text-slate-400 shrink-0">
            <p>Generated: {new Date().toLocaleDateString()}</p>
            <p className="mt-0.5">Source: OpenAlex & Semantic Scholar</p>
          </div>
        </div>

        {/* Executive Problem Statement */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            1. Problem Statement & Scope
          </h2>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {form.description}
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5 items-center">
            <span className="text-xs text-slate-400 font-medium mr-1">Target Stack:</span>
            {form.technologies.map((t, i) => (
              <span
                key={i}
                className="text-xs px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-mono text-slate-700 dark:text-slate-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Synthesized Research Gaps */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            2. Identified Research Gaps & Novelty Potential
          </h2>
          <div className="space-y-3">
            {gaps.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No specific gap synthesis records.</p>
            ) : (
              gaps.map((g, i) => (
                <div key={i} className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 text-xs">
                  <b className="text-slate-900 dark:text-white block mb-1">
                    {g.title}
                  </b>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {g.description}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Suggested Innovations */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            3. Proposed Engineering Innovations
          </h2>
          <div className="space-y-2.5">
            {innovations.map((inv, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 text-xs flex items-start gap-3"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <b className="text-slate-900 dark:text-white">{inv.feature}</b>{' '}
                  <span className="text-slate-400 text-[11px]">({inv.difficulty} Difficulty)</span>
                  <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {inv.why}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Evaluation Metrics Matrix */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            4. Evaluation Readiness Breakdown
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {Object.entries(score).map(([k, v]) => (
              <div
                key={k}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-center"
              >
                <span className="text-[10px] uppercase font-bold text-slate-400 block truncate">
                  {k.replace('_', ' ')}
                </span>
                <span className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1 block">
                  {v}/100
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Primary Research Citations */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            5. Primary Literature Citations & Similarity
          </h2>
          <div className="space-y-2 text-xs divide-y divide-slate-100 dark:divide-slate-800">
            {papers.map((p, i) => (
              <div key={i} className="pt-2 flex items-baseline justify-between gap-4">
                <span className="text-slate-700 dark:text-slate-300">
                  [{i + 1}] {p.title} ({p.year || 'n.d.'}) · {p.source}
                </span>
                <span className="font-bold text-cyan-600 dark:text-cyan-400 shrink-0">
                  {p.similarity_score || p.score}% match
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-400 text-center leading-relaxed">
          {data.notice || 'Similarity is semantic vector closeness, not novelty. Heuristics are AI-assisted prototype estimations.'}
        </div>

      </div>

    </div>
  );
}
