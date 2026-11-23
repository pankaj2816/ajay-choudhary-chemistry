'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SiteSettings, TeamMember } from '@/lib/types';
import { initialDatabase } from '@/data/initialData';
import SafeImage from '@/components/ui/SafeImage';
import { useLanguage } from '@/context/LanguageContext';
import { getSettings, getTeam } from '@/lib/dataService';
import { Eyebrow } from '@/components/ui/Editorial';
import SectionLabel from '@/components/home/premium/SectionLabel';

const stripNumber = (s: string) => s.replace(/^\s*\d+\.\s*/, '');

export default function AboutPage() {
  const { t, L, pick } = useLanguage();
  const a = t.about;
  const [team, setTeam] = useState<TeamMember[]>(initialDatabase.teamMembers);
  const [settings, setSettings] = useState<SiteSettings>(initialDatabase.settings);

  useEffect(() => {
    getTeam()
      .then((d) => Array.isArray(d) && setTeam(d))
      .catch(() => {});
    getSettings()
      .then((s) => s && setSettings(s))
      .catch(() => {});
  }, []);

  const steps = [
    [a.step1Title, a.step1Desc],
    [a.step2Title, a.step2Desc],
    [a.step3Title, a.step3Desc],
    [a.step4Title, a.step4Desc],
    [a.step5Title, a.step5Desc],
    [a.step6Title, a.step6Desc],
  ];

  const quals = [
    [a.qual1Title, a.qual1Desc],
    [a.qual2Title, a.qual2Desc],
    [a.qual3Title, a.qual3Desc],
    [a.qual4Title, a.qual4Desc],
  ];

  const facts = [
    { value: a.statExp, label: a.statExpLabel },
    { value: String(settings.coachingCenters.length || a.statCenters), label: a.statCentersLabel },
    { value: a.statStudents, label: a.statStudentsLabel },
  ];

  return (
    <>
      {/* Intro */}
      <section className="bg-paper border-b border-line">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-20 lg:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <Eyebrow>{a.heroBadge}</Eyebrow>
              <h1 className="mt-6 text-[2.6rem] sm:text-6xl lg:text-7xl leading-[1.02] text-ink rise-in" style={{ fontVariationSettings: '"opsz" 144' }}>
                {a.heroTitle}
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">{a.heroDesc}</p>
              <dl className="mt-12 grid grid-cols-3 border-t border-line max-w-xl">
                {facts.map((f, i) => (
                  <div key={f.label} className={`pt-6 ${i > 0 ? 'pl-5 sm:pl-8 border-l border-line' : ''}`}>
                    <dt className="sr-only">{f.label}</dt>
                    <dd>
                      <span className="block font-display text-3xl sm:text-[2.6rem] leading-none text-ink">{f.value}</span>
                      <span className="mt-2 block text-[0.82rem] text-muted">{f.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <figure className="lg:col-span-5 relative w-full max-w-md mx-auto lg:max-w-none">
              <div className="relative">
                <div className="absolute -right-3 -bottom-3 sm:-right-5 sm:-bottom-5 w-full h-full bg-paper-deep" aria-hidden="true" />
                <div className="relative aspect-[4/5] overflow-hidden bg-paper-deep">
                  <SafeImage src="/images/ajay-classroom.jpg" alt={L('Ajay Choudhary Sir', 'अजय चौधरी सर')} fill priority sizes="(min-width:1024px) 40vw, 90vw" className="object-cover object-[50%_18%]" />
                </div>
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="bg-paper">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5">
              <SectionLabel index="01" label={a.journeyBadge} />
              <h2 className="mt-6 text-4xl sm:text-5xl leading-[1.08] text-ink">{a.journeyTitle}</h2>
            </div>
            <div className="lg:col-span-7 lg:pt-14 space-y-6 text-[1.06rem] leading-relaxed text-muted">
              <p className="first-letter:font-display first-letter:text-6xl first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-[0.8] first-letter:text-accent">
                {a.journeyP1}
              </p>
              <p>{a.journeyP2}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy & method */}
      <section className="bg-ink text-paper">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24 lg:py-32">
          <SectionLabel index="02" label={a.philosophyBadge} tone="dark" />
          <blockquote className="mt-8 max-w-4xl">
            <p className="font-display italic text-3xl sm:text-5xl leading-[1.15] text-paper" style={{ fontVariationSettings: '"opsz" 144' }}>
              {a.philosophyQuote.replace(/^[“"]|[”"]$/g, '')}
            </p>
          </blockquote>
          <p className="mt-6 max-w-2xl text-paper/60">{a.philosophySub}</p>

          <ol className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14">
            {steps.map(([title, desc], i) => (
              <li key={title} className="border-t border-paper/15 pt-7">
                <span className="font-display text-5xl text-brass leading-none">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-6 text-lg font-medium text-paper">{stripNumber(title)}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-paper/60">{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Credentials */}
      <section className="bg-paper">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-4">
              <SectionLabel index="03" label={a.credentialsBadge} />
              <h2 className="mt-6 text-4xl sm:text-5xl leading-[1.08] text-ink">{a.credentialsTitle}</h2>
              <p className="mt-6 text-muted leading-relaxed">{a.credentialsSub}</p>
            </div>
            <dl className="lg:col-span-8 border-t border-ink">
              {quals.map(([title, desc]) => (
                <div key={title} className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-2 sm:gap-10 py-7 border-b border-line">
                  <dt className="font-display text-xl sm:text-2xl leading-snug text-ink">{title}</dt>
                  <dd className="text-[0.98rem] leading-relaxed text-muted">{desc}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Gallery (team entries managed in Admin → Team) */}
      {team.length > 0 && (
        <section className="bg-paper-deep border-y border-line">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24 lg:py-32">
            <SectionLabel index="04" label={L('In class & in the lab', 'कक्षा में और प्रयोगशाला में')} />
            <h2 className="mt-6 text-4xl sm:text-5xl leading-[1.08] text-ink">{t.portfolio.title}</h2>
            <div className={`mt-14 grid grid-cols-1 sm:grid-cols-2 ${team.length >= 3 ? 'lg:grid-cols-3' : ''} gap-x-8 gap-y-12`}>
              {team.map((m) => (
                <figure key={m.id}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-paper">
                    <SafeImage src={m.image} alt={`${m.name} — ${pick(m.role, m.roleHi)}`} fill sizes="(min-width:1024px) 30vw, 90vw" className="object-cover object-top" />
                  </div>
                  <figcaption className="mt-5">
                    <p className="font-display text-xl text-ink">{pick(m.role, m.roleHi)}</p>
                    <p className="mt-1 text-sm text-muted">{[pick(m.designation, m.designationHi), pick(m.centers, m.centersHi)].filter(Boolean).join(' · ')}</p>
                    {m.bio && <p className="mt-3 text-[0.92rem] leading-relaxed text-muted line-clamp-3">{pick(m.bio, m.bioHi)}</p>}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Centres */}
      <section className="bg-paper">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24 lg:py-32">
          <SectionLabel index={team.length > 0 ? '05' : '04'} label={a.centersBadge} />
          <h2 className="mt-6 text-4xl sm:text-5xl leading-[1.08] text-ink max-w-3xl">{a.centersTitle}</h2>
          <p className="mt-6 max-w-2xl text-muted leading-relaxed">{a.centersSub}</p>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 border-t border-ink">
            {settings.coachingCenters.map((c, i) => (
              <div key={c.id} className={`py-8 md:pr-8 ${i > 0 ? 'border-t md:border-t-0 md:border-l border-line md:pl-8' : ''}`}>
                <h3 className="font-display text-2xl text-ink">{pick(c.name, c.nameHi)}</h3>
                <p className="mt-1 text-sm text-accent">{pick(c.location, c.locationHi)}</p>
                <p className="mt-5 text-[0.92rem] text-ink">{pick(c.batches, c.batchesHi)}</p>
                {c.schedule && <p className="mt-2 text-[0.92rem] text-muted">{pick(c.schedule, c.scheduleHi)}</p>}
              </div>
            ))}
          </div>

          <div className="mt-20 pt-12 border-t border-line flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <h2 className="text-3xl sm:text-4xl text-ink">{a.ctaTitle}</h2>
              <p className="mt-3 text-muted">{a.ctaSub}</p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/contact" className="group inline-flex items-center gap-3 px-7 py-4 bg-accent text-paper text-[0.95rem] font-medium hover:bg-accent-deep transition-colors">
                {a.ctaContactBtn}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/study-materials" className="link-underline text-[0.95rem] font-medium text-ink">
                {a.ctaNotesBtn}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
