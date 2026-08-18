'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Plus, 
  Edit3, 
  Trash2, 
  Download, 
  CheckCircle2, 
  X, 
  Loader2, 
  Upload, 
  AlertCircle,
  Eye,
  CheckCircle,
  Search,
  Filter
} from 'lucide-react';
import { QuestionPaper, SubjectType, ClassLevel, TestType } from '@/lib/types';
import { useToast } from '@/context/ToastContext';
import { getQuestionPapers, saveQuestionPaper, deleteQuestionPaper } from '@/lib/dataService';

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

const TEST_TYPES: TestType[] = [
  'Unit Test',
  'Periodic Test',
  'Board Mock Test',
  'Term Examination',
  'JEE Main & Adv DPP',
  'NEET Practice'
];

export default function AdminQuestionPapersPage() {
  const { showToast } = useToast();
  const [papers, setPapers] = useState<QuestionPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [adminSearch, setAdminSearch] = useState('');
  const [adminSubjFilter, setAdminSubjFilter] = useState('All');

  const [formData, setFormData] = useState<Omit<QuestionPaper, 'id'>>({
    title: '',
    subject: 'Organic Chemistry',
    className: 'Class 12',
    chapter: '',
    testType: 'Unit Test',
    year: '2026',
    uploadDate: new Date().toISOString().split('T')[0],
    totalMarks: 50,
    duration: '90 Minutes',
    description: '',
    fileUrl: '/uploads/sample_question_paper.pdf',
    fileName: 'Chemistry_Paper.pdf',
    fileSize: '1.5 MB',
    hasSolution: false
  });

  const fetchPapers = async () => {
    try {
      const data = await getQuestionPapers();
      if (Array.isArray(data)) setPapers(data);
    } catch (err) {
      console.error(err);
      showToast('Error loading question papers', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      title: '',
      subject: 'Organic Chemistry',
      className: 'Class 12',
      chapter: '',
      testType: 'Unit Test',
      year: '2026',
      uploadDate: new Date().toISOString().split('T')[0],
      totalMarks: 50,
      duration: '90 Minutes',
      description: '',
      fileUrl: '/uploads/sample_question_paper.pdf',
      fileName: 'Chemistry_Paper.pdf',
      fileSize: '1.5 MB',
      hasSolution: false
    });
    setIsModalOpen(true);
  };

  const openEditModal = (paper: QuestionPaper) => {
    setEditingId(paper.id);
    setFormData({
      title: paper.title,
      subject: paper.subject,
      className: paper.className,
      chapter: paper.chapter,
      testType: paper.testType,
      year: paper.year,
      uploadDate: paper.uploadDate,
      totalMarks: paper.totalMarks,
      duration: paper.duration,
      description: paper.description,
      fileUrl: paper.fileUrl,
      fileName: paper.fileName,
      fileSize: paper.fileSize,
      hasSolution: paper.hasSolution,
      solutionId: paper.solutionId
    });
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setFormData(prev => ({
        ...prev,
        fileName: file.name,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        fileUrl: dataUrl
      }));
      showToast(`File "${file.name}" uploaded successfully!`, 'success');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.chapter) {
      showToast('Please fill out Title and Chapter', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await saveQuestionPaper(editingId ? { id: editingId, ...formData } : formData);
      showToast(editingId ? 'Question paper updated' : 'New paper uploaded successfully', 'success');
      setIsModalOpen(false);
      fetchPapers();
    } catch (err) {
      console.error(err);
      showToast('Failed to save paper', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteQuestionPaper(id);
      showToast('Question paper deleted', 'info');
      setDeleteConfirmId(null);
      fetchPapers();
    } catch (err) {
      console.error(err);
      showToast('Error deleting paper', 'error');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-400" />
            Manage Question Papers
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Upload chapter tests, term exams, and board mock question papers for your students.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-blue-600/25 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Question Paper</span>
        </button>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter by paper title, chapter, or test type..."
            value={adminSearch}
            onChange={(e) => setAdminSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
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
          className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-blue-500 w-full sm:w-auto"
        >
          <option value="All">All Subjects</option>
          {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Papers Table */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Title & Chapter</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Class</th>
                <th className="p-4">Test Type</th>
                <th className="p-4">Marks & Time</th>
                <th className="p-4">Solution</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {papers
                .filter(p => {
                  const matchSubj = adminSubjFilter === 'All' || p.subject === adminSubjFilter;
                  const matchSearch = !adminSearch || 
                    p.title.toLowerCase().includes(adminSearch.toLowerCase()) ||
                    p.chapter.toLowerCase().includes(adminSearch.toLowerCase()) ||
                    p.testType.toLowerCase().includes(adminSearch.toLowerCase());
                  return matchSubj && matchSearch;
                })
                .map((item) => (
                <tr key={item.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-white max-w-sm line-clamp-1">{item.title}</div>
                    <div className="text-[11px] text-slate-500">{item.chapter}</div>
                  </td>
                  <td className="p-4">
                    <span className="text-[10px] font-semibold text-slate-300">
                      {item.subject}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400">
                    {item.className}
                  </td>
                  <td className="p-4">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-500/30">
                      {item.testType}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400 whitespace-nowrap">
                    {item.totalMarks}M • {item.duration}
                  </td>
                  <td className="p-4">
                    {item.hasSolution ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 w-fit">
                        <CheckCircle className="w-3 h-3" /> Ready
                      </span>
                    ) : (
                      <Link
                        href="/admin/solutions"
                        className="text-[10px] text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                      >
                        + Add Solution
                      </Link>
                    )}
                  </td>
                  <td className="p-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                        title="Edit Paper"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(item.id)}
                        className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 transition-colors"
                        title="Delete Paper"
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

      {/* Delete Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 max-w-sm w-full space-y-4 text-center">
            <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
            <h3 className="text-base font-bold text-white">Delete Question Paper?</h3>
            <p className="text-xs text-slate-400">
              Are you sure you want to delete this question paper?
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
                <FileText className="w-4 h-4 text-blue-400" />
                <span>{editingId ? 'Edit Question Paper' : 'Upload New Question Paper'}</span>
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
                  Question Paper Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Organic Chemistry – Unit Test 01: Hydrocarbons"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Subject *</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value as SubjectType })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Class / Target *</label>
                  <select
                    value={formData.className}
                    onChange={(e) => setFormData({ ...formData, className: e.target.value as ClassLevel })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Test Type *</label>
                  <select
                    value={formData.testType}
                    onChange={(e) => setFormData({ ...formData, testType: e.target.value as TestType })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {TEST_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Chapter or Specific Topic *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hydrocarbons (Alkanes, Alkenes, Alkynes)"
                  value={formData.chapter}
                  onChange={(e) => setFormData({ ...formData, chapter: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Total Marks</label>
                  <input
                    type="number"
                    value={formData.totalMarks}
                    onChange={(e) => setFormData({ ...formData, totalMarks: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 90 Minutes or 3 Hours"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Description / Syllabus Scope</label>
                <textarea
                  rows={3}
                  placeholder="Brief description of question types, marks breakdown, and topics covered..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                ></textarea>
              </div>

              {/* Upload PDF */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <label className="block text-xs font-bold text-slate-300">
                  Question Paper PDF File *
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-950 file:text-blue-300 hover:file:bg-blue-900"
                />
                {formData.fileName && (
                  <div className="text-xs text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>File Selected: {formData.fileName} ({formData.fileSize})</span>
                  </div>
                )}
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
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow transition-colors flex items-center gap-1.5"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingId ? 'Save Changes' : 'Upload Paper'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
