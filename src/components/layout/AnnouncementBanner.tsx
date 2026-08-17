'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Megaphone, X, ArrowRight } from 'lucide-react';
import { SiteSettings } from '@/lib/types';
import { initialDatabase } from '@/data/initialData';
import { useLanguage } from '@/context/LanguageContext';

export default function AnnouncementBanner() {
  const { t } = useLanguage();
  const [settings, setSettings] = useState<SiteSettings | null>(initialDatabase.settings);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.teacherName) setSettings(data);
      })
      .catch(() => {});
  }, []);

  if (!settings || !settings.bannerActive || dismissed) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-cyan-900 via-slate-900 to-indigo-950 text-cyan-100 text-xs sm:text-sm py-2.5 px-4 relative border-b border-cyan-500/20 z-40 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="inline-flex items-center gap-1.5 bg-cyan-500/20 text-cyan-300 font-semibold px-2 py-0.5 rounded-full text-xs shrink-0 border border-cyan-500/30">
            <Megaphone className="w-3.5 h-3.5 animate-pulse" />
            {t.banner.announcement}
          </span>
          <span className="text-slate-200 font-medium truncate">{t.banner.text}</span>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <Link
            href="/updates"
            className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold hover:underline text-xs"
          >
            {t.banner.viewNotice}
            <ArrowRight className="w-3 h-3" />
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="text-slate-400 hover:text-white p-0.5 rounded transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
