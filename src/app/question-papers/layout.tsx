import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Question Papers | Ajay Choudhary Sir',
  description: "Chemistry test papers for Class 9 to 12, JEE and NEET from Ajay Choudhary Sir.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
