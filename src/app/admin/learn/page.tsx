'use client';

import React, { useEffect, useState } from 'react';
import { BookOpenText, Newspaper, Plus, Pencil, Trash2, Eye, EyeOff, Loader2, X, ExternalLink } from 'lucide-react';
import { Article, ConceptNote } from '@/lib/types';
import { useToast } from '@/context/ToastContext';
import {
  getArticles,
  getConceptNotes,
  saveArticle,
  saveConceptNote,
  deleteArticle,
  deleteConceptNote,
} from '@/lib/dataService';
import Markdown from '@/components/ui/Markdown';

type Kind = 'notes' | 'articles';

const NOTE_TEMPLATE = `## The big idea
One or two simple sentences that explain the whole chapter.

## Key ideas
- **Term**: simple meaning.
- **Term**: simple meaning.

## Common mistakes
- Mistake students often make.

## Quick revision
- One-line fact to remember.
`;

const ARTICLE_TEMPLATE = `Start with a question or surprising fact that makes students curious.

## What is going on
Explain the chemistry in simple words.

## Connect it to your syllabus
Which chapter this links to.
`;

const input =
  'w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-slate-500';

const HELP = 'Formatting: ## Heading · - bullet point · **bold** · > tip box · | table | rows |';

export default function AdminLearnPage() {
  const { showToast } = useToast();
  const [kind, setKind] = useState<Kind>('notes');
  const [notes, setNotes] = useState<ConceptNote[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);
  const [note, setNote] = useState<Partial<ConceptNote> | null>(null);
  const [article, setArticle] = useState<Partial<Article> | null>(null);

  const load = () =>
    Promise.all([getConceptNotes(), getArticles()])
      .then(([n, a]) => {
        setNotes(n);
        setArticles(a);
      })
      .catch((err) => showToast(err instanceof Error ? err.message : 'Could not load', 'error'))
      .finally(() => setLoading(false));

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const close = () => {
    setNote(null);
    setArticle(null);
    setPreview(false);
  };

  const submitNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!note?.title?.trim() || !note.body?.trim()) {
      showToast('Please add a title and the note text.', 'error');
      return;
    }
    setSaving(true);
    try {
      await saveConceptNote({ ...note, chapter: Number(note.chapter) || 1 });
      showToast('Saved. The website updates in about 2 minutes.', 'success');
      close();
      load();
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to save', 'error');
    } finally {
      setSaving(false);
    }
  };

  const submitArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!article?.title?.trim() || !article.body?.trim()) {
      showToast('Please add a title and the article text.', 'error');
      return;
    }
    setSaving(true);
    try {
      await saveArticle(article);
      showToast('Saved. The website updates in about 2 minutes.', 'success');
      close();
      load();
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to save', 'error');
    } finally {
      setSaving(false);
    }
  };

  const pickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      showToast('Please choose an image smaller than 5 MB.', 'error');
      e.target.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setArticle((a) => ({ ...(a || {}), image: String(reader.result) }));
    reader.readAsDataURL(file);
  };

  const togglePublish = async (kindOf: Kind, id: string, value: boolean) => {
    try {
      if (kindOf === 'notes') await saveConceptNote({ id, isPublished: value });
      else await saveArticle({ id, isPublished: value });
      load();
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to update', 'error');
    }
  };

  const remove = async (kindOf: Kind, id: string, title: string) => {
    if (!window.confirm(`Delete “${title}”? This cannot be undone from here.`)) return;
    try {
      if (kindOf === 'notes') await deleteConceptNote(id);
      else await deleteArticle(id);
      showToast('Deleted', 'success');
      load();
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to delete', 'error');
    }
  };

  const sortedNotes = [...notes].sort((a, b) => Number(a.grade) - Number(b.grade) || a.chapter - b.chapter);
  const sortedArticles = [...articles].sort((a, b) => b.date.localeCompare(a.date));
  const editing = note || article;
  const body = (note?.body ?? article?.body) || '';

  return (
    <div className="max-w-5xl space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl text-white">Notes & Articles</h1>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl">
            Simple chapter notes and illustrated articles that students read directly on the website.
          </p>
        </div>
        <button
          onClick={() =>
            kind === 'notes'
              ? setNote({ grade: '11', chapter: 1, title: '', summary: '', body: NOTE_TEMPLATE, isPublished: true })
              : setArticle({ title: '', summary: '', imageAlt: '', tags: [], body: ARTICLE_TEMPLATE, isPublished: true })
          }
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent hover:bg-accent-deep text-white text-sm font-medium shrink-0"
        >
          <Plus className="w-4 h-4" />
          {kind === 'notes' ? 'New note' : 'New article'}
        </button>
      </div>

      <div className="flex gap-2">
        {(
          [
            ['notes', `Concept notes (${notes.length})`, BookOpenText],
            ['articles', `Articles (${articles.length})`, Newspaper],
          ] as const
        ).map(([k, label, Icon]) => (
          <button
            key={k}
            onClick={() => setKind(k)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm border ${
              kind === k ? 'bg-slate-800 border-slate-700 text-white' : 'border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-slate-400">Loading…</p>
      ) : kind === 'notes' ? (
        <ul className="divide-y divide-slate-800 border-y border-slate-800">
          {sortedNotes.map((n) => (
            <li key={n.id} className="py-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className={`font-medium truncate ${n.isPublished ? 'text-white' : 'text-slate-500'}`}>{n.title}</p>
                <p className="text-xs text-slate-400">
                  Class {n.grade} · Chapter {n.chapter}
                  {!n.isPublished && ' · hidden'}
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/notes/${n.slug}`} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-white" title="Open">
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button onClick={() => togglePublish('notes', n.id, !n.isPublished)} className="p-2 text-slate-400 hover:text-white" title={n.isPublished ? 'Hide' : 'Show'}>
                  {n.isPublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button onClick={() => setNote({ ...n })} className="p-2 text-slate-400 hover:text-white" title="Edit">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => remove('notes', n.id, n.title)} className="p-2 text-slate-400 hover:text-rose-400" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="divide-y divide-slate-800 border-y border-slate-800">
          {sortedArticles.map((a) => (
            <li key={a.id} className="py-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className={`font-medium truncate ${a.isPublished ? 'text-white' : 'text-slate-500'}`}>{a.title}</p>
                <p className="text-xs text-slate-400">
                  {a.date}
                  {a.tags?.length ? ` · ${a.tags.join(', ')}` : ''}
                  {!a.isPublished && ' · hidden'}
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/articles/${a.slug}`} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-white" title="Open">
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button onClick={() => togglePublish('articles', a.id, !a.isPublished)} className="p-2 text-slate-400 hover:text-white" title={a.isPublished ? 'Hide' : 'Show'}>
                  {a.isPublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button onClick={() => setArticle({ ...a })} className="p-2 text-slate-400 hover:text-white" title="Edit">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => remove('articles', a.id, a.title)} className="p-2 text-slate-400 hover:text-rose-400" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-start sm:items-center justify-center p-2 sm:p-6 overflow-y-auto">
          <form
            onSubmit={note ? submitNote : submitArticle}
            className="w-full max-w-4xl bg-slate-950 border border-slate-800 rounded-2xl p-5 sm:p-7 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl text-white">
                {note ? (note.id ? 'Edit note' : 'New concept note') : article?.id ? 'Edit article' : 'New article'}
              </h2>
              <button type="button" onClick={close} className="text-slate-400 hover:text-white" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>

            <label className="block text-sm text-slate-300">
              Title *
              <input
                className={`${input} mt-1.5`}
                value={(note ? note.title : article?.title) || ''}
                onChange={(e) => (note ? setNote({ ...note, title: e.target.value }) : setArticle({ ...article, title: e.target.value }))}
              />
            </label>

            {note && (
              <div className="grid grid-cols-2 gap-4">
                <label className="block text-sm text-slate-300">
                  Class
                  <select className={`${input} mt-1.5`} value={note.grade} onChange={(e) => setNote({ ...note, grade: e.target.value })}>
                    {['9', '10', '11', '12'].map((g) => (
                      <option key={g} value={g}>Class {g}</option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm text-slate-300">
                  Chapter number
                  <input type="number" min={1} className={`${input} mt-1.5`} value={note.chapter ?? 1} onChange={(e) => setNote({ ...note, chapter: Number(e.target.value) })} />
                </label>
              </div>
            )}

            <label className="block text-sm text-slate-300">
              One-line summary
              <input
                className={`${input} mt-1.5`}
                value={(note ? note.summary : article?.summary) || ''}
                onChange={(e) => (note ? setNote({ ...note, summary: e.target.value }) : setArticle({ ...article, summary: e.target.value }))}
              />
            </label>

            {article && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block text-sm text-slate-300">
                  Picture (JPG, PNG, WebP or SVG, under 5 MB)
                  <input type="file" accept=".jpg,.jpeg,.png,.webp,.svg" onChange={pickImage} className="mt-1.5 block w-full text-sm text-slate-300 file:mr-3 file:px-3 file:py-2 file:rounded-lg file:border-0 file:bg-slate-800 file:text-white" />
                  {article.image && <span className="mt-1 block text-xs text-emerald-400">Picture selected</span>}
                </label>
                <label className="block text-sm text-slate-300">
                  Picture description (for accessibility)
                  <input className={`${input} mt-1.5`} value={article.imageAlt || ''} onChange={(e) => setArticle({ ...article, imageAlt: e.target.value })} />
                </label>
                <label className="block text-sm text-slate-300 sm:col-span-2">
                  Tags (comma separated)
                  <input
                    className={`${input} mt-1.5`}
                    value={(article.tags || []).join(', ')}
                    onChange={(e) => setArticle({ ...article, tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) })}
                    placeholder="e.g. Everyday chemistry, Class 10"
                  />
                </label>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">Text *</span>
                <button type="button" onClick={() => setPreview((p) => !p)} className="text-sm text-indigo-300 hover:text-white">
                  {preview ? 'Back to editing' : 'Preview'}
                </button>
              </div>
              {preview ? (
                <div className="mt-1.5 max-h-[50vh] overflow-y-auto rounded-xl bg-white p-6">
                  <Markdown source={body} />
                </div>
              ) : (
                <textarea
                  rows={16}
                  className={`${input} mt-1.5 font-mono text-[13px] leading-relaxed`}
                  value={body}
                  onChange={(e) => (note ? setNote({ ...note, body: e.target.value }) : setArticle({ ...article, body: e.target.value }))}
                />
              )}
              <p className="mt-1.5 text-xs text-slate-500">{HELP}</p>
            </div>

            <label className="flex items-center gap-2 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={(note ? note.isPublished : article?.isPublished) ?? true}
                onChange={(e) => (note ? setNote({ ...note, isPublished: e.target.checked }) : setArticle({ ...article, isPublished: e.target.checked }))}
              />
              Show on the website
            </label>

            {((note && !note.id) || (article && !article.id)) && (
              <p className="text-xs text-amber-300">
                New pages need about 2 minutes after saving before their link works.
              </p>
            )}

            <div className="flex justify-end gap-3">
              <button type="button" onClick={close} className="px-4 py-2.5 rounded-xl text-sm text-slate-300 hover:text-white">
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
