'use client';

import React, { useEffect, useState } from 'react';
import { Article } from '@/lib/types';
import { initialDatabase } from '@/data/initialData';
import { getArticles } from '@/lib/dataService';
import { PageHeader } from '@/components/ui/Editorial';
import ArticleCard from './ArticleCard';

export default function ArticlesHub() {
  const [articles, setArticles] = useState<Article[]>(initialDatabase.articles || []);

  useEffect(() => {
    getArticles()
      .then((a) => Array.isArray(a) && setArticles(a))
      .catch(() => {});
  }, []);

  const list = articles.filter((a) => a.isPublished).sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <PageHeader
        label="Articles"
        title="Chemistry around you"
        intro="Short, illustrated reads that connect what you study to everyday life: from fireworks to onions."
      />
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        {list.length === 0 ? (
          <p className="py-20 text-center text-muted">New articles are coming soon.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((a, i) => (
              <li key={a.id} className={i === 0 ? 'md:col-span-2 lg:col-span-2' : ''}>
                <ArticleCard article={a} large={i === 0} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
