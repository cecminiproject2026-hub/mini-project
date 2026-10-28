import React, { useState, useMemo } from 'react';
import { 
  Search, ExternalLink, Copy, Check, Filter, 
  Calendar, Users, BookOpen, ChevronDown, ChevronUp, Sparkles 
} from 'lucide-react';

export default function PapersTab({ papers = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [minScore, setMinScore] = useState(0);
  const [sortBy, setSortBy] = useState('score-desc');
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const filteredPapers = useMemo(() => {
    return papers
      .filter((p) => {
        const score = p.similarity_score || p.score || 0;
        if (score < minScore) return false;
        if (!searchTerm.trim()) return true;
        const term = searchTerm.toLowerCase();
        const titleMatch = (p.title || '').toLowerCase().includes(term);
        const abstractMatch = (p.abstract || '').toLowerCase().includes(term);
        const authorMatch = (p.authors || []).some((a) => a.toLowerCase().includes(term));
        return titleMatch || abstractMatch || authorMatch;
      })
      .sort((a, b) => {
        const scoreA = a.similarity_score || a.score || 0;
        const scoreB = b.similarity_score || b.score || 0;
        const yearA = parseInt(a.year) || 0;
        const yearB = parseInt(b.year) || 0;

        if (sortBy === 'score-desc') return scoreB - scoreA;
        if (sortBy === 'score-asc') return scoreA - scoreB;
        if (sortBy === 'year-desc') return yearB - yearA;
        if (sortBy === 'year-asc') return yearA - yearB;
        if (sortBy === 'title') return (a.title || '').localeCompare(b.title || '');
        return 0;
      });
  }, [papers, searchTerm, minScore, sortBy]);

  const handleCopyCitation = (paper, index) => {
    const authors = (paper.authors || []).join(', ') || 'Unknown Authors';
    const text = `${authors} (${paper.year || 'n.d.'}). "${paper.title}". ${paper.source || 'Research Repository'}. ${paper.url || ''}`;
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getScoreColor = (score) => {
    if (score >= 75) return 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
    if (score >= 50) return 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800';
    return 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700';
  };

  return (
    <div className="space-y-5">
      
      {/* Search & Filter Toolbar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          
          {/* Keyword Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search papers, authors, topics..."
              className="w-full text-xs pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            
            {/* Min Similarity Filter */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <Filter className="w-3.5 h-3.5" />
              <span>Match:</span>
              <select
                value={minScore}
                onChange={(e) => setMinScore(Number(e.target.value))}
                className="text-xs py-1.5 px-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-hidden"
              >
                <option value={0}>All Scores</option>
                <option value={50}>≥ 50% Match</option>
                <option value={70}>≥ 70% High Match</option>
                <option value={80}>≥ 80% Peak Match</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs py-1.5 px-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-hidden"
              >
                <option value="score-desc">Similarity (High → Low)</option>
                <option value="score-asc">Similarity (Low → High)</option>
                <option value="year-desc">Year (Newest First)</option>
                <option value="year-asc">Year (Oldest First)</option>
                <option value="title">Title (A - Z)</option>
              </select>
            </div>

          </div>

        </div>

        {/* Results Counter */}
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Showing {filteredPapers.length} of {papers.length} retrieved papers</span>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Clear search filter
            </button>
          )}
        </div>
      </div>

      {/* Papers List */}
      {filteredPapers.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-10 text-center">
          <BookOpen className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <h4 className="font-bold text-slate-700 dark:text-slate-200 text-sm">No matching research papers</h4>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search terms or lowering the similarity threshold filter.
          </p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {filteredPapers.map((paper, idx) => {
            const isExpanded = expandedIndex === idx;
            const score = paper.similarity_score || paper.score || 0;
            const authorsList = (paper.authors || []).join(', ') || 'Authors unavailable';

            return (
              <article
                key={idx}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs transition-all hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {/* Score badge */}
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${getScoreColor(score)}`}>
                        {score}% Similarity
                      </span>

                      {/* Year badge */}
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {paper.year || 'Year n/a'}
                      </span>

                      {/* Source badge */}
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {paper.source || 'Academic Repo'}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug">
                      {paper.title}
                    </h3>
                  </div>
                </div>

                {/* Authors */}
                <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{authorsList}</span>
                </div>

                {/* Abstract snippet or full */}
                <div className="mt-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p className={isExpanded ? '' : 'line-clamp-2'}>
                    {paper.abstract || 'No abstract text returned by the repository API.'}
                  </p>
                </div>

                {/* Actions row */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {paper.abstract && (
                      <button
                        onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                        className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 transition-colors"
                      >
                        {isExpanded ? (
                          <>Show Less <ChevronUp className="w-3.5 h-3.5" /></>
                        ) : (
                          <>Read Abstract <ChevronDown className="w-3.5 h-3.5" /></>
                        )}
                      </button>
                    )}

                    <button
                      onClick={() => handleCopyCitation(paper, idx)}
                      className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 transition-colors px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                      title="Copy APA Citation"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-emerald-500 font-medium">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Cite</span>
                        </>
                      )}
                    </button>
                  </div>

                  {paper.url && (
                    <a
                      href={paper.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors"
                    >
                      <span>Open Source Paper</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

    </div>
  );
}
