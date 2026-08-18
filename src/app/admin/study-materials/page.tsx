'use client';

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Plus, 
  Edit3, 
  Trash2, 
  Download, 
  Star, 
  X, 
  Loader2, 
  Upload, 
  AlertCircle,
  CheckCircle2,
  Search,
  Filter
} from 'lucide-react';
import { StudyMaterial, SubjectType, ClassLevel, ResourceType } from '@/lib/types';
import { useToast } from '@/context/ToastContext';
import { getStudyMaterials, saveStudyMaterial, deleteStudyMaterial } from '@/lib/dataService';

const SUBJECTS: SubjectType[] = [
  'Organic Chemistry',
  'Inorganic Chemistry',
  'Practical Chemistry',
  'Physical Chemistry'
];

const CLASSES: ClassLevel[] = [
  'Class 11',
  'Class 12',
  'Dropper / JEE / NEET',
  'All Classes'
];

const RESOURCE_TYPES: ResourceType[] = [
  'Chapter Notes',
  'Reaction Sheet',
  'Formula Sheet',
  'Important Questions',
  'Practice Worksheet',
  'Practical Manual',
  'Revision Material'
];

export default function AdminStudyMaterialsPage() {
  const { showToast } = useToast();
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [adminSearch, setAdminSearch] = useState('');
  const [adminSubjFilter, setAdminSubjFilter] = useState('All');

  const [formData, setFormData] = useState<Omit<StudyMaterial, 'id' | 'downloadsCount'>>({
    title: '',
    subject: 'Organic Chemistry',
    className: 'Class 12',
    chapter: '',
    resourceType: 'Chapter Notes',
    description: '',
    fileUrl: '/uploads/sample_chemistry_notes.pdf',
    fileName: 'Chemistry_Notes.pdf',
    fileSize: '2.5 MB',
    uploadDate: new Date().toISOString().split('T')[0],
    isFeatured: false
  });

  const fetchMaterials = async () => {
    try {
      const data = await getStudyMaterials();
      if (Array.isArray(data)) setMaterials(data);
    } catch (err) {
      console.error(err);
      showToast('Error loading study materials', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      title: '',
      subject: 'Organic Chemistry',
      className: 'Class 12',
      chapter: '',
      resourceType: 'Chapter Notes',
      description: '',
      fileUrl: '/uploads/sample_chemistry_notes.pdf',
      fileName: 'Chemistry_Notes.pdf',
      fileSize: '2.5 MB',
      uploadDate: new Date().toISOString().split('T')[0],
      isFeatured: false
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: StudyMaterial) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      subject: item.subject,
      className: item.className,
      chapter: item.chapter,
      resourceType: item.resourceType,
      description: item.description,
      fileUrl: item.fileUrl,
      fileName: item.fileName,
      fileSize: item.fileSize,
      uploadDate: item.uploadDate,
      isFeatured: item.isFeatured
    });
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Simulate instant local PDF upload if static
    setFormData(prev => ({
      ...prev,
      fileName: file.name,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      fileUrl: '/uploads/sample_chemistry_notes.pdf'
    }));
    showToast('File selected & verified!', 'success');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.chapter) {
      showToast('Title and Chapter are required', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await saveStudyMaterial(editingId ? { id: editingId, ...formData } : formData);
      showToast(editingId ? 'Study material updated' : 'Material added to vault!', 'success');
      setIsModalOpen(false);
      fetchMaterials();
    } catch (err) {
      console.error(err);
      showToast('Failed to save', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteStudyMaterial(id);
      showToast('Study material deleted', 'info');
      setDeleteConfirmId(null);
      fetchMaterials();
    } catch (err) {
      console.error(err);
      showToast('Error deleting material', 'error');
    }
  };

  const toggleFeatured = async (item: StudyMaterial) => {
    try {
      await saveStudyMaterial({ id: item.id, isFeatured: !item.isFeatured });
      showToast(item.isFeatured ? 'Removed from featured' : 'Pinned as featured material!', 'success');
      fetchMaterials();
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
            <BookOpen className="w-6 h-6 text-purple-400" />
            Manage Study Materials
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Upload chapter notes, master reaction maps, formula cheat-sheets, and worksheets.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-purple-600/25 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Study Material</span>
        </button>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter by title, chapter, or topic..."
            value={adminSearch}
            onChange={(e) => setAdminSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
          {adminSearch && (
            <button onClick={() => setAdminSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <select
          value={adminSubjFilter}
          onChange={(e) => setAdminSubjFilter(e.target.value)}
          className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-purple-500 w-full sm:w-auto"
        >
          <option value="All">All Subjects</option>
          {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4 w-12">Featured</th>
                <th className="p-4">Material Title</th>
                <th className="p-4">Type</th>
                <th className="p-4">Subject & Chapter</th>
                <th className="p-4">Class</th>
                <th className="p-4">Upload Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {materials
                .filter(m => {
                  const matchSubj = adminSubjFilter === 'All' || m.subject === adminSubjFilter;
                  const matchSearch = !adminSearch || 
                    m.title.toLowerCase().includes(adminSearch.toLowerCase()) ||
                    m.chapter.toLowerCase().includes(adminSearch.toLowerCase());
                  return matchSubj && matchSearch;
                })
                .map((item) => (
                <tr key={item.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="p-4">
                    <button
                      onClick={() => toggleFeatured(item)}
                      title={item.isFeatured ? 'Unfeature' : 'Feature on homepage'}
                      className={`p-1.5 rounded-lg transition-colors ${
                        item.isFeatured ? 'text-amber-400 bg-amber-500/20' : 'text-slate-600 hover:text-slate-300'
                      }`}
                    >
                      <Star className="w-3.5 h-3.5" fill={item.isFeatured ? 'currentColor' : 'none'} />
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-white max-w-sm line-clamp-1">{item.title}</div>
                    <div className="text-[11px] text-slate-500 line-clamp-1">{item.description}</div>
                  </td>
                  <td className="p-4">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30">
                      {item.resourceType}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400">
                    <span className="font-semibold text-slate-300">{item.subject}</span> • {item.chapter}
                  </td>
                  <td className="p-4 text-slate-400">
                    {item.className}
                  </td>
                  <td className="p-4 text-slate-400 whitespace-nowrap">
                    {item.uploadDate}
                  </td>
                  <td className="p-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                        title="Edit Material"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(item.id)}
                        className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 transition-colors"
                        title="Delete Material"
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
            <h3 className="text-base font-bold text-white">Delete Study Material?</h3>
            <p className="text-xs text-slate-400">
              Are you sure you want to remove this resource from the student vault?
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
            
            <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-400" />
                <span>{editingId ? 'Edit Study Material' : 'Upload New Study Material'}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Material Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Class 11 GOC Complete Handwritten Notes"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Subject *</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value as SubjectType })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Class / Target *</label>
                  <select
                    value={formData.className}
                    onChange={(e) => setFormData({ ...formData, className: e.target.value as ClassLevel })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Resource Type *</label>
                  <select
                    value={formData.resourceType}
                    onChange={(e) => setFormData({ ...formData, resourceType: e.target.value as ResourceType })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {RESOURCE_TYPES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Chapter or Unit *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. General Organic Chemistry (GOC)"
                  value={formData.chapter}
                  onChange={(e) => setFormData({ ...formData, chapter: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Details of formulas, topics, and handouts included..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                ></textarea>
              </div>

              {/* Upload PDF */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="block text-xs font-bold text-slate-300">
                  Notes PDF Document *
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-purple-950 file:text-purple-300 hover:file:bg-purple-900"
                />
                {formData.fileName && (
                  <div className="text-xs text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>File Selected: {formData.fileName} ({formData.fileSize})</span>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
                  />
                  <span>Feature in Homepage Highlights Vault</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow transition-colors flex items-center gap-1.5"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingId ? 'Save Changes' : 'Upload Material'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
