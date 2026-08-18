'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Search, 
  Download, 
  Eye, 
  CheckCircle2, 
  Award, 
  Clock, 
  Calendar, 
  Filter, 
  X, 
  BookOpen,
  Layers,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { QuestionPaper, SolutionItem, SubjectType, ClassLevel, TestType } from '@/lib/types';
import { initialDatabase } from '@/data/initialData';
import PDFPreviewModal from '@/components/ui/PDFPreviewModal';
import { useToast } from '@/context/ToastContext';
import { getQuestionPapers, getSolutions } from '@/lib/dataService';
import { triggerDownload } from '@/lib/downloadUtils';

export default function QuestionPapersPage() {
  const [papers, setPapers] = useState<QuestionPaper[]>(initialDatabase.questionPapers);
  const [solutions, setSolutions] = useState<SolutionItem[]>(initialDatabase.solutions);
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [selectedTestType, setSelectedTestType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPaper, setSelectedPaper] = useState<QuestionPaper | null>(null);
  const [selectedSolution, setSelectedSolution] = useState<SolutionItem | null>(null);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    Promise.all([
      getQuestionPapers(),
      getSolutions()
    ]).then(([qpData, solData]) => {
      if (Array.isArray(qpData) && qpData.length > 0) setPapers(qpData);
      if (Array.isArray(solData) && solData.length > 0) setSolutions(solData);
    }).catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredPapers = useMemo(() => {
    return papers.filter((paper) => {
      const matchSubj = selectedSubject === 'All' || paper.subject === selectedSubject;
      const matchClass = selectedClass === 'All' || paper.className === selectedClass || paper.className === 'All Classes';
      const matchType = selectedTestType === 'All' || paper.testType === selectedTestType;
      const matchSearch = 
        paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.chapter.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchSubj && matchClass && matchType && matchSearch;
    });
  }, [papers, selectedSubject, selectedClass, selectedTestType, searchQuery]);

  const handleDownload = (paper: QuestionPaper, e: React.MouseEvent) => {
    e.stopPropagation();
    showToast(`Downloading: ${paper.title}`, 'info');
    triggerDownload(paper.fileUrl, paper.fileName || `${paper.title.replace(/\s+/g, '_')}.pdf`);
  };

  const openSolution = (solutionId?: string) => {
    if (!solutionId) return;
    const sol = solutions.find(s => s.id === solutionId);
    if (sol) {
      setSelectedSolution(sol);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* Top Banner */}
      <section className="bg-slate-950 text-white chem-hero-gradient py-16 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950 border border-blue-500/30 text-blue-300 font-bold text-xs">
              <FileText className="w-3.5 h-3.5" />
              Examination Library
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              Chemistry Question Papers Library
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed">
              Browse, preview, and download chapter unit tests, term exams, and board mock papers created by Ajay Choudhary Sir with one-click access to verified solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
        
        {/* Filters Bar */}
        <div className="bg-white p-5 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          
          {/* Top Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search question papers by chapter or topic (e.g. Hydrocarbons, Coordination Compounds, Salt Analysis)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          {/* Select Dropdown Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Classes</option>
                <option value="Class 11">Class 11</option>
                <option value="Class 12">Class 12</option>
                <option value="Dropper / JEE / NEET">Dropper / JEE / NEET</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Test Type</label>
              <select
                value={selectedTestType}
                onChange={(e) => setSelectedTestType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Test Formats</option>
                <option value="Unit Test">Unit Test</option>
                <option value="Periodic Test">Periodic Test</option>
                <option value="Board Mock Test">Board Mock Test</option>
                <option value="Term Examination">Term Examination</option>
                <option value="JEE Main & Adv DPP">JEE DPP</option>
                <option value="NEET Practice">NEET Practice</option>
              </select>
            </div>
          </div>

        </div>

        {/* Counter and Reset */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>Showing {filteredPapers.length} of {papers.length} question papers</span>
          {(selectedSubject !== 'All' || selectedClass !== 'All' || selectedTestType !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedSubject('All');
                setSelectedClass('All');
                setSelectedTestType('All');
                setSearchQuery('');
              }}
              className="text-blue-700 font-bold hover:underline"
            >
              Reset All Filters
            </button>
          )}
        </div>

        {/* Empty State */}
        {filteredPapers.length === 0 && !loading && (
          <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <FileText className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">No question papers found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your subject or test type filters to find papers.
            </p>
          </div>
        )}

        {/* Question Papers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPapers.map((paper) => {
            const hasSolution = paper.hasSolution && paper.solutionId;
            return (
              <div
                key={paper.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
              >
                <div className="space-y-3.5">
                  
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      {paper.testType}
                    </span>
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      {paper.className}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 
                    onClick={() => setSelectedPaper(paper)}
                    className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2 cursor-pointer leading-snug"
                  >
                    {paper.title}
                  </h3>

                  {/* Chapter & Subject */}
                  <div className="text-xs text-slate-500 font-medium">
                    <span className="text-slate-800 font-bold">{paper.subject}</span> • {paper.chapter}
                  </div>

                  {/* Marks & Time */}
                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                    <span className="flex items-center gap-1 font-semibold text-slate-700">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      {paper.totalMarks} Marks
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {paper.duration}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400 ml-auto">
                      <Calendar className="w-3 h-3" />
                      {paper.uploadDate}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {paper.description}
                  </p>

                  {/* Solution Pill */}
                  {hasSolution ? (
                    <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                      <span className="text-emerald-800 font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Verified Solution Ready
                      </span>
                      <button
                        onClick={() => openSolution(paper.solutionId)}
                        className="text-xs font-bold text-emerald-700 hover:text-emerald-900 underline"
                      >
                        View Solution
                      </button>
                    </div>
                  ) : (
                    <div className="p-2 rounded-xl bg-slate-50 text-slate-400 text-xs text-center border border-slate-100">
                      Solution upload in progress
                    </div>
                  )}

                </div>

                {/* Bottom Actions */}
                <div className="pt-5 mt-5 border-t border-slate-100 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedPaper(paper)}
                    className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Paper</span>
                  </button>

                  {hasSolution ? (
                    <button
                      onClick={() => openSolution(paper.solutionId)}
                      className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Solution</span>
                    </button>
                  ) : (
                    <button
                      onClick={(e) => handleDownload(paper, e)}
                      className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>PDF ({paper.fileSize || '1.5MB'})</span>
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Paper Modal */}
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

      {/* Solution Modal */}
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

    </div>
  );
}
