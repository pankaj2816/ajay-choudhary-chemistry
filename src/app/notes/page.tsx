import type { Metadata } from 'next';
import { Suspense } from 'react';
import NotesHub from '@/components/learn/NotesHub';

export const metadata: Metadata = {
  title: 'Concept Notes | Ajay Choudhary Sir',
  description: 'Simple, concept-first chemistry notes for every Class 11 and Class 12 chapter.',
};

export default function NotesPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <NotesHub />
    </Suspense>
  );
}
