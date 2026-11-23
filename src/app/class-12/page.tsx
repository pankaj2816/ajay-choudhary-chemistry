import type { Metadata } from 'next';
import ClassPage from '@/components/classes/ClassPage';

export const metadata: Metadata = {
  title: 'Class 12 Chemistry | Ajay Choudhary Sir',
  description: 'Class 12 Chemistry notes, books, question papers, solutions and notices from Ajay Choudhary Sir.',
};

export default function Class12Page() {
  return <ClassPage grade="12" />;
}
