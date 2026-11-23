'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { initialDatabase } from '@/data/initialData';
import { QuestionPaper, SolutionItem, StudyMaterial } from '@/lib/types';
import { getQuestionPapers, getSolutions, getStudyMaterials } from '@/lib/dataService';
import { CLASS_LIST, belongsToClass } from '@/lib/classes';
import SectionLabel from './SectionLabel';

export default function ClassesSection() {
  const { t } = useLanguage();
  const [materials, setMaterials] = useState<StudyMaterial[]>(initialDatabase.studyMaterials);
  const [papers, setPapers] = useState<QuestionPaper[]>(initialDatabase.questionPapers);
  const [solutions, setSolutions] = useState<SolutionItem[]>(initialDatabase.solutions);

  useEffect(() => {
    Promise.all([getStudyMaterials(), getQuestionPapers(), getSolutions()])
      .then(([m, q, s]) => {
        if (Array.isArray(m)) setMaterials(m);
        if (Array.isArray(q)) setPapers(q);
        if (Array.isArray(s)) setSolutions(s);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="bg-paper-deep border-y border-line">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="01" label={t.classes.chooseLabel} />
            <h2 className="mt-6 text-4xl sm:text-5xl leading-[1.08] text-ink">{t.classes.chooseTitle}</h2>
          </div>
          <p className="lg:col-span-5 text-[1.02rem] leading-relaxed text-muted">{t.classes.chooseSub}</p>
        </div>

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {CLASS_LIST.map((c) => {
            const count =
              materials.filter((m) => belongsToClass(m.className, c.level)).length +
              papers.filter((p) => belongsToClass(p.className, c.level)).length +
              solutions.filter((s) => belongsToClass(s.className, c.level)).length;
            return (
              <Link
                key={c.grade}
                href={c.href}
                className="group relative flex flex-col justify-between min-h-[190px] sm:min-h-[220px] p-5 sm:p-7 bg-white border border-line rounded-xl hover:border-accent hover:shadow-xl transition-all"
              >
                <div>
                  <p className="text-sm text-muted">{t.classes.pageLabel}</p>
                  <p className="mt-1 text-6xl sm:text-7xl font-semibold leading-none tracking-tight text-ink group-hover:text-accent transition-colors">
                    {c.grade}
                  </p>
                </div>
                <div className="mt-6 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-ink">{c.course}</p>
                    <p className="text-xs text-muted mt-0.5">
                      {count} {count === 1 ? t.classes.item : t.classes.items}
                    </p>
                  </div>
                  <span className="w-9 h-9 shrink-0 rounded-full bg-accent-soft text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
