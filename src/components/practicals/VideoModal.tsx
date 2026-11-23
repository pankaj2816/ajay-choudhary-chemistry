'use client';

import React, { useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { Practical } from '@/lib/types';
import { youtubeEmbed, youtubeId, youtubeWatch } from '@/lib/youtube';
import { useLanguage } from '@/context/LanguageContext';

export default function VideoModal({ item, onClose }: { item: Practical; onClose: () => void }) {
  const { pick, L } = useLanguage();
  const id = youtubeId(item.youtubeUrl);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const description = pick(item.description, item.descriptionHi);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6" role="dialog" aria-modal="true" aria-label={pick(item.title, item.titleHi)}>
      <button className="absolute inset-0 bg-ink/80" aria-label={L('Close video', 'वीडियो बंद करें')} onClick={onClose} />
      <div className="relative w-full sm:max-w-4xl max-h-[94vh] overflow-y-auto bg-paper rounded-t-2xl sm:rounded-2xl shadow-2xl">
        <div className="flex items-start justify-between gap-4 px-5 sm:px-7 pt-5 pb-4">
          <h2 className="!text-xl sm:!text-2xl leading-snug text-ink">{pick(item.title, item.titleHi)}</h2>
          <button onClick={onClose} className="p-2 -mr-2 text-muted hover:text-ink shrink-0" aria-label={L('Close', 'बंद करें')}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="aspect-video bg-black">
          {id ? (
            <iframe
              src={youtubeEmbed(id)}
              title={pick(item.title, item.titleHi)}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <p className="h-full flex items-center justify-center text-white/70">{L('This video link is not valid.', 'यह वीडियो लिंक सही नहीं है।')}</p>
          )}
        </div>
        <div className="px-5 sm:px-7 py-6 space-y-4">
          {description && <p className="text-[1rem] leading-relaxed text-muted whitespace-pre-line">{description}</p>}
          {id && (
            <a href={youtubeWatch(id)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-accent">
              <ExternalLink className="w-4 h-4" />
              {L('Watch on YouTube', 'YouTube पर देखें')}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
