'use client';

import React, { useState } from 'react';
import { ChevronDown, Languages } from 'lucide-react';

type Field = {
  key: string;
  label: string;
  rows?: number;
  placeholder?: string;
};

/**
 * Optional Hindi versions of a form's text. Visitors who switch the website
 * to हिन्दी see these; if a box is left empty they see the English text.
 */
export default function HindiFields({
  fields,
  values,
  onChange,
}: {
  fields: Field[];
  values: Record<string, string | undefined>;
  onChange: (key: string, value: string) => void;
}) {
  const filled = fields.some((f) => (values[f.key] || '').trim());
  const [open, setOpen] = useState(filled);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <span className="flex items-center gap-2 text-xs font-bold text-slate-200">
          <Languages className="w-4 h-4 text-blue-400" />
          हिन्दी में भी लिखें (Hindi version, optional)
          {filled && <span className="ml-1 text-[10px] font-semibold text-emerald-400">Added</span>}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-3">
          <p className="text-[11px] text-slate-500">
            When a visitor switches the website to हिन्दी, they see this text. Leave a box empty to show the English text instead.
          </p>
          {fields.map((f) => (
            <div key={f.key}>
              <label className="block text-xs font-bold text-slate-300 mb-1">{f.label}</label>
              {f.rows ? (
                <textarea
                  rows={f.rows}
                  lang="hi"
                  placeholder={f.placeholder}
                  value={values[f.key] || ''}
                  onChange={(e) => onChange(f.key, e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                />
              ) : (
                <input
                  type="text"
                  lang="hi"
                  placeholder={f.placeholder}
                  value={values[f.key] || ''}
                  onChange={(e) => onChange(f.key, e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
