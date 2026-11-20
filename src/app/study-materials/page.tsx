'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowDown, Eye } from 'lucide-react';
import { StudyMaterial } from '@/lib/types';
import { initialDatabase } from '@/data/initialData';
import PDFPreviewModal from '@/components/ui/PDFPreviewModal';
import { useToast } from '@/context/ToastContext';
import { getStudyMaterials } from '@/lib/dataService';
import { triggerDownload } from '@/lib/downloadUtils';
import { useLanguage } from '@/context/LanguageContext';
import {
  PageHeader,
  SearchField,
  SelectField,
  ChipGroup,
  ResultCount,
  EmptyState,
  Meta,
  TextAction,
} from '@/components/ui/Editorial';

function StudyMaterialsContent() {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const searchParams = useSearchParams();
  const tax = initialDatabase.taxonomies;

  const [materials, setMaterials] = useState<StudyMaterial[]>(initialDatabase.studyMaterials);
  const [subject, setSubject] = useState(searchParams.get('subject') || 'All');
  const [cls, setCls] = useState(searchParams.get('class') || 'All');
  const [type, setType] = useState(searchParams.get('type') || 'All');
  const [query, setQuery] = useState(searchParams.get('search') || searchParams.get('q') || '');
  const [preview, setPreview] = useState<StudyMaterial | null>(null);

  useEffect(() => {
    getStudyMaterials()
      .then((data) => {
        if (Array.isArray(data) && data.length) setMaterials(data);
      })
      .catch(() => {});
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return materials
      .filter((m) => {
        const matchSubject = subject === 'All' || m.subject.toLowerCase() === subject.toLowerCase();
        const matchClass = cls === 'All' || m.className === cls || m.className === 'All Classes';
        const matchType = type === 'All' || m.resourceType === type;
        const matchQuery =
          !q || [m.title, m.chapter, m.description].some((f) => (f || '').toLowerCase().includes(q));
        return matchSubject && matchClass && matchType && matchQuery;
      })
      .sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured) || b.uploadDate.localeCompare(a.uploadDate));
  }, [materials, subject, cls, type, query]);

  const reset = () => {
    setSubject('All');
    setCls('All');
    setType('All');
    setQuery('');
  };

  const download = (m: StudyMaterial) => {
    showToast(`Downloading: ${m.title}`, 'info');
    triggerDownload(m.fileUrl, m.fileName || `${m.title.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <>
      <PageHeader label={t.nav.studyMaterials} title={t.materials.title} intro={t.materials.subtitle} />

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
        {/* Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end">
          <div className="lg:col-span-6">
            <SearchField value={query} onChange={setQuery} placeholder={t.pages.searchPlaceholder} />
          </div>
          <div className="lg:col-span-3">
            <SelectField
              label="Subject"
              value={subject}
              onChange={setSubject}
              options={[{ value: 'All', label: t.pages.allSubjects }, ...tax.subjects.map((s) => ({ value: s, label: s }))]}
            />
          </div>
          <div className="lg:col-span-3">
            <SelectField
              label="Class"
              value={cls}
              onChange={setCls}
              options={[
                { value: 'All', label: t.pages.allClasses },
                ...tax.classes.filter((c) => c !== 'All Classes').map((c) => ({ value: c, label: c })),
              ]}
            />
          </div>
        </div>

        <div className="mt-6">
          <ChipGroup
            label="Resource type"
            value={type}
            onChange={setType}
            options={[{ value: 'All', label: t.pages.allTypes }, ...tax.resourceTypes.map((r) => ({ value: r, label: r }))]}
          />
        </div>

        <div className="mt-12 flex items-baseline justify-between border-b border-ink pb-4">
          <ResultCount shown={filtered.length} total={materials.length} noun="resources" />
        </div>

        {/* List */}
        {filtered.length === 0 ? (
          <EmptyState title={t.pages.noResults} body={t.pages.noResultsSub} onReset={reset} />
        ) : (
          <ul>
            {filtered.map((m) => (
              <li
                key={m.id}
                className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto] gap-x-10 gap-y-4 py-8 border-b border-line"
              >
                <div className="min-w-0">
                  <Meta>
                    {m.subject} · {m.className} · {m.resourceType}
                    {m.isFeatured && <span className="ml-2 text-accent">· Featured</span>}
                  </Meta>
                  <h2
                    className="mt-2 font-display !text-[1.5rem] sm:!text-[1.7rem] leading-snug text-ink"
                    style={{ fontVariationSettings: '"opsz" 48' }}
                  >
                    {m.title}
                  </h2>
                  {m.chapter && <p className="mt-1 text-sm text-accent">{m.chapter}</p>}
                  <p className="mt-3 max-w-3xl text-[0.95rem] leading-relaxed text-muted line-clamp-2">{m.description}</p>
                  <Meta className="mt-3">
                    {m.fileSize && `${m.fileSize} · `}Added {m.uploadDate}
                  </Meta>
                </div>
                <div className="flex md:flex-col md:items-end gap-6 md:gap-3 md:pt-6">
                  <TextAction onClick={() => download(m)} icon={<ArrowDown className="w-4 h-4" />}>
                    {t.pages.downloadBtn}
                  </TextAction>
                  <TextAction onClick={() => setPreview(m)} icon={<Eye className="w-4 h-4" />} tone="accent">
                    {t.pages.previewBtn}
                  </TextAction>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {preview && (
        <PDFPreviewModal
          isOpen
          onClose={() => setPreview(null)}
          title={preview.title}
          subject={preview.subject}
          chapter={preview.chapter}
          className={preview.className}
          testType={preview.resourceType}
          description={preview.description}
          fileUrl={preview.fileUrl}
          fileName={preview.fileName}
          fileSize={preview.fileSize}
          uploadDate={preview.uploadDate}
        />
      )}
    </>
  );
}

export default function StudyMaterialsPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <StudyMaterialsContent />
    </Suspense>
  );
}
