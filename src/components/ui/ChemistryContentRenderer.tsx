'use client';

import React from 'react';
import { Sparkles, CheckCircle2, ChevronRight, ArrowRight } from 'lucide-react';

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
    // Clean backslashes
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

export default function ChemistryContentRenderer({ content }: ChemistryContentRendererProps) {
  if (!content) return null;

  // Split into lines/blocks
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];

  let currentBlock: string[] = [];
  let currentBlockType: 'paragraph' | 'reaction' | 'steps' = 'paragraph';

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
          className="my-3.5 p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 shadow-inner overflow-x-auto"
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
      // Process lines with bullet or normal text
      elements.push(
        <div key={`text-${idx}`} className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {currentBlock.map((line, lIdx) => {
            const cleanLine = cleanChemistryText(line);
            
            // Check if line is a numbered step (e.g., 1. Step title: Description)
            const stepMatch = cleanLine.match(/^(\d+)\.\s+(.*)/);
            if (stepMatch) {
              const stepNum = stepMatch[1];
              const stepText = stepMatch[2];
              const parts = stepText.split(':**');
              const hasBoldTitle = parts.length > 1;

              return (
                <div key={lIdx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3 my-1.5">
                  <span className="w-6 h-6 rounded-full bg-cyan-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    {stepNum}
                  </span>
                  <div className="flex-1">
                    {renderFormattedLine(stepText)}
                  </div>
                </div>
              );
            }

            // Check if bullet point
            if (cleanLine.startsWith('- ') || cleanLine.startsWith('* ')) {
              return (
                <div key={lIdx} className="flex items-start gap-2 pl-2">
                  <ChevronRight className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    {renderFormattedLine(cleanLine.substring(2))}
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

    // Check for Section Header (### or ####)
    if (trimmed.startsWith('### ') || trimmed.startsWith('#### ')) {
      flushBlock(index);
      const headerText = cleanChemistryText(trimmed.replace(/^#{3,4}\s+/, ''));
      const isQuestion = headerText.toLowerCase().includes('question') || headerText.toLowerCase().includes('q1') || headerText.toLowerCase().includes('q2');

      elements.push(
        <div key={`header-${index}`} className="pt-5 pb-2 first:pt-0">
          <div className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
            isQuestion 
              ? 'bg-cyan-950/60 border-cyan-500/40 text-cyan-200 shadow-sm' 
              : 'bg-slate-900 border-slate-800 text-white'
          }`}>
            <div className="flex items-center gap-2 font-black text-sm sm:text-base tracking-tight">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{headerText}</span>
            </div>
          </div>
        </div>
      );
      return;
    }

    // Check if line is a reaction formula
    const isFormulaLine = 
      trimmed.startsWith('$$') || 
      trimmed.includes('➔') || 
      trimmed.includes('\\xrightarrow') || 
      trimmed.includes('->') ||
      trimmed.startsWith('**Reaction');

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
    <div className="space-y-4">
      {elements}
    </div>
  );
}

/**
 * Parses bold text **word** into strong tags
 */
function renderFormattedLine(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-bold text-slate-900 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}
