import type { Metadata } from 'next';
import ClassPage from '@/components/classes/ClassPage';

export const metadata: Metadata = {
  title: 'Class 10 Chemistry | Ajay Choudhary Sir',
  description: 'Class 10 Chemistry notes, books, question papers, solutions and notices from Ajay Choudhary Sir.',
};

export default function Class10Page() {
  return <ClassPage grade="10" />;
}
