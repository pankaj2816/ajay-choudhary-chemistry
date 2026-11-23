'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { initialDatabase } from '@/data/initialData';
import { getSettings } from '@/lib/dataService';
import { SiteSettings } from '@/lib/types';
import ElementTile from '@/components/ui/ElementTile';
import { CLASS_LIST } from '@/lib/classes';

export default function Footer() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [settings, setSettings] = useState<SiteSettings>(initialDatabase.settings);

  useEffect(() => {
    getSettings()
      .then((data) => {
        if (data && data.teacherName) setSettings(data);
      })
      .catch(() => {});
  }, []);

  if (pathname?.startsWith('/admin')) return null;

  const columns = [
    {
      title: t.classes.navLabel,
      links: CLASS_LIST.map((c) => ({ label: c.level, href: c.href })),
    },
    {
      title: t.footer.resourcesTitle,
      links: [
        { label: t.nav.studyMaterials, href: '/study-materials' },
        { label: t.nav.questionPapers, href: '/question-papers' },
        { label: t.nav.solutions, href: '/solutions' },
        { label: t.home.notesNav, href: '/notes' },
        { label: t.home.articlesNav, href: '/articles' },
        { label: t.nav.updates, href: '/updates' },
      ],
    },
    {
      title: t.footer.specializationsTitle,
      links: [
        { label: t.subjects.organicName, href: '/subjects#organic' },
        { label: t.subjects.inorganicName, href: '/subjects#inorganic' },
        { label: t.subjects.practicalName, href: '/subjects#practical' },
        { label: t.nav.about, href: '/about' },
      ],
    },
  ];

  return (
    <footer className="bg-ink text-paper/70 no-print">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-20 pb-10">
        {/* Statement */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pb-14 border-b border-paper/10">
          <div className="flex items-start gap-5">
            <ElementTile symbol="Ac" number={89} name="Chemistry" size="lg" tone="dark" />
            <div>
              <p className="font-display text-4xl sm:text-5xl text-paper leading-[1.05]" style={{ fontVariationSettings: '"opsz" 120' }}>
                {t.home.footerLine}
              </p>
              <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed">{t.footer.tagline}</p>
            </div>
          </div>
          <Link
            href="/contact"
            className="self-start lg:self-auto inline-flex items-center px-6 py-3.5 bg-paper text-ink text-sm font-medium hover:bg-accent hover:text-paper transition-colors"
          >
            {t.home.enquire}
          </Link>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-10 py-14">
          {columns.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h4 className="eyebrow text-paper/40 mb-5">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-[0.95rem] text-paper/80 hover:text-paper transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 md:col-span-3 lg:col-span-6">
            <h4 className="eyebrow text-paper/40 mb-5">{t.footer.centersTitle}</h4>
            <ul className="divide-y divide-paper/10 border-y border-paper/10">
              {settings.coachingCenters.map((c) => (
                <li key={c.id} className="py-3.5 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <span className="text-paper">{c.name}</span>
                  <span className="text-sm text-paper/50">{c.location}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-sm">
              <a href={`mailto:${settings.email}`} className="text-paper/80 hover:text-paper">{settings.email}</a>
              <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="text-paper/80 hover:text-paper">{settings.phone}</a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-paper/10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-paper/40">
          <p>
            © {new Date().getFullYear()} {t.footer.rightsReserved}
            <span className="mx-2">·</span>
            Designed &amp; developed by{' '}
            <a
              href="https://pixeltocloud.com?utm_source=chemistry_classes&utm_medium=footer_credit&utm_campaign=client_referral"
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper/70 hover:text-paper underline underline-offset-4 decoration-paper/30"
            >
              PixelToCloud
            </a>
          </p>
          <Link href="/admin/login" className="hover:text-paper/80 transition-colors">
            Teacher login
          </Link>
        </div>
      </div>
    </footer>
  );
}
