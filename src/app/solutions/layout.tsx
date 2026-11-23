import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Solutions | Ajay Choudhary Sir',
  description: "Worked solutions and answer keys for Ajay Choudhary Sir's chemistry test papers.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
