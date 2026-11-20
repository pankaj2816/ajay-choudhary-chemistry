'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import SectionLabel from './SectionLabel';

export default function MethodSection() {
  const { t } = useLanguage();
  const w = t.whyLearn;

  const steps = [
    { title: w.pillar1Title, desc: w.pillar1Desc },
    { title: w.pillar2Title, desc: w.pillar2Desc },
    { title: w.pillar3Title, desc: w.pillar3Desc },
    { title: w.pillar4Title, desc: w.pillar4Desc },
    { title: w.pillar5Title, desc: w.pillar5Desc },
    { title: w.pillar6Title, desc: w.pillar6Desc },
  ];

  return (
    <section className="bg-ink text-paper">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="03" label={t.home.secMethod} tone="dark" />
            <h2 className="mt-6 text-4xl sm:text-5xl leading-[1.08] text-paper">{t.home.methodTitle}</h2>
          </div>
          <p className="lg:col-span-5 text-[1.02rem] leading-relaxed text-paper/60">{w.subtitle}</p>
        </div>

        <ol className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14">
          {steps.map((s, i) => (
            <li key={s.title} className="border-t border-paper/15 pt-7">
              <span className="font-display text-5xl text-brass leading-none" style={{ fontVariationSettings: '"opsz" 144' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-6 text-lg font-medium text-paper">{s.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-paper/60">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
