'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, Download, FileText, CheckCircle, ExternalLink, Calendar, BookOpen, Clock, Award, ZoomIn, ZoomOut, Printer } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import ChemistryContentRenderer from './ChemistryContentRenderer';

interface PDFPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subject?: string;
  chapter?: string;
  className?: string;
  testType?: string;
  totalMarks?: number;
  duration?: string;
  uploadDate?: string;
  description?: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
  solutionId?: string;
  solutionTitle?: string;
  stepByStepContent?: string;
  answerKey?: { questionNo: string | number; answer: string; explanation: string }[];
  isSolutionView?: boolean;
  questionPaperId?: string;
  verifiedBy?: string;
}

export default function PDFPreviewModal({
  isOpen,
  onClose,
  title,
  subject,
  chapter,
  className: studentClass,
  testType,
  totalMarks,
  duration,
  uploadDate,
  description,
  fileUrl = '/uploads/sample_chemistry_notes.pdf',
  fileName,
  fileSize,
  solutionId,
  stepByStepContent,
  answerKey,
  isSolutionView = false,
  verifiedBy
}: PDFPreviewModalProps) {
  const { showToast } = useToast();
  const [zoomLevel, setZoomLevel] = useState(100);

  if (!isOpen) return null;

  const handleDownload = () => {
    showToast(`Downloading: ${fileName || title}`, 'info');
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName || `${title.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col h-[92vh] max-h-[850px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header Bar */}
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className={`p-2 rounded-xl shrink-0 ${isSolutionView ? 'bg-emerald-500/10 text-emerald-600' : 'bg-cyan-500/10 text-cyan-600'}`}>
              {isSolutionView ? <CheckCircle className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>
            <div className="truncate">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                isSolutionView 
                  ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300' 
                  : 'bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300'
              }`}>
                {isSolutionView ? 'Verified Solution & Answer Key' : testType || 'Study Document'}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate mt-0.5">
                {title}
              </h3>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden sm:flex items-center bg-slate-200 dark:bg-slate-800 rounded-lg p-1 text-slate-600 dark:text-slate-300">
              <button 
                onClick={() => setZoomLevel(prev => Math.max(75, prev - 15))} 
                className="p-1 hover:text-cyan-500 transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs px-2 font-mono font-medium">{zoomLevel}%</span>
              <button 
                onClick={() => setZoomLevel(prev => Math.min(150, prev + 15))} 
                className="p-1 hover:text-cyan-500 transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              title="Print Document"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-xs sm:text-sm font-semibold shadow transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Metadata Strip */}
        <div className="px-5 py-2.5 bg-slate-100/70 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-600 dark:text-slate-300">
          {subject && (
            <span className="flex items-center gap-1.5 font-medium">
              <BookOpen className="w-3.5 h-3.5 text-cyan-600" />
              {subject}
            </span>
          )}
          {studentClass && (
            <span className="bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded font-medium text-slate-700 dark:text-slate-200">
              {studentClass}
            </span>
          )}
          {chapter && (
            <span className="truncate max-w-xs">
              <strong>Chapter:</strong> {chapter}
            </span>
          )}
          {totalMarks && (
            <span className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <strong>Marks:</strong> {totalMarks}
            </span>
          )}
          {duration && (
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {duration}
            </span>
          )}
          {uploadDate && (
            <span className="flex items-center gap-1 text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              {uploadDate}
            </span>
          )}
        </div>

        {/* Document Viewer Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-100 dark:bg-slate-950 flex justify-center">
          <div 
            className="w-full max-w-3xl bg-white dark:bg-slate-900 shadow-xl rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 transition-transform duration-150 origin-top"
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
          >
            {/* Document Header */}
            <div className="border-b-2 border-slate-900 dark:border-slate-700 pb-4 mb-6 text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                Department of Chemistry • Ajay Choudhary
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                {title}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {subject} • {studentClass || 'Senior Secondary Batch'} • {chapter}
              </p>
              {verifiedBy && (
                <div className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <CheckCircle className="w-3.5 h-3.5" /> Verified by: {verifiedBy}
                </div>
              )}
            </div>

            {/* Description / Summary Box */}
            {description && (
              <div className="mb-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong className="text-slate-900 dark:text-white block mb-1">Overview / Objectives:</strong>
                {description}
              </div>
            )}

            {/* Step-by-Step Solutions (if present) */}
            {stepByStepContent ? (
              <div className="space-y-6 text-slate-800 dark:text-slate-200 text-sm leading-relaxed">
                <ChemistryContentRenderer content={stepByStepContent} />

                {/* Answer Key Grid (if present) */}
                {answerKey && answerKey.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                    <h4 className="font-bold text-slate-900 dark:text-white text-base mb-3 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      Official Answer Key & Hints
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                        <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold">
                          <tr>
                            <th className="p-2.5 border-b border-slate-200 dark:border-slate-700 w-16">Q.No</th>
                            <th className="p-2.5 border-b border-slate-200 dark:border-slate-700 w-48">Correct Answer</th>
                            <th className="p-2.5 border-b border-slate-200 dark:border-slate-700">Detailed Explanation</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {answerKey.map((item, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                              <td className="p-2.5 font-bold text-cyan-600 dark:text-cyan-400">{item.questionNo}</td>
                              <td className="p-2.5 font-medium text-emerald-600 dark:text-emerald-400">{item.answer}</td>
                              <td className="p-2.5 text-slate-600 dark:text-slate-300">{item.explanation}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Simulated Chemistry Question Paper / Study Notes Template */
              <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300">
                <div className="p-4 rounded-xl bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800 text-cyan-950 dark:text-cyan-200 text-xs">
                  <strong>General Instructions:</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-0.5">
                    <li>All questions are compulsory.</li>
                    <li>Use of scientific calculators and tables is permitted where indicated.</li>
                    <li>Write balanced chemical equations, clear structural formulas, and units wherever necessary.</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                    <p className="font-semibold text-slate-900 dark:text-white">Q1. (2 Marks)</p>
                    <p className="mt-1">
                      Explain why alkyl halides, though polar, are immiscible with water. Illustrate with dipole-dipole vs hydrogen bonding interaction.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                    <p className="font-semibold text-slate-900 dark:text-white">Q2. (3 Marks)</p>
                    <p className="mt-1">
                      Give the major product formed when 1-bromobutane is treated with:
                      <br />(a) Alcoholic KOH (Heating)
                      <br />(b) Aqueous KOH
                      <br />(c) KCN vs AgCN (Explain ambidentate nucleophile behavior).
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                    <p className="font-semibold text-slate-900 dark:text-white">Q3. (5 Marks - Long Answer)</p>
                    <p className="mt-1">
                      (a) State Markovnikov&apos;s rule and write the complete step-by-step carbocation mechanism for addition of HBr to 2-methylpropene.
                      <br />(b) Why does the presence of organic peroxides reverse the regioselectivity with HBr but not with HCl or HI?
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <FileText className="w-3.5 h-3.5" />
            <span>{fileName || 'Chemistry_Document.pdf'}</span>
            {fileSize && <span>({fileSize})</span>}
          </div>

          <div className="flex items-center gap-3">
            {/* Quick solution link for question papers */}
            {solutionId && !isSolutionView && (
              <Link
                href="/solutions"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-sm"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                View Complete Solution
              </Link>
            )}

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold transition-colors shadow"
            >
              <Download className="w-3.5 h-3.5" />
              Download PDF Document
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
