'use client';

import React, { useEffect, useState } from 'react';
import { Article } from '@/lib/types';
import { initialDatabase } from '@/data/initialData';
import { getArticles } from '@/lib/dataService';
import { PageHeader } from '@/components/ui/Editorial';
import ArticleCard from './ArticleCard';
import { useLanguage } from '@/context/LanguageContext';

export default function ArticlesHub() {
  const { L } = useLanguage();
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
        label={L('Articles', 'लेख')}
        title={L('Chemistry around you', 'आपके आस-पास का रसायन')}
        intro={L(
          'Short, illustrated reads that connect what you study to everyday life: from fireworks to onions.',
          'चित्रों के साथ छोटे लेख, जो आपकी पढ़ाई को रोज़मर्रा की ज़िंदगी से जोड़ते हैं: आतिशबाज़ी से लेकर प्याज़ तक।',
        )}
      />
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        {list.length === 0 ? (
          <p className="py-20 text-center text-muted">{L('New articles are coming soon.', 'नए लेख जल्द आ रहे हैं।')}</p>
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
