'use client';

import React, { useEffect } from 'react';
import { X, ArrowDown } from 'lucide-react';
import { NoticeUpdate } from '@/lib/types';
import ChemistryContentRenderer from '@/components/ui/ChemistryContentRenderer';

export default function NoticeModal({
  notice,
  onClose,
  onDownload,
}: {
  notice: NoticeUpdate;
  onClose: () => void;
  onDownload?: (n: NoticeUpdate) => void;
}) {
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

  const date = new Date(notice.date);
  const dateText = Number.isNaN(date.getTime())
    ? notice.date
    : date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6" role="dialog" aria-modal="true">
      <button className="absolute inset-0 bg-ink/60 backdrop-blur-[2px]" aria-label="Close notice" onClick={onClose} />
      <article className="relative w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto bg-paper shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between gap-4 px-6 sm:px-10 py-4 bg-paper/95 backdrop-blur border-b border-line">
          <p className="eyebrow !text-[0.68rem] text-accent truncate">
            {notice.isPinned ? 'Pinned · ' : ''}
            {notice.category}
          </p>
          <button onClick={onClose} className="p-1.5 -mr-1.5 text-muted hover:text-ink" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="px-6 sm:px-10 pt-8 pb-10">
          <p className="text-sm text-muted">
            {dateText}
            {notice.targetClass ? ` · ${notice.targetClass}` : ''}
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl leading-tight text-ink">{notice.title}</h2>
          <div className="mt-8 text-[0.98rem] leading-relaxed text-ink">
            <ChemistryContentRenderer content={notice.content || notice.description} />
          </div>
          {notice.attachmentUrl && onDownload && (
            <div className="mt-10 pt-6 border-t border-line flex flex-wrap items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs text-muted">Attachment</p>
                <p className="text-sm text-ink truncate">
                  {notice.attachmentName || 'Document'}
                  {notice.attachmentSize ? ` · ${notice.attachmentSize}` : ''}
                </p>
              </div>
              <button
                onClick={() => onDownload(notice)}
                className="inline-flex items-center gap-2 px-5 py-3 bg-ink text-paper text-sm font-medium hover:bg-accent transition-colors"
              >
                <ArrowDown className="w-4 h-4" />
                Download
              </button>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
