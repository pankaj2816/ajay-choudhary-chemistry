import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Search | Ajay Choudhary Sir',
  description: "Search notes, papers, solutions and notices.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
