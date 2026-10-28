import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  RadarChart, Radar, PolarGrid, PolarAngleAxis 
} from 'recharts';
import { 
  FileText, CheckCircle2, TrendingUp, Layers, 
  Sparkles, AlertTriangle, Lightbulb, ExternalLink, ArrowRight 
} from 'lucide-react';

export default function OverviewTab({ data, form, theme, setTab }) {
  const papers = data?.papers || [];
  const score = data?.evaluation || {};
  const highSimCount = papers.filter((p) => (p.similarity_score || p.score) >= 70).length;
  
  // Format similarity chart data
  const chartData = (data?.similarity_results || papers.slice(0, 8)).map((p, i) => ({
    name: `P${i + 1}`,
    fullName: p.title || `Paper ${i + 1}`,
    score: Math.round(p.score || p.similarity_score || 0)
  }));

  // Format radar chart data
  const radarData = Object.entries(score).map(([subject, val]) => ({
    subject: subject.replace('_', ' ').toUpperCase(),
    score: val
  }));

  const isDark = theme === 'dark';
  const textColor = isDark ? '#94a3b8' : '#64748b';
  const gridColor = isDark ? '#334155' : '#e2e8f0';

  const topPaper = papers[0];
  const topLimitation = data?.limitations?.[0];
  const topInnovation = data?.innovations?.[0];

  return (
    <div className="space-y-6">
      
      {/* 4 Quick Stat Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs transition-all hover:border-indigo-300 dark:hover:border-indigo-700">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Papers Analyzed</span>
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {papers.length}
            </span>
            <span className="text-[11px] text-slate-400">retrieved</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 truncate">
            Across OpenAlex & Semantic Scholar
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs transition-all hover:border-cyan-300 dark:hover:border-cyan-700">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">High Similarity (≥70%)</span>
            <div className="p-2 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-cyan-600 dark:text-cyan-400">
              {highSimCount}
            </span>
            <span className="text-[11px] text-slate-400">of {papers.length}</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            Semantic vector overlap
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs transition-all hover:border-emerald-300 dark:hover:border-emerald-700">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Domain Focus</span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-lg font-bold text-slate-900 dark:text-white truncate" title={form.domain}>
              {form.domain}
            </p>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            {form.project_level}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs transition-all hover:border-amber-300 dark:hover:border-amber-700">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Avg Innovation Score</span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-600 dark:text-amber-400">
              {score.innovation || 60}
              <span className="text-base font-normal text-slate-400">/100</span>
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            Heuristic feasibility index
          </p>
        </div>

      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Similarity Bar Chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
              Semantic Similarity by Paper
            </h3>
            <span className="text-xs text-slate-400">Max: 100%</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Cosine similarity between project query embedding & retrieved papers.
          </p>

          <div className="h-64 w-full">
            {chartData.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <XAxis 
                    dataKey="name" 
                    stroke={textColor} 
                    fontSize={12} 
                    tickLine={false}
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    stroke={textColor} 
                    fontSize={11} 
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: isDark ? '#1e293b' : '#ffffff',
                      borderColor: isDark ? '#334155' : '#e2e8f0',
                      borderRadius: '0.75rem',
                      color: isDark ? '#f8fafc' : '#0f172a',
                      fontSize: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(val, name, item) => [`${val}%`, item.payload.fullName]}
                  />
                  <Bar 
                    dataKey="score" 
                    fill="url(#cyanGradient)" 
                    radius={[6, 6, 0, 0]} 
                  />
                  <defs>
                    <linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.9} />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.7} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-sm text-slate-400">
                No papers found to visualize
              </div>
            )}
          </div>
          <div className="mt-2 flex justify-between items-center text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span>Hover bars for paper details</span>
            <button 
              onClick={() => setTab('Research Papers')} 
              className="text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 font-medium"
            >
              View Papers List <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Evaluation Radar Chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
              Evaluation Snapshot
            </h3>
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold">
              Prototype Heuristic
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Multi-factor assessment based on domain heuristics and retrieved context.
          </p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius="75%">
                <PolarGrid stroke={gridColor} />
                <PolarAngleAxis 
                  dataKey="subject" 
                  stroke={textColor} 
                  fontSize={10} 
                  fontWeight={600}
                />
                <Radar 
                  name="Score" 
                  dataKey="score" 
                  stroke="#6366f1" 
                  fill="#6366f1" 
                  fillOpacity={isDark ? 0.4 : 0.3} 
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 flex justify-between items-center text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span>Transparent prototype estimation</span>
            <button 
              onClick={() => setTab('Evaluation')} 
              className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-medium"
            >
              Explore Evaluation <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>

      {/* Quick Insight Highlights (3 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Top matching paper */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-2">
            <FileText className="w-4 h-4" /> Top Research Match
          </div>
          {topPaper ? (
            <>
              <h4 className="font-semibold text-sm text-slate-900 dark:text-white line-clamp-2 mb-2">
                {topPaper.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 mb-3 leading-relaxed">
                {topPaper.abstract || 'Abstract unavailable from source.'}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                <span className="font-bold text-cyan-600 dark:text-cyan-400">
                  {topPaper.similarity_score}% match
                </span>
                {topPaper.url && (
                  <a 
                    href={topPaper.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 flex items-center gap-1 text-[11px]"
                  >
                    Source <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </>
          ) : (
            <p className="text-xs text-slate-400">No papers retrieved yet.</p>
          )}
        </div>

        {/* Primary Limitation */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
            <AlertTriangle className="w-4 h-4" /> Detected Limitation Signal
          </div>
          {topLimitation ? (
            <>
              <h4 className="font-semibold text-sm text-slate-900 dark:text-white capitalize mb-2">
                {topLimitation.theme}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 mb-3 leading-relaxed">
                {topLimitation.evidence}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                <span className="text-[11px] text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded">
                  {topLimitation.type}
                </span>
                <button
                  onClick={() => setTab('Limitations')}
                  className="text-amber-600 dark:text-amber-400 hover:underline text-[11px] font-medium"
                >
                  View All →
                </button>
              </div>
            </>
          ) : (
            <p className="text-xs text-slate-400">No limitation signals found in retrieved abstracts.</p>
          )}
        </div>

        {/* High-Impact Innovation */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
            <Lightbulb className="w-4 h-4" /> Suggested Innovation
          </div>
          {topInnovation ? (
            <>
              <h4 className="font-semibold text-sm text-slate-900 dark:text-white line-clamp-2 mb-2">
                {topInnovation.feature}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 mb-3 leading-relaxed">
                {topInnovation.why}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  Diff: {topInnovation.difficulty}
                </span>
                <button
                  onClick={() => setTab('Innovation')}
                  className="text-indigo-600 dark:text-indigo-400 hover:underline text-[11px] font-medium"
                >
                  Roadmap →
                </button>
              </div>
            </>
          ) : (
            <p className="text-xs text-slate-400">No innovation suggestions generated yet.</p>
          )}
        </div>

      </div>

    </div>
  );
}
