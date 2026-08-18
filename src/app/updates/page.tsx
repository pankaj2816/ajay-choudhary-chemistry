'use client';

import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Search, 
  Pin, 
  Calendar, 
  Download, 
  FileText, 
  Filter, 
  X, 
  ArrowRight, 
  Sparkles,
  Users
} from 'lucide-react';
import { NoticeUpdate, NoticeCategory, ClassLevel } from '@/lib/types';
import { initialDatabase } from '@/data/initialData';
import { useToast } from '@/context/ToastContext';
import ChemistryContentRenderer from '@/components/ui/ChemistryContentRenderer';
import { getUpdates } from '@/lib/dataService';

const CATEGORIES: (NoticeCategory | 'All Categories')[] = [
  'All Categories',
  'Important Notice',
  'Class Update',
  'Test / Examination',
  'Assignment',
  'Study Material',
  'Question Paper',
  'General Announcement'
];

const CATEGORY_COLORS: Record<string, string> = {
  'Important Notice': 'bg-rose-100 text-rose-800 border-rose-200',
  'Class Update': 'bg-cyan-100 text-cyan-800 border-cyan-200',
  'Test / Examination': 'bg-amber-100 text-amber-800 border-amber-200',
  'Assignment': 'bg-purple-100 text-purple-800 border-purple-200',
  'Study Material': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  'Question Paper': 'bg-blue-100 text-blue-800 border-blue-200',
  'General Announcement': 'bg-slate-100 text-slate-800 border-slate-200'
};

export default function UpdatesPage() {
  const [updates, setUpdates] = useState<NoticeUpdate[]>(initialDatabase.updates.filter(u => u.isPublished));
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNotice, setSelectedNotice] = useState<NoticeUpdate | null>(null);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    getUpdates()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setUpdates(data.filter((u: NoticeUpdate) => u.isPublished));
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredUpdates = updates.filter((item) => {
    const matchesCategory = selectedCategory === 'All Categories' || item.category === selectedCategory;
    const matchesClass = selectedClass === 'All' || !item.targetClass || item.targetClass === 'All Classes' || item.targetClass === selectedClass;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesClass && matchesSearch;
  });

  const handleDownload = (notice: NoticeUpdate) => {
    if (!notice.attachmentUrl) return;
    showToast(`Downloading: ${notice.attachmentName || 'Notice Attachment'}`, 'info');
    const link = document.createElement('a');
    link.href = notice.attachmentUrl;
    link.download = notice.attachmentName || 'Attachment.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* Header Banner */}
      <section className="bg-slate-950 text-white chem-hero-gradient py-16 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950 border border-rose-500/30 text-rose-300 font-bold text-xs">
              <Bell className="w-3.5 h-3.5 animate-bounce" />
              Academic Announcements
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              Latest Updates & Notice Board
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed">
              Official announcements, test schedules, assignment deadlines, and question paper alerts posted directly by Ajay Choudhary Sir.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
        
        {/* Controls Bar: Search & Filter Tabs */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          
          {/* Top Search & Class selector */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search notices by keyword or chapter..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Target Class Filter */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-bold text-slate-500 shrink-0">Class:</span>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full sm:w-44 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="All">All Batches</option>
                <option value="Class 11">Class 11</option>
                <option value="Class 12">Class 12</option>
                <option value="Dropper / JEE / NEET">Dropper / JEE / NEET</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

        </div>

        {/* Notices Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>Showing {filteredUpdates.length} of {updates.length} announcements</span>
          {(selectedCategory !== 'All Categories' || selectedClass !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('All Categories');
                setSelectedClass('All');
                setSearchQuery('');
              }}
              className="text-cyan-700 font-bold hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Empty State */}
        {filteredUpdates.length === 0 && !loading && (
          <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <Bell className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">No notices found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No announcements match your current filter selection. Try changing category or search terms.
            </p>
          </div>
        )}

        {/* Notices Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUpdates.map((notice) => (
            <div
              key={notice.id}
              onClick={() => setSelectedNotice(notice)}
              className={`rounded-3xl p-6 sm:p-7 border transition-all duration-300 cursor-pointer flex flex-col justify-between group hover:-translate-y-1.5 shadow-sm hover:shadow-xl ${
                notice.isPinned
                  ? 'bg-gradient-to-b from-amber-50/40 via-white to-white border-amber-300'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="space-y-3.5">
                
                {/* Top Badge & Date */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                    CATEGORY_COLORS[notice.category] || 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}>
                    {notice.category}
                  </span>

                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    {notice.isPinned && (
                      <span className="flex items-center gap-1 text-amber-600 font-bold text-[11px] bg-amber-100 px-2 py-0.5 rounded-full">
                        <Pin className="w-3 h-3" /> Pinned
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {notice.date}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-cyan-700 transition-colors leading-snug">
                  {notice.title}
                </h3>

                {/* Target Class Pill */}
                {notice.targetClass && (
                  <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    <Users className="w-3 h-3" />
                    <span>Target: {notice.targetClass}</span>
                  </div>
                )}

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {notice.description}
                </p>
              </div>

              {/* Bottom attachment & action */}
              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs">
                {notice.attachmentName ? (
                  <span className="inline-flex items-center gap-1.5 text-slate-600 font-semibold truncate max-w-[170px]">
                    <FileText className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                    <span className="truncate">{notice.attachmentName}</span>
                  </span>
                ) : (
                  <span className="text-slate-400 text-[11px]">Notice</span>
                )}

                <span className="font-bold text-cyan-700 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Read More <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                  CATEGORY_COLORS[selectedNotice.category] || 'bg-slate-100 text-slate-700'
                }`}>
                  {selectedNotice.category}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {selectedNotice.date}
                </span>
              </div>
              <button
                onClick={() => setSelectedNotice(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                {selectedNotice.title}
              </h3>

              {selectedNotice.targetClass && (
                <div className="text-xs font-semibold text-slate-600">
                  <strong>Target Audience:</strong> {selectedNotice.targetClass}
                </div>
              )}

              {selectedNotice.description && (
                <p className="text-xs sm:text-sm font-semibold text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  {selectedNotice.description}
                </p>
              )}

              <div className="mt-4">
                <ChemistryContentRenderer content={selectedNotice.content || selectedNotice.description} />
              </div>

              {/* Attachment Box */}
              {selectedNotice.attachmentName && (
                <div className="mt-6 p-4 rounded-2xl bg-cyan-50/70 border border-cyan-200 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-3 rounded-xl bg-cyan-600 text-white shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-bold text-slate-900 truncate">
                        {selectedNotice.attachmentName}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {selectedNotice.attachmentSize || 'PDF Attachment'}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownload(selectedNotice)}
                    className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>Notice from Ajay Choudhary Chemistry Platform</span>
              <button
                onClick={() => setSelectedNotice(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
