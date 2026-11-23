'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { initialDatabase } from '@/data/initialData';
import { SiteSettings } from '@/lib/types';
import { getSettings } from '@/lib/dataService';
import SectionLabel from './SectionLabel';

export default function VisitSection() {
  const { t } = useLanguage();
  const [settings, setSettings] = useState<SiteSettings>(initialDatabase.settings);

  useEffect(() => {
    getSettings()
      .then((data) => {
        if (data && data.teacherName) setSettings(data);
      })
      .catch(() => {});
  }, []);

  const whatsappNumber = (settings.whatsapp || settings.phone || '').replace(/[^0-9]/g, '');
  const phone = (settings.phone || '').replace(/\s/g, '');

  return (
    <section className="bg-paper">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-end">
          <div className="lg:col-span-8">
            <SectionLabel index="07" label={t.home.secVisit} />
            <h2 className="mt-6 text-[2.6rem] sm:text-6xl leading-[1.04] text-ink" style={{ fontVariationSettings: '"opsz" 144' }}>
              {t.home.visitTitle}
            </h2>
          </div>
          <p className="lg:col-span-4 text-[1.02rem] leading-relaxed text-muted">{t.home.visitSub}</p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 border-t border-ink">
          {settings.coachingCenters.map((c, i) => (
            <div
              key={c.id}
              className={`py-8 md:pr-8 ${i > 0 ? 'border-t md:border-t-0 md:border-l border-line md:pl-8' : ''}`}
            >
              <p className="text-xs text-muted tabular-nums">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-3 font-display text-2xl text-ink" style={{ fontVariationSettings: '"opsz" 48' }}>{c.name}</h3>
              <p className="mt-1 text-sm text-accent">{c.location}</p>
              <dl className="mt-6 space-y-3 text-[0.92rem]">
                <div>
                  <dt className="sr-only">Batches</dt>
                  <dd className="text-ink">{c.batches}</dd>
                </div>
                <div>
                  <dt className="sr-only">Schedule</dt>
                  <dd className="text-muted">{c.schedule}</dd>
                </div>
                <div>
                  <dt className="sr-only">Address</dt>
                  <dd className="text-muted">{c.address}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 px-7 py-4 bg-accent text-paper text-[0.95rem] font-medium hover:bg-accent-deep transition-colors"
          >
            {t.home.enquire}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          {whatsappNumber && (
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-7 py-4 border border-ink text-ink text-[0.95rem] font-medium hover:bg-ink hover:text-paper transition-colors"
            >
              {t.home.whatsapp}
            </a>
          )}
          {phone && (
            <a href={`tel:${phone}`} className="ml-2 link-underline text-[0.95rem] font-medium text-ink">
              {t.home.call} {settings.phone}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
