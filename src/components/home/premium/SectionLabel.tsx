import React from 'react';

export default function SectionLabel({
  index,
  label,
  tone = 'light',
}: {
  index: string;
  label: string;
  tone?: 'light' | 'dark';
}) {
  return (
    <div className={`flex items-center gap-4 eyebrow ${tone === 'dark' ? 'text-paper/50' : 'text-muted'}`}>
      {index && <span className={`tabular-nums ${tone === 'dark' ? 'text-brass' : 'text-accent'}`}>{index}</span>}
      <span className={`h-px w-10 ${index ? (tone === 'dark' ? 'bg-paper/20' : 'bg-line') : 'bg-accent'}`} aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
