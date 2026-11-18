import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Database, Download, ExternalLink, Heart, LoaderCircle, Search } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || '';

export default function DatasetsTab({ form }) {
  const [query, setQuery] = useState(form.title.trim());
  const [datasets, setDatasets] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);
  const latestSearch = useRef(0);

  const runSearch = useCallback(async (cleanQuery) => {
    const requestId = ++latestSearch.current;
    if (!cleanQuery) {
      setError('Enter a topic to search for datasets.');
      setDatasets([]);
      setSearched(true);
      return;
    }

    setBusy(true);
    setError('');
    try {
      const response = await fetch(`${API}/api/datasets/search?q=${encodeURIComponent(cleanQuery)}`);
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Dataset search failed.');
      if (requestId !== latestSearch.current) return;
      setDatasets(result.datasets || []);
      setSearched(true);
    } catch (err) {
      if (requestId !== latestSearch.current) return;
      setError(`${err.message} Check that Flask is running${API ? ` at ${API}` : ' and restart the Vite dev server'}; the dataset model may also need to download on its first use.`);
      setDatasets([]);
      setSearched(true);
    } finally {
      if (requestId === latestSearch.current) setBusy(false);
    }
  }, []);

  useEffect(() => {
    const projectQuery = form.title.trim();
    setQuery(projectQuery);
    runSearch(projectQuery);
  }, [form.title, runSearch]);

  const search = (event) => {
    event.preventDefault();
    runSearch(query.trim());
  };

  return (
    <div className="space-y-5">
      <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 dark:text-white">Find Free Datasets</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Search public, ungated datasets on Hugging Face for your project topic.
            </p>
          </div>
        </div>
        <form onSubmit={search} className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              maxLength={200}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search datasets by topic, e.g. waste classification"
              aria-label="Dataset search topic"
              className="w-full text-sm pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30"
            />
          </div>
          <button
            type="submit"
            disabled={busy}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white text-xs font-bold transition-colors"
          >
            {busy ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            {busy ? 'Searching...' : 'Search datasets'}
          </button>
        </form>
        <p className="text-[11px] text-slate-400 mt-3">
          Dataset access is free to browse; usage rights and any download conditions depend on each dataset’s license.
        </p>
      </section>

      {error && (
        <div role="alert" className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300">
          {error}
        </div>
      )}

      {!busy && searched && !error && datasets.length === 0 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-8 text-center">
          <Database className="w-9 h-9 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">No matching datasets found</h3>
          <p className="text-xs text-slate-500 mt-1">Try a shorter or broader topic.</p>
        </div>
      )}

      <div className="grid gap-3">
        {datasets.map((dataset) => (
          <article key={dataset.id} className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-bold text-slate-900 dark:text-white break-words">{dataset.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{dataset.id}</p>
              </div>
              <a
                href={dataset.url}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                View dataset <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            {dataset.description && (
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed line-clamp-3">{dataset.description}</p>
            )}
            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-[11px] text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1"><Download className="w-3.5 h-3.5" />{Number(dataset.downloads || 0).toLocaleString()} downloads</span>
              <span className="inline-flex items-center gap-1"><Heart className="w-3.5 h-3.5" />{Number(dataset.likes || 0).toLocaleString()} likes</span>
              <span>License: {dataset.license || 'Not specified'}</span>
            </div>
            {dataset.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {dataset.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-300">{tag}</span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
      <p className="text-center text-[11px] text-slate-400">
        Results ranked by the free local all-MiniLM-L12-v2 semantic model. Dataset metadata is from Hugging Face Hub; review each dataset card and license before use.
      </p>
    </div>
  );
}
