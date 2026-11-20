'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowDown, ArrowRight, FileText } from 'lucide-react';
import { SolutionItem, QuestionPaper } from '@/lib/types';
import { initialDatabase } from '@/data/initialData';
import PDFPreviewModal from '@/components/ui/PDFPreviewModal';
import { useToast } from '@/context/ToastContext';
import { getSolutions, getQuestionPapers } from '@/lib/dataService';
import { triggerDownload } from '@/lib/downloadUtils';
import { useLanguage } from '@/context/LanguageContext';
import {
  PageHeader,
  SearchField,
  SelectField,
  ResultCount,
  EmptyState,
  Meta,
  TextAction,
} from '@/components/ui/Editorial';

function SolutionsContent() {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const searchParams = useSearchParams();
  const tax = initialDatabase.taxonomies;

  const [solutions, setSolutions] = useState<SolutionItem[]>(initialDatabase.solutions);
  const [papers, setPapers] = useState<QuestionPaper[]>(initialDatabase.questionPapers);
  const [subject, setSubject] = useState(searchParams.get('subject') || 'All');
  const [cls, setCls] = useState(searchParams.get('class') || 'All');
  const [query, setQuery] = useState(searchParams.get('search') || searchParams.get('q') || '');
  const [solution, setSolution] = useState<SolutionItem | null>(null);
  const [paper, setPaper] = useState<QuestionPaper | null>(null);

  useEffect(() => {
    Promise.all([getSolutions(), getQuestionPapers()])
      .then(([s, q]) => {
        if (Array.isArray(s) && s.length) setSolutions(s);
        if (Array.isArray(q) && q.length) setPapers(q);
      })
      .catch(() => {});
  }, []);

  // Open a specific solution when linked as /solutions?id=...
  useEffect(() => {
    const id = searchParams.get('id');
    if (!id) return;
    const match = solutions.find((s) => s.id === id);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (match) setSolution(match);
  }, [searchParams, solutions]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return solutions
      .filter((s) => {
        const matchSubject = subject === 'All' || s.subject.toLowerCase() === subject.toLowerCase();
        const matchClass = cls === 'All' || s.className === cls || s.className === 'All Classes';
        const matchQuery =
          !q ||
          [s.title, s.chapter, s.questionPaperTitle, s.description].some((f) => (f || '').toLowerCase().includes(q));
        return matchSubject && matchClass && matchQuery;
      })
      .sort((a, b) => b.uploadDate.localeCompare(a.uploadDate));
  }, [solutions, subject, cls, query]);

  const reset = () => {
    setSubject('All');
    setCls('All');
    setQuery('');
  };

  const download = (s: SolutionItem) => {
    if (!s.solutionPdfUrl) {
      showToast('This solution is available to read online only.', 'info');
      return;
    }
    showToast(`Downloading: ${s.title}`, 'info');
    triggerDownload(s.solutionPdfUrl, s.solutionPdfName || `${s.title.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <>
      <PageHeader label={t.nav.solutions} title={t.papersSolutions.allSolutionsBtn} intro={t.papersSolutions.subtitle} />

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end">
          <div className="lg:col-span-6">
            <SearchField value={query} onChange={setQuery} placeholder={t.pages.searchPlaceholder} />
          </div>
          <div className="lg:col-span-3">
            <SelectField
              label="Subject"
              value={subject}
              onChange={setSubject}
              options={[{ value: 'All', label: t.pages.allSubjects }, ...tax.subjects.map((s) => ({ value: s, label: s }))]}
            />
          </div>
          <div className="lg:col-span-3">
            <SelectField
              label="Class"
              value={cls}
              onChange={setCls}
              options={[
                { value: 'All', label: t.pages.allClasses },
                ...tax.classes.filter((c) => c !== 'All Classes').map((c) => ({ value: c, label: c })),
              ]}
            />
          </div>
        </div>

        <div className="mt-12 flex items-baseline justify-between border-b border-ink pb-4">
          <ResultCount shown={filtered.length} total={solutions.length} noun="solutions" />
        </div>

        {filtered.length === 0 ? (
          <EmptyState title={t.pages.noResults} body={t.pages.noResultsSub} onReset={reset} />
        ) : (
          <ul>
            {filtered.map((s) => {
              const linked = papers.find((p) => p.id === s.questionPaperId);
              return (
                <li
                  key={s.id}
                  className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto] gap-x-10 gap-y-4 py-8 border-b border-line"
                >
                  <div className="min-w-0">
                    <Meta>
                      {s.subject} · {s.className}
                      {s.answerKey?.length ? ` · ${s.answerKey.length}-question answer key` : ''}
                    </Meta>
                    <h2
                      className="mt-2 font-display !text-[1.5rem] sm:!text-[1.7rem] leading-snug text-ink"
                      style={{ fontVariationSettings: '"opsz" 48' }}
                    >
                      {s.title}
                    </h2>
                    {s.questionPaperTitle && (
                      <p className="mt-1 text-sm text-muted">
                        For: <span className="text-ink">{s.questionPaperTitle}</span>
                      </p>
                    )}
                    <p className="mt-3 max-w-3xl text-[0.95rem] leading-relaxed text-muted line-clamp-2">{s.description}</p>
                    <Meta className="mt-3">
                      Checked by {s.verifiedBy || 'Ajay Choudhary Sir'} · {s.uploadDate}
                    </Meta>
                  </div>
                  <div className="flex flex-wrap md:flex-col md:items-end gap-x-6 gap-y-3 md:pt-6">
                    <TextAction onClick={() => setSolution(s)} tone="accent" icon={<ArrowRight className="w-4 h-4" />}>
                      Read solution
                    </TextAction>
                    {s.solutionPdfUrl && (
                      <TextAction onClick={() => download(s)} icon={<ArrowDown className="w-4 h-4" />}>
                        {t.pages.downloadBtn}
                      </TextAction>
                    )}
                    {linked && (
                      <TextAction onClick={() => setPaper(linked)} icon={<FileText className="w-4 h-4" />}>
                        {t.pages.viewPaperBtn}
                      </TextAction>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {solution && (
        <PDFPreviewModal
          isOpen
          onClose={() => setSolution(null)}
          title={solution.title}
          subject={solution.subject}
          chapter={solution.chapter}
          className={solution.className}
          testType="Verified Solution"
          description={solution.description}
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

      {paper && (
        <PDFPreviewModal
          isOpen
          onClose={() => setPaper(null)}
          title={paper.title}
          subject={paper.subject}
          chapter={paper.chapter}
          className={paper.className}
          testType={paper.testType}
          totalMarks={paper.totalMarks}
          duration={paper.duration}
          description={paper.description}
          fileUrl={paper.fileUrl}
          fileName={paper.fileName}
          fileSize={paper.fileSize}
          uploadDate={paper.uploadDate}
          solutionId={paper.solutionId}
        />
      )}
    </>
  );
}

export default function SolutionsPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <SolutionsContent />
    </Suspense>
  );
}
