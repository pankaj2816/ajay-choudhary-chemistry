'use client';

import React, { useEffect, useState } from 'react';
import { Testimonial } from '@/lib/types';
import { initialDatabase } from '@/data/initialData';
import { getTestimonials } from '@/lib/dataService';
import SectionLabel from './SectionLabel';

/**
 * Real student/parent testimonials, added by Ajay Sir in Admin → Testimonials.
 * Renders nothing until at least one is published.
 */
export default function TestimonialsSection() {
  const [items, setItems] = useState<Testimonial[]>(initialDatabase.testimonials || []);

  useEffect(() => {
    getTestimonials()
      .then((d) => Array.isArray(d) && setItems(d))
      .catch(() => {});
  }, []);

  const published = items.filter((t) => t.isPublished && t.quote.trim());
  if (published.length === 0) return null;

  const [lead, ...rest] = published;

  return (
    <section className="bg-paper">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24 lg:py-32">
        <SectionLabel index="" label="In their words" />
        <figure className="mt-10 max-w-5xl">
          <blockquote>
            <p className="font-display text-3xl sm:text-[2.8rem] leading-[1.18] text-ink" style={{ fontVariationSettings: '"opsz" 144' }}>
              <span className="text-accent">&ldquo;</span>
              {lead.quote}
              <span className="text-accent">&rdquo;</span>
            </p>
          </blockquote>
          <figcaption className="mt-8 flex items-baseline gap-3 text-sm">
            <span className="h-px w-8 bg-accent self-center" aria-hidden="true" />
            <span className="text-ink font-medium">{lead.name}</span>
            {lead.detail && <span className="text-muted">{lead.detail}</span>}
          </figcaption>
        </figure>

        {rest.length > 0 && (
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
            {rest.slice(0, 6).map((t) => (
              <figure key={t.id} className="border-t border-ink pt-7">
                <blockquote className="text-[1.02rem] leading-relaxed text-ink">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="text-ink font-medium">{t.name}</span>
                  {t.detail && <span className="block text-muted mt-0.5">{t.detail}</span>}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
