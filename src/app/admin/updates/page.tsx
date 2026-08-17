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
  AlertCircle
} from 'lucide-react';
import { NoticeUpdate, NoticeCategory, ClassLevel } from '@/lib/types';
import { useToast } from '@/context/ToastContext';

const CATEGORIES: NoticeCategory[] = [
  'Important Notice',
  'Class Update',
  'Test / Examination',
  'Assignment',
  'Study Material',
  'Question Paper',
  'General Announcement'
];

export default function AdminUpdatesPage() {
  const { showToast } = useToast();
  const [updates, setUpdates] = useState<NoticeUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

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

  const fetchUpdates = async () => {
    try {
      const res = await fetch('/api/updates');
      const data = await res.json();
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

    const data = new FormData();
    data.append('file', file);

    try {
      showToast('Uploading attachment...', 'info');
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      });
      const result = await res.json();
      if (result.success) {
        setFormData(prev => ({
          ...prev,
          attachmentUrl: result.fileUrl,
          attachmentName: result.fileName,
          attachmentSize: result.fileSize
        }));
        showToast('Attachment uploaded successfully!', 'success');
      } else {
        showToast('Upload failed', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Error uploading file', 'error');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.category) {
      showToast('Please enter title and category', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const url = '/api/updates';
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId ? { id: editingId, ...formData } : formData;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        showToast(editingId ? 'Notice updated successfully' : 'New notice published!', 'success');
        setIsModalOpen(false);
        fetchUpdates();
      } else {
        showToast('Error saving notice', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Failed to save update', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/updates?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Notice deleted', 'info');
        setDeleteConfirmId(null);
        fetchUpdates();
      } else {
        showToast('Failed to delete', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Error deleting notice', 'error');
    }
  };

  const togglePin = async (item: NoticeUpdate) => {
    try {
      const res = await fetch('/api/updates', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id, isPinned: !item.isPinned })
      });
      if (res.ok) {
        showToast(item.isPinned ? 'Notice unpinned' : 'Notice pinned to top', 'success');
        fetchUpdates();
      }
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
              {updates.map((item) => (
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

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Full Announcement Content (Markdown supported)
                </label>
                <textarea
                  rows={4}
                  placeholder="Detailed schedule, topics covered, instructions for students..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none font-sans"
                ></textarea>
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
