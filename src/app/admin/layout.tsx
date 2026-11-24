import type { Metadata } from 'next';
import AdminShell from '@/components/admin/AdminShell';

// The teacher area should never appear in search results.
export const metadata: Metadata = {
  title: 'Teacher area',
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
