'use client';

import React, { useEffect, useState } from 'react';
import { Quote, Plus, Pencil, Trash2, Eye, EyeOff, Loader2, X } from 'lucide-react';
import { Testimonial } from '@/lib/types';
import { useToast } from '@/context/ToastContext';
import { getTestimonials, saveTestimonial, deleteTestimonial } from '@/lib/dataService';

const EMPTY = { name: '', detail: '', quote: '', isPublished: true };

export default function AdminTestimonialsPage() {
  const { showToast } = useToast();
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<typeof EMPTY | null>(null);

  const load = () =>
    getTestimonials()
      .then(setItems)
      .catch((err) => showToast(err instanceof Error ? err.message : 'Could not load testimonials', 'error'))
      .finally(() => setLoading(false));

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startNew = () => {
    setEditingId(null);
    setForm({ ...EMPTY });
  };

  const startEdit = (t: Testimonial) => {
    setEditingId(t.id);
    setForm({ name: t.name, detail: t.detail, quote: t.quote, isPublished: t.isPublished });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    if (!form.name.trim() || !form.quote.trim()) {
      showToast('Please add the student name and their words.', 'error');
      return;
    }
    setSaving(true);
    try {
      await saveTestimonial(editingId ? { id: editingId, ...form } : form);
      showToast('Saved. The website updates in about 2 minutes.', 'success');
      setForm(null);
      setEditingId(null);
      load();
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to save', 'error');
    } finally {
      setSaving(false);
    }
  };

  const togglePublished = async (t: Testimonial) => {
    try {
      await saveTestimonial({ id: t.id, isPublished: !t.isPublished });
      load();
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to update', 'error');
    }
  };

  const remove = async (t: Testimonial) => {
    if (!window.confirm(`Delete the testimonial from ${t.name}?`)) return;
    try {
      await deleteTestimonial(t.id);
      showToast('Deleted', 'success');
      load();
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to delete', 'error');
    }
  };

  const input = 'w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-slate-500';

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl text-white flex items-center gap-3">
            <Quote className="w-6 h-6 text-indigo-400" />
            Student testimonials
          </h1>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl">
            Real words from your students or parents, shown on the home page. Only add what a student actually said,
            with their permission. The section stays hidden until at least one testimonial is published.
          </p>
        </div>
        <button onClick={startNew} className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent-deep text-white text-sm font-medium shrink-0">
          <Plus className="w-4 h-4" />
          Add testimonial
        </button>
      </div>

      {form && (
        <form onSubmit={submit} className="p-6 bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl text-white">{editingId ? 'Edit testimonial' : 'New testimonial'}</h2>
            <button type="button" onClick={() => setForm(null)} className="text-slate-400 hover:text-white" aria-label="Close">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block text-sm text-slate-300">
              Name (as they agreed to be shown) *
              <input className={`${input} mt-1.5`} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Riya S." />
            </label>
            <label className="block text-sm text-slate-300">
              Details
              <input className={`${input} mt-1.5`} value={form.detail} onChange={(e) => setForm({ ...form, detail: e.target.value })} placeholder="e.g. Class 12, 2025 · 95% in Boards" />
            </label>
          </div>
          <label className="block text-sm text-slate-300">
            What they said *
            <textarea rows={4} className={`${input} mt-1.5`} value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} />
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} />
            Show on the website
          </label>
          <button type="submit" disabled={saving} className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-ink text-sm font-medium disabled:opacity-60">
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            Save
          </button>
        </form>
      )}

      {loading ? (
        <p className="text-slate-400">Loading…</p>
      ) : items.length === 0 ? (
        <p className="p-6 bg-slate-950 border border-slate-800 text-slate-400 text-sm">
          No testimonials yet. Ask a few students who did well if you can share a line from them.
        </p>
      ) : (
        <ul className="divide-y divide-slate-800 border-y border-slate-800">
          {items.map((t) => (
            <li key={t.id} className="py-5 flex items-start justify-between gap-6">
              <div className="min-w-0">
                <p className={`text-[0.95rem] leading-relaxed ${t.isPublished ? 'text-slate-200' : 'text-slate-500'}`}>&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-2 text-sm text-slate-400">
                  {t.name}
                  {t.detail ? ` · ${t.detail}` : ''}
                  {!t.isPublished && ' · hidden'}
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => togglePublished(t)} className="p-2 text-slate-400 hover:text-white" title={t.isPublished ? 'Hide' : 'Show'}>
                  {t.isPublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button onClick={() => startEdit(t)} className="p-2 text-slate-400 hover:text-white" title="Edit">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => remove(t)} className="p-2 text-slate-400 hover:text-rose-400" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
