import type { Metadata } from 'next';
import { initialDatabase } from '@/data/initialData';
import ArticleView from '@/components/learn/ArticleView';

export const dynamicParams = false;

export function generateStaticParams() {
  return (initialDatabase.articles || []).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = (initialDatabase.articles || []).find((x) => x.slug === slug);
  return {
    title: a ? `${a.title} | Ajay Choudhary Sir` : 'Article | Ajay Choudhary Sir',
    description: a?.summary,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ArticleView slug={slug} />;
}
