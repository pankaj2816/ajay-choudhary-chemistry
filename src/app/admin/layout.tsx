'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Bell,
  FileText,
  CheckCircle,
  BookOpen,
  Layers,
  Users,
  Mail,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Clock,
  Quote,
} from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { hasAdminSession, signOut } from '@/lib/github';
import { refreshAdminData } from '@/lib/dataService';
import ElementTile from '@/components/ui/ElementTile';

const ADMIN_NAV_ITEMS = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Notices & Updates', href: '/admin/updates', icon: Bell },
  { label: 'Question Papers', href: '/admin/question-papers', icon: FileText },
  { label: 'Verified Solutions', href: '/admin/solutions', icon: CheckCircle },
  { label: 'Study Materials', href: '/admin/study-materials', icon: BookOpen },
  { label: 'Subjects & Chapters', href: '/admin/categories', icon: Layers },
  { label: 'Team Portfolio', href: '/admin/team', icon: Users },
  { label: 'Testimonials', href: '/admin/testimonials', icon: Quote },
  { label: 'Student Enquiries', href: '/admin/messages', icon: Mail },
  { label: 'Settings & Banner', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { showToast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [signedIn, setSignedIn] = useState<boolean | null>(null);

  const isLoginPage = !!pathname && pathname.replace(/\/$/, '').endsWith('/login');

  // Client-side guard: the admin needs a GitHub token saved in this browser.
  useEffect(() => {
    if (isLoginPage) return;
    const ok = hasAdminSession();
    // Reading localStorage must happen after mount
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSignedIn(ok);
    if (!ok) router.replace('/admin/login');
  }, [isLoginPage, router, pathname]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!signedIn) {
    return (
      <div className="min-h-screen bg-ink flex flex-col items-center justify-center text-paper/60 gap-4">
        <ElementTile symbol="Ac" number={89} size="md" tone="dark" />
        <span className="text-sm">Checking sign-in…</span>
        <Link href="/admin/login" className="text-sm text-paper underline underline-offset-4">
          Go to sign in
        </Link>
      </div>
    );
  }

  const handleLogout = () => {
    signOut();
    refreshAdminData();
    showToast('Signed out', 'info');
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col lg:flex-row text-slate-100">
      {/* Mobile top bar */}
      <div className="lg:hidden bg-slate-950 border-b border-slate-800 p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <ElementTile symbol="Ac" number={89} size="sm" tone="dark" />
          <span className="font-display text-lg text-white">Admin</span>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/" target="_blank" className="p-2 text-sm text-slate-300 flex items-center gap-1">
            <ExternalLink className="w-4 h-4" />
            <span className="hidden sm:inline">View site</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-slate-300"
            aria-label="Toggle admin menu"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-950 border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5 space-y-7">
          <div className="flex items-center gap-3">
            <ElementTile symbol="Ac" number={89} size="sm" tone="dark" />
            <div>
              <p className="font-display text-lg leading-tight text-white">Ajay Choudhary</p>
              <span className="eyebrow !text-[0.6rem] text-slate-400">Admin</span>
            </div>
          </div>

          <nav className="space-y-0.5">
            {ADMIN_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname?.replace(/\/$/, '').endsWith(item.href) && (item.href !== '/admin' || pathname.replace(/\/$/, '').endsWith('/admin'));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 text-sm transition-colors ${
                    isActive ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800/80 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 text-sm border border-slate-800 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Open public website
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-slate-400 hover:text-white text-sm transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center gap-2.5 px-4 sm:px-6 lg:px-8 py-3 bg-slate-950/70 border-b border-slate-800/80 text-sm text-slate-300">
          <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>Saved changes appear on the public website about 2 minutes after you save.</span>
        </div>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
