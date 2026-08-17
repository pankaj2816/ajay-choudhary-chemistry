'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Bell, 
  FileText, 
  CheckCircle, 
  BookOpen, 
  Mail, 
  Plus, 
  ArrowRight, 
  TrendingUp, 
  Users, 
  Clock, 
  Sparkles,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { DatabaseSchema } from '@/lib/types';

export default function AdminDashboardOverview() {
  const [stats, setStats] = useState({
    updatesCount: 0,
    questionPapersCount: 0,
    solutionsCount: 0,
    studyMaterialsCount: 0,
    messagesCount: 0,
    unreadMessages: 0,
    teamCount: 0
  });
  const [recentUpdates, setRecentUpdates] = useState<any[]>([]);
  const [recentMessages, setRecentMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/updates').then(r => r.json()),
      fetch('/api/question-papers').then(r => r.json()),
      fetch('/api/solutions').then(r => r.json()),
      fetch('/api/study-materials').then(r => r.json()),
      fetch('/api/messages').then(r => r.json()),
      fetch('/api/team').then(r => r.json())
    ]).then(([updates, qps, sols, mats, msgs, team]) => {
      const updatesArr = Array.isArray(updates) ? updates : [];
      const qpsArr = Array.isArray(qps) ? qps : [];
      const solsArr = Array.isArray(sols) ? sols : [];
      const matsArr = Array.isArray(mats) ? mats : [];
      const msgsArr = Array.isArray(msgs) ? msgs : [];
      const teamArr = Array.isArray(team) ? team : [];

      setStats({
        updatesCount: updatesArr.length,
        questionPapersCount: qpsArr.length,
        solutionsCount: solsArr.length,
        studyMaterialsCount: matsArr.length,
        messagesCount: msgsArr.length,
        unreadMessages: msgsArr.filter((m: any) => !m.isRead).length,
        teamCount: teamArr.length
      });

      setRecentUpdates(updatesArr.slice(0, 3));
      setRecentMessages(msgsArr.slice(0, 3));
    }).catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            Instructor Control Dashboard
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Welcome back, Ajay Sir!
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Manage your Chemistry teaching website content, publish class notices, upload previous year question papers, update verified solutions, and respond to student inquiries.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 shrink-0">
          <Link
            href="/admin/updates"
            className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-1.5 shadow transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Update</span>
          </Link>
          <Link
            href="/admin/question-papers"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Paper</span>
          </Link>
        </div>
      </div>

      {/* Overview Stat Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        <Link 
          href="/admin/updates"
          className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400">Total Notices</span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 group-hover:scale-110 transition-transform">
              <Bell className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">{stats.updatesCount}</div>
          <span className="text-[11px] text-cyan-400 font-semibold mt-1 block">Active Notices & Announcements</span>
        </Link>

        <Link 
          href="/admin/question-papers"
          className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-blue-500/40 transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400">Question Papers</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">{stats.questionPapersCount}</div>
          <span className="text-[11px] text-blue-400 font-semibold mt-1 block">Unit Tests & Mock Papers</span>
        </Link>

        <Link 
          href="/admin/solutions"
          className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400">Verified Solutions</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">{stats.solutionsCount}</div>
          <span className="text-[11px] text-emerald-400 font-semibold mt-1 block">Step-by-step Answer Keys</span>
        </Link>

        <Link 
          href="/admin/messages"
          className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400">Inquiries</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">{stats.messagesCount}</div>
          <span className="text-[11px] text-purple-400 font-semibold mt-1 block">
            {stats.unreadMessages} New Unread Inquiries
          </span>
        </Link>

      </div>

      {/* Quick Access Action Shortcuts */}
      <div className="bg-slate-950/60 p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Quick Action Shortcuts
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            href="/admin/updates"
            className="p-4 rounded-2xl bg-slate-900 hover:bg-slate-800/90 border border-slate-800 hover:border-cyan-500/30 transition-all text-center space-y-2 group"
          >
            <Bell className="w-5 h-5 text-cyan-400 mx-auto group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-slate-200 block">Post Announcement</span>
          </Link>

          <Link
            href="/admin/question-papers"
            className="p-4 rounded-2xl bg-slate-900 hover:bg-slate-800/90 border border-slate-800 hover:border-blue-500/30 transition-all text-center space-y-2 group"
          >
            <FileText className="w-5 h-5 text-blue-400 mx-auto group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-slate-200 block">Add Test Paper</span>
          </Link>

          <Link
            href="/admin/solutions"
            className="p-4 rounded-2xl bg-slate-900 hover:bg-slate-800/90 border border-slate-800 hover:border-emerald-500/30 transition-all text-center space-y-2 group"
          >
            <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-slate-200 block">Add Solution</span>
          </Link>

          <Link
            href="/admin/study-materials"
            className="p-4 rounded-2xl bg-slate-900 hover:bg-slate-800/90 border border-slate-800 hover:border-purple-500/30 transition-all text-center space-y-2 group"
          >
            <BookOpen className="w-5 h-5 text-purple-400 mx-auto group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-slate-200 block">Upload Notes</span>
          </Link>
        </div>
      </div>

      {/* Two Column Grid: Recent Notices & Student Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Notices */}
        <div className="p-6 rounded-3xl bg-slate-950/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Bell className="w-4 h-4 text-cyan-400" />
              Recent Notices & Updates
            </h3>
            <Link href="/admin/updates" className="text-xs text-cyan-400 hover:underline">
              Manage all →
            </Link>
          </div>

          <div className="space-y-3">
            {recentUpdates.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="font-bold text-slate-100 line-clamp-1">{item.title}</div>
                  <div className="text-[11px] text-slate-400">{item.category} • {item.date}</div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30 shrink-0">
                  Published
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="p-6 rounded-3xl bg-slate-950/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-purple-400" />
              Recent Student Inquiries
            </h3>
            <Link href="/admin/messages" className="text-xs text-purple-400 hover:underline">
              Open Inbox →
            </Link>
          </div>

          <div className="space-y-3">
            {recentMessages.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="font-bold text-slate-100">{item.name} ({item.studentClass})</div>
                  <div className="text-[11px] text-slate-400 line-clamp-1">{item.message}</div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold shrink-0 ${
                  item.isRead ? 'bg-slate-800 text-slate-400' : 'bg-rose-950 text-rose-400 border border-rose-500/30'
                }`}>
                  {item.isRead ? 'Read' : 'New'}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
