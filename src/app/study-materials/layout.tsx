import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Study Material | Ajay Choudhary Sir',
  description: "Free chemistry notes, books, formula sheets and worksheets from Ajay Choudhary Sir.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
