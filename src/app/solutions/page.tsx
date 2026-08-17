'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Search, 
  Download, 
  Eye, 
  FileText, 
  CheckCircle, 
  Calendar, 
  Filter, 
  X, 
  BookOpen,
  ArrowRight,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { SolutionItem, QuestionPaper, SubjectType, ClassLevel } from '@/lib/types';
import { initialDatabase } from '@/data/initialData';
import PDFPreviewModal from '@/components/ui/PDFPreviewModal';
import { useToast } from '@/context/ToastContext';

export default function SolutionsPage() {
  const [solutions, setSolutions] = useState<SolutionItem[]>(initialDatabase.solutions);
  const [papers, setPapers] = useState<QuestionPaper[]>(initialDatabase.questionPapers);
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSolution, setSelectedSolution] = useState<SolutionItem | null>(null);
  const [selectedPaper, setSelectedPaper] = useState<QuestionPaper | null>(null);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    Promise.all([
      fetch('/api/solutions').then(r => r.json()),
      fetch('/api/question-papers').then(r => r.json())
    ]).then(([solData, qpData]) => {
      if (Array.isArray(solData) && solData.length > 0) setSolutions(solData);
      if (Array.isArray(qpData) && qpData.length > 0) setPapers(qpData);
    }).catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredSolutions = useMemo(() => {
    return solutions.filter((sol) => {
      const matchSubj = selectedSubject === 'All' || sol.subject === selectedSubject;
      const matchClass = selectedClass === 'All' || sol.className === selectedClass || sol.className === 'All Classes';
      const matchSearch = 
        sol.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sol.chapter.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sol.questionPaperTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sol.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchSubj && matchClass && matchSearch;
    });
  }, [solutions, selectedSubject, selectedClass, searchQuery]);

  const handleDownloadSolution = (sol: SolutionItem, e: React.MouseEvent) => {
    e.stopPropagation();
    showToast(`Downloading solution: ${sol.title}`, 'info');
    const link = document.createElement('a');
    link.href = sol.solutionPdfUrl || '/uploads/sample_solution.pdf';
    link.download = sol.solutionPdfName || `${sol.title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openRelatedPaper = (qpId: string) => {
    const paper = papers.find(p => p.id === qpId);
    if (paper) {
      setSelectedPaper(paper);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* Top Banner */}
      <section className="bg-slate-950 text-white chem-hero-gradient py-16 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-300 font-bold text-xs">
              <CheckCircle className="w-3.5 h-3.5" />
              Verified Answer Keys & Mechanisms
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              Chemistry Solutions Library
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed">
              Step-by-step chemical mechanisms, crystal field splitting calculations, qualitative analysis flowcharts, and official marking schemes verified by Ajay Choudhary.
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Solutions Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
        
        {/* Filters Box */}
        <div className="bg-white p-5 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search solutions by test name, chapter, or reaction (e.g. Hydrocarbons, Coordination Compounds, Aldehydes)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="All">All Subjects</option>
                <option value="Organic Chemistry">Organic Chemistry</option>
                <option value="Inorganic Chemistry">Inorganic Chemistry</option>
                <option value="Practical Chemistry">Practical Chemistry</option>
                <option value="Physical Chemistry">Physical Chemistry</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Class / Batch</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="All">All Classes</option>
                <option value="Class 11">Class 11</option>
                <option value="Class 12">Class 12</option>
                <option value="Dropper / JEE / NEET">Dropper / JEE / NEET</option>
              </select>
            </div>
          </div>

        </div>

        {/* Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>Showing {filteredSolutions.length} of {solutions.length} verified solutions</span>
          {(selectedSubject !== 'All' || selectedClass !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedSubject('All');
                setSelectedClass('All');
                setSearchQuery('');
              }}
              className="text-emerald-700 font-bold hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Empty State */}
        {filteredSolutions.length === 0 && !loading && (
          <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <CheckCircle className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">No solutions found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No solutions matched your search. Check back soon as new solutions are posted regularly.
            </p>
          </div>
        )}

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSolutions.map((sol) => (
            <div
              key={sol.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
            >
              <div className="space-y-3.5">
                
                {/* Top Badges */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Verified Solution
                  </span>
                  <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                    {sol.className}
                  </span>
                </div>

                {/* Title */}
                <h3 
                  onClick={() => setSelectedSolution(sol)}
                  className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 cursor-pointer leading-snug"
                >
                  {sol.title}
                </h3>

                {/* Related Question Paper Link */}
                <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">
                    Paired Question Paper:
                  </span>
                  <div className="font-semibold text-slate-800 line-clamp-1">
                    {sol.questionPaperTitle}
                  </div>
                </div>

                {/* Subject & Chapter */}
                <div className="text-xs text-slate-500 font-medium">
                  <span className="text-slate-800 font-bold">{sol.subject}</span> • {sol.chapter}
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {sol.description}
                </p>

                {/* Verified By Pill */}
                <div className="flex items-center justify-between text-[11px] pt-1 text-slate-500">
                  <span className="flex items-center gap-1 font-semibold text-emerald-700">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {sol.verifiedBy}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Calendar className="w-3 h-3" />
                    {sol.uploadDate}
                  </span>
                </div>

              </div>

              {/* Bottom Actions */}
              <div className="pt-5 mt-5 border-t border-slate-100 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedSolution(sol)}
                  className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Solution</span>
                </button>

                {sol.questionPaperId ? (
                  <button
                    onClick={() => openRelatedPaper(sol.questionPaperId)}
                    className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Paper</span>
                  </button>
                ) : (
                  <button
                    onClick={(e) => handleDownloadSolution(sol, e)}
                    className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>PDF</span>
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Solution Preview Modal */}
      {selectedSolution && (
        <PDFPreviewModal
          isOpen={!!selectedSolution}
          onClose={() => setSelectedSolution(null)}
          title={selectedSolution.title}
          subject={selectedSolution.subject}
          chapter={selectedSolution.chapter}
          className={selectedSolution.className}
          testType="Verified Solution"
          description={selectedSolution.description}
          fileUrl={selectedSolution.solutionPdfUrl}
          fileName={selectedSolution.solutionPdfName}
          fileSize={selectedSolution.solutionPdfSize}
          uploadDate={selectedSolution.uploadDate}
          stepByStepContent={selectedSolution.stepByStepContent}
          answerKey={selectedSolution.answerKey}
          isSolutionView={true}
          verifiedBy={selectedSolution.verifiedBy}
        />
      )}

      {/* Paper Preview Modal */}
      {selectedPaper && (
        <PDFPreviewModal
          isOpen={!!selectedPaper}
          onClose={() => setSelectedPaper(null)}
          title={selectedPaper.title}
          subject={selectedPaper.subject}
          chapter={selectedPaper.chapter}
          className={selectedPaper.className}
          testType={selectedPaper.testType}
          totalMarks={selectedPaper.totalMarks}
          duration={selectedPaper.duration}
          description={selectedPaper.description}
          fileUrl={selectedPaper.fileUrl}
          fileName={selectedPaper.fileName}
          fileSize={selectedPaper.fileSize}
          uploadDate={selectedPaper.uploadDate}
          solutionId={selectedPaper.solutionId}
        />
      )}

    </div>
  );
}
