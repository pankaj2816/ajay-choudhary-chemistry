'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowRight, Eye, Link2, MessageCircle, Paperclip } from 'lucide-react';
import { ConceptNote, NoticeUpdate, QuestionPaper, SolutionItem, StudyMaterial } from '@/lib/types';
import { initialDatabase } from '@/data/initialData';
import { getConceptNotes, getQuestionPapers, getSolutions, getStudyMaterials, getUpdates } from '@/lib/dataService';
import { triggerDownload } from '@/lib/downloadUtils';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';
import { CLASS_LIST, Grade, belongsToClass, getClassInfo } from '@/lib/classes';
import PDFPreviewModal from '@/components/ui/PDFPreviewModal';
import NoticeModal from '@/components/ui/NoticeModal';
import { Eyebrow, Meta, SearchField, TextAction } from '@/components/ui/Editorial';

type Tab = 'all' | 'notes' | 'papers' | 'solutions' | 'notices';

const matches = (q: string, ...fields: (string | undefined)[]) =>
  !q || fields.some((f) => (f || '').toLowerCase().includes(q));

function SectionHead({ title, count }: { title: string; count: number }) {
  return (
    <div className="flex items-baseline justify-between border-b border-ink pb-4 mt-14 first:mt-0">
      <h2 className="!text-2xl sm:!text-3xl text-ink">{title}</h2>
      <span className="text-sm text-muted tabular-nums">{count}</span>
    </div>
  );
}

