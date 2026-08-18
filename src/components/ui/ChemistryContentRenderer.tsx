'use client';

import React from 'react';
import { Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

interface ChemistryContentRendererProps {
  content: string;
}

/**
 * Sanitizes and cleans up any raw LaTeX syntax into clear, human-readable Chemistry unicode
 */
function cleanChemistryText(text: string): string {
  if (!text) return '';

  let cleaned = text
    // Replace LaTeX arrows
    .replace(/\\xrightarrow\{([^}]*)\}/g, ' ──[$1]──➔ ')
    .replace(/\\xrightarrow\{\}/g, ' ➔ ')
    .replace(/\\implies/g, ' ➔ ')
    .replace(/\\rightarrow/g, ' ➔ ')
    // Replace \text{...}
    .replace(/\\text\{([^}]+)\}/g, '$1')
    // Replace \quad, \;, \:, \,
    .replace(/\\[q]?uad/g, '  ')
    .replace(/\\[;:,]/g, ' ')
    // Replace degree symbol
    .replace(/\^?\\circ/g, '°')
    // Replace subscripts and superscripts common in formulas
    .replace(/_\{(\d+)\}/g, (_, d) => toSubscript(d))
    .replace(/_(\d)/g, (_, d) => toSubscript(d))
    .replace(/\^\{([0-9\+\-]+)\}/g, (_, d) => toSuperscript(d))
    .replace(/\^([0-9\+\-])/g, (_, d) => toSuperscript(d))
    // Clean up $ and $$
    .replace(/\$\$/g, '')
    .replace(/\$/g, '')
    // Clean rogue backslashes
    .replace(/\\/g, '');

  return cleaned.trim();
}

function toSubscript(num: string): string {
  const map: Record<string, string> = {
    '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
    '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉'
  };
  return num.split('').map(c => map[c] || c).join('');
}

function toSuperscript(str: string): string {
  const map: Record<string, string> = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
    '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
    '+': '⁺', '-': '⁻'
  };
  return str.split('').map(c => map[c] || c).join('');
}

/**
 * Parses inline rich text formatting (Bold, Italic, Highlights, Color Badges) with high contrast for both daylight and dark themes
 */
function renderFormattedLine(text: string): React.ReactNode {
  if (!text) return null;

  // Split by bold (**bold**), highlight (==text== or [highlight]text[/highlight]), italic (*italic*), and color tags
  const tokens = text.split(/(\*\*[^*]+\*\*|==[^=]+==|\[highlight\][\s\S]*?\[\/highlight\]|\[(?:cyan|emerald|amber|rose|purple)\][\s\S]*?\[\/(?:cyan|emerald|amber|rose|purple)\]|\*[^*]+\*)/g);

  return tokens.map((token, i) => {
    // Bold: **text**
    if (token.startsWith('**') && token.endsWith('**') && token.length > 4) {
      return (
        <strong key={i} className="font-extrabold text-slate-950 dark:text-white bg-amber-500/10 dark:bg-white/10 px-1 py-0.5 rounded">
          {token.slice(2, -2)}
        </strong>
      );
    }

    // Highlight: ==text== or [highlight]text[/highlight]
    if (
      (token.startsWith('==') && token.endsWith('==') && token.length > 4) ||
      (token.startsWith('[highlight]') && token.endsWith('[/highlight]'))
    ) {
      const inner = token.startsWith('==') ? token.slice(2, -2) : token.replace(/\[\/?highlight\]/g, '');
      return (
        <mark key={i} className="bg-amber-200 dark:bg-amber-500/30 text-amber-950 dark:text-amber-200 font-bold px-1.5 py-0.5 rounded border border-amber-300 dark:border-amber-500/40">
          {inner}
        </mark>
      );
    }

    // Colors: [cyan]text[/cyan], [emerald]text[/emerald], [rose]text[/rose], etc.
    const colorMatch = token.match(/^\[(cyan|emerald|amber|rose|purple)\]([\s\S]*?)\[\/\1\]$/);
    if (colorMatch) {
      const color = colorMatch[1];
      const inner = colorMatch[2];
      const colorMap: Record<string, string> = {
        cyan: 'bg-cyan-100 dark:bg-cyan-950/80 text-cyan-900 dark:text-cyan-200 border-cyan-300 dark:border-cyan-700',
        emerald: 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700',
        amber: 'bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700',
        rose: 'bg-rose-100 dark:bg-rose-950/80 text-rose-900 dark:text-rose-200 border-rose-300 dark:border-rose-700',
        purple: 'bg-purple-100 dark:bg-purple-950/80 text-purple-900 dark:text-purple-200 border-purple-300 dark:border-purple-700',
      };
      return (
        <span key={i} className={`inline-block px-2 py-0.5 rounded-md font-bold text-xs border ${colorMap[color] || ''}`}>
          {inner}
        </span>
      );
    }

    // Italic: *text*
    if (token.startsWith('*') && token.endsWith('*') && token.length > 2 && !token.startsWith('**')) {
      return (
        <em key={i} className="italic text-slate-800 dark:text-slate-200 font-semibold">
          {token.slice(1, -1)}
        </em>
      );
    }

    return token;
  });
}

