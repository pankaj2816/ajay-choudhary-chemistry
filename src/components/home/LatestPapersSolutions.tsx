'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  CheckCircle2, 
  Download, 
  ArrowRight, 
  Clock, 
  Award, 
  Calendar,
  Eye,
  CheckCircle
} from 'lucide-react';
import { QuestionPaper, SolutionItem } from '@/lib/types';
import { initialDatabase } from '@/data/initialData';
import PDFPreviewModal from '@/components/ui/PDFPreviewModal';
import { useToast } from '@/context/ToastContext';

import { useLanguage } from '@/context/LanguageContext';

export default function LatestPapersSolutions() {
  const { t } = useLanguage();
  const [papers, setPapers] = useState<QuestionPaper[]>(initialDatabase.questionPapers);
  const [solutions, setSolutions] = useState<SolutionItem[]>(initialDatabase.solutions);
  const [selectedPaper, setSelectedPaper] = useState<QuestionPaper | null>(null);
  const [selectedSolution, setSelectedSolution] = useState<SolutionItem | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    Promise.all([
      fetch('/api/question-papers').then(r => r.json()),
      fetch('/api/solutions').then(r => r.json())
    ]).then(([qpData, solData]) => {
      if (Array.isArray(qpData) && qpData.length > 0) setPapers(qpData);
      if (Array.isArray(solData) && solData.length > 0) setSolutions(solData);
    }).catch(err => console.error(err));
  }, []);

  const handleDownloadPaper = (paper: QuestionPaper, e: React.MouseEvent) => {
    e.stopPropagation();
    showToast(`Downloading: ${paper.title}`, 'info');
    const link = document.createElement('a');
    link.href = paper.fileUrl;
    link.download = paper.fileName || `${paper.title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openLinkedSolution = (solutionId?: string) => {
    if (!solutionId) return;
    const sol = solutions.find(s => s.id === solutionId);
    if (sol) {
      setSelectedSolution(sol);
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 font-bold text-xs">
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              {t.papersSolutions.badge}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mt-2">
              {t.papersSolutions.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t.papersSolutions.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/question-papers"
              className="text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl transition-colors"
            >
              {t.papersSolutions.allPapersBtn}
            </Link>
            <Link
              href="/solutions"
              className="text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1"
            >
              {t.papersSolutions.allSolutionsBtn} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Papers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {papers.slice(0, 3).map((paper) => {
            const hasSolution = paper.hasSolution && paper.solutionId;
            return (
              <div
                key={paper.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 relative"
              >
                <div className="space-y-3.5">
                  
                  {/* Top Metadata */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      {paper.testType}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {paper.className}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 
                    onClick={() => setSelectedPaper(paper)}
                    className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2 cursor-pointer"
                  >
                    {paper.title}
                  </h3>

                  {/* Chapter & Subject */}
                  <div className="text-xs text-slate-500 font-medium">
                    <span className="text-slate-700 font-bold">{paper.subject}</span> • {paper.chapter}
                  </div>

                  {/* Test Stats: Marks, Time */}
                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                    <span className="flex items-center gap-1">
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

                  {/* Solution Available Pill */}
                  {hasSolution ? (
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                      <span className="text-emerald-800 font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Verified Solution Ready
                      </span>
                      <button
                        onClick={() => openLinkedSolution(paper.solutionId)}
                        className="text-xs font-bold text-emerald-700 hover:text-emerald-900 underline"
                      >
                        View
                      </button>
                    </div>
                  ) : (
                    <div className="p-2 rounded-xl bg-slate-50 text-slate-400 text-xs text-center border border-slate-100">
                      Solution will be uploaded post-test
                    </div>
                  )}

                </div>

                {/* Bottom Actions */}
                <div className="pt-5 mt-5 border-t border-slate-100 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedPaper(paper)}
                    className="py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Paper</span>
                  </button>

                  {hasSolution ? (
                    <button
                      onClick={() => openLinkedSolution(paper.solutionId)}
                      className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Solution</span>
                    </button>
                  ) : (
                    <button
                      onClick={(e) => handleDownloadPaper(paper, e)}
                      className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>PDF</span>
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Question Paper Preview Modal */}
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

    </section>
  );
}
