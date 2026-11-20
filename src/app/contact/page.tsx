'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, Loader2, Plus, Minus } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { saveMessage, getSettings } from '@/lib/dataService';
import { initialDatabase } from '@/data/initialData';
import { SiteSettings } from '@/lib/types';
import { useLanguage } from '@/context/LanguageContext';
import { PageHeader } from '@/components/ui/Editorial';
import SectionLabel from '@/components/home/premium/SectionLabel';

const FAQS = [
  {
    q: 'How can I join one of Ajay Sir’s batches?',
    a: 'Send an enquiry using the form on this page, or message on WhatsApp. You can also visit any of the coaching centres listed here during class hours to ask about batch timings and seats.',
  },
  {
    q: 'Are there separate doubt-clearing sessions?',
    a: 'Yes. Doubts are taken after lectures, and students can also send questions through WhatsApp or email.',
  },
  {
    q: 'Are question papers and solutions free on this website?',
    a: 'Yes. Chapter notes, test papers and worked solutions published here are free to view and download.',
  },
  {
    q: 'How are Practical Chemistry classes organised?',
    a: 'Practical sessions cover systematic salt analysis, volumetric titration and board viva preparation. Check the Notice Board for the current practical schedule.',
  },
];

const inputClass =
  'w-full bg-transparent border-b border-line focus:border-ink px-0 py-3 text-[0.98rem] text-ink placeholder:text-muted/60 outline-none transition-colors';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow !text-[0.66rem] text-muted">{label}</span>
      {children}
    </label>
  );
}

