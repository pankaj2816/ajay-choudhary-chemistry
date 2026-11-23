import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Notice Board | Ajay Choudhary Sir',
  description: "Latest notices, test dates and batch updates from Ajay Choudhary Sir.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
