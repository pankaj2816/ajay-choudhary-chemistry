'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { Article } from '@/lib/types';
import { initialDatabase } from '@/data/initialData';
import { getArticles } from '@/lib/dataService';
import Markdown from '@/components/ui/Markdown';
import SafeImage from '@/components/ui/SafeImage';
import ArticleCard from './ArticleCard';
import { useLanguage } from '@/context/LanguageContext';
import { term, formatDate } from '@/lib/terms';

export default function ArticleView({ slug }: { slug: string }) {
  const { L, isHi, pick } = useLanguage();
  const [articles, setArticles] = useState<Article[]>(initialDatabase.articles || []);

  useEffect(() => {
    getArticles()
      .then((a) => Array.isArray(a) && setArticles(a))
      .catch(() => {});
  }, []);

  const article = articles.find((a) => a.slug === slug);
  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-5 py-32 text-center">
        <p className="text-2xl font-semibold text-ink">{L('This article is not available.', 'यह लेख उपलब्ध नहीं है।')}</p>
        <Link href="/articles" className="mt-6 inline-block link-underline text-ink">{L('See all articles', 'सभी लेख देखें')}</Link>
      </div>
    );
  }

  const more = articles.filter((a) => a.isPublished && a.id !== article.id).slice(0, 3);
  const dateText = formatDate(article.date, isHi, { day: 'numeric', month: 'long', year: 'numeric' });
  const title = pick(article.title, article.titleHi);

  const share = () => {
    const url = window.location.href.split('#')[0];
    window.open(`https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`, '_blank', 'noopener');
  };

  return (
    <article>
      <header className="max-w-3xl mx-auto px-5 sm:px-8 pt-10 sm:pt-14">
        <nav className="text-sm text-muted" aria-label={L('Breadcrumb', 'पथ')}>
          <Link href="/articles" className="hover:text-accent">{L('Articles', 'लेख')}</Link>
        </nav>
        {article.tags?.length > 0 && (
          <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-accent">{article.tags.map((x) => term(x, isHi)).join(' · ')}</p>
        )}
        <h1 className="mt-3 text-4xl sm:text-5xl leading-[1.08] text-ink">{title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">{pick(article.summary, article.summaryHi)}</p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-line">
          <p className="text-sm text-muted">{L('By Ajay Choudhary Sir', 'लेखक: अजय चौधरी सर')} · {dateText}</p>
          <button onClick={share} className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-accent">
            <MessageCircle className="w-4 h-4" /> {L('Share on WhatsApp', 'WhatsApp पर भेजें')}
          </button>
        </div>
      </header>

      {article.image && (
        <figure className="max-w-5xl mx-auto px-5 sm:px-8 mt-10">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-paper-deep border border-line">
            <SafeImage src={article.image} alt={pick(article.imageAlt, article.imageAltHi) || title} fill priority sizes="(min-width:1024px) 960px, 100vw" className="object-cover" />
          </div>
        </figure>
      )}

      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <Markdown source={pick(article.body, article.bodyHi)} />
      </div>

      {more.length > 0 && (
        <section className="bg-paper-deep border-t border-line">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
            <h2 className="!text-2xl text-ink">{L('More to read', 'और पढ़ें')}</h2>
            <ul className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {more.map((a) => (
                <li key={a.id}><ArticleCard article={a} /></li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </article>
  );
}
