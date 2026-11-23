import type { Metadata } from 'next';
import ArticlesHub from '@/components/learn/ArticlesHub';

export const metadata: Metadata = {
  title: 'Articles | Ajay Choudhary Sir',
  description: 'Illustrated chemistry articles that connect the syllabus to everyday life.',
};

export default function ArticlesPage() {
  return <ArticlesHub />;
}
