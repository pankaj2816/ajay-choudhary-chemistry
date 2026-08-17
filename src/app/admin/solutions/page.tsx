'use client';

import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  Plus, 
  Edit3, 
  Trash2, 
  FileText, 
  X, 
  Loader2, 
  Upload, 
  AlertCircle,
  CheckCircle2,
  ListPlus
} from 'lucide-react';
import { SolutionItem, QuestionPaper, AnswerKeyItem } from '@/lib/types';
import { useToast } from '@/context/ToastContext';

export default function AdminSolutionsPage() {
  const { showToast } = useToast();
  const [solutions, setSolutions] = useState<SolutionItem[]>([]);
  const [papers, setPapers] = useState<QuestionPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<SolutionItem, 'id'>>({
    title: '',
    questionPaperId: '',
    questionPaperTitle: '',
    subject: 'Organic Chemistry',
    chapter: '',
    className: 'Class 12',
    uploadDate: new Date().toISOString().split('T')[0],
    description: '',
    solutionPdfUrl: '/uploads/sample_solution.pdf',
    solutionPdfName: 'Solution.pdf',
    solutionPdfSize: '2.0 MB',
    stepByStepContent: '',
    answerKey: [{ questionNo: 'Q1', answer: '', explanation: '' }],
    verifiedBy: 'Ajay Choudhary (Head Chemistry Educator)'
  });

  const fetchData = async () => {
    try {
      const [solRes, qpRes] = await Promise.all([
        fetch('/api/solutions'),
        fetch('/api/question-papers')
      ]);
      const solData = await solRes.json();
      const qpData = await qpRes.json();
      if (Array.isArray(solData)) setSolutions(solData);
      if (Array.isArray(qpData)) setPapers(qpData);
    } catch (err) {
      console.error(err);
      showToast('Error loading solutions', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePaperSelect = (qpId: string) => {
    const selected = papers.find(p => p.id === qpId);
    if (selected) {
      setFormData(prev => ({
        ...prev,
        questionPaperId: selected.id,
        questionPaperTitle: selected.title,
        title: `Verified Solution: ${selected.title}`,
        subject: selected.subject,
        chapter: selected.chapter,
        className: selected.className
      }));
    }
  };

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      title: '',
      questionPaperId: papers[0]?.id || '',
      questionPaperTitle: papers[0]?.title || '',
      subject: papers[0]?.subject || 'Organic Chemistry',
      chapter: papers[0]?.chapter || '',
      className: papers[0]?.className || 'Class 12',
      uploadDate: new Date().toISOString().split('T')[0],
      description: '',
      solutionPdfUrl: '/uploads/sample_solution.pdf',
      solutionPdfName: 'Solution.pdf',
      solutionPdfSize: '2.0 MB',
      stepByStepContent: '### Step-by-Step Solution Breakdown\n\n#### Question 1:\n- Explanation of reaction pathway\n- Balanced equation',
      answerKey: [{ questionNo: 'Q1', answer: '', explanation: '' }],
      verifiedBy: 'Ajay Choudhary (Head Chemistry Educator)'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (sol: SolutionItem) => {
    setEditingId(sol.id);
    setFormData({
      title: sol.title,
      questionPaperId: sol.questionPaperId,
      questionPaperTitle: sol.questionPaperTitle,
      subject: sol.subject,
      chapter: sol.chapter,
      className: sol.className,
      uploadDate: sol.uploadDate,
      description: sol.description,
      solutionPdfUrl: sol.solutionPdfUrl || '',
      solutionPdfName: sol.solutionPdfName || '',
      solutionPdfSize: sol.solutionPdfSize || '',
      stepByStepContent: sol.stepByStepContent || '',
      answerKey: sol.answerKey || [{ questionNo: 'Q1', answer: '', explanation: '' }],
      verifiedBy: sol.verifiedBy || 'Ajay Choudhary'
    });
    setIsModalOpen(true);
  };

  const addAnswerKeyRow = () => {
    setFormData(prev => ({
      ...prev,
      answerKey: [
        ...(prev.answerKey || []),
        { questionNo: `Q${(prev.answerKey?.length || 0) + 1}`, answer: '', explanation: '' }
      ]
    }));
  };

  const removeAnswerKeyRow = (index: number) => {
    setFormData(prev => ({
      ...prev,
      answerKey: prev.answerKey?.filter((_, idx) => idx !== index)
    }));
  };

  const updateAnswerKeyRow = (index: number, field: keyof AnswerKeyItem, val: string) => {
    setFormData(prev => {
      const copy = [...(prev.answerKey || [])];
      copy[index] = { ...copy[index], [field]: val };
      return { ...prev, answerKey: copy };
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file);

    try {
      showToast('Uploading solution PDF...', 'info');
      const res = await fetch('/api/upload', { method: 'POST', body: data });
      const result = await res.json();
      if (result.success) {
        setFormData(prev => ({
          ...prev,
          solutionPdfUrl: result.fileUrl,
          solutionPdfName: result.fileName,
          solutionPdfSize: result.fileSize
        }));
        showToast('Solution PDF uploaded successfully!', 'success');
      }
    } catch (err) {
      console.error(err);
      showToast('Upload failed', 'error');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.questionPaperId) {
      showToast('Title and Question Paper link are required', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const url = '/api/solutions';
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId ? { id: editingId, ...formData } : formData;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        showToast(editingId ? 'Solution updated' : 'Solution published and linked!', 'success');
        setIsModalOpen(false);
        fetchData();
      } else {
        showToast('Error saving solution', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Failed to save solution', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/solutions?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Solution deleted', 'info');
        setDeleteConfirmId(null);
        fetchData();
      }
    } catch (err) {
      console.error(err);
      showToast('Error deleting solution', 'error');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-emerald-400" />
            Manage Verified Solutions
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Publish step-by-step mechanism solutions and answer keys linked to question papers.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/25 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Solution</span>
        </button>
      </div>

      {/* Solutions Table */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Solution Title</th>
                <th className="p-4">Linked Question Paper</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Class</th>
                <th className="p-4">Upload Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {solutions.map((item) => (
                <tr key={item.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-white max-w-sm line-clamp-1">{item.title}</div>
                    <div className="text-[11px] text-slate-500">{item.chapter}</div>
                  </td>
                  <td className="p-4 text-emerald-400 font-semibold max-w-xs truncate">
                    {item.questionPaperTitle}
                  </td>
                  <td className="p-4 text-slate-400">
                    {item.subject}
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
                        title="Edit Solution"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(item.id)}
                        className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 transition-colors"
                        title="Delete Solution"
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
            <h3 className="text-base font-bold text-white">Delete Solution?</h3>
            <p className="text-xs text-slate-400">
              Are you sure you want to delete this solution? It will unlink from the question paper.
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
          <div className="bg-slate-900 rounded-3xl border border-slate-800 max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            
            <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>{editingId ? 'Edit Verified Solution' : 'Create & Link Solution'}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
              
              {/* Linked Paper Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Select Question Paper to Link *
                </label>
                <select
                  value={formData.questionPaperId}
                  onChange={(e) => handlePaperSelect(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">-- Choose Question Paper --</option>
                  {papers.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.subject} • {p.className})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Solution Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Step-by-Step Mechanism / Written Solution (Markdown supported)
                </label>
                <textarea
                  rows={5}
                  value={formData.stepByStepContent}
                  onChange={(e) => setFormData({ ...formData, stepByStepContent: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none font-mono"
                ></textarea>
              </div>

              {/* Dynamic Answer Key Builder */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">
                    Official Answer Key & Hints Table
                  </span>
                  <button
                    type="button"
                    onClick={addAnswerKeyRow}
                    className="px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-300 text-[11px] font-bold border border-emerald-500/30 flex items-center gap-1 hover:bg-emerald-900"
                  >
                    <Plus className="w-3 h-3" /> Add Row
                  </button>
                </div>

                <div className="space-y-2">
                  {formData.answerKey?.map((row, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Q.No"
                        value={row.questionNo}
                        onChange={(e) => updateAnswerKeyRow(idx, 'questionNo', e.target.value)}
                        className="w-16 px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Correct Answer (e.g. Option B / 2-Bromopropane)"
                        value={row.answer}
                        onChange={(e) => updateAnswerKeyRow(idx, 'answer', e.target.value)}
                        className="w-48 px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Explanation / Rule applied"
                        value={row.explanation}
                        onChange={(e) => updateAnswerKeyRow(idx, 'explanation', e.target.value)}
                        className="flex-1 px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                      />
                      <button
                        type="button"
                        onClick={() => removeAnswerKeyRow(idx)}
                        className="p-1.5 text-slate-500 hover:text-rose-400"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upload PDF */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="block text-xs font-bold text-slate-300">
                  Optional Solution PDF File
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-950 file:text-emerald-300 hover:file:bg-emerald-900"
                />
                {formData.solutionPdfName && (
                  <div className="text-xs text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>File: {formData.solutionPdfName}</span>
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
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow transition-colors flex items-center gap-1.5"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingId ? 'Save Changes' : 'Publish Solution'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
