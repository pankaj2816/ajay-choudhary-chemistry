'use client';

import React from 'react';
import { Play } from 'lucide-react';
import { Practical } from '@/lib/types';
import { youtubeId, youtubeThumb } from '@/lib/youtube';
import { useLanguage } from '@/context/LanguageContext';

export default function PracticalCard({ item, onOpen }: { item: Practical; onOpen: (p: Practical) => void }) {
  const { pick, L } = useLanguage();
  const id = youtubeId(item.youtubeUrl);
  const cls = item.className === 'All Classes' ? L('All classes', 'सभी कक्षाएँ') : item.className.replace('Class', L('Class', 'कक्षा'));

  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className="group w-full h-full text-left flex flex-col bg-white border border-line rounded-xl overflow-hidden hover:border-accent hover:shadow-xl transition-all"
    >
      <div className="relative aspect-video bg-ink overflow-hidden">
        {id && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={youtubeThumb(id)}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
          />
        )}
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="w-14 h-14 rounded-full bg-white/95 text-accent flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
            <Play className="w-6 h-6 ml-1" fill="currentColor" />
          </span>
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">
          {cls}
          {item.topic ? ` · ${item.topic}` : ''}
        </p>
        <h3 className="mt-2 text-lg font-semibold leading-snug text-ink group-hover:text-accent transition-colors">
          {pick(item.title, item.titleHi)}
        </h3>
        <p className="mt-2 text-[0.92rem] leading-relaxed text-muted line-clamp-3">{pick(item.description, item.descriptionHi)}</p>
      </div>
    </button>
  );
}
