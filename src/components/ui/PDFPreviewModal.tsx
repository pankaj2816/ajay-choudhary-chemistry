'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { X, ArrowDown, ExternalLink, ArrowRight, FileText } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import ChemistryContentRenderer from './ChemistryContentRenderer';
import { getAssetUrl, triggerDownload } from '@/lib/downloadUtils';

interface PDFPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subject?: string;
  chapter?: string;
  className?: string;
  testType?: string;
  totalMarks?: number;
  duration?: string;
  uploadDate?: string;
  description?: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
  solutionId?: string;
  solutionTitle?: string;
  stepByStepContent?: string;
  answerKey?: { questionNo: string | number; answer: string; explanation: string }[];
  isSolutionView?: boolean;
  questionPaperId?: string;
  verifiedBy?: string;
}

type Kind = 'pdf' | 'image' | 'other' | 'none';

function fileKind(url?: string, name?: string): Kind {
  const src = (name || url || '').toLowerCase().split('?')[0];
  if (!url) return 'none';
  if (url.startsWith('data:application/pdf') || src.endsWith('.pdf')) return 'pdf';
  if (url.startsWith('data:image/') || /\.(png|jpe?g|webp|gif)$/.test(src)) return 'image';
  return 'other';
}

/**
 * Shows the real uploaded document: PDFs inline (desktop), images inline,
 * other files (Word, PowerPoint…) as a clear download card. On phones, where
 * browsers can't show PDFs inside a page, it offers Open / Download buttons.
 */
export default function PDFPreviewModal({
  isOpen,
  onClose,
  title,
  subject,
  chapter,
  className: studentClass,
  testType,
  totalMarks,
  duration,
  uploadDate,
  description,
  fileUrl,
  fileName,
  fileSize,
  solutionId,
  stepByStepContent,
  answerKey,
  isSolutionView = false,
  verifiedBy,
}: PDFPreviewModalProps) {
  const { showToast } = useToast();
  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    // Phones can't render PDFs inline; decide after mount
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsPhone(window.matchMedia('(max-width: 767px)').matches || /Android|iPhone|iPad/i.test(navigator.userAgent));
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const kind = fileKind(fileUrl, fileName);
  const src = fileUrl ? getAssetUrl(fileUrl) : '';
  const hasWrittenSolution = !!stepByStepContent?.trim() || (answerKey && answerKey.length > 0);

  const download = () => {
    if (!fileUrl) return;
    showToast(`Downloading: ${fileName || title}`, 'info');
    triggerDownload(fileUrl, fileName || `${title.replace(/\s+/g, '_')}.pdf`);
  };

  const meta = [testType, subject, studentClass, chapter].filter(Boolean).join(' · ');
  const facts = [
    totalMarks ? `${totalMarks} marks` : '',
    duration || '',
    fileSize || '',
    uploadDate ? `Added ${uploadDate}` : '',
  ].filter(Boolean);

  const renderFile = () => {
    if (kind === 'none') return null;
    if (kind === 'image') {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={title} className="w-full h-auto border border-line rounded-lg bg-white" />
      );
    }
    if (kind === 'pdf' && !isPhone) {
      return (
        <iframe
          src={`${src}#view=FitH`}
          title={title}
          className="w-full h-[62vh] min-h-[420px] border border-line rounded-lg bg-white"
        />
      );
    }
    return (
      <div className="flex flex-col items-center text-center gap-4 py-12 px-6 border border-line rounded-lg bg-paper-deep">
        <FileText className="w-10 h-10 text-accent" />
        <div>
          <p className="font-medium text-ink break-all">{fileName || 'Document'}</p>
          <p className="mt-1 text-sm text-muted">
            {kind === 'pdf' ? 'Tap “Open” to read it, or download it to your phone.' : 'Download this file to open it.'}
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {kind === 'pdf' && (
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-deep"
            >
              <ExternalLink className="w-4 h-4" />
              Open
            </a>
          )}
          <button
            onClick={download}
            className="inline-flex items-center gap-2 px-5 py-3 border border-ink text-ink text-sm font-medium rounded-lg hover:bg-ink hover:text-white transition-colors"
          >
            <ArrowDown className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6" role="dialog" aria-modal="true" aria-label={title}>
      <button className="absolute inset-0 bg-ink/60" aria-label="Close preview" onClick={onClose} />

      <div className="relative w-full sm:max-w-4xl max-h-[94vh] flex flex-col bg-paper rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-5 sm:px-8 pt-5 pb-4 border-b border-line">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              {isSolutionView ? 'Worked solution' : meta || 'Document'}
            </p>
            <h2 className="mt-1 !text-xl sm:!text-2xl leading-snug text-ink">{title}</h2>
            {(isSolutionView ? meta : facts.length > 0) && (
              <p className="mt-1 text-sm text-muted">{isSolutionView ? meta : facts.join(' · ')}</p>
            )}
          </div>
          <button onClick={onClose} className="p-2 -mr-2 text-muted hover:text-ink shrink-0" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-6 space-y-6">
          {description && <p className="text-[0.98rem] leading-relaxed text-muted">{description}</p>}

          {isSolutionView && hasWrittenSolution && (
            <div className="space-y-6 text-[0.98rem] leading-relaxed text-ink">
              {stepByStepContent && <ChemistryContentRenderer content={stepByStepContent} />}
              {answerKey && answerKey.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-ink">Answer key</h3>
                  <div className="mt-3 overflow-x-auto border border-line rounded-lg">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-paper-deep text-ink">
                        <tr>
                          <th className="p-3 w-16 font-semibold">Q.</th>
                          <th className="p-3 w-48 font-semibold">Answer</th>
                          <th className="p-3 font-semibold">Explanation</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-line">
                        {answerKey.map((a, i) => (
                          <tr key={i}>
                            <td className="p-3 font-semibold text-accent">{a.questionNo}</td>
                            <td className="p-3 text-ink">{a.answer}</td>
                            <td className="p-3 text-muted">{a.explanation}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {verifiedBy && <p className="text-sm text-muted">Checked by {verifiedBy}</p>}
            </div>
          )}

          {renderFile()}

          {kind === 'none' && !hasWrittenSolution && (
            <p className="py-10 text-center text-muted">No file has been attached yet.</p>
          )}
        </div>

        {/* Footer */}
        {(fileUrl || (solutionId && !isSolutionView)) && (
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-8 py-4 border-t border-line bg-paper-deep">
            <p className="text-xs text-muted truncate max-w-full">{fileName}</p>
            <div className="flex flex-wrap items-center gap-3">
              {solutionId && !isSolutionView && (
                <Link
                  href={`/solutions?id=${solutionId}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-deep"
                >
                  See the solution
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
              {fileUrl && kind === 'pdf' && !isPhone && (
                <a
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-accent"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open in new tab
                </a>
              )}
              {fileUrl && (
                <button
                  onClick={download}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-ink text-white text-sm font-medium rounded-lg hover:bg-accent transition-colors"
                >
                  <ArrowDown className="w-4 h-4" />
                  Download
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
