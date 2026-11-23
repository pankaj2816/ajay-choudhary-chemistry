import type { Metadata } from 'next';
import ClassPage from '@/components/classes/ClassPage';

export const metadata: Metadata = {
  title: 'Class 9 Chemistry | Ajay Choudhary Sir',
  description: 'Class 9 Chemistry notes, books, question papers, solutions and notices from Ajay Choudhary Sir.',
};

export default function Class9Page() {
  return <ClassPage grade="9" />;
}
