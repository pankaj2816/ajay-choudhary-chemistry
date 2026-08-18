'use client';

import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  Plus, 
  Trash2, 
  X, 
  Check, 
  BookOpen, 
  GraduationCap, 
  FileText,
  Sparkles
} from 'lucide-react';
import { TaxonomyData } from '@/lib/types';
import { useToast } from '@/context/ToastContext';
import { getTaxonomies, saveTaxonomies as saveTaxonomiesData } from '@/lib/dataService';

export default function AdminCategoriesPage() {
  const { showToast } = useToast();
  const [taxonomies, setTaxonomies] = useState<TaxonomyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [newChapterSubject, setNewChapterSubject] = useState<'Organic Chemistry' | 'Inorganic Chemistry' | 'Practical Chemistry' | 'Physical Chemistry'>('Organic Chemistry');
  const [newChapterName, setNewChapterName] = useState('');
  const [newClassName, setNewClassName] = useState('');
  const [newResourceType, setNewResourceType] = useState('');

  const fetchTaxonomies = async () => {
    try {
      const data = await getTaxonomies();
      setTaxonomies(data);
    } catch (err) {
      console.error(err);
      showToast('Error loading taxonomies', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaxonomies();
  }, []);

  const saveTaxonomies = async (updated: TaxonomyData) => {
    try {
      await saveTaxonomiesData(updated);
      setTaxonomies(updated);
      showToast('Categories updated successfully', 'success');
    } catch (err) {
      console.error(err);
      showToast('Error updating categories', 'error');
    }
  };

  const handleAddChapter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChapterName.trim() || !taxonomies) return;

    const currentList = taxonomies.chapters[newChapterSubject] || [];
    if (currentList.includes(newChapterName.trim())) {
      showToast('Chapter already exists', 'error');
      return;
    }

    const updated: TaxonomyData = {
      ...taxonomies,
      chapters: {
        ...taxonomies.chapters,
        [newChapterSubject]: [...currentList, newChapterName.trim()]
      }
    };
    saveTaxonomies(updated);
    setNewChapterName('');
  };

  const handleDeleteChapter = (subject: keyof TaxonomyData['chapters'], chapterToDelete: string) => {
    if (!taxonomies) return;
    const updated: TaxonomyData = {
      ...taxonomies,
      chapters: {
        ...taxonomies.chapters,
        [subject]: (taxonomies.chapters[subject] || []).filter((ch: string) => ch !== chapterToDelete)
      }
    };
    saveTaxonomies(updated);
  };

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim() || !taxonomies) return;
    if (taxonomies.classes.includes(newClassName.trim())) {
      showToast('Class already exists', 'error');
      return;
    }

    const updated: TaxonomyData = {
      ...taxonomies,
      classes: [...taxonomies.classes, newClassName.trim()]
    };
    saveTaxonomies(updated);
    setNewClassName('');
  };

  const handleDeleteClass = (className: string) => {
    if (!taxonomies) return;
    const updated: TaxonomyData = {
      ...taxonomies,
      classes: taxonomies.classes.filter((c: string) => c !== className)
    };
    saveTaxonomies(updated);
  };

  if (!taxonomies) {
    return <div className="p-8 text-center text-slate-400">Loading categories...</div>;
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
          <Layers className="w-6 h-6 text-teal-400" />
          Manage Taxonomy, Chapters & Categories
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Customize subjects, chapter lists, class streams, and resource types across the website.
        </p>
      </div>

      {/* Chapters Manager */}
      <div className="bg-slate-950 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              Syllabus Chapters by Subject
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Add or remove chapters that appear in question papers, notes, and solution dropdowns.
            </p>
          </div>

          <form onSubmit={handleAddChapter} className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={newChapterSubject}
              onChange={(e) => setNewChapterSubject(e.target.value as any)}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="Organic Chemistry">Organic Chemistry</option>
              <option value="Inorganic Chemistry">Inorganic Chemistry</option>
              <option value="Practical Chemistry">Practical Chemistry</option>
              <option value="Physical Chemistry">Physical Chemistry</option>
            </select>
            
            <input
              type="text"
              placeholder="New Chapter Name..."
              value={newChapterName}
              onChange={(e) => setNewChapterName(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 w-full sm:w-64"
            />

            <button
              type="submit"
              className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shrink-0 flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </form>
        </div>

        {/* 4 Subject Chapter Lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {(['Organic Chemistry', 'Inorganic Chemistry', 'Practical Chemistry', 'Physical Chemistry'] as const).map(subj => (
            <div key={subj} className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-cyan-300 flex items-center justify-between">
                <span>{subj}</span>
                <span className="text-[11px] font-normal text-slate-500">
                  {taxonomies.chapters[subj]?.length || 0} chapters
                </span>
              </h3>

              <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                {(taxonomies.chapters[subj] || []).map((chapter: string, idx: number) => (
                  <div
                    key={idx}
                    className="p-2 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between text-xs text-slate-300 group"
                  >
                    <span className="truncate">{chapter}</span>
                    <button
                      onClick={() => handleDeleteChapter(subj, chapter)}
                      className="text-slate-600 hover:text-rose-400 p-1 opacity-60 group-hover:opacity-100 transition-opacity"
                      title="Delete Chapter"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Classes & Batches Manager */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Classes */}
        <div className="bg-slate-950 rounded-3xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-teal-400" />
              Classes & Batch Streams
            </h3>
          </div>

          <form onSubmit={handleAddClass} className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Class 10 Foundation"
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
            />
            <button
              type="submit"
              className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </form>

          <div className="space-y-2">
            {taxonomies.classes.map((cls: string, idx: number) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs text-slate-300"
              >
                <span>{cls}</span>
                {taxonomies.classes.length > 1 && (
                  <button
                    onClick={() => handleDeleteClass(cls)}
                    className="text-slate-600 hover:text-rose-400 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Resource Types Info */}
        <div className="bg-slate-950 rounded-3xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            Active Resource Classifications
          </h3>
          <p className="text-xs text-slate-400">
            Pre-configured standard study material formats supported across the system:
          </p>
          <div className="flex flex-wrap gap-2">
            {taxonomies.resourceTypes.map((rt: string, idx: number) => (
              <span
                key={idx}
                className="text-xs px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-semibold"
              >
                {rt}
              </span>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
