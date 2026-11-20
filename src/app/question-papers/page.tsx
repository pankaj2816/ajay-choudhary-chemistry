'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowDown, ArrowRight, Eye } from 'lucide-react';
import { QuestionPaper, SolutionItem } from '@/lib/types';
import { initialDatabase } from '@/data/initialData';
import PDFPreviewModal from '@/components/ui/PDFPreviewModal';
import { useToast } from '@/context/ToastContext';
import { getQuestionPapers, getSolutions } from '@/lib/dataService';
import { triggerDownload } from '@/lib/downloadUtils';
import { useLanguage } from '@/context/LanguageContext';
import {
  PageHeader,
  SearchField,
  SelectField,
  ChipGroup,
  ResultCount,
  EmptyState,
  Meta,
  TextAction,
} from '@/components/ui/Editorial';

function QuestionPapersContent() {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const searchParams = useSearchParams();
  const tax = initialDatabase.taxonomies;

  const [papers, setPapers] = useState<QuestionPaper[]>(initialDatabase.questionPapers);
  const [solutions, setSolutions] = useState<SolutionItem[]>(initialDatabase.solutions);
  const [subject, setSubject] = useState(searchParams.get('subject') || 'All');
  const [cls, setCls] = useState(searchParams.get('class') || 'All');
  const [testType, setTestType] = useState(searchParams.get('type') || 'All');
  const [query, setQuery] = useState(searchParams.get('search') || searchParams.get('q') || '');
  const [paper, setPaper] = useState<QuestionPaper | null>(null);
  const [solution, setSolution] = useState<SolutionItem | null>(null);

  useEffect(() => {
    Promise.all([getQuestionPapers(), getSolutions()])
      .then(([q, s]) => {
        if (Array.isArray(q) && q.length) setPapers(q);
        if (Array.isArray(s) && s.length) setSolutions(s);
      })
      .catch(() => {});
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return papers
      .filter((p) => {
        const matchSubject = subject === 'All' || p.subject.toLowerCase() === subject.toLowerCase();
        const matchClass = cls === 'All' || p.className === cls || p.className === 'All Classes';
        const matchType = testType === 'All' || p.testType === testType;
        const matchQuery = !q || [p.title, p.chapter, p.description].some((f) => (f || '').toLowerCase().includes(q));
        return matchSubject && matchClass && matchType && matchQuery;
      })
      .sort((a, b) => b.uploadDate.localeCompare(a.uploadDate));
  }, [papers, subject, cls, testType, query]);

  const findSolution = (p: QuestionPaper) =>
    solutions.find((s) => s.id === p.solutionId) || solutions.find((s) => s.questionPaperId === p.id);

  const reset = () => {
    setSubject('All');
    setCls('All');
    setTestType('All');
    setQuery('');
  };

  const download = (p: QuestionPaper) => {
    showToast(`Downloading: ${p.title}`, 'info');
    triggerDownload(p.fileUrl, p.fileName || `${p.title.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <>
      <PageHeader label={t.nav.questionPapers} title={t.papersSolutions.title} intro={t.papersSolutions.subtitle} />

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

        <div className="mt-6">
          <ChipGroup
            label="Test type"
            value={testType}
            onChange={setTestType}
            options={[{ value: 'All', label: t.pages.allTypes }, ...tax.testTypes.map((x) => ({ value: x, label: x }))]}
          />
        </div>

        <div className="mt-12 flex items-baseline justify-between border-b border-ink pb-4">
          <ResultCount shown={filtered.length} total={papers.length} noun="papers" />
        </div>

        {filtered.length === 0 ? (
          <EmptyState title={t.pages.noResults} body={t.pages.noResultsSub} onReset={reset} />
        ) : (
          <ul>
            {filtered.map((p) => {
              const sol = p.hasSolution ? findSolution(p) : undefined;
              return (
                <li
                  key={p.id}
                  className="grid grid-cols-1 md:grid-cols-[7rem_minmax(0,1fr)_auto] gap-x-10 gap-y-4 py-8 border-b border-line"
                >
                  <div className="flex md:flex-col gap-4 md:gap-1">
                    <span className="font-display text-3xl md:text-4xl leading-none text-ink" style={{ fontVariationSettings: '"opsz" 96' }}>
                      {p.totalMarks}
                    </span>
                    <span className="text-xs text-muted self-end md:self-auto">marks · {p.duration}</span>
                  </div>
                  <div className="min-w-0">
                    <Meta>
                      {p.testType} · {p.subject} · {p.className}
                    </Meta>
                    <h2
                      className="mt-2 font-display !text-[1.5rem] sm:!text-[1.7rem] leading-snug text-ink"
                      style={{ fontVariationSettings: '"opsz" 48' }}
                    >
                      {p.title}
                    </h2>
                    {p.chapter && <p className="mt-1 text-sm text-accent">{p.chapter}</p>}
                    <p className="mt-3 max-w-3xl text-[0.95rem] leading-relaxed text-muted line-clamp-2">{p.description}</p>
                    <Meta className="mt-3">
                      {sol ? 'Worked solution available' : 'Solution coming soon'} · Added {p.uploadDate}
                    </Meta>
                  </div>
                  <div className="flex flex-wrap md:flex-col md:items-end gap-x-6 gap-y-3 md:pt-6">
                    <TextAction onClick={() => setPaper(p)} icon={<Eye className="w-4 h-4" />}>
                      {t.pages.viewPaperBtn}
                    </TextAction>
                    <TextAction onClick={() => download(p)} icon={<ArrowDown className="w-4 h-4" />}>
                      {t.pages.downloadBtn}
                    </TextAction>
                    {sol && (
                      <TextAction onClick={() => setSolution(sol)} tone="accent" icon={<ArrowRight className="w-4 h-4" />}>
                        {t.pages.viewSolutionBtn}
                      </TextAction>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

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
    </>
  );
}

export default function QuestionPapersPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <QuestionPapersContent />
    </Suspense>
  );
}
