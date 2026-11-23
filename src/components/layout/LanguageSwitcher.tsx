'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

/** One-tap English / Hindi toggle. */
export default function LanguageSwitcher({ tone = 'light' }: { tone?: 'light' | 'dark'; up?: boolean }) {
  const { language, setLanguage } = useLanguage();
  const options = [
    { code: 'en' as const, label: 'EN', title: 'English' },
    { code: 'hi' as const, label: 'हिन्दी', title: 'Hindi' },
  ];

  return (
    <div
      role="group"
      aria-label="Language / भाषा"
      className={`inline-flex items-center rounded-lg border p-0.5 ${tone === 'dark' ? 'border-white/20' : 'border-line bg-white'}`}
    >
      {options.map((o) => {
        const active = (language === 'hi' ? 'hi' : 'en') === o.code;
        return (
          <button
            key={o.code}
            type="button"
            onClick={() => setLanguage(o.code)}
            aria-pressed={active}
            title={o.title}
            lang={o.code}
            className={`px-2 sm:px-2.5 py-1.5 rounded-md text-[0.78rem] sm:text-[0.8rem] font-medium leading-none transition-colors ${
              active ? 'bg-ink text-white' : tone === 'dark' ? 'text-white/70 hover:text-white' : 'text-muted hover:text-ink'
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
