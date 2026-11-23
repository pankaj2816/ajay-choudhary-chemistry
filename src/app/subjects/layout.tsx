import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Subjects | Ajay Choudhary Sir',
  description: "Organic, Inorganic and Practical Chemistry syllabus taught by Ajay Choudhary Sir.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
