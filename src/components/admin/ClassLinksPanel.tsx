'use client';

import React from 'react';
import Link from 'next/link';
import { Copy, MessageCircle, ExternalLink, PlayCircle } from 'lucide-react';
import { CLASS_LIST } from '@/lib/classes';
import { useToast } from '@/context/ToastContext';

/** Shows the class page links so Ajay Sir can share them with students. */
export default function ClassLinksPanel() {
  const { showToast } = useToast();
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const urlFor = (href: string) => (typeof window === 'undefined' ? href : `${window.location.origin}${base}${href}`);

  const copy = async (href: string) => {
    try {
      await navigator.clipboard.writeText(urlFor(href));
      showToast('Link copied. Paste it in your class group.', 'success');
    } catch {
      showToast(urlFor(href), 'info');
    }
  };

  const whatsapp = (level: string, href: string) => {
    const text = `${level} Chemistry: notes, papers and notices are here:\n${urlFor(href)}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800">
      <h3 className="text-base font-bold text-white">Class pages to share with students</h3>
      <p className="mt-1 text-sm text-slate-400">
        Everything you upload for a class appears on its page automatically. Share the link once in each class group.
      </p>
      <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {CLASS_LIST.map((c) => (
          <li key={c.grade} className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">{c.level}</p>
              <p className="text-xs text-slate-400 truncate">…{c.href}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Link
                href={`/admin/practicals?class=${encodeURIComponent(c.level)}`}
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
                title={`Add a YouTube video for ${c.level}`}
              >
                <PlayCircle className="w-4 h-4" />
              </Link>
              <button onClick={() => copy(c.href)} className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800" title="Copy link">
                <Copy className="w-4 h-4" />
              </button>
              <button onClick={() => whatsapp(c.level, c.href)} className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800" title="Share on WhatsApp">
                <MessageCircle className="w-4 h-4" />
              </button>
              <a href={`${base}${c.href}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800" title="Open page">
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
