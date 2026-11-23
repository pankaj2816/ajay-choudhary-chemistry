import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'About | Ajay Choudhary Sir',
  description: "Teaching journey, method and qualifications of Ajay Choudhary Sir, Chemistry educator.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
