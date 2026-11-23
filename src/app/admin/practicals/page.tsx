'use client';

import React, { useEffect, useState } from 'react';
import { PlayCircle, Plus, Pencil, Trash2, Eye, EyeOff, Loader2, X, ExternalLink } from 'lucide-react';
import { ClassLevel, Practical } from '@/lib/types';
import { useToast } from '@/context/ToastContext';
import { getPracticals, savePractical, deletePractical } from '@/lib/dataService';
import { youtubeId, youtubeThumb, youtubeWatch } from '@/lib/youtube';

const CLASSES: ClassLevel[] = ['All Classes', 'Class 9', 'Class 10', 'Class 11', 'Class 12'];
const EMPTY: Partial<Practical> = {
  title: '',
  titleHi: '',
  description: '',
  descriptionHi: '',
  youtubeUrl: '',
  className: 'Class 12',
  topic: '',
  kind: 'lecture',
  isPublished: true,
};

const isPractical = (p: Partial<Practical>) => (p.kind || 'practical') === 'practical';

const input =
  'w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-slate-500';

export default function AdminPracticalsPage() {
  const { showToast } = useToast();
  const [items, setItems] = useState<Practical[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<Practical> | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const load = () =>
    getPracticals()
      .then(setItems)
      .catch((err) => showToast(err instanceof Error ? err.message : 'Could not load videos', 'error'))
      .finally(() => setLoading(false));

  useEffect(() => {
    load();
    // Opened from a class shortcut: /admin/practicals?class=Class%2011
    const cls = new URLSearchParams(window.location.search).get('class') as ClassLevel | null;
    if (cls && CLASSES.includes(cls)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFilter(cls);
      setForm({ ...EMPTY, className: cls });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const vid = youtubeId(form?.youtubeUrl);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    if (!vid) {
      showToast('Please paste a valid YouTube link.', 'error');
      return;
    }
    if (!form.title?.trim()) {
      showToast('Please add a title.', 'error');
      return;
    }
    setSaving(true);
    try {
      await savePractical(form);
      showToast('Saved. The website updates in about 2 minutes.', 'success');
      setForm(null);
      load();
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to save', 'error');
    } finally {
      setSaving(false);
    }
  };

  const toggle = async (p: Practical) => {
    try {
      await savePractical({ id: p.id, isPublished: !p.isPublished });
      load();
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to update', 'error');
    }
  };

  const remove = async (p: Practical) => {
    if (!window.confirm(`Delete “${p.title}”?`)) return;
    try {
      await deletePractical(p.id);
      showToast('Deleted', 'success');
      load();
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to delete', 'error');
    }
  };

  const sorted = [...items]
    .filter((p) => filter === 'All' || p.className === filter || p.className === 'All Classes')
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="max-w-5xl space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl text-white flex items-center gap-3">
            <PlayCircle className="w-7 h-7 text-indigo-400" />
            Class videos (YouTube)
          </h1>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl">
            Copy a video link from YouTube, paste it here, choose the class, and add a title and short description. Students watch it under “Videos” on their class page. Practical videos also appear on the Practicals page.
          </p>
        </div>
        <button
          onClick={() => setForm({ ...EMPTY, className: filter !== 'All' ? (filter as ClassLevel) : EMPTY.className })}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent hover:bg-accent-deep text-white text-sm font-medium shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add video
        </button>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Show videos for">
        {['All', ...CLASSES.filter((c) => c !== 'All Classes')].map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-3.5 py-1.5 rounded-lg text-sm border ${filter === c ? 'bg-white text-ink border-white' : 'border-slate-700 text-slate-300 hover:text-white'}`}
          >
            {c === 'All' ? 'All classes' : c}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-slate-400">Loading…</p>
      ) : sorted.length === 0 ? (
        <p className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-slate-400 text-sm">
          No videos yet. Click “Add video” and paste a link from your YouTube channel.
        </p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sorted.map((p) => {
            const id = youtubeId(p.youtubeUrl);
            return (
              <li key={p.id} className="flex gap-4 p-3 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="w-36 shrink-0 aspect-video rounded-lg overflow-hidden bg-slate-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {id && <img src={youtubeThumb(id)} alt="" className="w-full h-full object-cover" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`font-medium leading-snug line-clamp-2 ${p.isPublished ? 'text-white' : 'text-slate-500'}`}>{p.title}</p>
                  <p className="mt-1 text-xs text-slate-400">
                    {p.className} · {isPractical(p) ? 'Practical' : 'Class lecture'}
                    {p.topic ? ` · ${p.topic}` : ''}
                    {!p.isPublished && ' · hidden'}
                  </p>
                  <div className="mt-2 flex items-center gap-1">
                    {id && (
                      <a href={youtubeWatch(id)} target="_blank" rel="noopener noreferrer" className="p-1.5 text-slate-400 hover:text-white" title="Open on YouTube">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <button onClick={() => toggle(p)} className="p-1.5 text-slate-400 hover:text-white" title={p.isPublished ? 'Hide' : 'Show'}>
                      {p.isPublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button onClick={() => setForm({ ...p })} className="p-1.5 text-slate-400 hover:text-white" title="Edit">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => remove(p)} className="p-1.5 text-slate-400 hover:text-rose-400" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {form && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-start sm:items-center justify-center p-2 sm:p-6 overflow-y-auto">
          <form onSubmit={submit} className="w-full max-w-3xl bg-slate-950 border border-slate-800 rounded-2xl p-5 sm:p-7 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl text-white">{form.id ? 'Edit video' : 'Add a YouTube video'}</h2>
              <button type="button" onClick={() => setForm(null)} className="text-slate-400 hover:text-white" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>

            <label className="block text-sm text-slate-300">
              YouTube link *
              <input
                className={`${input} mt-1.5`}
                placeholder="https://www.youtube.com/watch?v=…  or  https://youtu.be/…"
                value={form.youtubeUrl || ''}
                onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })}
              />
              {form.youtubeUrl && !vid && <span className="mt-1 block text-xs text-rose-400">This does not look like a YouTube video link.</span>}
            </label>
            {vid && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={youtubeThumb(vid)} alt="Video preview" className="w-56 aspect-video object-cover rounded-lg border border-slate-800" />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block text-sm text-slate-300">
                Title (English) *
                <input className={`${input} mt-1.5`} value={form.title || ''} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Hybridisation in 10 minutes" />
              </label>
              <label className="block text-sm text-slate-300">
                Title (हिन्दी)
                <input className={`${input} mt-1.5`} value={form.titleHi || ''} onChange={(e) => setForm({ ...form, titleHi: e.target.value })} placeholder="जैसे: 10 मिनट में संकरण" />
              </label>
              <label className="block text-sm text-slate-300">
                Class
                <select className={`${input} mt-1.5`} value={form.className} onChange={(e) => setForm({ ...form, className: e.target.value as ClassLevel })}>
                  {CLASSES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label className="block text-sm text-slate-300">
                Type of video
                <select
                  className={`${input} mt-1.5`}
                  value={form.kind || 'practical'}
                  onChange={(e) => setForm({ ...form, kind: e.target.value as 'lecture' | 'practical' })}
                >
                  <option value="lecture">Class lecture / explanation</option>
                  <option value="practical">Practical (lab experiment)</option>
                </select>
              </label>
              <label className="block text-sm text-slate-300">
                Chapter or topic (optional)
                <input className={`${input} mt-1.5`} value={form.topic || ''} onChange={(e) => setForm({ ...form, topic: e.target.value })} placeholder="e.g. Chemical Bonding" />
              </label>
            </div>

            <label className="block text-sm text-slate-300">
              Description (English)
              <textarea rows={4} className={`${input} mt-1.5`} value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="What students will learn from this video…" />
            </label>
            <label className="block text-sm text-slate-300">
              Description (हिन्दी)
              <textarea rows={4} className={`${input} mt-1.5`} value={form.descriptionHi || ''} onChange={(e) => setForm({ ...form, descriptionHi: e.target.value })} placeholder="इस वीडियो से छात्र क्या सीखेंगे…" />
            </label>
            <p className="text-xs text-slate-500">If you leave the Hindi fields empty, the English text is shown in Hindi mode too.</p>

            <label className="flex items-center gap-2 text-sm text-slate-300">
              <input type="checkbox" checked={form.isPublished ?? true} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} />
              Show on the website
            </label>

            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setForm(null)} className="px-4 py-2.5 rounded-xl text-sm text-slate-300 hover:text-white">
                Cancel
              </button>
              <button type="submit" disabled={saving} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-ink text-sm font-medium disabled:opacity-60">
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
