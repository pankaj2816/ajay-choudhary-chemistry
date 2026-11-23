'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { SiteSettings } from '@/lib/types';
import { initialDatabase } from '@/data/initialData';
import { useLanguage } from '@/context/LanguageContext';
import { getSettings } from '@/lib/dataService';

// Strip emoji so the bar reads as a calm, typographic notice
const stripEmoji = (text: string) =>
  text.replace(/[\p{Extended_Pictographic}️]/gu, '').replace(/\s{2,}/g, ' ').trim();

export default function AnnouncementBanner() {
  const { t, L, pick } = useLanguage();
  const pathname = usePathname();
  const [settings, setSettings] = useState<SiteSettings | null>(initialDatabase.settings);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    getSettings()
      .then((data) => {
        if (data && data.teacherName) setSettings(data);
      })
      .catch(() => {});
  }, []);

  if (!settings || !settings.bannerActive || dismissed || pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="bg-ink text-paper/80 text-[0.8rem] relative z-40">
      <div className="max-w-7xl mx-auto pl-5 pr-10 sm:px-12 py-2.5 flex items-center justify-center gap-3 sm:gap-5">
        <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-brass shrink-0" aria-hidden="true" />
        <span className="truncate">{stripEmoji(settings.bannerAlert ? pick(settings.bannerAlert, settings.bannerAlertHi) : t.banner.text)}</span>
        <Link
          href={settings.bannerLink || '/updates'}
          className="shrink-0 text-paper underline underline-offset-4 decoration-paper/30 hover:decoration-paper"
        >
          {t.banner.viewNotice}
        </Link>
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-3 sm:right-6 p-1 text-paper/40 hover:text-paper transition-colors"
          aria-label={L('Dismiss announcement', 'घोषणा बंद करें')}
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
