'use client';

import React from 'react';
import { Search, X, ChevronDown } from 'lucide-react';

/* ------------------------------------------------------------------ *
 * Shared building blocks for inner pages, in the "Ink & Ivory" style.
 * ------------------------------------------------------------------ */

export function Eyebrow({ children, tone = 'light' }: { children: React.ReactNode; tone?: 'light' | 'dark' }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${tone === 'dark' ? 'text-paper/60' : 'text-muted'}`}>
      <span className={`h-px w-8 ${tone === 'dark' ? 'bg-brass' : 'bg-accent'}`} aria-hidden="true" />
      {children}
    </p>
  );
}

export function PageHeader({
  label,
  title,
  intro,
  aside,
}: {
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <header className="bg-paper border-b border-line">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          <div className="lg:col-span-8">
            <Eyebrow>{label}</Eyebrow>
            <h1
              className="mt-6 text-[2.5rem] sm:text-6xl leading-[1.04] text-ink rise-in"
              style={{ fontVariationSettings: '"opsz" 144' }}
            >
              {title}
            </h1>
          </div>
          {(intro || aside) && (
            <div className="lg:col-span-4 space-y-5">
              {intro && <p className="text-[1.02rem] leading-relaxed text-muted">{intro}</p>}
              {aside}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export function SearchField({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <label className="relative flex items-center border-b border-ink focus-within:border-accent transition-colors">
      <Search className="w-4 h-4 text-muted shrink-0" aria-hidden="true" />
      <span className="sr-only">{placeholder}</span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent px-3 py-3.5 text-[0.98rem] text-ink placeholder:text-muted/70 outline-none [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button type="button" onClick={() => onChange('')} className="p-1 text-muted hover:text-ink" aria-label="Clear search">
          <X className="w-4 h-4" />
        </button>
      )}
    </label>
  );
}

export function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="eyebrow !text-[0.66rem] text-muted">{label}</span>
      <span className="relative mt-2 flex items-center border border-line bg-white hover:border-ink/40 focus-within:border-ink transition-colors">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-transparent pl-3.5 pr-9 py-2.5 text-sm text-ink outline-none cursor-pointer"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 w-4 h-4 text-muted" />
      </span>
    </label>
  );
}

export function ChipGroup({
  options,
  value,
  onChange,
  label,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  label?: string;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            aria-pressed={active}
            className={`px-3.5 py-1.5 text-[0.82rem] border transition-colors ${
              active ? 'bg-ink border-ink text-paper' : 'bg-transparent border-line text-ink hover:border-ink/50'
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export function ResultCount({ shown, total, noun }: { shown: number; total: number; noun: string }) {
  return (
    <p className="text-sm text-muted tabular-nums">
      {shown === total ? `${total} ${noun}` : `${shown} of ${total} ${noun}`}
    </p>
  );
}

export function EmptyState({ title, body, onReset }: { title: string; body: string; onReset?: () => void }) {
  return (
    <div className="py-20 text-center border-t border-line">
      <p className="font-display text-2xl text-ink">{title}</p>
      <p className="mt-2 text-muted">{body}</p>
      {onReset && (
        <button type="button" onClick={onReset} className="mt-6 link-underline text-sm font-medium text-ink">
          Clear all filters
        </button>
      )}
    </div>
  );
}

/** Small uppercase label used for metadata like "Organic Chemistry · Class 12". */
export function Meta({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-[0.78rem] text-muted ${className}`}>{children}</p>;
}

export function TextAction({
  children,
  onClick,
  href,
  tone = 'ink',
  icon,
}: {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  tone?: 'ink' | 'accent';
  icon?: React.ReactNode;
}) {
  const cls = `inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
    tone === 'accent' ? 'text-accent hover:text-accent-deep' : 'text-ink hover:text-accent'
  }`;
  if (href) {
    return (
      <a href={href} className={cls}>
        {icon}
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {icon}
      {children}
    </button>
  );
}
