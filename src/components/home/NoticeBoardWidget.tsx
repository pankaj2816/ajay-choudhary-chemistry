'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Bell, 
  Pin, 
  Calendar, 
  Download, 
  ArrowRight, 
  FileText, 
  AlertCircle, 
  Sparkles, 
  X,
  ExternalLink
} from 'lucide-react';
import { NoticeUpdate, NoticeCategory } from '@/lib/types';
import { initialDatabase } from '@/data/initialData';
import { useToast } from '@/context/ToastContext';
import { useLanguage } from '@/context/LanguageContext';
import ChemistryContentRenderer from '@/components/ui/ChemistryContentRenderer';

const CATEGORY_COLORS: Record<string, string> = {
  'Important Notice': 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800',
  'Class Update': 'bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-950 dark:text-cyan-300 dark:border-cyan-800',
  'Test / Examination': 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800',
  'Assignment': 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800',
  'Study Material': 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800',
  'Question Paper': 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800',
  'General Announcement': 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
};

export default function NoticeBoardWidget() {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [updates, setUpdates] = useState<NoticeUpdate[]>(initialDatabase.updates);
  const [selectedNotice, setSelectedNotice] = useState<NoticeUpdate | null>(null);

  useEffect(() => {
    fetch('/api/updates')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setUpdates(data);
      })
      .catch(() => {});
  }, []);

  const handleDownload = (notice: NoticeUpdate) => {
    showToast(`Downloading attachment: ${notice.attachmentName || notice.title}`, 'info');
    const link = document.createElement('a');
    link.href = notice.attachmentUrl || '/uploads/sample_notice_attachment.pdf';
    link.download = notice.attachmentName || 'Notice_Attachment.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Title and All Updates Link */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 font-bold text-xs">
              <Bell className="w-3.5 h-3.5 animate-bounce" />
              {t.notices.badge}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
              {t.notices.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t.notices.subtitle}
            </p>
          </div>

          <Link
            href="/updates"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-cyan-700 hover:text-cyan-800 hover:underline shrink-0"
          >
            <span>{t.notices.viewAll}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Notices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {updates.slice(0, 3).map((notice) => (
            <div
              key={notice.id}
              onClick={() => setSelectedNotice(notice)}
              className={`rounded-2xl p-6 border transition-all duration-300 cursor-pointer flex flex-col justify-between group hover:-translate-y-1 ${
                notice.isPinned
                  ? 'bg-gradient-to-b from-amber-50/40 via-white to-white border-amber-300 shadow-md hover:shadow-lg'
                  : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="space-y-3">
                {/* Badge and Pin / Date */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                    CATEGORY_COLORS[notice.category] || 'bg-slate-100 text-slate-700'
                  }`}>
                    {notice.category}
                  </span>

                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    {notice.isPinned && (
                      <span className="flex items-center gap-1 text-amber-600 font-bold text-[11px] bg-amber-100 px-2 py-0.5 rounded-full">
                        <Pin className="w-3 h-3" /> Pinned
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {notice.date}
                    </span>
                  </div>
                </div>

                {/* Notice Title */}
                <h3 className="text-base font-bold text-slate-900 group-hover:text-cyan-700 transition-colors line-clamp-2">
                  {notice.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {notice.description}
                </p>
              </div>

              {/* Bottom bar with attachment indicator and Read More */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                {notice.attachmentName ? (
                  <span className="inline-flex items-center gap-1 text-slate-500 text-[11px] font-medium truncate max-w-[150px]">
                    <FileText className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                    <span className="truncate">{notice.attachmentName}</span>
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-400 font-medium">Notice</span>
                )}

                <span className="font-bold text-cyan-700 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Read Notice <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                  CATEGORY_COLORS[selectedNotice.category] || 'bg-slate-100 text-slate-700'
                }`}>
                  {selectedNotice.category}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {selectedNotice.date}
                </span>
              </div>
              <button
                onClick={() => setSelectedNotice(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4">
              <h3 className="text-xl font-bold text-slate-900 leading-snug">
                {selectedNotice.title}
              </h3>

              {selectedNotice.description && (
                <p className="text-xs font-semibold text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {selectedNotice.description}
                </p>
              )}

              <div className="mt-4">
                <ChemistryContentRenderer content={selectedNotice.content || selectedNotice.description} />
              </div>

              {/* Attachment Download Box */}
              {selectedNotice.attachmentName && (
                <div className="mt-6 p-4 rounded-xl bg-cyan-50/70 border border-cyan-200 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2.5 rounded-xl bg-cyan-600 text-white shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-bold text-slate-900 truncate">
                        {selectedNotice.attachmentName}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {selectedNotice.attachmentSize || 'PDF Document'}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownload(selectedNotice)}
                    className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>Ajay Choudhary Academic Notice</span>
              <button
                onClick={() => setSelectedNotice(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
