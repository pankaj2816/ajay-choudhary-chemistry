'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useLanguage, Language } from '@/context/LanguageContext';

const LANGUAGES: { code: Language; label: string; short: string; subLabel: string }[] = [
  { code: 'en', label: 'English', short: 'EN', subLabel: 'English' },
  { code: 'hi', label: 'हिन्दी', short: 'हि', subLabel: 'Hindi' },
  { code: 'hinglish', label: 'Hinglish', short: 'HI-EN', subLabel: 'Hindi + English' },
];

export default function LanguageSwitcher({ tone = 'light', up = false }: { tone?: 'light' | 'dark'; up?: boolean }) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen((o) => !o)}
        className={`inline-flex items-center gap-1 px-2.5 py-2 text-[0.8rem] font-medium tracking-wide transition-colors ${
          tone === 'dark' ? 'text-paper/70 hover:text-paper' : 'text-muted hover:text-ink'
        }`}
        aria-label="Select language"
        aria-expanded={isOpen}
        title="English / हिन्दी / Hinglish"
      >
        <span>{current.short}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className={`absolute ${up ? 'left-0 bottom-full mb-2' : 'right-0 mt-2'} w-48 bg-white border border-line shadow-xl py-1.5 z-50`}>
          {LANGUAGES.map((lang) => {
            const selected = language === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-left flex items-center justify-between transition-colors ${
                  selected ? 'text-accent' : 'text-ink hover:bg-paper'
                }`}
              >
                <span className="flex flex-col">
                  <span className="text-sm font-medium">{lang.label}</span>
                  <span className="text-xs text-muted">{lang.subLabel}</span>
                </span>
                {selected && <Check className="w-4 h-4" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
