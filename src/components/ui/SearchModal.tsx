'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X, FileText, BookOpen, CheckCircle, Bell, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { NoticeUpdate, QuestionPaper, SolutionItem, StudyMaterial } from '@/lib/types';

interface SearchResults {
  updates: NoticeUpdate[];
  questionPapers: QuestionPaper[];
  solutions: SolutionItem[];
  studyMaterials: StudyMaterial[];
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResults>({
    updates: [],
    questionPapers: [],
    solutions: [],
    studyMaterials: []
  });
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ updates: [], questionPapers: [], solutions: [], studyMaterials: [] });
      setTotalCount(0);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results || { updates: [], questionPapers: [], solutions: [], studyMaterials: [] });
        setTotalCount(data.totalMatches || 0);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 dark:border-slate-800 gap-3 bg-slate-50/50 dark:bg-slate-900/50">
          <Search className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search topics, chapters, question papers, solutions, notes... (e.g. Coordination Compounds, Hydrocarbons)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none"
          />
          {loading && <Loader2 className="w-4 h-4 text-cyan-600 animate-spin shrink-0" />}
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded font-medium transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="overflow-y-auto p-4 space-y-6 flex-1">
          {!query && (
            <div className="py-8 text-center text-slate-500 dark:text-slate-400">
              <Sparkles className="w-8 h-8 text-cyan-500/50 mx-auto mb-2" />
              <p className="text-sm font-medium">Search across all Chemistry resources</p>
              <div className="flex flex-wrap justify-center gap-2 mt-3 max-w-md mx-auto">
                {['Coordination Compounds', 'Hydrocarbons', 'Reaction Mechanism', 'Salt Analysis', 'Chemical Bonding', 'Aldehydes'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="text-xs px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 text-slate-600 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-cyan-300 rounded-lg transition-colors border border-slate-200/60 dark:border-slate-800"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && !loading && totalCount === 0 && (
            <div className="py-12 text-center text-slate-500">
              <p className="text-sm font-medium">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs mt-1 text-slate-400">Try searching for chapter names like &ldquo;GOC&rdquo;, &ldquo;p-Block&rdquo;, or &ldquo;Titration&rdquo;.</p>
            </div>
          )}

          {/* Study Materials */}
          {results.studyMaterials.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" /> Study Materials & Notes ({results.studyMaterials.length})
                </span>
                <Link href={`/study-materials?search=${encodeURIComponent(query)}`} onClick={onClose} className="text-xs text-slate-500 hover:text-cyan-600 flex items-center gap-0.5">
                  View all <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="space-y-2">
                {results.studyMaterials.slice(0, 3).map((item) => (
                  <Link
                    key={item.id}
                    href={`/study-materials`}
                    onClick={onClose}
                    className="block p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-cyan-50/70 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                        {item.title}
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 font-medium shrink-0">
                        {item.resourceType}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                      <span>{item.subject}</span>
                      <span>•</span>
                      <span>{item.chapter}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Question Papers */}
          {results.questionPapers.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" /> Question Papers ({results.questionPapers.length})
                </span>
                <Link href={`/question-papers?search=${encodeURIComponent(query)}`} onClick={onClose} className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-0.5">
                  View all <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="space-y-2">
                {results.questionPapers.slice(0, 3).map((item) => (
                  <Link
                    key={item.id}
                    href={`/question-papers`}
                    onClick={onClose}
                    className="block p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50/70 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {item.title}
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-medium shrink-0">
                        {item.testType}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                      <span>{item.className}</span>
                      <span>•</span>
                      <span>{item.chapter}</span>
                      {item.hasSolution && (
                        <span className="ml-auto text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 text-[11px]">
                          <CheckCircle className="w-3 h-3" /> Solution Available
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Solutions */}
          {results.solutions.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" /> Solutions & Answer Keys ({results.solutions.length})
                </span>
                <Link href={`/solutions?search=${encodeURIComponent(query)}`} onClick={onClose} className="text-xs text-slate-500 hover:text-emerald-600 flex items-center gap-0.5">
                  View all <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="space-y-2">
                {results.solutions.slice(0, 3).map((item) => (
                  <Link
                    key={item.id}
                    href={`/solutions`}
                    onClick={onClose}
                    className="block p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50/70 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 transition-colors group"
                  >
                    <div className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                      {item.title}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Paper: {item.questionPaperTitle}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Updates */}
          {results.updates.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <Bell className="w-3.5 h-3.5" /> Notices & Announcements ({results.updates.length})
                </span>
                <Link href={`/updates`} onClick={onClose} className="text-xs text-slate-500 hover:text-amber-600 flex items-center gap-0.5">
                  View all <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="space-y-2">
                {results.updates.slice(0, 3).map((item) => (
                  <Link
                    key={item.id}
                    href={`/updates`}
                    onClick={onClose}
                    className="block p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-amber-50/70 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 transition-colors group"
                  >
                    <div className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400">
                      {item.title}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {item.category} • {item.date}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Search Chemistry Repository</span>
          <span>Click on result to open</span>
        </div>
      </div>
    </div>
  );
}
