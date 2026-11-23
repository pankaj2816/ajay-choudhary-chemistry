'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { ConceptNote } from '@/lib/types';
import { initialDatabase } from '@/data/initialData';
import { getConceptNotes } from '@/lib/dataService';
import { PageHeader, SearchField } from '@/components/ui/Editorial';
import { useLanguage } from '@/context/LanguageContext';

export default function NotesHub() {
  const { L, pick } = useLanguage();
  const params = useSearchParams();
  const [notes, setNotes] = useState<ConceptNote[]>(initialDatabase.conceptNotes || []);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getConceptNotes()
      .then((n) => Array.isArray(n) && setNotes(n))
      .catch(() => {});
  }, []);

  const published = notes.filter((n) => n.isPublished);
  const grades = Array.from(new Set(published.map((n) => n.grade))).sort((a, b) => Number(a) - Number(b));
  const initial = params.get('class') && grades.includes(params.get('class')!) ? params.get('class')! : grades[0] || '11';
  const [grade, setGrade] = useState(initial);

  const q = query.trim().toLowerCase();
  const list = published
      .filter((n) => n.grade === grade)
      .filter((n) => !q || [n.title, n.summary, n.body, n.titleHi, n.summaryHi, n.bodyHi].some((f) => (f || '').toLowerCase().includes(q)))
      .sort((a, b) => a.chapter - b.chapter);

  return (
    <>
      <PageHeader
        label={L('Concept notes', 'कॉन्सेप्ट नोट्स')}
        title={L('Chapter notes, made simple', 'अध्याय नोट्स, आसान भाषा में')}
        intro={L(
          'Short, concept-first notes for every chapter: the big idea, key points, tables, common mistakes and a quick revision list.',
          'हर अध्याय के छोटे, कॉन्सेप्ट पर आधारित नोट्स: मुख्य विचार, मुख्य बिंदु, तालिकाएँ, आम गलतियाँ और त्वरित दोहराव।',
        )}
      />
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div role="group" aria-label={L('Class', 'कक्षा')} className="flex gap-2">
            {grades.map((g) => (
              <button
                key={g}
                onClick={() => setGrade(g)}
                aria-pressed={g === grade}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                  g === grade ? 'bg-accent border-accent text-white' : 'border-line text-ink hover:border-accent hover:text-accent'
                }`}
              >
                {L('Class', 'कक्षा')} {g}
              </button>
            ))}
          </div>
          <div className="lg:w-96">
            <SearchField value={query} onChange={setQuery} placeholder={L('Search notes, e.g. pH, hybridisation', 'नोट्स खोजें, जैसे pH, संकरण')} />
          </div>
        </div>

        {list.length === 0 ? (
          <p className="py-20 text-center text-muted">{L('No notes match your search.', 'आपकी खोज से कोई नोट नहीं मिला।')}</p>
        ) : (
          <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {list.map((n) => (
              <li key={n.id}>
                <Link
                  href={`/notes/${n.slug}`}
                  className="group h-full flex flex-col p-6 bg-white border border-line rounded-xl hover:border-accent hover:shadow-xl transition-all"
                >
                  <p className="text-sm text-accent font-medium">{L('Chapter', 'अध्याय')} {n.chapter}</p>
                  <h2 className="mt-2 !text-xl leading-snug text-ink group-hover:text-accent transition-colors">{pick(n.title, n.titleHi)}</h2>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-muted flex-1">{pick(n.summary, n.summaryHi)}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
                    {L('Read note', 'नोट पढ़ें')}
                    <ArrowRight className="w-4 h-4 text-accent transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
