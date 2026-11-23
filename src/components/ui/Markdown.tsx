import React from 'react';

/**
 * Tiny, safe Markdown renderer for concept notes and articles.
 * Supports: ## / ### headings, paragraphs, - and 1. lists, > tips,
 * | tables |, **bold**, *italic* and `code`. No raw HTML is ever rendered.
 */

function inline(text: string, keyBase: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|`[^`]+`)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const tok = m[0];
    const k = `${keyBase}-${i++}`;
    if (tok.startsWith('**')) out.push(<strong key={k} className="font-semibold text-ink">{tok.slice(2, -2)}</strong>);
    else if (tok.startsWith('`')) out.push(<code key={k} className="px-1.5 py-0.5 rounded bg-paper-deep text-[0.92em] text-ink">{tok.slice(1, -1)}</code>);
    else out.push(<em key={k}>{tok.slice(1, -1)}</em>);
    last = m.index + tok.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function slugifyHeading(text: string) {
  return text.toLowerCase().replace(/[^\p{L}\p{M}\p{N}]+/gu, '-').replace(/^-+|-+$/g, '');
}

export function extractHeadings(md: string): { id: string; text: string }[] {
  return md
    .split('\n')
    .filter((l) => l.startsWith('## '))
    .map((l) => {
      const text = l.slice(3).trim();
      return { id: slugifyHeading(text), text };
    });
}

export default function Markdown({ source }: { source: string }) {
  const lines = source.replace(/\r/g, '').split('\n');
  const blocks: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];
    const k = `b${key++}`;

    if (!line.trim()) {
      i++;
      continue;
    }

    if (line.startsWith('### ')) {
      blocks.push(<h3 key={k} className="mt-8 text-xl font-semibold text-ink">{inline(line.slice(4), k)}</h3>);
      i++;
      continue;
    }

    if (line.startsWith('## ')) {
      const text = line.slice(3).trim();
      blocks.push(
        <h2 key={k} id={slugifyHeading(text)} className="mt-12 first:mt-0 scroll-mt-24 !text-2xl sm:!text-[1.7rem] text-ink">
          {inline(text, k)}
        </h2>
      );
      i++;
      continue;
    }

    if (line.startsWith('> ')) {
      const parts: string[] = [];
      while (i < lines.length && lines[i].startsWith('> ')) parts.push(lines[i++].slice(2));
      blocks.push(
        <aside key={k} className="my-6 rounded-xl border border-accent/20 bg-accent-soft px-5 py-4 text-[0.98rem] leading-relaxed text-ink">
          {inline(parts.join(' '), k)}
        </aside>
      );
      continue;
    }

    if (line.trim().startsWith('|')) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        const cells = lines[i].trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
        if (!cells.every((c) => /^:?-{2,}:?$/.test(c))) rows.push(cells);
        i++;
      }
      const [head, ...body] = rows;
      blocks.push(
        <div key={k} className="my-6 overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-left text-[0.92rem]">
            <thead className="bg-paper-deep">
              <tr>
                {head.map((c, j) => (
                  <th key={j} className="px-4 py-3 font-semibold text-ink whitespace-nowrap">{inline(c, `${k}h${j}`)}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {body.map((r, ri) => (
                <tr key={ri}>
                  {r.map((c, j) => (
                    <td key={j} className="px-4 py-3 align-top text-muted">{inline(c, `${k}r${ri}c${j}`)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    if (/^\s*[-*] /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*] /.test(lines[i])) items.push(lines[i++].replace(/^\s*[-*] /, ''));
      blocks.push(
        <ul key={k} className="my-4 space-y-2 pl-5 list-disc marker:text-accent text-[1.02rem] leading-relaxed text-muted">
          {items.map((it, j) => (
            <li key={j}>{inline(it, `${k}-${j}`)}</li>
          ))}
        </ul>
      );
      continue;
    }

    if (/^\s*\d+\. /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\. /.test(lines[i])) items.push(lines[i++].replace(/^\s*\d+\. /, ''));
      blocks.push(
        <ol key={k} className="my-4 space-y-2 pl-5 list-decimal marker:text-accent marker:font-semibold text-[1.02rem] leading-relaxed text-muted">
          {items.map((it, j) => (
            <li key={j}>{inline(it, `${k}-${j}`)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // paragraph: gather consecutive plain lines
    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{2,3} |> |\s*[-*] |\s*\d+\. |\s*\|)/.test(lines[i])
    ) {
      para.push(lines[i++]);
    }
    blocks.push(
      <p key={k} className="my-4 text-[1.04rem] leading-[1.75] text-muted">
        {inline(para.join(' '), k)}
      </p>
    );
  }

  return <div className="text-ink">{blocks}</div>;
}
