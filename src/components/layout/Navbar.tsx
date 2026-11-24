'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';
import SearchModal from '@/components/ui/SearchModal';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';
import ElementTile from '@/components/ui/ElementTile';
import { useLanguage } from '@/context/LanguageContext';
import { useSiteSettings } from '@/lib/useSiteSettings';
import { CLASS_LIST } from '@/lib/classes';

export default function Navbar() {
  const pathname = usePathname();
  const { t, L, isHi } = useLanguage();
  const brand = useSiteSettings().teacherName || 'Ajay Choudhary';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [classesOpen, setClassesOpen] = useState(false);
  const classesRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const resourcesRef = useRef<HTMLDivElement>(null);

  const resourceLinks = [
    { label: t.nav.subjects, href: '/subjects' },
    { label: t.nav.studyMaterials, href: '/study-materials' },
    { label: t.nav.questionPapers, href: '/question-papers' },
    { label: t.nav.solutions, href: '/solutions' },
    { label: t.home.notesNav, href: '/notes' },
    { label: t.home.articlesNav, href: '/articles' },
  ];

  const classLinks = CLASS_LIST.map((c) => ({ label: `${t.classes.pageLabel} ${c.grade}`, href: c.href }));

  const practicalsLink = { label: L('Practicals', 'प्रैक्टिकल'), href: '/practicals' };

  const primaryLinks = [{ label: t.nav.about, href: '/about' }];

  const trailingLinks = [
    { label: t.nav.updates, href: '/updates' },
    { label: t.nav.contact, href: '/contact' },
  ];

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && !!pathname?.startsWith(href));
  const resourcesActive = resourceLinks.some((l) => isActive(l.href));
  const classesActive = classLinks.some((l) => isActive(l.href));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setResourcesOpen(false);
        setClassesOpen(false);
        setMobileMenuOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) {
        setResourcesOpen(false);
      }
      if (classesRef.current && !classesRef.current.contains(e.target as Node)) {
        setClassesOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, []);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // The admin panel has its own layout
  if (pathname?.startsWith('/admin')) return null;

  const linkClass = (active: boolean) =>
    `relative py-2 text-[0.9rem] whitespace-nowrap transition-colors ${
      active ? 'text-ink' : 'text-muted hover:text-ink'
    } after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-px after:bg-accent after:transition-transform after:origin-left ${
      active ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'
    }`;

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-colors duration-300 ${
          scrolled ? 'bg-paper/92 backdrop-blur-md border-b border-line' : 'bg-paper border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between gap-2 sm:gap-4 xl:gap-6">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0" aria-label={L(`${brand} Sir — Home`, `${brand} सर — होम`)}>
            <ElementTile symbol="Ac" number={89} size="sm" tone="dark" />
            <span className="flex flex-col leading-tight">
              <span className="font-display text-[1.15rem] text-ink" style={{ fontVariationSettings: '"opsz" 36' }}>
                {brand}
              </span>
              <span className={`eyebrow !text-[0.62rem] text-muted ${isHi ? '' : '!tracking-[0.22em]'}`}>{L('Chemistry', 'रसायन विज्ञान')}</span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-8" aria-label="Main">
            <div className="relative" ref={classesRef}>
              <button
                type="button"
                onClick={() => setClassesOpen((o) => !o)}
                aria-expanded={classesOpen}
                className={`${linkClass(classesActive)} inline-flex items-center gap-1`}
              >
                {t.classes.navLabel}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${classesOpen ? 'rotate-180' : ''}`} />
              </button>
              {classesOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-52 bg-white border border-line rounded-lg shadow-xl py-2">
                  {classLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setClassesOpen(false)}
                      className={`flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                        isActive(l.href) ? 'text-accent' : 'text-ink hover:bg-paper-deep'
                      }`}
                    >
                      {l.label}
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-40" />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href={practicalsLink.href} className={linkClass(isActive(practicalsLink.href))}>
              {practicalsLink.label}
            </Link>

            {primaryLinks.map((l) => (
              <Link key={l.href} href={l.href} className={linkClass(isActive(l.href))}>
                {l.label}
              </Link>
            ))}

            <div className="relative" ref={resourcesRef}>
              <button
                type="button"
                onClick={() => setResourcesOpen((o) => !o)}
                aria-expanded={resourcesOpen}
                className={`${linkClass(resourcesActive)} inline-flex items-center gap-1`}
              >
                {t.home.resources}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} />
              </button>
              {resourcesOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-60 bg-white border border-line rounded-lg shadow-xl py-2">
                  {resourceLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setResourcesOpen(false)}
                      className={`flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                        isActive(l.href) ? 'text-accent' : 'text-ink hover:bg-paper-deep'
                      }`}
                    >
                      {l.label}
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-40" />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {trailingLinks.map((l) => (
              <Link key={l.href} href={l.href} className={linkClass(isActive(l.href))}>
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-0.5 sm:gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 sm:p-2.5 text-muted hover:text-ink transition-colors"
              aria-label={t.nav.search}
              title={`${t.nav.search} (Ctrl + K)`}
            >
              <Search className="w-[18px] h-[18px]" />
            </button>

            <LanguageSwitcher />

            <Link
              href="/contact"
              className="hidden md:inline-flex lg:hidden xl:inline-flex items-center whitespace-nowrap ml-2 px-5 py-2.5 bg-ink text-paper text-sm font-medium hover:bg-accent transition-colors"
            >
              {t.home.enquire}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 sm:p-2.5 -mr-1 sm:-mr-2 text-ink"
              aria-label={L('Open menu', 'मेनू खोलें')}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-paper flex flex-col lg:hidden">
          <div className="h-[72px] px-5 sm:px-8 flex items-center justify-between border-b border-line">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3">
              <ElementTile symbol="Ac" number={89} size="sm" tone="dark" />
              <span className="font-display text-[1.15rem]">{brand}</span>
            </Link>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2.5 -mr-2" aria-label={L('Close menu', 'मेनू बंद करें')}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-5 sm:px-8 py-6" aria-label="Mobile">
            <p className="eyebrow !text-[0.66rem] text-muted">{t.classes.chooseTitle}</p>
            <div className="mt-3 mb-6 grid grid-cols-4 gap-2">
              {CLASS_LIST.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-3 rounded-lg text-center border text-lg font-semibold ${
                    isActive(c.href) ? 'bg-accent border-accent text-white' : 'border-line text-ink'
                  }`}
                >
                  {c.grade}
                  <span className="block text-[0.65rem] font-normal opacity-70">{t.classes.pageLabel}</span>
                </Link>
              ))}
            </div>
            {[{ label: t.nav.home, href: '/' }, practicalsLink, ...primaryLinks, ...resourceLinks, ...trailingLinks].map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-baseline gap-4 py-3.5 border-b border-line"
              >
                <span className="text-xs text-muted tabular-nums w-5">{String(i + 1).padStart(2, '0')}</span>
                <span className={`text-xl font-semibold ${isActive(l.href) && l.href !== '/' ? 'text-accent' : 'text-ink'}`}>
                  {l.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="px-5 sm:px-8 py-5 border-t border-line flex items-center justify-between gap-4">
            <LanguageSwitcher up />
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center px-5 py-3 bg-accent text-paper text-sm font-medium"
            >
              {t.home.enquire}
            </Link>
          </div>
        </div>
      )}

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
