import React, { useState } from 'react';
import { Download, Search, ExternalLink, HelpCircle, FileSpreadsheet } from 'lucide-react';

export default function ComparisonTab({ comparison = [] }) {
  const [filterText, setFilterText] = useState('');

  const filtered = comparison.filter((item) => {
    if (!filterText.trim()) return true;
    const q = filterText.toLowerCase();
    return (
      (item.title || '').toLowerCase().includes(q) ||
      (item.methodology || '').toLowerCase().includes(q) ||
      (item.dataset || '').toLowerCase().includes(q) ||
      (item.limitations || '').toLowerCase().includes(q)
    );
  });

  const exportToCSV = () => {
    const headers = ['Title', 'Year', 'Source', 'Methodology', 'Dataset', 'Limitations'];
    const rows = filtered.map((p) => [
      `"${(p.title || '').replace(/"/g, '""')}"`,
      `"${p.year || ''}"`,
      `"${p.source || ''}"`,
      `"${(p.methodology || 'Unavailable').replace(/"/g, '""')}"`,
      `"${(p.dataset || 'Unavailable').replace(/"/g, '""')}"`,
      `"${(p.limitations || 'Unavailable').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'paper_comparison_matrix.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs">
      
      {/* Title & Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-indigo-500" />
            Literature Comparison Matrix
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Comparative analysis of methodologies, datasets, and limitations
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Quick Table Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder="Filter matrix..."
              className="text-xs pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden"
            />
          </div>

          {/* Export CSV button */}
          <button
            onClick={exportToCSV}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 transition-colors"
            title="Download literature matrix as CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto rounded-xl border border-slate-200/80 dark:border-slate-800">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 uppercase tracking-wider font-semibold border-b border-slate-200/80 dark:border-slate-800">
            <tr>
              <th className="p-3.5 min-w-[220px]">Paper Title</th>
              <th className="p-3.5 min-w-[70px]">Year</th>
              <th className="p-3.5 min-w-[160px]">Methodology</th>
              <th className="p-3.5 min-w-[150px]">Dataset</th>
              <th className="p-3.5 min-w-[200px]">Limitations</th>
              <th className="p-3.5 min-w-[90px] text-right">Source</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-400 italic">
                  No papers matching your filter
                </td>
              </tr>
            ) : (
              filtered.map((p, idx) => (
                <tr 
                  key={idx}
                  className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="p-3.5 font-medium text-slate-900 dark:text-white">
                    <div className="line-clamp-2" title={p.title}>{p.title}</div>
                  </td>

                  <td className="p-3.5 text-slate-500 dark:text-slate-400">
                    {p.year || '—'}
                  </td>

                  <td className="p-3.5">
                    {p.methodology && p.methodology !== 'Information unavailable' ? (
                      <span className="font-medium text-indigo-600 dark:text-indigo-400">
                        {p.methodology}
                      </span>
                    ) : (
                      <span className="text-slate-400 italic">Unavailable in abstract</span>
                    )}
                  </td>

                  <td className="p-3.5">
                    {p.dataset && p.dataset !== 'Information unavailable' ? (
                      <span className="font-medium text-slate-800 dark:text-slate-200">
                        {p.dataset}
                      </span>
                    ) : (
                      <span className="text-slate-400 italic">Unavailable</span>
                    )}
                  </td>

                  <td className="p-3.5">
                    {p.limitations && p.limitations !== 'Information unavailable' ? (
                      <span className="text-rose-600 dark:text-rose-400 font-medium">
                        {p.limitations}
                      </span>
                    ) : (
                      <span className="text-slate-400 italic">Verify in full text</span>
                    )}
                  </td>

                  <td className="p-3.5 text-right">
                    {p.url ? (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
                      >
                        {p.source || 'Link'} <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-slate-400">{p.source || '—'}</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Table Note */}
      <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
        <HelpCircle className="w-3.5 h-3.5 shrink-0" />
        <span>
          Information extraction is performed heuristically from retrieved public abstracts. Full PDF papers should be examined for precise ablation studies.
        </span>
      </div>

    </div>
  );
}
