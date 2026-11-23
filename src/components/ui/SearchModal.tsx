'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { Search, X, ArrowRight } from 'lucide-react';
import { searchClientDatabase } from '@/lib/searchUtils';
import { initialDatabase } from '@/data/initialData';
import { useLanguage } from '@/context/LanguageContext';
import { term } from '@/lib/terms';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query.trim() || !text) return <>{text}</>;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return (
    <>
      {text.split(regex).map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-accent-soft text-ink px-0.5 rounded">
            {part}
          </mark>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        ),
      )}
    </>
  );
}

type Row = { id: string; href: string; title: string; meta: string };

const SUGGESTIONS = [
  ['GOC', 'GOC'],
  ['Coordination', 'उपसहसंयोजन'],
  ['Salt analysis', 'लवण विश्लेषण'],
  ['Aldol', 'ऐल्डोल'],
  ['Nernst', 'नेर्न्स्ट'],
  ['Unit test', 'यूनिट टेस्ट'],
];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { L, isHi, pick } = useLanguage();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => inputRef.current?.focus(), 50);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  const groups = useMemo(() => {
    const q = query.trim();
    if (!q) return [];
    const { results } = searchClientDatabase(q);
    const ql = q.toLowerCase();
    const has = (...f: (string | undefined)[]) => f.some((x) => (x || '').toLowerCase().includes(ql));
    const enc = encodeURIComponent(q);
    const notes = (initialDatabase.conceptNotes || [])
      .filter((n) => n.isPublished && has(n.title, n.titleHi, n.summary, n.summaryHi))
      .map<Row>((n) => ({
        id: n.id,
        href: `/notes/${n.slug}`,
        title: pick(n.title, n.titleHi),
        meta: `${L('Class', 'कक्षा')} ${n.grade} · ${L('Chapter', 'अध्याय')} ${n.chapter}`,
      }));
    const articles = (initialDatabase.articles || [])
      .filter((a) => a.isPublished && has(a.title, a.titleHi, a.summary, a.summaryHi))
      .map<Row>((a) => ({ id: a.id, href: `/articles/${a.slug}`, title: pick(a.title, a.titleHi), meta: L('Article', 'लेख') }));
    const videos = (initialDatabase.practicals || [])
      .filter((v) => v.isPublished && has(v.title, v.titleHi, v.topic))
      .map<Row>((v) => {
        const grade = v.className.match(/\d+/)?.[0];
        const lab = (v.kind || 'practical') === 'practical';
        return {
          id: v.id,
          href: !lab && grade ? `/class-${grade}` : '/practicals',
          title: pick(v.title, v.titleHi),
          meta: `${term(v.className, isHi)} · ${lab ? L('Practical', 'प्रैक्टिकल') : L('Class video', 'क्लास वीडियो')}`,
        };
      });

    return [
      {
        key: 'notes',
        label: L('Concept notes', 'कॉन्सेप्ट नोट्स'),
        all: '/notes',
        rows: notes,
      },
      {
        key: 'materials',
        label: L('Study material', 'अध्ययन सामग्री'),
        all: `/study-materials?search=${enc}`,
        rows: results.studyMaterials.map<Row>((m) => ({
          id: m.id,
          href: `/study-materials?search=${enc}`,
          title: pick(m.title, m.titleHi),
          meta: [m.resourceType, m.className, m.chapter].filter(Boolean).map((x) => term(x, isHi)).join(' · '),
        })),
      },
      {
        key: 'papers',
        label: L('Question papers', 'प्रश्न पत्र'),
        all: `/question-papers?search=${enc}`,
        rows: results.questionPapers.map<Row>((p) => ({
          id: p.id,
          href: `/question-papers?search=${enc}`,
          title: pick(p.title, p.titleHi),
          meta: [p.testType, p.className].map((x) => term(x, isHi)).join(' · '),
        })),
      },
      {
        key: 'solutions',
        label: L('Solutions', 'हल'),
        all: `/solutions?search=${enc}`,
        rows: results.solutions.map<Row>((s) => ({
          id: s.id,
          href: `/solutions?id=${s.id}`,
          title: pick(s.title, s.titleHi),
          meta: term(s.className, isHi),
        })),
      },
      { key: 'videos', label: L('Videos', 'वीडियो'), all: '/practicals', rows: videos },
      { key: 'articles', label: L('Articles', 'लेख'), all: '/articles', rows: articles },
      {
        key: 'notices',
        label: L('Notices', 'सूचनाएँ'),
        all: `/updates?search=${enc}`,
        rows: results.updates.map<Row>((u) => ({
          id: u.id,
          href: `/updates?id=${u.id}`,
          title: pick(u.title, u.titleHi),
          meta: term(u.category, isHi),
        })),
      },
    ].filter((g) => g.rows.length > 0);
  }, [query, L, isHi, pick]);

  if (!isOpen) return null;
  const q = query.trim();

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-ink/60"
      role="dialog"
      aria-modal="true"
      aria-label={L('Search', 'खोजें')}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-paper rounded-2xl shadow-2xl border border-line overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 sm:px-5 py-4 border-b border-line gap-3">
          <Search className="w-5 h-5 text-accent shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            placeholder={L('Search chapters, notes, papers, videos…', 'अध्याय, नोट्स, प्रश्न पत्र, वीडियो खोजें…')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-ink placeholder:text-muted/70 text-base outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-muted hover:text-ink" aria-label={L('Clear search', 'खोज साफ़ करें')}>
              <X className="w-4 h-4" />
            </button>
          )}
          <button onClick={onClose} className="text-sm text-muted hover:text-ink px-2 py-1" aria-label={L('Close', 'बंद करें')}>
            {L('Close', 'बंद करें')}
          </button>
        </div>

        <div className="overflow-y-auto px-4 sm:px-5 py-5 flex-1">
          {!q && (
            <div className="py-6 text-center">
              <p className="text-sm text-muted">{L('Try one of these', 'इनमें से कोई आज़माएँ')}</p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {SUGGESTIONS.map(([en, hi]) => (
                  <button
                    key={en}
                    onClick={() => setQuery(isHi ? hi : en)}
                    className="text-sm px-3 py-1.5 rounded-lg border border-line text-ink hover:border-accent hover:text-accent transition-colors"
                  >
                    {L(en, hi)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {q && groups.length === 0 && (
            <div className="py-10 text-center">
              <p className="font-medium text-ink">{L(`No results for “${q}”`, `“${q}” के लिए कुछ नहीं मिला`)}</p>
              <p className="mt-1 text-sm text-muted">{L('Try a chapter name or a shorter word.', 'अध्याय का नाम या छोटा शब्द आज़माएँ।')}</p>
            </div>
          )}

          <div className="space-y-7">
            {groups.map((g) => (
              <section key={g.key}>
                <div className="flex items-baseline justify-between border-b border-ink pb-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-ink">
                    {g.label} <span className="text-muted">({g.rows.length})</span>
                  </h3>
                  <Link href={g.all} onClick={onClose} className="text-xs text-muted hover:text-accent inline-flex items-center gap-1">
                    {L('See all', 'सभी देखें')} <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                <ul>
                  {g.rows.slice(0, 4).map((r) => (
                    <li key={r.id} className="border-b border-line">
                      <Link href={r.href} onClick={onClose} className="group block py-3">
                        <p className="font-medium text-ink group-hover:text-accent">
                          <HighlightMatch text={r.title} query={q} />
                        </p>
                        {r.meta && <p className="mt-0.5 text-xs text-muted">{r.meta}</p>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
