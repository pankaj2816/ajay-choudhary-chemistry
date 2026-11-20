import Link from 'next/link';
import ElementTile from '@/components/ui/ElementTile';

export default function NotFound() {
  const links = [
    { href: '/study-materials', label: 'Study material' },
    { href: '/question-papers', label: 'Question papers' },
    { href: '/solutions', label: 'Solutions' },
    { href: '/updates', label: 'Notice board' },
  ];

  return (
    <section className="bg-paper">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24 lg:py-36 grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
        <div className="lg:col-span-7">
          <p className="eyebrow text-muted flex items-center gap-3">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            Error 404
          </p>
          <h1 className="mt-6 text-[2.8rem] sm:text-7xl leading-[1.02] text-ink" style={{ fontVariationSettings: '"opsz" 144' }}>
            This page has <em className="text-accent">dissolved.</em>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            The page you were looking for has moved or no longer exists. Try one of these instead.
          </p>
          <ul className="mt-10 max-w-lg border-t border-ink">
            {links.map((l) => (
              <li key={l.href} className="border-b border-line">
                <Link href={l.href} className="flex items-center justify-between py-4 font-display text-xl text-ink hover:text-accent transition-colors">
                  {l.label}
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/" className="mt-10 inline-flex px-7 py-4 bg-ink text-paper text-sm font-medium hover:bg-accent transition-colors">
            Back to home
          </Link>
        </div>
        <div className="hidden lg:flex lg:col-span-5 justify-center">
          <div className="grid grid-cols-2 gap-3 opacity-90">
            <ElementTile symbol="N" number={7} name="Nitrogen" size="lg" tone="light" />
            <ElementTile symbol="O" number={8} name="Oxygen" size="lg" tone="accent" />
            <ElementTile symbol="Ac" number={89} name="Actinium" size="lg" tone="dark" />
            <ElementTile symbol="?" number="—" name="Unknown" size="lg" tone="light" />
          </div>
        </div>
      </div>
    </section>
  );
}
