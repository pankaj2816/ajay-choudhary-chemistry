'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Practical } from '@/lib/types';
import { initialDatabase } from '@/data/initialData';
import { getPracticals } from '@/lib/dataService';
import { useLanguage } from '@/context/LanguageContext';
import { PageHeader } from '@/components/ui/Editorial';
import { belongsToClass, CLASS_LIST } from '@/lib/classes';
import PracticalCard from './PracticalCard';
import VideoModal from './VideoModal';

export default function PracticalsHub() {
  const { L } = useLanguage();
  const params = useSearchParams();
  const [items, setItems] = useState<Practical[]>(initialDatabase.practicals || []);
  const [cls, setCls] = useState(params.get('class') || 'all');
  const [open, setOpen] = useState<Practical | null>(null);

  useEffect(() => {
    getPracticals()
      .then((p) => Array.isArray(p) && setItems(p))
      .catch(() => {});
  }, []);

  const published = items.filter((p) => p.isPublished && (p.kind || 'practical') === 'practical').sort((a, b) => b.date.localeCompare(a.date));
  const level = CLASS_LIST.find((c) => c.grade === cls)?.level;
  const list = level ? published.filter((p) => belongsToClass(p.className, level)) : published;

  const filters = [
    { value: 'all', label: L('All', 'सभी') },
    ...CLASS_LIST.map((c) => ({ value: c.grade, label: `${L('Class', 'कक्षा')} ${c.grade}` })),
  ];

  return (
    <>
      <PageHeader
        label={L('Practicals', 'प्रैक्टिकल')}
        title={L('Lab practicals on video', 'वीडियो में लैब प्रैक्टिकल')}
        intro={L(
          'Watch experiments step by step: salt analysis, titrations, tests and viva tips, explained by Ajay Sir.',
          'प्रयोगों को चरण-दर-चरण देखें: लवण विश्लेषण, अनुमापन, परीक्षण और वाइवा टिप्स, अजय सर की ज़ुबानी।'
        )}
      />
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <div role="group" aria-label={L('Class', 'कक्षा')} className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setCls(f.value)}
              aria-pressed={cls === f.value}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                cls === f.value ? 'bg-accent border-accent text-white' : 'border-line text-ink hover:border-accent hover:text-accent'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {list.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-2xl font-semibold text-ink">{L('Videos are coming soon', 'वीडियो जल्द आ रहे हैं')}</p>
            <p className="mt-2 text-muted">
              {L('Ajay Sir will add practical videos here. Please check back later.', 'अजय सर यहाँ प्रैक्टिकल वीडियो जोड़ेंगे। कृपया बाद में देखें।')}
            </p>
          </div>
        ) : (
          <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((p) => (
              <li key={p.id}>
                <PracticalCard item={p} onOpen={setOpen} />
              </li>
            ))}
          </ul>
        )}
      </section>
      {open && <VideoModal item={open} onClose={() => setOpen(null)} />}
    </>
  );
}
