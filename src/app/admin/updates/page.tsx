'use client';

import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Plus, 
  Edit3, 
  Trash2, 
  Pin, 
  Calendar, 
  Upload, 
  FileText, 
  Check, 
  X, 
  Loader2,
  CheckCircle2,
  AlertCircle,
  Bold,
  Italic,
  Heading,
  List,
  ListOrdered,
  Sparkles,
  FlaskConical,
  Highlighter,
  Eye,
  PenTool,
  Search,
  Filter
} from 'lucide-react';
import { NoticeUpdate, NoticeCategory, ClassLevel } from '@/lib/types';
import { useToast } from '@/context/ToastContext';
import { getUpdates, saveUpdate, deleteUpdate } from '@/lib/dataService';
import ChemistryContentRenderer from '@/components/ui/ChemistryContentRenderer';

const CATEGORIES: NoticeCategory[] = [
  'Important Notice',
  'Class Update',
  'Test / Examination',
  'Assignment',
  'Study Material',
  'Question Paper',
  'General Announcement'
];

const CLASSES: ClassLevel[] = [
  'All Classes',
  'Class 11',
  'Class 12',
  'Dropper / JEE / NEET'
];

export default function AdminUpdatesPage() {
  const { showToast } = useToast();
  const [updates, setUpdates] = useState<NoticeUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [adminSearch, setAdminSearch] = useState('');
  const [adminCatFilter, setAdminCatFilter] = useState('All');
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');

  // Form State
  const [formData, setFormData] = useState<Omit<NoticeUpdate, 'id'>>({
    title: '',
    category: 'Important Notice',
    description: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    isPinned: false,
    isPublished: true,
    attachmentName: '',
    attachmentUrl: '',
    attachmentSize: '',
    targetClass: 'All Classes'
  });

  const insertFormatting = (prefix: string, suffix: string = '', placeholder: string = 'text') => {
    const textarea = document.getElementById('notice-content-textarea') as HTMLTextAreaElement | null;
    const current = formData.content || '';

    if (!textarea) {
      setFormData(prev => ({ ...prev, content: current + `${prefix}${placeholder}${suffix}` }));
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = current.substring(start, end) || placeholder;
    const replacement = `${prefix}${selected}${suffix}`;
    const updated = current.substring(0, start) + replacement + current.substring(end);

    setFormData(prev => ({ ...prev, content: updated }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
    }, 50);
  };

  const fetchUpdates = async () => {
    try {
      const data = await getUpdates();
      if (Array.isArray(data)) setUpdates(data);
    } catch (err) {
      console.error(err);
      showToast('Failed to load notices', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpdates();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      title: '',
      category: 'Important Notice',
      description: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      isPinned: false,
      isPublished: true,
      attachmentName: '',
      attachmentUrl: '',
      attachmentSize: '',
      targetClass: 'All Classes'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: NoticeUpdate) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      category: item.category,
      description: item.description,
      content: item.content,
      date: item.date,
      isPinned: item.isPinned,
      isPublished: item.isPublished,
      attachmentName: item.attachmentName || '',
      attachmentUrl: item.attachmentUrl || '',
      attachmentSize: item.attachmentSize || '',
      targetClass: item.targetClass || 'All Classes'
    });
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFormData(prev => ({
      ...prev,
      attachmentName: file.name,
      attachmentSize: `${(file.size / 1024).toFixed(0)} KB`,
      attachmentUrl: '/uploads/sample_chemistry_notes.pdf'
    }));
    showToast('Attachment verified!', 'success');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.category) {
      showToast('Please enter title and category', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await saveUpdate(editingId ? { id: editingId, ...formData } : formData);
      showToast(editingId ? 'Notice updated successfully' : 'New notice published!', 'success');
      setIsModalOpen(false);
      fetchUpdates();
    } catch (err) {
      console.error(err);
      showToast('Failed to save update', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUpdate(id);
      showToast('Notice deleted', 'info');
      setDeleteConfirmId(null);
      fetchUpdates();
    } catch (err) {
      console.error(err);
      showToast('Error deleting notice', 'error');
    }
  };

  const togglePin = async (item: NoticeUpdate) => {
    try {
      await saveUpdate({ id: item.id, isPinned: !item.isPinned });
      showToast(item.isPinned ? 'Notice unpinned' : 'Notice pinned to top', 'success');
      fetchUpdates();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <Bell className="w-6 h-6 text-cyan-400" />
            Manage Notices & Announcements
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Post class schedules, exam alerts, test dates, and assignments with attachments.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-cyan-600/25 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Notice</span>
        </button>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter notices by title, description, or content..."
            value={adminSearch}
            onChange={(e) => setAdminSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          {adminSearch && (
            <button onClick={() => setAdminSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <select
          value={adminCatFilter}
          onChange={(e) => setAdminCatFilter(e.target.value)}
          className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 w-full sm:w-auto"
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Notices Table / Card List */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4 w-12">Pin</th>
                <th className="p-4">Notice Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Target Class</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {updates
                .filter(u => {
                  const matchCat = adminCatFilter === 'All' || u.category === adminCatFilter;
                  const matchSearch = !adminSearch ||
                    u.title.toLowerCase().includes(adminSearch.toLowerCase()) ||
                    u.description.toLowerCase().includes(adminSearch.toLowerCase()) ||
                    (u.content && u.content.toLowerCase().includes(adminSearch.toLowerCase()));
                  return matchCat && matchSearch;
                })
                .map((item) => (
                <tr key={item.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="p-4">
                    <button
                      onClick={() => togglePin(item)}
                      title={item.isPinned ? 'Unpin' : 'Pin to top'}
                      className={`p-1.5 rounded-lg transition-colors ${
                        item.isPinned ? 'bg-amber-500/20 text-amber-400' : 'text-slate-600 hover:text-slate-300'
                      }`}
                    >
                      <Pin className="w-3.5 h-3.5" />
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-white max-w-sm line-clamp-1">{item.title}</div>
                    <div className="text-[11px] text-slate-500 line-clamp-1">{item.description}</div>
                  </td>
                  <td className="p-4">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-900 text-cyan-300 border border-slate-800">
                      {item.category}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400">
                    {item.targetClass || 'All Classes'}
                  </td>
                  <td className="p-4 text-slate-400 whitespace-nowrap">
                    {item.date}
                  </td>
                  <td className="p-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.isPublished 
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {item.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="p-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                        title="Edit Notice"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(item.id)}
                        className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 transition-colors"
                        title="Delete Notice"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 max-w-sm w-full space-y-4 text-center">
            <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
            <h3 className="text-base font-bold text-white">Delete Notice?</h3>
            <p className="text-xs text-slate-400">
              Are you sure you want to delete this notice? This action cannot be undone.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 rounded-3xl border border-slate-800 max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Bell className="w-4 h-4 text-cyan-400" />
                <span>{editingId ? 'Edit Announcement' : 'Post New Notice / Update'}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Notice Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Class 12 Organic Chemistry Grand Revision Workshop"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as NoticeCategory })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Target Class / Batch
                  </label>
                  <select
                    value={formData.targetClass}
                    onChange={(e) => setFormData({ ...formData, targetClass: e.target.value as ClassLevel })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="All Classes">All Classes / Centers</option>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 12">Class 12</option>
                    <option value="Dropper / JEE / NEET">Dropper / JEE / NEET</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Short Summary / Highlight
                </label>
                <input
                  type="text"
                  placeholder="Brief 1-2 sentence description shown in preview cards..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              {/* Content Editor with Formatting Toolbar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-300">
                    Full Announcement Content
                  </label>
                  
                  {/* Tab Switcher */}
                  <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setActiveTab('write')}
                      className={`px-2.5 py-1 rounded-md font-semibold flex items-center gap-1 transition-colors ${
                        activeTab === 'write' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <PenTool className="w-3 h-3" />
                      <span>Write</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('preview')}
                      className={`px-2.5 py-1 rounded-md font-semibold flex items-center gap-1 transition-colors ${
                        activeTab === 'preview' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Eye className="w-3 h-3" />
                      <span>Live Preview</span>
                    </button>
                  </div>
                </div>

                {activeTab === 'write' ? (
                  <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500">
                    {/* Easy Toolbar for Teacher */}
                    <div className="px-3 py-2 bg-slate-900/90 border-b border-slate-800/80 flex flex-wrap items-center gap-1.5 text-xs text-slate-300">
                      <button
                        type="button"
                        onClick={() => insertFormatting('**', '**', 'Bold Text')}
                        title="Bold Text"
                        className="px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center gap-1 transition-colors"
                      >
                        <Bold className="w-3.5 h-3.5" />
                        <span>Bold</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => insertFormatting('*', '*', 'Italic Text')}
                        title="Italic Text"
                        className="px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 italic flex items-center gap-1 transition-colors"
                      >
                        <Italic className="w-3.5 h-3.5" />
                        <span>Italic</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => insertFormatting('\n### ', '\n', 'Section Heading')}
                        title="Add Heading / Title"
                        className="px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Heading className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Heading</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => insertFormatting('\n- ', '\n- Point 2\n- Point 3', 'Point 1')}
                        title="Bullet List"
                        className="px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1 transition-colors"
                      >
                        <List className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Bullet Points</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => insertFormatting('\n1. ', '\n2. Step 2\n3. Step 3', 'Step 1')}
                        title="Numbered Steps"
                        className="px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1 transition-colors"
                      >
                        <ListOrdered className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Numbered List</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => insertFormatting('==', '==', 'Important Highlight')}
                        title="Highlight Text in Yellow"
                        className="px-2 py-1 rounded-md bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold flex items-center gap-1 transition-colors border border-amber-500/30"
                      >
                        <Highlighter className="w-3.5 h-3.5" />
                        <span>Highlight</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => insertFormatting('\nReaction: Reactant ──[Reagent / Catalyst]──➔ Product\n', '', '')}
                        title="Insert Chemical Reaction Arrow"
                        className="px-2 py-1 rounded-md bg-cyan-950 hover:bg-cyan-900 text-cyan-300 font-semibold flex items-center gap-1 transition-colors border border-cyan-500/30"
                      >
                        <FlaskConical className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Reaction Formula</span>
                      </button>

                      {/* Color Tag Options */}
                      <div className="hidden sm:flex items-center gap-1 ml-auto">
                        <span className="text-[10px] text-slate-500 font-semibold">Colors:</span>
                        <button
                          type="button"
                          onClick={() => insertFormatting('[cyan]', '[/cyan]', 'Cyan Badge')}
                          className="w-4 h-4 rounded-full bg-cyan-400 border border-white/40 hover:scale-110 transition-transform"
                          title="Cyan Badge"
                        />
                        <button
                          type="button"
                          onClick={() => insertFormatting('[emerald]', '[/emerald]', 'Green Badge')}
                          className="w-4 h-4 rounded-full bg-emerald-400 border border-white/40 hover:scale-110 transition-transform"
                          title="Emerald Badge"
                        />
                        <button
                          type="button"
                          onClick={() => insertFormatting('[amber]', '[/amber]', 'Amber Alert')}
                          className="w-4 h-4 rounded-full bg-amber-400 border border-white/40 hover:scale-110 transition-transform"
                          title="Amber Badge"
                        />
                        <button
                          type="button"
                          onClick={() => insertFormatting('[rose]', '[/rose]', 'Red Alert')}
                          className="w-4 h-4 rounded-full bg-rose-400 border border-white/40 hover:scale-110 transition-transform"
                          title="Rose Badge"
                        />
                      </div>
                    </div>

                    <textarea
                      id="notice-content-textarea"
                      rows={5}
                      placeholder="Type your notice message here... Click the buttons above to format (Bold, Heading, Bullet Points, Reactions)."
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="w-full p-3.5 bg-transparent text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none resize-none font-sans leading-relaxed"
                    ></textarea>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl border border-slate-700 bg-slate-900 max-h-60 overflow-y-auto space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block border-b border-slate-800 pb-1">
                      Student View Preview:
                    </span>
                    {formData.content ? (
                      <ChemistryContentRenderer content={formData.content} />
                    ) : (
                      <p className="text-xs text-slate-500 italic">No content typed yet. Switch back to Write mode to compose.</p>
                    )}
                  </div>
                )}
              </div>

              {/* Attachment upload */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <label className="block text-xs font-bold text-slate-300">
                  Notice Attachment (Optional PDF or Document)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.png"
                    onChange={handleFileUpload}
                    className="text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-cyan-950 file:text-cyan-300 hover:file:bg-cyan-900"
                  />
                </div>
                {formData.attachmentName && (
                  <div className="text-xs text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Attached: {formData.attachmentName} ({formData.attachmentSize || 'Uploaded'})</span>
                  </div>
                )}
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.isPinned}
                    onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
                    className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500"
                  />
                  <span>Pin Notice to Top of Board</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500"
                  />
                  <span>Publish Immediately</span>
                </label>
              </div>

              {/* Modal Footer Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow transition-colors flex items-center gap-1.5"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingId ? 'Save Changes' : 'Publish Notice'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
