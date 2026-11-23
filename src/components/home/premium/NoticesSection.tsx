'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { initialDatabase } from '@/data/initialData';
import { NoticeUpdate } from '@/lib/types';
import { getUpdates } from '@/lib/dataService';
import SectionLabel from './SectionLabel';

function splitDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return { day: '', rest: iso };
  return {
    day: d.toLocaleDateString('en-IN', { day: '2-digit' }),
    rest: d.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
  };
}

export default function NoticesSection() {
  const { t } = useLanguage();
  const [updates, setUpdates] = useState<NoticeUpdate[]>(initialDatabase.updates);

  useEffect(() => {
    getUpdates()
      .then((data) => {
        if (Array.isArray(data) && data.length) setUpdates(data);
      })
      .catch(() => {});
  }, []);

  const notices = updates
    .filter((u) => u.isPublished !== false)
    .sort((a, b) => Number(b.isPinned) - Number(a.isPinned) || b.date.localeCompare(a.date))
    .slice(0, 4);

  return (
    <section className="bg-paper-deep border-y border-line">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4">
            <SectionLabel index="06" label={t.home.secNotices} />
            <h2 className="mt-6 text-4xl sm:text-[2.6rem] leading-[1.1] text-ink">{t.notices.title}</h2>
            <p className="mt-6 text-[1.02rem] leading-relaxed text-muted">{t.notices.subtitle}</p>
            <Link href="/updates" className="group mt-8 inline-flex items-center gap-2 text-[0.95rem] font-medium text-ink">
              <span className="link-underline">{t.notices.viewAll}</span>
              <ArrowRight className="w-4 h-4 text-accent transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <ul className="lg:col-span-8 border-t border-ink">
            {notices.map((n) => {
              const { day, rest } = splitDate(n.date);
              return (
                <li key={n.id} className="border-b border-line">
                  <Link href={`/updates?id=${n.id}`} className="group grid grid-cols-[4.5rem_1fr] sm:grid-cols-[6rem_1fr_auto] gap-x-6 gap-y-2 py-7">
                    <div className="row-span-2 sm:row-span-1">
                      <span className="block font-display text-4xl leading-none text-ink" style={{ fontVariationSettings: '"opsz" 96' }}>
                        {day}
                      </span>
                      <span className="mt-1.5 block text-xs text-muted">{rest}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="eyebrow !text-[0.68rem] text-accent">
                        {n.isPinned ? `${t.notices.pinned} · ` : ''}
                        {n.category}
                      </p>
                      <p className="mt-2 font-display text-xl sm:text-[1.4rem] leading-snug text-ink group-hover:text-accent transition-colors" style={{ fontVariationSettings: '"opsz" 36' }}>
                        {n.title}
                      </p>
                      <p className="mt-2 text-[0.92rem] leading-relaxed text-muted line-clamp-2">{n.description}</p>
                    </div>
                    <span className="hidden sm:inline-flex items-center gap-1.5 self-center text-sm text-muted group-hover:text-accent transition-colors">
                      {t.home.readNotice}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