export default function ContactPage() {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [settings, setSettings] = useState<SiteSettings>(initialDatabase.settings);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    studentClass: 'Class 12',
    subject: 'Batch admission',
    message: '',
  });

  useEffect(() => {
    getSettings().then(setSettings).catch(() => {});
  }, []);

  const whatsappNumber = (settings.whatsapp || settings.phone || '').replace(/[^0-9]/g, '');
  const phone = (settings.phone || '').replace(/\s/g, '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      showToast('Please fill in your name, email and message.', 'error');
      return;
    }
    if (form.phone.trim() && form.phone.replace(/\D/g, '').length < 10) {
      showToast('Please enter a valid 10-digit phone number, or leave it blank.', 'error');
      return;
    }
    setSubmitting(true);
    try {
      await saveMessage(form);
      setSubmitted(true);
      setForm({ ...form, name: '', email: '', phone: '', message: '' });
    } catch {
      showToast('Could not send right now. Please try again, or message on WhatsApp.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader
        label={t.nav.contact}
        title={t.contact.title}
        intro={t.contact.subtitle}
      />

      <section className="bg-paper">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
            {/* Direct contact & centres */}
            <aside className="lg:col-span-5 lg:order-2">
              <SectionLabel index="02" label="Reach directly" />
              <div className="mt-8 border-t border-ink">
                {whatsappNumber && (
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello Ajay Sir, I would like to know about your chemistry batches.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-baseline justify-between gap-4 py-5 border-b border-line"
                  >
                    <span className="text-sm text-muted">WhatsApp</span>
                    <span className="font-display text-xl text-ink group-hover:text-accent transition-colors">{settings.whatsapp || settings.phone}</span>
                  </a>
                )}
                {phone && (
                  <a href={`tel:${phone}`} className="group flex items-baseline justify-between gap-4 py-5 border-b border-line">
                    <span className="text-sm text-muted">Call</span>
                    <span className="font-display text-xl text-ink group-hover:text-accent transition-colors">{settings.phone}</span>
                  </a>
                )}
                <a href={`mailto:${settings.email}`} className="group flex items-baseline justify-between gap-4 py-5 border-b border-line">
                  <span className="text-sm text-muted">Email</span>
                  <span className="font-display text-xl text-ink group-hover:text-accent transition-colors break-all text-right">{settings.email}</span>
                </a>
              </div>

              <h2 className="mt-16 text-3xl text-ink">{t.contact.centersTitle}</h2>
              <ul className="mt-6 border-t border-ink">
                {settings.coachingCenters.map((c) => (
                  <li key={c.id} className="py-6 border-b border-line">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-xl text-ink">{c.name}</h3>
                      <span className="text-xs text-accent text-right">{c.location}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted">{c.address}</p>
                    <p className="mt-1 text-sm text-ink">{c.schedule}</p>
                    {c.address && (
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${c.name} ${c.address}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-block text-xs link-underline text-muted hover:text-ink"
                      >
                        Open in Google Maps
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </aside>

            {/* Form */}
            <div className="lg:col-span-7 lg:order-1">
              <SectionLabel index="01" label="Send an enquiry" />
              {submitted ? (
                <div className="mt-8 border-t border-ink pt-10">
                  <h2 className="text-4xl text-ink">Thank you. Your enquiry has been sent.</h2>
                  <p className="mt-4 max-w-lg text-muted leading-relaxed">
                    Ajay Sir will reply to your email, usually within a day. For anything urgent, message on WhatsApp.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="mt-8 link-underline text-sm font-medium text-ink">
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 border-t border-ink pt-8 space-y-8" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <Field label={`${t.contact.nameLabel.replace(/\s*\*\s*$/, '')} *`}>
                      <input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" autoComplete="name" />
                    </Field>
                    <Field label={`${t.contact.emailLabel.replace(/\s*\*\s*$/, '')} *`}>
                      <input type="email" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" autoComplete="email" />
                    </Field>
                    <Field label={t.contact.phoneLabel}>
                      <input type="tel" className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Optional" autoComplete="tel" />
                    </Field>
                    <Field label={t.contact.classLabel}>
                      <select className={`${inputClass} cursor-pointer`} value={form.studentClass} onChange={(e) => setForm({ ...form, studentClass: e.target.value })}>
                        <option value="Class 11">Class 11</option>
                        <option value="Class 12">Class 12</option>
                        <option value="Dropper / JEE / NEET">Dropper / JEE / NEET</option>
                        <option value="Parent / General">Parent / general enquiry</option>
                      </select>
                    </Field>
                  </div>
                  <Field label="Topic">
                    <select className={`${inputClass} cursor-pointer`} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
                      <option>Batch admission</option>
                      <option>Batch timings & fees</option>
                      <option>Free demo class</option>
                      <option>Test series</option>
                      <option>Doubt / study help</option>
                      <option>Other</option>
                    </select>
                  </Field>
                  <Field label={`${t.contact.messageLabel.replace(/\s*\*\s*$/, '')} *`}>
                    <textarea
                      rows={5}
                      className={`${inputClass} resize-y`}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us your class, which centre suits you, and what you would like to know."
                    />
                  </Field>
                  <div className="flex flex-wrap items-center gap-6">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="group inline-flex items-center gap-3 px-7 py-4 bg-accent text-paper text-[0.95rem] font-medium hover:bg-accent-deep disabled:opacity-60 transition-colors"
                    >
                      {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                      {submitting ? t.contact.sending : t.contact.sendBtn}
                      {!submitting && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                    </button>
                    <p className="text-xs text-muted max-w-xs">Your details are only used to reply to your enquiry.</p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-paper-deep border-t border-line">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4">
            <SectionLabel index="03" label="FAQ" />
            <h2 className="mt-6 text-4xl text-ink">{t.contact.faqTitle}</h2>
          </div>
          <ul className="lg:col-span-8 border-t border-ink">
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <li key={f.q} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    className="w-full flex items-start justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-xl text-ink">{f.q}</span>
                    {open ? <Minus className="w-4 h-4 mt-2 shrink-0" /> : <Plus className="w-4 h-4 mt-2 shrink-0" />}
                  </button>
                  {open && <p className="pb-6 -mt-2 max-w-2xl text-muted leading-relaxed">{f.a}</p>}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
