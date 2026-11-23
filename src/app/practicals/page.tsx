import type { Metadata } from 'next';
import { Suspense } from 'react';
import PracticalsHub from '@/components/practicals/PracticalsHub';

export const metadata: Metadata = {
  title: 'Practicals | Ajay Choudhary Sir',
  description: 'Chemistry lab practical videos: salt analysis, titrations, tests and viva tips by Ajay Choudhary Sir.',
};

export default function PracticalsPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <PracticalsHub />
    </Suspense>
  );
}
