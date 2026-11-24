'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useSiteSettings } from '@/lib/useSiteSettings';
import { FACTS, factIndexForToday } from '@/lib/facts';

// Strip emoji so the bar reads as a calm, typographic line
const stripEmoji = (text: string) =>
  text.replace(/[\p{Extended_Pictographic}️]/gu, '').replace(/\s{2,}/g, ' ').trim();

/**
 * Top strip. If the teacher has turned on an announcement in Admin → Settings,
 * it shows that. Otherwise it shows a chemistry fact of the day.
 */
export default function AnnouncementBanner() {
  const { L, pick } = useLanguage();
  const pathname = usePathname();
  const settings = useSiteSettings();
  const [dismissed, setDismissed] = useState(false);
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    // Picked after load so the fact follows the visitor's own date.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIndex(factIndexForToday());
  }, []);

  if (dismissed || pathname?.startsWith('/admin')) return null;

  const announcement = settings.bannerActive && settings.bannerAlert?.trim() ? settings.bannerAlert : '';
  const fact = FACTS[index ?? 0];

  return (
    <div className="bg-ink text-paper/80 text-[0.8rem] relative z-40">
      <div className="max-w-7xl mx-auto pl-5 pr-10 sm:px-12 py-2.5 flex items-center justify-center gap-3 sm:gap-4 min-h-[2.4rem]">
        {announcement ? (
          <>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-brass shrink-0" aria-hidden="true" />
            <span className="truncate">{stripEmoji(pick(announcement, settings.bannerAlertHi))}</span>
            <Link
              href={settings.bannerLink || '/updates'}
              className="shrink-0 text-paper underline underline-offset-4 decoration-paper/30 hover:decoration-paper"
            >
              {L('Read more', 'और पढ़ें')}
            </Link>
          </>
        ) : (
          <>
            <span className="hidden sm:inline shrink-0 text-brass font-medium">{L('Chemistry fact', 'रसायन तथ्य')}</span>
            <span className={`leading-snug sm:truncate transition-opacity ${index === null ? 'opacity-0' : 'opacity-100'}`}>{L(fact.en, fact.hi)}</span>
            <Link
              href={fact.href}
              className="shrink-0 text-paper underline underline-offset-4 decoration-paper/30 hover:decoration-paper"
            >
              {L('Why?', 'क्यों?')}
            </Link>
            <button
              onClick={() => setIndex(((index ?? 0) + 1) % FACTS.length)}
              className="hidden sm:inline-flex shrink-0 p-1 text-paper/50 hover:text-paper transition-colors"
              aria-label={L('Show another fact', 'एक और तथ्य दिखाएँ')}
              title={L('Another fact', 'एक और तथ्य')}
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </>
        )}
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-3 sm:right-6 p-1 text-paper/40 hover:text-paper transition-colors"
          aria-label={L('Close', 'बंद करें')}
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
