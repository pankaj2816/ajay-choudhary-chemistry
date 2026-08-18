'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Download, 
  Eye, 
  FileText, 
  Sparkles, 
  Calendar, 
  Filter, 
  X, 
  Layers,
  ArrowRight,
  Bookmark
} from 'lucide-react';
import { StudyMaterial, SubjectType, ClassLevel, ResourceType } from '@/lib/types';
import { initialDatabase } from '@/data/initialData';
import PDFPreviewModal from '@/components/ui/PDFPreviewModal';
import { useToast } from '@/context/ToastContext';
import { getStudyMaterials } from '@/lib/dataService';
import { triggerDownload } from '@/lib/downloadUtils';

const RESOURCE_TYPES: (ResourceType | 'All Types')[] = [
  'All Types',
  'Chapter Notes',
  'Reaction Sheet',
  'Formula Sheet',
  'Important Questions',
  'Practice Worksheet',
  'Practical Manual',
  'Revision Material'
];

export default function StudyMaterialsPage() {
  const [materials, setMaterials] = useState<StudyMaterial[]>(initialDatabase.studyMaterials);
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All Types');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState<StudyMaterial | null>(null);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    getStudyMaterials()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setMaterials(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredMaterials = useMemo(() => {
    return materials.filter((item) => {
      const matchSubj = selectedSubject === 'All' || item.subject === selectedSubject;
      const matchClass = selectedClass === 'All' || item.className === selectedClass || item.className === 'All Classes';
      const matchType = selectedType === 'All Types' || item.resourceType === selectedType;
      const matchSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.chapter.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchSubj && matchClass && matchType && matchSearch;
    });
  }, [materials, selectedSubject, selectedClass, selectedType, searchQuery]);

  const handleDownload = (item: StudyMaterial, e: React.MouseEvent) => {
    e.stopPropagation();
    showToast(`Downloading: ${item.title}`, 'info');
    triggerDownload(item.fileUrl, item.fileName || `${item.title.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* Top Banner */}
      <section className="bg-slate-950 text-white chem-hero-gradient py-16 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-300 font-bold text-xs">
              <BookOpen className="w-3.5 h-3.5" />
              Academic Learning Repository
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              Chemistry Study Materials & Notes
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed">
              Curated handwritten notes, master reaction maps, formula cheat-sheets, high-yield practice worksheets, and salt analysis manuals for CBSE, ISC, JEE & NEET.
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
        
        {/* Filters Bar */}
        <div className="bg-white p-5 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          
          {/* Top Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search study materials, chapter notes, reaction maps (e.g. GOC, Reaction Mechanism, p-Block, Salt Analysis)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Select Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="All">All Subjects</option>
                <option value="Organic Chemistry">Organic Chemistry</option>
                <option value="Inorganic Chemistry">Inorganic Chemistry</option>
                <option value="Practical Chemistry">Practical Chemistry</option>
                <option value="Physical Chemistry">Physical Chemistry</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Class / Target</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="All">All Classes</option>
                <option value="Class 11">Class 11</option>
                <option value="Class 12">Class 12</option>
                <option value="Dropper / JEE / NEET">Dropper / JEE / NEET</option>
              </select>
            </div>
          </div>

          {/* Resource Type Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
            {RESOURCE_TYPES.map((type) => {
              const isSelected = selectedType === type;
              return (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>

        </div>

        {/* Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>Showing {filteredMaterials.length} of {materials.length} study resources</span>
          {(selectedSubject !== 'All' || selectedClass !== 'All' || selectedType !== 'All Types' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedSubject('All');
                setSelectedClass('All');
                setSelectedType('All Types');
                setSearchQuery('');
              }}
              className="text-cyan-700 font-bold hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Empty State */}
        {filteredMaterials.length === 0 && !loading && (
          <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">No study materials found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search query or subject filters to find resources.
            </p>
          </div>
        )}

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedMaterial(item)}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 cursor-pointer"
            >
              <div className="space-y-3.5">
                
                {/* Top Badges */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200">
                    {item.resourceType}
                  </span>
                  <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                    {item.className}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-cyan-700 transition-colors line-clamp-2 leading-snug">
                  {item.title}
                </h3>

                {/* Chapter & Subject */}
                <div className="text-xs text-slate-500 font-medium">
                  <span className="text-slate-800 font-bold">{item.subject}</span> • {item.chapter}
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>

                {/* Meta info */}
                <div className="flex items-center justify-between text-[11px] pt-1 text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {item.uploadDate}
                  </span>
                  <span>{item.fileSize || '2.5 MB'}</span>
                </div>

              </div>

              {/* Bottom Actions */}
              <div className="pt-5 mt-5 border-t border-slate-100 grid grid-cols-2 gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedMaterial(item);
                  }}
                  className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>

                <button
                  onClick={(e) => handleDownload(item, e)}
                  className="py-2.5 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Preview Modal */}
      {selectedMaterial && (
        <PDFPreviewModal
          isOpen={!!selectedMaterial}
          onClose={() => setSelectedMaterial(null)}
          title={selectedMaterial.title}
          subject={selectedMaterial.subject}
          chapter={selectedMaterial.chapter}
          className={selectedMaterial.className}
          testType={selectedMaterial.resourceType}
          description={selectedMaterial.description}
          fileUrl={selectedMaterial.fileUrl}
          fileName={selectedMaterial.fileName}
          fileSize={selectedMaterial.fileSize}
          uploadDate={selectedMaterial.uploadDate}
        />
      )}

    </div>
  );
}
