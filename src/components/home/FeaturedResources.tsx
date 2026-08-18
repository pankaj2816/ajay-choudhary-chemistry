'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Download, FileText, ArrowRight, Eye, Sparkles } from 'lucide-react';
import { StudyMaterial } from '@/lib/types';
import { initialDatabase } from '@/data/initialData';
import PDFPreviewModal from '@/components/ui/PDFPreviewModal';
import { useToast } from '@/context/ToastContext';

import { useLanguage } from '@/context/LanguageContext';

import { getStudyMaterials } from '@/lib/dataService';
import { triggerDownload } from '@/lib/downloadUtils';

export default function FeaturedResources() {
  const { t } = useLanguage();
  const [materials, setMaterials] = useState<StudyMaterial[]>(initialDatabase.studyMaterials.filter(m => m.isFeatured));
  const [previewItem, setPreviewItem] = useState<StudyMaterial | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    getStudyMaterials()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setMaterials(data.filter((m: StudyMaterial) => m.isFeatured));
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDownload = (item: StudyMaterial, e: React.MouseEvent) => {
    e.stopPropagation();
    showToast(`Downloading: ${item.title}`, 'info');
    triggerDownload(item.fileUrl, item.fileName || `${item.title.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <section className="py-16 sm:py-24 bg-slate-900 text-white border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-300 font-bold text-xs">
              <Sparkles className="w-3.5 h-3.5" />
              {t.materials.badge}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight mt-2">
              {t.materials.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {t.materials.subtitle}
            </p>
          </div>

          <Link
            href="/study-materials"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-cyan-400 hover:text-cyan-300 hover:underline shrink-0"
          >
            <span>{t.materials.viewVault}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {materials.slice(0, 4).map((item) => (
            <div
              key={item.id}
              onClick={() => setPreviewItem(item)}
              className="bg-slate-950/90 rounded-2xl p-5 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 shadow-lg cursor-pointer"
            >
              <div className="space-y-3">
                {/* Badge & Class */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {item.resourceType}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {item.className}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                  {item.title}
                </h3>

                {/* Chapter */}
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="truncate">{item.chapter}</span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-400">
                  {item.fileSize || '2.4 MB'}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setPreviewItem(item)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                    title="Preview Document"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={(e) => handleDownload(item, e)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-colors shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>PDF</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* PDF Viewer Modal */}
      {previewItem && (
        <PDFPreviewModal
          isOpen={!!previewItem}
          onClose={() => setPreviewItem(null)}
          title={previewItem.title}
          subject={previewItem.subject}
          chapter={previewItem.chapter}
          className={previewItem.className}
          testType={previewItem.resourceType}
          description={previewItem.description}
          fileUrl={previewItem.fileUrl}
          fileName={previewItem.fileName}
          fileSize={previewItem.fileSize}
          uploadDate={previewItem.uploadDate}
        />
      )}

    </section>
  );
}
