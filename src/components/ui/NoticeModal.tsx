'use client';

import React, { useEffect } from 'react';
import { X, ArrowDown } from 'lucide-react';
import { NoticeUpdate } from '@/lib/types';
import ChemistryContentRenderer from '@/components/ui/ChemistryContentRenderer';
import { useLanguage } from '@/context/LanguageContext';
import { term, formatDate } from '@/lib/terms';

export default function NoticeModal({
  notice,
  onClose,
  onDownload,
}: {
  notice: NoticeUpdate;
  onClose: () => void;
  onDownload?: (n: NoticeUpdate) => void;
}) {
  const { L, isHi, pick } = useLanguage();
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

  const dateText = formatDate(notice.date, isHi, { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6" role="dialog" aria-modal="true">
      <button className="absolute inset-0 bg-ink/60 backdrop-blur-[2px]" aria-label={L('Close notice', 'सूचना बंद करें')} onClick={onClose} />
      <article className="relative w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto bg-paper shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between gap-4 px-6 sm:px-10 py-4 bg-paper/95 backdrop-blur border-b border-line">
          <p className="eyebrow !text-[0.68rem] text-accent truncate">
            {notice.isPinned ? L('Pinned · ', 'पिन की गई · ') : ''}
            {term(notice.category, isHi)}
          </p>
          <button onClick={onClose} className="p-1.5 -mr-1.5 text-muted hover:text-ink" aria-label={L('Close', 'बंद करें')}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="px-6 sm:px-10 pt-8 pb-10">
          <p className="text-sm text-muted">
            {dateText}
            {notice.targetClass ? ` · ${term(notice.targetClass, isHi)}` : ''}
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl leading-tight text-ink">{pick(notice.title, notice.titleHi)}</h2>
          <div className="mt-8 text-[0.98rem] leading-relaxed text-ink">
            <ChemistryContentRenderer content={pick(notice.content || notice.description, notice.contentHi || notice.descriptionHi)} />
          </div>
          {notice.attachmentUrl && onDownload && (
            <div className="mt-10 pt-6 border-t border-line flex flex-wrap items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs text-muted">{L('Attachment', 'संलग्न फ़ाइल')}</p>
                <p className="text-sm text-ink truncate">
                  {notice.attachmentName || L('Document', 'दस्तावेज़')}
                  {notice.attachmentSize ? ` · ${notice.attachmentSize}` : ''}
                </p>
              </div>
              <button
                onClick={() => onDownload(notice)}
                className="inline-flex items-center gap-2 px-5 py-3 bg-ink text-paper text-sm font-medium hover:bg-accent transition-colors"
              >
                <ArrowDown className="w-4 h-4" />
                {L('Download', 'डाउनलोड')}
              </button>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