export default function ClassPage({ grade }: { grade: Grade }) {
  const { t } = useLanguage();
  const c = t.classes;
  const { showToast } = useToast();
  const info = getClassInfo(grade);

  const [materials, setMaterials] = useState<StudyMaterial[]>(initialDatabase.studyMaterials);
  const [papers, setPapers] = useState<QuestionPaper[]>(initialDatabase.questionPapers);
  const [solutions, setSolutions] = useState<SolutionItem[]>(initialDatabase.solutions);
  const [notices, setNotices] = useState<NoticeUpdate[]>(initialDatabase.updates);
  const [conceptNotes, setConceptNotes] = useState<ConceptNote[]>(initialDatabase.conceptNotes || []);
  const [tab, setTab] = useState<Tab>('all');
  const [query, setQuery] = useState('');
  const [preview, setPreview] = useState<StudyMaterial | null>(null);
  const [paper, setPaper] = useState<QuestionPaper | null>(null);
  const [solution, setSolution] = useState<SolutionItem | null>(null);
  const [notice, setNotice] = useState<NoticeUpdate | null>(null);

  useEffect(() => {
    Promise.all([getStudyMaterials(), getQuestionPapers(), getSolutions(), getUpdates()])
      .then(([m, q, s, u]) => {
        if (Array.isArray(m)) setMaterials(m);
        if (Array.isArray(q)) setPapers(q);
        if (Array.isArray(s)) setSolutions(s);
        if (Array.isArray(u)) setNotices(u);
      })
      .catch(() => {});
    getConceptNotes()
      .then((n) => Array.isArray(n) && setConceptNotes(n))
      .catch(() => {});
  }, []);

  const classNotes = conceptNotes.filter((n) => n.grade === grade && n.isPublished).sort((a, b) => a.chapter - b.chapter);

  const q = query.trim().toLowerCase();

  const lists = useMemo(() => {
    const mats = materials
      .filter((m) => belongsToClass(m.className, info.level))
      .filter((m) => matches(q, m.title, m.chapter, m.description, m.resourceType))
      .sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured) || b.uploadDate.localeCompare(a.uploadDate));
    const pps = papers
      .filter((p) => belongsToClass(p.className, info.level))
      .filter((p) => matches(q, p.title, p.chapter, p.description, p.testType))
      .sort((a, b) => b.uploadDate.localeCompare(a.uploadDate));
    const sols = solutions
      .filter((s) => belongsToClass(s.className, info.level))
      .filter((s) => matches(q, s.title, s.chapter, s.description, s.questionPaperTitle))
      .sort((a, b) => b.uploadDate.localeCompare(a.uploadDate));
    const nts = notices
      .filter((n) => n.isPublished !== false && belongsToClass(n.targetClass, info.level))
      .filter((n) => matches(q, n.title, n.description, n.content))
      .sort((a, b) => Number(b.isPinned) - Number(a.isPinned) || b.date.localeCompare(a.date));
    return { mats, pps, sols, nts };
  }, [materials, papers, solutions, notices, q, info.level]);

  const total = lists.mats.length + lists.pps.length + lists.sols.length + lists.nts.length;

  const share = () => {
    const url = window.location.href.split('?')[0].split('#')[0];
    const text = `${info.level} Chemistry: notes, papers and notices from Ajay Choudhary Sir\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  };

  const copy = async () => {
    const url = window.location.href.split('?')[0].split('#')[0];
    try {
      await navigator.clipboard.writeText(url);
      showToast(c.copied, 'success');
    } catch {
      showToast(url, 'info');
    }
  };

  const download = (url: string, name: string, title: string) => {
    showToast(`Downloading: ${title}`, 'info');
    triggerDownload(url, name);
  };

  const show = (k: Tab) => tab === 'all' || tab === k;

  const renderEmpty = () => (
    <div className="py-20 text-center">
      <p className="text-2xl font-semibold text-ink">{c.emptyTitle}</p>
      <p className="mt-2 text-muted max-w-md mx-auto">{q ? t.pages.noResultsSub : c.emptyBody}</p>
      {q && (
        <button onClick={() => setQuery('')} className="mt-6 link-underline text-sm font-medium text-ink">
          Clear search
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Header */}
      <header className="bg-paper border-b border-line">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-12 sm:pt-16 pb-10 sm:pb-12">
          <nav aria-label="Classes" className="grid grid-cols-4 sm:flex sm:flex-wrap gap-2">
            {CLASS_LIST.map((k) => (
              <Link
                key={k.grade}
                href={k.href}
                aria-current={k.grade === grade ? 'page' : undefined}
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium text-center whitespace-nowrap border transition-colors ${
                  k.grade === grade ? 'bg-accent border-accent text-white' : 'border-line text-ink hover:border-accent hover:text-accent'
                }`}
              >
                {k.level}
              </Link>
            ))}
          </nav>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <Eyebrow>{info.course}</Eyebrow>
              <h1 className="mt-5 text-5xl sm:text-7xl leading-none text-ink">
                {c.pageLabel} <span className="text-accent">{grade}</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg text-muted">{c.chooseSub}</p>
            </div>
            <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-3">
              <button
                onClick={share}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#25D366] hover:bg-[#1ebe5b] text-white text-sm font-medium transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                {c.share}
              </button>
              <button
                onClick={copy}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-line hover:border-ink text-ink text-sm font-medium transition-colors"
              >
                <Link2 className="w-4 h-4" />
                {c.copyLink}
              </button>
            </div>
          </div>
        </div>
      </header>

      {classNotes.length > 0 && (
        <section className="bg-accent-soft border-b border-line">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="!text-lg sm:!text-xl text-ink">{t.home.notesForClass}</h2>
              <Link href={`/notes?class=${grade}`} className="text-sm font-medium text-accent hover:text-accent-deep whitespace-nowrap">
                {t.home.allNotes} →
              </Link>
            </div>
            <ul className="mt-4 -mx-5 px-5 sm:mx-0 sm:px-0 flex gap-3 overflow-x-auto pb-2">
              {classNotes.map((n) => (
                <li key={n.id} className="shrink-0">
                  <Link
                    href={`/notes/${n.slug}`}
                    className="block w-60 h-full p-4 rounded-xl bg-white border border-line hover:border-accent transition-colors"
                  >
                    <span className="text-xs text-accent font-medium">Chapter {n.chapter}</span>
                    <span className="mt-1 block text-[0.95rem] font-semibold leading-snug text-ink">{n.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        {/* Search + chapter shortcuts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-5">
            <SearchField value={query} onChange={setQuery} placeholder={c.searchPlaceholder} />
          </div>
          <div className="lg:col-span-7">
            <p className="eyebrow !text-[0.66rem] text-muted">{c.chapters}</p>
            <div className="mt-3 -mx-5 px-5 sm:mx-0 sm:px-0 flex gap-2 overflow-x-auto sm:flex-wrap sm:overflow-visible pb-1">
              {info.chapters.map((ch) => {
                const active = q === ch.key;
                return (
                  <button
                    key={ch.name}
                    type="button"
                    onClick={() => setQuery(active ? '' : ch.key)}
                    aria-pressed={active}
                    className={`shrink-0 whitespace-nowrap px-3 py-1.5 rounded-lg text-[0.82rem] border transition-colors ${
                      active ? 'bg-ink border-ink text-white' : 'border-line text-ink hover:border-ink/50'
                    }`}
                  >
                    {ch.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-10 sticky top-[72px] z-20 -mx-5 sm:-mx-8 px-5 sm:px-8 py-3 bg-paper/95 backdrop-blur border-y border-line overflow-x-auto">
          <div role="group" aria-label="Show" className="flex gap-2 w-max">
            {(
              [
                ['all', `${c.everything} (${total})`],
                ['notes', `${c.notesBooks} (${lists.mats.length})`],
                ['papers', `${c.papers} (${lists.pps.length})`],
                ['solutions', `${c.solutions} (${lists.sols.length})`],
                ['notices', `${c.notices} (${lists.nts.length})`],
              ] as [Tab, string][]
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setTab(value)}
                aria-pressed={tab === value}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg text-[0.85rem] border transition-colors ${
                  tab === value ? 'bg-ink border-ink text-white' : 'border-line text-ink hover:border-ink/50'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10">
          {total === 0 && renderEmpty()}

          {/* Notes & books */}
          {show('notes') && lists.mats.length > 0 && (
            <>
              <SectionHead title={c.notesBooks} count={lists.mats.length} />
              <ul>
                {lists.mats.map((m) => (
                  <li key={m.id} className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto] gap-x-10 gap-y-3 py-6 border-b border-line">
                    <div className="min-w-0">
                      <Meta>
                        {m.resourceType}
                        {m.chapter ? ` · ${m.chapter}` : ''}
                      </Meta>
                      <h3 className="mt-1.5 text-lg sm:text-xl font-semibold leading-snug text-ink">{m.title}</h3>
                      {m.description && <p className="mt-1.5 text-[0.95rem] text-muted line-clamp-2">{m.description}</p>}
                    </div>
                    <div className="flex md:flex-col md:items-end gap-6 md:gap-2 md:pt-5">
                      <TextAction onClick={() => setPreview(m)} tone="accent" icon={<Eye className="w-4 h-4" />}>
                        {c.open}
                      </TextAction>
                      <TextAction onClick={() => download(m.fileUrl, m.fileName, m.title)} icon={<ArrowDown className="w-4 h-4" />}>
                        {t.pages.downloadBtn}
                      </TextAction>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Papers */}
          {show('papers') && lists.pps.length > 0 && (
            <>
              <SectionHead title={c.papers} count={lists.pps.length} />
              <ul>
                {lists.pps.map((p) => {
                  const sol = p.hasSolution ? solutions.find((s) => s.id === p.solutionId) : undefined;
                  return (
                    <li key={p.id} className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto] gap-x-10 gap-y-3 py-6 border-b border-line">
                      <div className="min-w-0">
                        <Meta>
                          {p.testType} · {p.totalMarks} marks · {p.duration}
                        </Meta>
                        <h3 className="mt-1.5 text-lg sm:text-xl font-semibold leading-snug text-ink">{p.title}</h3>
                        {p.chapter && <p className="mt-1 text-sm text-muted">{p.chapter}</p>}
                      </div>
                      <div className="flex flex-wrap md:flex-col md:items-end gap-x-6 gap-y-2 md:pt-5">
                        <TextAction onClick={() => setPaper(p)} tone="accent" icon={<Eye className="w-4 h-4" />}>
                          {c.open}
                        </TextAction>
                        {sol && (
                          <TextAction onClick={() => setSolution(sol)} icon={<ArrowRight className="w-4 h-4" />}>
                            {t.home.solution}
                          </TextAction>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </>
          )}

          {/* Solutions */}
          {show('solutions') && lists.sols.length > 0 && (
            <>
              <SectionHead title={c.solutions} count={lists.sols.length} />
              <ul>
                {lists.sols.map((s) => (
                  <li key={s.id} className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto] gap-x-10 gap-y-3 py-6 border-b border-line">
                    <div className="min-w-0">
                      <Meta>{s.chapter || s.subject}</Meta>
                      <h3 className="mt-1.5 text-lg sm:text-xl font-semibold leading-snug text-ink">{s.title}</h3>
                      {s.questionPaperTitle && <p className="mt-1 text-sm text-muted">For: {s.questionPaperTitle}</p>}
                    </div>
                    <div className="flex md:flex-col md:items-end gap-6 md:pt-5">
                      <TextAction onClick={() => setSolution(s)} tone="accent" icon={<ArrowRight className="w-4 h-4" />}>
                        {c.open}
                      </TextAction>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Notices */}
          {show('notices') && lists.nts.length > 0 && (
            <>
              <SectionHead title={c.notices} count={lists.nts.length} />
              <ul>
                {lists.nts.map((n) => (
                  <li key={n.id} className="border-b border-line">
                    <button onClick={() => setNotice(n)} className="group w-full text-left grid grid-cols-[minmax(0,1fr)_auto] gap-6 py-6">
                      <div className="min-w-0">
                        <Meta>
                          {n.isPinned ? `${t.notices.pinned} · ` : ''}
                          {n.category} · {n.date}
                        </Meta>
                        <h3 className="mt-1.5 text-lg sm:text-xl font-semibold leading-snug text-ink group-hover:text-accent transition-colors">
                          {n.title}
                        </h3>
                        <p className="mt-1.5 text-[0.95rem] text-muted line-clamp-2">{n.description}</p>
                        {n.attachmentUrl && (
                          <p className="mt-2 inline-flex items-center gap-1 text-xs text-muted max-w-full">
                            <Paperclip className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{n.attachmentName || 'Attachment'}</span>
                          </p>
                        )}
                      </div>
                      <ArrowRight className="w-4 h-4 mt-7 text-muted group-hover:text-accent" />
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}

          {tab !== 'all' &&
            total > 0 &&
            ((tab === 'notes' && !lists.mats.length) ||
              (tab === 'papers' && !lists.pps.length) ||
              (tab === 'solutions' && !lists.sols.length) ||
              (tab === 'notices' && !lists.nts.length)) && renderEmpty()}
        </div>
      </section>

      {preview && (
        <PDFPreviewModal
          isOpen
          onClose={() => setPreview(null)}
          title={preview.title}
          subject={preview.subject}
          chapter={preview.chapter}
          className={preview.className}
          testType={preview.resourceType}
          description={preview.description}
          fileUrl={preview.fileUrl}
          fileName={preview.fileName}
          fileSize={preview.fileSize}
          uploadDate={preview.uploadDate}
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
      {solution && (
        <PDFPreviewModal
          isOpen
          onClose={() => setSolution(null)}
          title={solution.title}
          subject={solution.subject}
          chapter={solution.chapter}
          className={solution.className}
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
      {notice && (
        <NoticeModal
          notice={notice}
          onClose={() => setNotice(null)}
          onDownload={(n) => n.attachmentUrl && download(n.attachmentUrl, n.attachmentName || 'attachment', n.title)}
        />
      )}
    </>
  );
}
