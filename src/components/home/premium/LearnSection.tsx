'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Article, ConceptNote } from '@/lib/types';
import { initialDatabase } from '@/data/initialData';
import { getArticles, getConceptNotes } from '@/lib/dataService';
import { useLanguage } from '@/context/LanguageContext';
import ArticleCard from '@/components/learn/ArticleCard';
import SectionLabel from './SectionLabel';

export default function LearnSection() {
  const { t } = useLanguage();
  const [articles, setArticles] = useState<Article[]>(initialDatabase.articles || []);
  const [notes, setNotes] = useState<ConceptNote[]>(initialDatabase.conceptNotes || []);

  useEffect(() => {
    Promise.all([getArticles(), getConceptNotes()])
      .then(([a, n]) => {
        if (Array.isArray(a)) setArticles(a);
        if (Array.isArray(n)) setNotes(n);
      })
      .catch(() => {});
  }, []);

  const list = articles.filter((a) => a.isPublished).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  const grades = Array.from(new Set(notes.filter((n) => n.isPublished).map((n) => n.grade))).sort((a, b) => Number(a) - Number(b));
  if (list.length === 0 && grades.length === 0) return null;

  return (
    <section className="bg-paper-deep border-y border-line">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="" label={t.home.learnLabel} />
            <h2 className="mt-6 text-4xl sm:text-5xl leading-[1.08] text-ink">{t.home.learnTitle}</h2>
          </div>
          <p className="lg:col-span-5 text-[1.02rem] leading-relaxed text-muted">{t.home.learnSub}</p>
        </div>

        {grades.length > 0 && (
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-ink mr-1">{t.home.notesNav}:</span>
            {grades.map((g) => (
              <Link
                key={g}
                href={`/notes?class=${g}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-line text-sm font-medium text-ink hover:border-accent hover:text-accent transition-colors"
              >
                Class {g}
                <span className="text-xs text-muted">{notes.filter((n) => n.grade === g && n.isPublished).length} chapters</span>
              </Link>
            ))}
          </div>
        )}

        {list.length > 0 && (
          <ul className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {list.map((a) => (
              <li key={a.id}><ArticleCard article={a} /></li>
            ))}
          </ul>
        )}

        <Link href="/articles" className="group mt-10 inline-flex items-center gap-2 text-[0.95rem] font-medium text-ink">
          <span className="link-underline">{t.home.allArticles}</span>
          <ArrowRight className="w-4 h-4 text-accent transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
