'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';

interface ChemistryContentRendererProps {
  content: string;
}

/**
 * Sanitizes and cleans up any raw LaTeX syntax into clear, human-readable Chemistry unicode
 */
function cleanChemistryText(text: string): string {
  if (!text) return '';

  const cleaned = text
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
        <strong key={i} className="font-semibold text-ink">
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
        <mark key={i} className="bg-yellow-100 text-ink font-medium px-1 rounded">
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
        cyan: 'bg-accent-soft text-accent-deep border-blue-200',
        emerald: 'bg-green-50 text-green-800 border-green-200',
        amber: 'bg-yellow-50 text-yellow-900 border-yellow-200',
        rose: 'bg-red-50 text-red-800 border-red-200',
        purple: 'bg-violet-50 text-violet-800 border-violet-200',
      };
      return (
        <span key={i} className={`inline-block px-2 py-0.5 rounded-md font-medium text-[0.85em] border ${colorMap[color] || ''}`}>
          {inner}
        </span>
      );
    }

    // Italic: *text*
    if (token.startsWith('*') && token.endsWith('*') && token.length > 2 && !token.startsWith('**')) {
      return (
        <em key={i} className="italic text-ink">
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
          className="my-3 p-4 rounded-xl bg-paper-deep border border-line overflow-x-auto"
        >
          <div className="font-mono text-sm sm:text-[0.95rem] text-ink whitespace-pre-wrap leading-relaxed">
            {cleanChemistryText(text)}
          </div>
        </div>
      );
    } else {
      elements.push(
        <div key={`text-${idx}`} className="space-y-2 text-[0.98rem] text-ink leading-relaxed">
          {currentBlock.map((line, lIdx) => {
            const cleanLine = cleanChemistryText(line);
            
            // Check if line is a numbered step (e.g. 1. Step title)
            const stepMatch = cleanLine.match(/^(\d+)\.\s+(.*)/);
            if (stepMatch) {
              const stepNum = stepMatch[1];
              const stepText = stepMatch[2];

              return (
                <div key={lIdx} className="flex items-start gap-3 my-1.5">
                  <span className="w-6 h-6 rounded-full bg-accent-soft text-accent font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {stepNum}
                  </span>
                  <div className="flex-1">
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
                  <ChevronRight className="w-4 h-4 text-accent shrink-0 mt-1" />
                  <div className="flex-1">
                    {renderFormattedLine(bulletText)}
                  </div>
                </div>
              );
            }

            return (
              <p key={lIdx} className="leading-relaxed">
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
      elements.push(
        <h3 key={`header-${index}`} className="pt-5 first:pt-0 text-xl font-semibold leading-snug text-ink">
          {headerText}
        </h3>
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
    <div className="space-y-3 text-ink">
      {elements}
    </div>
  );
}
