'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, Paperclip } from 'lucide-react';
import { NoticeUpdate } from '@/lib/types';
import { initialDatabase } from '@/data/initialData';
import { useToast } from '@/context/ToastContext';
import { getUpdates } from '@/lib/dataService';
import { triggerDownload } from '@/lib/downloadUtils';
import { useLanguage } from '@/context/LanguageContext';
import NoticeModal from '@/components/ui/NoticeModal';
import {
  PageHeader,
  SearchField,
  SelectField,
  ChipGroup,
  ResultCount,
  EmptyState,
} from '@/components/ui/Editorial';

function splitDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return { day: '', rest: iso };
  return {
    day: d.toLocaleDateString('en-IN', { day: '2-digit' }),
    rest: d.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
  };
}

function UpdatesContent() {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const searchParams = useSearchParams();
  const tax = initialDatabase.taxonomies;

  const [updates, setUpdates] = useState<NoticeUpdate[]>(initialDatabase.updates);
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [cls, setCls] = useState(searchParams.get('class') || 'All');
  const [query, setQuery] = useState(searchParams.get('search') || searchParams.get('q') || '');
  const [open, setOpen] = useState<NoticeUpdate | null>(null);

  useEffect(() => {
    getUpdates()
      .then((data) => {
        if (Array.isArray(data) && data.length) setUpdates(data);
      })
      .catch(() => {});
  }, []);

  // Deep link: /updates?id=...
  useEffect(() => {
    const id = searchParams.get('id');
    if (!id) return;
    const match = updates.find((u) => u.id === id);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (match) setOpen(match);
  }, [searchParams, updates]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return updates
      .filter((u) => u.isPublished !== false)
      .filter((u) => {
        const matchCategory = category === 'All' || u.category === category;
        const matchClass = cls === 'All' || !u.targetClass || u.targetClass === 'All Classes' || u.targetClass === cls;
        const matchQuery = !q || [u.title, u.description, u.content].some((f) => (f || '').toLowerCase().includes(q));
        return matchCategory && matchClass && matchQuery;
      })
      .sort((a, b) => Number(b.isPinned) - Number(a.isPinned) || b.date.localeCompare(a.date));
  }, [updates, category, cls, query]);

  const total = updates.filter((u) => u.isPublished !== false).length;

  const reset = () => {
    setCategory('All');
    setCls('All');
    setQuery('');
  };

  const download = (n: NoticeUpdate) => {
    if (!n.attachmentUrl) return;
    showToast(`Downloading: ${n.attachmentName || 'attachment'}`, 'info');
    triggerDownload(n.attachmentUrl, n.attachmentName);
  };

  return (
    <>
      <PageHeader label={t.nav.updates} title={t.notices.title} intro={t.notices.subtitle} />

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end">
          <div className="lg:col-span-8">
            <SearchField value={query} onChange={setQuery} placeholder={t.pages.searchPlaceholder} />
          </div>
          <div className="lg:col-span-4">
            <SelectField
              label="Class"
              value={cls}
              onChange={setCls}
              options={[
                { value: 'All', label: t.notices.allBatches },
                ...tax.classes.filter((c) => c !== 'All Classes').map((c) => ({ value: c, label: c })),
              ]}
            />
          </div>
        </div>

        <div className="mt-6">
          <ChipGroup
            label="Category"
            value={category}
            onChange={setCategory}
            options={[
              { value: 'All', label: t.pages.allCategories },
              ...tax.noticeCategories.map((c) => ({ value: c, label: c })),
            ]}
          />
        </div>

        <div className="mt-12 flex items-baseline justify-between border-b border-ink pb-4">
          <ResultCount shown={filtered.length} total={total} noun="notices" />
        </div>

        {filtered.length === 0 ? (
          <EmptyState title="No notices found." body={t.pages.noResultsSub} onReset={reset} />
        ) : (
          <ul>
            {filtered.map((n) => {
              const { day, rest } = splitDate(n.date);
              return (
                <li key={n.id} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setOpen(n)}
                    className="group w-full text-left grid grid-cols-[4.5rem_1fr] sm:grid-cols-[7rem_1fr_auto] gap-x-6 sm:gap-x-10 gap-y-2 py-8"
                  >
                    <div>
                      <span className="block font-display text-4xl sm:text-5xl leading-none text-ink" style={{ fontVariationSettings: '"opsz" 120' }}>
                        {day}
                      </span>
                      <span className="mt-2 block text-xs text-muted">{rest}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="eyebrow !text-[0.68rem] text-accent">
                        {n.isPinned ? `${t.notices.pinned} · ` : ''}
                        {n.category}
                      </p>
                      <h2
                        className="mt-2 font-display !text-[1.45rem] sm:!text-[1.7rem] leading-snug text-ink group-hover:text-accent transition-colors"
                        style={{ fontVariationSettings: '"opsz" 48' }}
                      >
                        {n.title}
                      </h2>
                      <p className="mt-2 max-w-3xl text-[0.95rem] leading-relaxed text-muted line-clamp-2">{n.description}</p>
                      <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.78rem] text-muted">
                        {n.targetClass && <span>{n.targetClass}</span>}
                        {n.attachmentUrl && (
                          <span className="inline-flex items-center gap-1 min-w-0 max-w-full">
                            <Paperclip className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{n.attachmentName || 'Attachment'}</span>
                          </span>
                        )}
                      </p>
                    </div>
                    <span className="hidden sm:inline-flex items-center gap-1.5 self-center text-sm text-muted group-hover:text-accent transition-colors">
                      {t.home.readNotice}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {open && <NoticeModal notice={open} onClose={() => setOpen(null)} onDownload={download} />}
    </>
  );
}

export default function UpdatesPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <UpdatesContent />
    </Suspense>
  );
}
