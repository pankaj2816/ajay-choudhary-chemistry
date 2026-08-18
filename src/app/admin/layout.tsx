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
  FlaskConical,
  ShieldCheck
} from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { getMessages } from '@/lib/dataService';

const ADMIN_NAV_ITEMS = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Notices & Updates', href: '/admin/updates', icon: Bell },
  { label: 'Question Papers', href: '/admin/question-papers', icon: FileText },
  { label: 'Verified Solutions', href: '/admin/solutions', icon: CheckCircle },
  { label: 'Study Materials', href: '/admin/study-materials', icon: BookOpen },
  { label: 'Subjects & Chapters', href: '/admin/categories', icon: Layers },
  { label: 'Team Portfolio', href: '/admin/team', icon: Users },
  { label: 'Student Messages', href: '/admin/messages', icon: Mail, hasBadge: true },
  { label: 'Settings & Banner', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { showToast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [authChecked, setAuthChecked] = useState(false);

  // Skip layout shell for login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Client-side authentication guard
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const session = localStorage.getItem('ajay_admin_session');
      if (!session) {
        router.push('/admin/login');
      } else {
        try {
          const parsed = JSON.parse(session);
          if (parsed && parsed.authenticated) {
            setAuthChecked(true);
          } else {
            router.push('/admin/login');
          }
        } catch {
          router.push('/admin/login');
        }
      }
    }
  }, [pathname, router]);

  // Fetch unread count for badge
  useEffect(() => {
    if (!authChecked) return;
    getMessages()
      .then(data => {
        if (Array.isArray(data)) {
          const unread = data.filter((m: { isRead: boolean }) => !m.isRead).length;
          setUnreadCount(unread);
        }
      })
      .catch(() => {});
  }, [pathname, authChecked]);

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400 gap-3">
        <FlaskConical className="w-8 h-8 text-cyan-400 animate-pulse" />
        <span className="text-xs font-semibold uppercase tracking-wider">Verifying Admin Session...</span>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('ajay_admin_session');
        document.cookie = 'admin_session=; path=/; max-age=0';
      }
      await fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
      showToast('Logged out successfully', 'info');
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col lg:flex-row text-slate-100">
      
      {/* Mobile Top Header for Admin */}
      <div className="lg:hidden bg-slate-950 border-b border-slate-800 p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center p-0.5">
            <FlaskConical className="w-4 h-4 text-cyan-300" />
          </div>
          <span className="font-bold text-white text-sm">Ajay Sir CMS</span>
        </div>

        <div className="flex items-center gap-2">
          <Link 
            href="/" 
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-cyan-400 flex items-center gap-1"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Site</span>
          </Link>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg bg-slate-800 text-slate-300"
            aria-label="Toggle admin sidebar"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Admin Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-950 border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5 space-y-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 p-0.5 shadow-md">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <FlaskConical className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <div>
              <h2 className="font-extrabold text-white text-sm tracking-tight">Ajay Choudhary Sir</h2>
              <span className="text-[10px] text-cyan-400 font-semibold uppercase tracking-wider block">
                Admin Control Center
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {ADMIN_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.hasBadge && unreadCount > 0 && (
                    <span className="px-1.5 py-0.2 bg-rose-500 text-white text-[10px] font-bold rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom: View Site & Logout */}
        <div className="p-4 border-t border-slate-800/80 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-800 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            <span>Open Public Website</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-rose-950/40 hover:bg-rose-950/80 text-rose-300 text-xs font-semibold border border-rose-500/20 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Canvas */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Desktop Bar */}
        <header className="hidden lg:flex items-center justify-between px-8 py-4 bg-slate-950/80 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Current Portal:</span>
            <span className="text-xs font-bold text-white bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
              Chemistry Management System
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 font-medium transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Site Preview</span>
            </Link>

            <div className="h-4 w-px bg-slate-800"></div>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
                AC
              </div>
              <span className="font-bold text-slate-200">Ajay Sir (Admin)</span>
            </div>
          </div>
        </header>

        {/* Content Children */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

    </div>
  );
}
