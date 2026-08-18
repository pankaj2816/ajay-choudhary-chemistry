'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Search, 
  BookOpen, 
  FileText, 
  CheckCircle, 
  Bell, 
  ArrowRight, 
  X, 
  Loader2,
  Sparkles
} from 'lucide-react';
import { NoticeUpdate, QuestionPaper, SolutionItem, StudyMaterial } from '@/lib/types';
import { searchClientDatabase } from '@/lib/searchUtils';
import PDFPreviewModal from '@/components/ui/PDFPreviewModal';

function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query.trim() || !text) return <span>{text}</span>;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-cyan-200 text-cyan-950 font-bold px-0.5 rounded">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || searchParams.get('search') || '';
  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{
    updates: NoticeUpdate[];
    questionPapers: QuestionPaper[];
    solutions: SolutionItem[];
    studyMaterials: StudyMaterial[];
  }>({
    updates: [],
    questionPapers: [],
    solutions: [],
    studyMaterials: []
  });
  const [totalCount, setTotalCount] = useState(0);
  const [previewPaper, setPreviewPaper] = useState<QuestionPaper | null>(null);
  const [previewSolution, setPreviewSolution] = useState<SolutionItem | null>(null);
  const [previewMaterial, setPreviewMaterial] = useState<StudyMaterial | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ updates: [], questionPapers: [], solutions: [], studyMaterials: [] });
      setTotalCount(0);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      try {
        const { results: searchRes, totalMatches } = searchClientDatabase(query);
        setResults(searchRes);
        setTotalCount(totalMatches);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Top Banner */}
      <section className="bg-slate-950 text-white chem-hero-gradient py-12 sm:py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-300 font-bold text-xs">
              <Search className="w-3.5 h-3.5" />
              Universal Search Engine
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
              Search Chemistry Resources
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Find notes, previous question papers, verified step-by-step solutions, and notice updates instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Main Search Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Search Input Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search topics, chapters, question papers, solutions, notes... (e.g. Coordination Compounds, Hydrocarbons, Aldol)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-3.5 rounded-2xl border border-slate-200 bg-white text-sm sm:text-base text-slate-900 shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          {loading && <Loader2 className="w-5 h-5 text-cyan-600 animate-spin absolute right-4 top-1/2 -translate-y-1/2" />}
          {query && !loading && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Suggested Queries */}
        {!query && (
          <div className="p-6 bg-white rounded-3xl border border-slate-200 text-center space-y-3">
            <Sparkles className="w-8 h-8 text-cyan-500 mx-auto" />
            <h3 className="text-sm font-bold text-slate-900">Popular Chemistry Topics</h3>
            <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto">
              {['Coordination Compounds', 'Hydrocarbons', 'Reaction Mechanism', 'Salt Analysis', 'Chemical Bonding', 'Aldehydes', 'GOC Notes', 'Unit Test'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="text-xs px-3 py-1.5 bg-slate-100 hover:bg-cyan-50 text-slate-700 hover:text-cyan-700 font-semibold rounded-xl border border-slate-200 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Header */}
        {query && (
          <div className="text-xs text-slate-500 px-1">
            Found <strong>{totalCount}</strong> results for &ldquo;{query}&rdquo;
          </div>
        )}

        {/* No Results */}
        {query && !loading && totalCount === 0 && (
          <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-2">
            <h3 className="text-base font-bold text-slate-900">No matches found for &ldquo;{query}&rdquo;</h3>
            <p className="text-xs text-slate-500">
              Try searching with broader terms like &ldquo;Organic&rdquo;, &ldquo;Bonding&rdquo;, or &ldquo;Class 12&rdquo;.
            </p>
          </div>
        )}

        {/* Results Sections */}
        {results.studyMaterials.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-700 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" /> Study Materials ({results.studyMaterials.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.studyMaterials.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setPreviewMaterial(item)}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-50 text-cyan-700 border border-cyan-200">
                      {item.resourceType}
                    </span>
                    <span className="text-xs text-slate-500">{item.className}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                    <HighlightMatch text={item.title} query={query} />
                  </h4>
                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <span>{item.subject}</span>
                    <span>•</span>
                    <span><HighlightMatch text={item.chapter} query={query} /></span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    <HighlightMatch text={item.description} query={query} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {results.questionPapers.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
              <FileText className="w-4 h-4" /> Question Papers ({results.questionPapers.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.questionPapers.map((paper) => (
                <div
                  key={paper.id}
                  onClick={() => setPreviewPaper(paper)}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                      {paper.testType}
                    </span>
                    <span className="text-xs text-slate-500">{paper.totalMarks} Marks</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    <HighlightMatch text={paper.title} query={query} />
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    <HighlightMatch text={paper.chapter} query={query} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {results.solutions.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" /> Verified Solutions ({results.solutions.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.solutions.map((sol) => (
                <div
                  key={sol.id}
                  onClick={() => setPreviewSolution(sol)}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Verified Solution
                    </span>
                    <span className="text-xs text-slate-500">{sol.subject}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    <HighlightMatch text={sol.title} query={query} />
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    <HighlightMatch text={sol.questionPaperTitle} query={query} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {results.updates.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
              <Bell className="w-4 h-4" /> Notices & Announcements ({results.updates.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.updates.map((update) => (
                <Link
                  key={update.id}
                  href={`/updates?search=${encodeURIComponent(query)}`}
                  className="block bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-2 group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                      <HighlightMatch text={update.title} query={query} />
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold shrink-0">
                      {update.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    <HighlightMatch text={update.description} query={query} />
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Modals */}
      {previewPaper && (
        <PDFPreviewModal
          isOpen={!!previewPaper}
          onClose={() => setPreviewPaper(null)}
          title={previewPaper.title}
          subject={previewPaper.subject}
          chapter={previewPaper.chapter}
          className={previewPaper.className}
          testType={previewPaper.testType}
          totalMarks={previewPaper.totalMarks}
          duration={previewPaper.duration}
          description={previewPaper.description}
          fileUrl={previewPaper.fileUrl}
          fileName={previewPaper.fileName}
          fileSize={previewPaper.fileSize}
          uploadDate={previewPaper.uploadDate}
          solutionId={previewPaper.solutionId}
        />
      )}

      {previewSolution && (
        <PDFPreviewModal
          isOpen={!!previewSolution}
          onClose={() => setPreviewSolution(null)}
          title={previewSolution.title}
          subject={previewSolution.subject}
          chapter={previewSolution.chapter}
          className={previewSolution.className}
          testType="Verified Solution"
          description={previewSolution.description}
          fileUrl={previewSolution.solutionPdfUrl}
          fileName={previewSolution.solutionPdfName}
          fileSize={previewSolution.solutionPdfSize}
          uploadDate={previewSolution.uploadDate}
          stepByStepContent={previewSolution.stepByStepContent}
          answerKey={previewSolution.answerKey}
          isSolutionView={true}
          verifiedBy={previewSolution.verifiedBy}
        />
      )}

      {previewMaterial && (
        <PDFPreviewModal
          isOpen={!!previewMaterial}
          onClose={() => setPreviewMaterial(null)}
          title={previewMaterial.title}
          subject={previewMaterial.subject}
          chapter={previewMaterial.chapter}
          className={previewMaterial.className}
          testType={previewMaterial.resourceType}
          description={previewMaterial.description}
          fileUrl={previewMaterial.fileUrl}
          fileName={previewMaterial.fileName}
          fileSize={previewMaterial.fileSize}
          uploadDate={previewMaterial.uploadDate}
        />
      )}

    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading Search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
