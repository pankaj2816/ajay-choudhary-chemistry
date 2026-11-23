import type { Metadata } from 'next';
import { initialDatabase } from '@/data/initialData';
import NoteView from '@/components/learn/NoteView';

export const dynamicParams = false;

export function generateStaticParams() {
  return (initialDatabase.conceptNotes || []).map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const note = (initialDatabase.conceptNotes || []).find((n) => n.slug === slug);
  return {
    title: note ? `${note.title} (Class ${note.grade}) | Ajay Choudhary Sir` : 'Concept note | Ajay Choudhary Sir',
    description: note?.summary,
  };
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <NoteView slug={slug} />;
}
