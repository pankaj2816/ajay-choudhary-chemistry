'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';
import { initialDatabase } from '@/data/initialData';
import { QuestionPaper, SolutionItem, StudyMaterial } from '@/lib/types';
import { getQuestionPapers, getSolutions, getStudyMaterials } from '@/lib/dataService';
import { triggerDownload } from '@/lib/downloadUtils';
import PDFPreviewModal from '@/components/ui/PDFPreviewModal';
import SectionLabel from './SectionLabel';
import { term, duration as dur } from '@/lib/terms';

export default function ResourcesSection() {
  const { t, L, isHi, pick } = useLanguage();
  const { showToast } = useToast();
  const [materials, setMaterials] = useState<StudyMaterial[]>(initialDatabase.studyMaterials);
  const [papers, setPapers] = useState<QuestionPaper[]>(initialDatabase.questionPapers);
  const [solutions, setSolutions] = useState<SolutionItem[]>(initialDatabase.solutions);
  const [paper, setPaper] = useState<QuestionPaper | null>(null);
  const [solution, setSolution] = useState<SolutionItem | null>(null);

  useEffect(() => {
    Promise.all([getStudyMaterials(), getQuestionPapers(), getSolutions()])
      .then(([m, q, s]) => {
        if (Array.isArray(m) && m.length) setMaterials(m);
        if (Array.isArray(q) && q.length) setPapers(q);
        if (Array.isArray(s) && s.length) setSolutions(s);
      })
      .catch(() => {});
  }, []);

  const topMaterials = [...materials]
    .sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured))
    .slice(0, 4);
  const topPapers = papers.slice(0, 4);

  const download = (m: StudyMaterial) => {
    showToast(`${L('Downloading', 'डाउनलोड हो रहा है')}: ${pick(m.title, m.titleHi)}`, 'info');
    triggerDownload(m.fileUrl, m.fileName);
  };

  const openSolution = (id?: string) => {
    const s = solutions.find((x) => x.id === id);
    if (s) setSolution(s);
  };

  return (
    <section className="bg-paper border-t border-line">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24 lg:py-32">
        <SectionLabel index="05" label={t.home.secResources} />
        <h2 className="mt-6 text-4xl sm:text-5xl leading-[1.08] text-ink max-w-3xl">{t.home.resourcesTitle}</h2>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Study material */}
          <div>
            <div className="flex items-baseline justify-between border-b border-ink pb-4">
              <h3 className="eyebrow text-ink">{t.home.latestNotes}</h3>
              <Link href="/study-materials" className="text-sm text-muted hover:text-accent transition-colors">
                {t.home.viewAll}
              </Link>
            </div>
            <ul>
              {topMaterials.map((m) => (
                <li key={m.id} className="group py-6 border-b border-line flex items-start justify-between gap-6">
                  <div className="min-w-0">
                    <p className="text-[0.78rem] text-muted">
                      {term(m.subject, isHi)} · {term(m.className, isHi)} · {term(m.resourceType, isHi)}
                    </p>
                    <p className="mt-1.5 font-display text-xl leading-snug text-ink" style={{ fontVariationSettings: '"opsz" 36' }}>
                      {pick(m.title, m.titleHi)}
                    </p>
                  </div>
                  <button
                    onClick={() => download(m)}
                    className="shrink-0 mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-accent transition-colors"
                    aria-label={`${t.home.download} ${pick(m.title, m.titleHi)}`}
                  >
                    <ArrowDown className="w-4 h-4" />
                    <span className="hidden sm:inline">{t.home.download}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Question papers */}
          <div>
            <div className="flex items-baseline justify-between border-b border-ink pb-4">
              <h3 className="eyebrow text-ink">{t.home.latestPapers}</h3>
              <Link href="/question-papers" className="text-sm text-muted hover:text-accent transition-colors">
                {t.home.viewAll}
              </Link>
            </div>
            <ul>
              {topPapers.map((p) => (
                <li key={p.id} className="py-6 border-b border-line flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-6">
                  <div className="min-w-0">
                    <p className="text-[0.78rem] text-muted">
                      {term(p.testType, isHi)} · {p.totalMarks} {L('marks', 'अंक')} · {dur(p.duration, isHi)}
                    </p>
                    <p className="mt-1.5 font-display text-xl leading-snug text-ink" style={{ fontVariationSettings: '"opsz" 36' }}>
                      {pick(p.title, p.titleHi)}
                    </p>
                  </div>
                  <div className="shrink-0 sm:mt-1 flex items-center gap-5 text-sm font-medium">
                    <button onClick={() => setPaper(p)} className="text-ink hover:text-accent transition-colors">
                      {t.home.paper}
                    </button>
                    {p.hasSolution && p.solutionId && (
                      <button
                        onClick={() => openSolution(p.solutionId)}
                        className="inline-flex items-center gap-1 text-accent hover:text-accent-deep transition-colors"
                      >
                        {t.home.solution}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {paper && (
        <PDFPreviewModal
          isOpen
          onClose={() => setPaper(null)}
          title={pick(paper.title, paper.titleHi)}
          subject={paper.subject}
          chapter={paper.chapter}
          className={paper.className}
          testType={paper.testType}
          totalMarks={paper.totalMarks}
          duration={paper.duration}
          description={pick(paper.description, paper.descriptionHi)}
          fileUrl={paper.fileUrl}
          fileName={paper.fileName}
          fileSize={paper.fileSize}
          uploadDate={paper.uploadDate}
          solutionId={paper.solutionId}
        />
      )}

      {solution && (
        <PDFPreviewModal
          isOpen
          onClose={() => setSolution(null)}
          title={pick(solution.title, solution.titleHi)}
          subject={solution.subject}
          chapter={solution.chapter}
          className={solution.className}
          testType="Verified Solution"
          description={pick(solution.description, solution.descriptionHi)}
          fileUrl={solution.solutionPdfUrl}
          fileName={solution.solutionPdfName}
          fileSize={solution.solutionPdfSize}
          uploadDate={solution.uploadDate}
          stepByStepContent={solution.stepByStepContent}
          answerKey={solution.answerKey}
          isSolutionView
          verifiedBy={solution.verifiedBy}
        />
      )}
    </section>
  );
}
