'use client';

import React, { useMemo, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { searchClientDatabase } from '@/lib/searchUtils';
import { useLanguage } from '@/context/LanguageContext';
import { PageHeader, SearchField, Meta } from '@/components/ui/Editorial';

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim() || !text) return <>{text}</>;
  const safe = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${safe})`, 'gi'));
  return (
    <>
      {parts.map((p, i) =>
        p.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-accent-soft text-ink px-0.5">
            {p}
          </mark>
        ) : (
          <React.Fragment key={i}>{p}</React.Fragment>
        )
      )}
    </>
  );
}

function Group({
  title,
  href,
  count,
  children,
}: {
  title: string;
  href: string;
  count: number;
  children: React.ReactNode;
}) {
  if (!count) return null;
  return (
    <section className="mt-14 first:mt-0">
      <div className="flex items-baseline justify-between border-b border-ink pb-4">
        <h3 className="eyebrow text-ink">
          {title} <span className="text-muted">({count})</span>
        </h3>
        <Link href={href} className="text-sm text-muted hover:text-accent">
          Open section
        </Link>
      </div>
      <ul>{children}</ul>
    </section>
  );
}

function Row({ href, meta, title, snippet, query }: { href: string; meta: string; title: string; snippet: string; query: string }) {
  return (
    <li className="border-b border-line">
      <Link href={href} className="group grid grid-cols-[minmax(0,1fr)_auto] gap-6 py-6">
        <div className="min-w-0">
          <Meta>{meta}</Meta>
          <p className="mt-1.5 font-display text-xl leading-snug text-ink group-hover:text-accent transition-colors" style={{ fontVariationSettings: '"opsz" 36' }}>
            <Highlight text={title} query={query} />
          </p>
          {snippet && (
            <p className="mt-1.5 text-sm text-muted line-clamp-2">
              <Highlight text={snippet} query={query} />
            </p>
          )}
        </div>
        <ArrowRight className="w-4 h-4 mt-7 text-muted group-hover:text-accent transition-colors" />
      </Link>
    </li>
  );
}

function SearchContent() {
  const { t } = useLanguage();
  const router = useRouter();
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get('q') || '');

  const { results, totalMatches } = useMemo(() => searchClientDatabase(query), [query]);
  const enc = encodeURIComponent(query);

  const update = (v: string) => {
    setQuery(v);
    router.replace(v ? `/search?q=${encodeURIComponent(v)}` : '/search', { scroll: false });
  };

  const snippet = <T,>(scored: { item: T; matchedSnippet: string }[] | undefined, item: T, fallback: string) =>
    scored?.find((s) => s.item === item)?.matchedSnippet || fallback;

  return (
    <>
      <PageHeader label={t.nav.search} title="Search notes, papers and notices" />

      <section className="max-w-5xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
        <SearchField value={query} onChange={update} placeholder="Try “GOC”, “salt analysis”, “unit test”…" />
        <p className="mt-4 text-sm text-muted">
          {query.trim() ? `${totalMatches} result${totalMatches === 1 ? '' : 's'} for “${query.trim()}”` : 'Type a topic, chapter or keyword.'}
        </p>

        {query.trim() && totalMatches === 0 && (
          <div className="py-20 text-center">
            <p className="font-display text-2xl text-ink">{t.pages.noResults}</p>
            <p className="mt-2 text-muted">{t.pages.noResultsSub}</p>
          </div>
        )}

        <div className="mt-12">
          <Group title={t.nav.studyMaterials} href={`/study-materials?q=${enc}`} count={results.studyMaterials.length}>
            {results.studyMaterials.map((m) => (
              <Row
                key={m.id}
                href={`/study-materials?q=${enc}`}
                meta={`${m.subject} · ${m.className} · ${m.resourceType}`}
                title={m.title}
                snippet={snippet(results.scoredStudyMaterials, m, m.description)}
                query={query}
              />
            ))}
          </Group>
          <Group title={t.nav.questionPapers} href={`/question-papers?q=${enc}`} count={results.questionPapers.length}>
            {results.questionPapers.map((p) => (
              <Row
                key={p.id}
                href={`/question-papers?q=${enc}`}
                meta={`${p.testType} · ${p.subject} · ${p.className}`}
                title={p.title}
                snippet={snippet(results.scoredQuestionPapers, p, p.description)}
                query={query}
              />
            ))}
          </Group>
          <Group title={t.nav.solutions} href={`/solutions?q=${enc}`} count={results.solutions.length}>
            {results.solutions.map((s) => (
              <Row
                key={s.id}
                href={`/solutions?id=${s.id}`}
                meta={`${s.subject} · ${s.className}`}
                title={s.title}
                snippet={snippet(results.scoredSolutions, s, s.description)}
                query={query}
              />
            ))}
          </Group>
          <Group title={t.nav.updates} href={`/updates?q=${enc}`} count={results.updates.length}>
            {results.updates.map((u) => (
              <Row
                key={u.id}
                href={`/updates?id=${u.id}`}
                meta={`${u.category} · ${u.date}`}
                title={u.title}
                snippet={snippet(results.scoredUpdates, u, u.description)}
                query={query}
              />
            ))}
          </Group>
        </div>
      </section>
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <SearchContent />
    </Suspense>
  );
}
