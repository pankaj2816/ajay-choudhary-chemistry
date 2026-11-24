'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import SafeImage from '@/components/ui/SafeImage';
import { useSiteSettings } from '@/lib/useSiteSettings';

export default function HeroSection() {
  const { t, L, pick } = useLanguage();
  const s = useSiteSettings();
  const name = pick(s.teacherName, s.teacherNameHi) || 'Ajay Choudhary';
  const sir = L(`${name} Sir`, `${name} सर`);

  const facts = [
    { value: `${s.experienceYears || 8}+`, label: t.home.factYears },
    { value: String(s.coachingCenters?.length || 3), label: t.home.factCenters },
    { value: s.studentsCount || '5,000+', label: t.home.factStudents },
  ];

  return (
    <section className="relative bg-paper">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-12 sm:pt-16 lg:pt-20 pb-20 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-12 items-end">
          {/* Copy */}
          <div className="lg:col-span-7 lg:pb-6">
            <p className="eyebrow text-muted flex items-center gap-3 rise-in">
              <span className="h-px w-8 bg-accent" aria-hidden="true" />
              {t.home.eyebrow}
            </p>

            <h1
              className="mt-7 text-[2.6rem] sm:text-6xl lg:text-[4.4rem] leading-[1.05] text-ink rise-in rise-in-delay-1"
              style={{ fontVariationSettings: '"opsz" 144' }}
            >
              {t.hero.titleLine1}{' '}
              <em className="block text-accent">{t.hero.titleHighlight}</em>
            </h1>

            <p className="mt-7 max-w-xl text-[1.075rem] sm:text-lg leading-relaxed text-muted rise-in rise-in-delay-2">
              {pick(s.bioShort, s.bioShortHi) || t.hero.description}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5 rise-in rise-in-delay-3">
              <Link
                href="/study-materials"
                className="group inline-flex items-center gap-3 px-7 py-4 bg-accent text-paper text-[0.95rem] font-medium hover:bg-accent-deep transition-colors"
              >
                {t.hero.ctaMaterials}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/updates" className="link-underline text-[0.95rem] font-medium text-ink">
                {t.hero.ctaNotices}
              </Link>
            </div>

            <dl className="mt-14 grid grid-cols-3 border-t border-line max-w-xl">
              {facts.map((f, i) => (
                <div key={f.label} className={`pt-6 ${i > 0 ? 'pl-5 sm:pl-8 border-l border-line' : ''}`}>
                  <dt className="sr-only">{f.label}</dt>
                  <dd>
                    <span className="block font-display text-3xl sm:text-[2.6rem] leading-none text-ink" style={{ fontVariationSettings: '"opsz" 96' }}>
                      {f.value}
                    </span>
                    <span className="mt-2 block text-[0.82rem] leading-snug text-muted">{f.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Portrait */}
          <figure className="lg:col-span-5 relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative">
            <div className="absolute -right-3 -bottom-3 sm:-right-5 sm:-bottom-5 w-full h-full bg-paper-deep" aria-hidden="true" />
            <div className="relative aspect-[4/5] overflow-hidden bg-paper-deep">
              <SafeImage
                src="/images/ajay-classroom.jpg"
                alt={L(`${sir} in his chemistry classroom`, `अपनी रसायन विज्ञान कक्षा में ${sir}`)}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover object-[50%_18%]"
              />
            </div>
            </div>
            <figcaption className="relative mt-8 sm:mt-9 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 border-t border-line pt-4">
              <span className="font-display text-lg text-ink">{sir}</span>
              <span className="text-[0.8rem] text-muted sm:text-right">{pick(s.tagline, s.taglineHi) || t.hero.teacherCardRole}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
