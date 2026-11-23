'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { ConceptNote } from '@/lib/types';
import { initialDatabase } from '@/data/initialData';
import { getConceptNotes } from '@/lib/dataService';
import Markdown, { extractHeadings } from '@/components/ui/Markdown';
import { Eyebrow } from '@/components/ui/Editorial';
import { useLanguage } from '@/context/LanguageContext';

export default function NoteView({ slug }: { slug: string }) {
  const { L, pick } = useLanguage();
  const [notes, setNotes] = useState<ConceptNote[]>(initialDatabase.conceptNotes || []);

  useEffect(() => {
    getConceptNotes()
      .then((n) => Array.isArray(n) && setNotes(n))
      .catch(() => {});
  }, []);

  const note = notes.find((n) => n.slug === slug);
  if (!note) {
    return (
      <div className="max-w-3xl mx-auto px-5 py-32 text-center">
        <p className="text-2xl font-semibold text-ink">{L('This note is not available.', 'यह नोट उपलब्ध नहीं है।')}</p>
        <Link href="/notes" className="mt-6 inline-block link-underline text-ink">{L('See all notes', 'सभी नोट्स देखें')}</Link>
      </div>
    );
  }

  const siblings = notes.filter((n) => n.grade === note.grade && n.isPublished).sort((a, b) => a.chapter - b.chapter);
  const idx = siblings.findIndex((n) => n.id === note.id);
  const prev = idx > 0 ? siblings[idx - 1] : null;
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : null;
  const body = pick(note.body, note.bodyHi);
  const headings = extractHeadings(body);
  const minutes = Math.max(2, Math.round(body.split(/\s+/).length / 200));
  const cls = L('Class', 'कक्षा');

  return (
    <article>
      <header className="bg-paper-deep border-b border-line">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-10 sm:pt-14 pb-10">
          <nav className="text-sm text-muted flex flex-wrap items-center gap-2" aria-label={L('Breadcrumb', 'पथ')}>
            <Link href="/notes" className="hover:text-accent">{L('Concept notes', 'कॉन्सेप्ट नोट्स')}</Link>
            <span>/</span>
            <Link href={`/notes?class=${note.grade}`} className="hover:text-accent">{cls} {note.grade}</Link>
          </nav>
          <div className="mt-8">
            <Eyebrow>
              {cls} {note.grade} · {L('Chapter', 'अध्याय')} {note.chapter}
            </Eyebrow>
            <h1 className="mt-5 text-4xl sm:text-5xl leading-[1.08] text-ink">{pick(note.title, note.titleHi)}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{pick(note.summary, note.summaryHi)}</p>
            <p className="mt-5 inline-flex items-center gap-1.5 text-sm text-muted">
              <Clock className="w-4 h-4" /> {minutes} {L('min read', 'मिनट में पढ़ें')}
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_220px] gap-12">
        <div className="min-w-0">
          <Markdown source={body} />

          <div className="mt-16 pt-8 border-t border-line grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prev ? (
              <Link href={`/notes/${prev.slug}`} className="group p-5 rounded-xl border border-line hover:border-accent transition-colors">
                <span className="inline-flex items-center gap-1.5 text-sm text-muted"><ArrowLeft className="w-4 h-4" /> {L('Previous chapter', 'पिछला अध्याय')}</span>
                <span className="mt-1 block font-semibold text-ink group-hover:text-accent">{pick(prev.title, prev.titleHi)}</span>
              </Link>
            ) : <span />}
            {next && (
              <Link href={`/notes/${next.slug}`} className="group p-5 rounded-xl border border-line hover:border-accent transition-colors sm:text-right">
                <span className="inline-flex items-center gap-1.5 text-sm text-muted">{L('Next chapter', 'अगला अध्याय')} <ArrowRight className="w-4 h-4" /></span>
                <span className="mt-1 block font-semibold text-ink group-hover:text-accent">{pick(next.title, next.titleHi)}</span>
              </Link>
            )}
          </div>

          <div className="mt-8 p-6 rounded-xl bg-accent-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-ink">
              {L(
                `Practice this chapter with papers and solutions for Class ${note.grade}.`,
                `कक्षा ${note.grade} के प्रश्न पत्र और हल से इस अध्याय का अभ्यास करें।`,
              )}
            </p>
            <Link href={`/class-${note.grade}`} className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-deep">
              {L(`Open Class ${note.grade} page`, `कक्षा ${note.grade} का पेज खोलें`)} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {headings.length > 2 && (
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="eyebrow !text-[0.66rem] text-muted">{L('On this page', 'इस पेज पर')}</p>
              <ul className="mt-4 space-y-2.5 border-l border-line">
                {headings.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="block -ml-px pl-4 border-l border-transparent text-sm text-muted hover:text-accent hover:border-accent">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}
      </div>
    </article>
  );
}