export default function ChemistryContentRenderer({ content }: ChemistryContentRendererProps) {
  if (!content) return null;

  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];

  let currentBlock: string[] = [];
  let currentBlockType: 'paragraph' | 'reaction' = 'paragraph';

  const flushBlock = (idx: number) => {
    if (currentBlock.length === 0) return;
    const text = currentBlock.join('\n').trim();
    if (!text) {
      currentBlock = [];
      return;
    }

    if (currentBlockType === 'reaction') {
      elements.push(
        <div 
          key={`reaction-${idx}`} 
          className="my-3.5 p-4 rounded-2xl bg-slate-950 border-2 border-cyan-500/40 shadow-lg overflow-x-auto"
        >
          <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Chemical Equation & Reaction Pathway</span>
          </div>
          <div className="font-mono text-xs sm:text-sm md:text-base font-bold text-cyan-200 tracking-wide whitespace-pre-wrap leading-relaxed">
            {cleanChemistryText(text)}
          </div>
        </div>
      );
    } else {
      elements.push(
        <div key={`text-${idx}`} className="space-y-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-100 font-medium leading-relaxed">
          {currentBlock.map((line, lIdx) => {
            const cleanLine = cleanChemistryText(line);
            
            // Check if line is a numbered step (e.g. 1. Step title)
            const stepMatch = cleanLine.match(/^(\d+)\.\s+(.*)/);
            if (stepMatch) {
              const stepNum = stepMatch[1];
              const stepText = stepMatch[2];

              return (
                <div key={lIdx} className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 flex items-start gap-3 my-1.5 shadow-sm">
                  <span className="w-6 h-6 rounded-full bg-cyan-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow">
                    {stepNum}
                  </span>
                  <div className="flex-1 text-slate-900 dark:text-slate-100 font-medium">
                    {renderFormattedLine(stepText)}
                  </div>
                </div>
              );
            }

            // Check if bullet point (- or * or > or •)
            if (cleanLine.startsWith('- ') || cleanLine.startsWith('* ') || cleanLine.startsWith('> ') || cleanLine.startsWith('• ')) {
              const bulletText = cleanLine.replace(/^[-*>•]\s+/, '');
              return (
                <div key={lIdx} className="flex items-start gap-2 pl-2 my-1">
                  <ChevronRight className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5 font-bold" />
                  <div className="flex-1 text-slate-900 dark:text-slate-100 font-medium">
                    {renderFormattedLine(bulletText)}
                  </div>
                </div>
              );
            }

            return (
              <p key={lIdx} className="leading-relaxed text-slate-900 dark:text-slate-100 font-medium">
                {renderFormattedLine(cleanLine)}
              </p>
            );
          })}
        </div>
      );
    }

    currentBlock = [];
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Section Header (### or ####)
    if (trimmed.startsWith('### ') || trimmed.startsWith('#### ')) {
      flushBlock(index);
      const headerText = cleanChemistryText(trimmed.replace(/^#{3,4}\s+/, ''));
      const isQuestion = headerText.toLowerCase().includes('question') || headerText.toLowerCase().includes('q1') || headerText.toLowerCase().includes('q2');

      elements.push(
        <div key={`header-${index}`} className="pt-4 pb-2 first:pt-0">
          <div className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 shadow-sm ${
            isQuestion 
              ? 'bg-cyan-950 border-cyan-500/50 text-cyan-200' 
              : 'bg-slate-900 dark:bg-slate-950 border-slate-800 text-white'
          }`}>
            <div className="flex items-center gap-2 font-black text-sm sm:text-base tracking-tight text-white">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{headerText}</span>
            </div>
          </div>
        </div>
      );
      return;
    }

    // Reaction formula line
    const isFormulaLine = 
      trimmed.startsWith('$$') || 
      trimmed.includes('➔') || 
      trimmed.includes('\\xrightarrow') || 
      trimmed.includes('->') ||
      trimmed.startsWith('**Reaction') ||
      trimmed.startsWith('Reaction:');

    if (isFormulaLine) {
      if (currentBlockType !== 'reaction') {
        flushBlock(index);
        currentBlockType = 'reaction';
      }
      currentBlock.push(trimmed);
    } else {
      if (currentBlockType === 'reaction') {
        flushBlock(index);
        currentBlockType = 'paragraph';
      }
      if (trimmed) {
        currentBlock.push(trimmed);
      } else {
        flushBlock(index);
      }
    }
  });

  flushBlock(lines.length);

  return (
    <div className="space-y-3.5 text-slate-900 dark:text-slate-100">
      {elements}
    </div>
  );
}
