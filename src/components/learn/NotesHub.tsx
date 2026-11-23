'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { ConceptNote } from '@/lib/types';
import { initialDatabase } from '@/data/initialData';
import { getConceptNotes } from '@/lib/dataService';
import { PageHeader, SearchField } from '@/components/ui/Editorial';

export default function NotesHub() {
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
      .filter((n) => !q || n.title.toLowerCase().includes(q) || n.summary.toLowerCase().includes(q) || n.body.toLowerCase().includes(q))
      .sort((a, b) => a.chapter - b.chapter);

  return (
    <>
      <PageHeader
        label="Concept notes"
        title="Chapter notes, made simple"
        intro="Short, concept-first notes for every chapter: the big idea, key points, tables, common mistakes and a quick revision list."
      />
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div role="group" aria-label="Class" className="flex gap-2">
            {grades.map((g) => (
              <button
                key={g}
                onClick={() => setGrade(g)}
                aria-pressed={g === grade}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                  g === grade ? 'bg-accent border-accent text-white' : 'border-line text-ink hover:border-accent hover:text-accent'
                }`}
              >
                Class {g}
              </button>
            ))}
          </div>
          <div className="lg:w-96">
            <SearchField value={query} onChange={setQuery} placeholder="Search notes, e.g. pH, hybridisation" />
          </div>
        </div>

        {list.length === 0 ? (
          <p className="py-20 text-center text-muted">No notes match your search.</p>
        ) : (
          <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {list.map((n) => (
              <li key={n.id}>
                <Link
                  href={`/notes/${n.slug}`}
                  className="group h-full flex flex-col p-6 bg-white border border-line rounded-xl hover:border-accent hover:shadow-xl transition-all"
                >
                  <p className="text-sm text-accent font-medium">Chapter {n.chapter}</p>
                  <h2 className="mt-2 !text-xl leading-snug text-ink group-hover:text-accent transition-colors">{n.title}</h2>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-muted flex-1">{n.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
                    Read note
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
