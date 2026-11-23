'use client';

import React from 'react';
import Link from 'next/link';
import { Article } from '@/lib/types';
import SafeImage from '@/components/ui/SafeImage';
import { useLanguage } from '@/context/LanguageContext';
import { term } from '@/lib/terms';

export default function ArticleCard({ article, large = false }: { article: Article; large?: boolean }) {
  const { L, isHi, pick } = useLanguage();
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group h-full flex flex-col bg-white border border-line rounded-xl overflow-hidden hover:border-accent hover:shadow-xl transition-all"
    >
      <div className={`relative ${large ? 'aspect-[16/9]' : 'aspect-[16/9]'} bg-paper-deep overflow-hidden`}>
        {article.image && (
          <SafeImage
            src={article.image}
            alt={pick(article.imageAlt, article.imageAltHi) || pick(article.title, article.titleHi)}
            fill
            sizes="(min-width:1024px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        {article.tags?.length > 0 && (
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">{article.tags.slice(0, 2).map((x) => term(x, isHi)).join(' · ')}</p>
        )}
        <h3 className={`mt-2 font-semibold leading-snug text-ink group-hover:text-accent transition-colors ${large ? 'text-2xl' : 'text-xl'}`}>
          {pick(article.title, article.titleHi)}
        </h3>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-muted flex-1">{pick(article.summary, article.summaryHi)}</p>
        <span className="mt-5 text-sm font-medium text-ink">{L('Read article', 'लेख पढ़ें')} →</span>
      </div>
    </Link>
  );
}
