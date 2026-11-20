import React from 'react';

interface ElementTileProps {
  symbol: string;
  number: number | string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  tone?: 'light' | 'dark' | 'accent';
  className?: string;
}

/**
 * A periodic-table style tile. Used as the brand mark ("Ac" — Ajay Choudhary,
 * which is also Actinium, element 89) and as quiet subject markers.
 */
export default function ElementTile({
  symbol,
  number,
  name,
  size = 'md',
  tone = 'light',
  className = '',
}: ElementTileProps) {
  const sizes = {
    sm: { box: 'w-10 h-10', num: 'text-[0.5rem] top-0.5 left-1', sym: 'text-lg', name: 'hidden' },
    md: { box: 'w-14 h-14', num: 'text-[0.58rem] top-1 left-1.5', sym: 'text-2xl', name: 'text-[0.45rem] bottom-1' },
    lg: { box: 'w-20 h-20', num: 'text-[0.7rem] top-1.5 left-2', sym: 'text-4xl', name: 'text-[0.55rem] bottom-1.5' },
  }[size];

  const tones = {
    light: 'bg-paper border-ink/80 text-ink',
    dark: 'bg-ink border-paper/30 text-paper',
    accent: 'bg-accent border-accent text-paper',
  }[tone];

  return (
    <span
      aria-hidden="true"
      className={`relative inline-flex shrink-0 items-center justify-center border ${sizes.box} ${tones} ${className}`}
    >
      <span className={`absolute font-sans font-semibold leading-none opacity-70 ${sizes.num}`}>
        {number}
      </span>
      <span className={`font-display leading-none ${sizes.sym}`} style={{ fontVariationSettings: '"opsz" 72' }}>
        {symbol}
      </span>
      {name && (
        <span className={`absolute inset-x-0 text-center font-sans uppercase tracking-wider opacity-60 ${sizes.name}`}>
          {name}
        </span>
      )}
    </span>
  );
}
