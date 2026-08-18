'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Send, Phone, Mail, MapPin, CheckCircle2, Loader2, Sparkles, Building2 } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { useLanguage } from '@/context/LanguageContext';
import { saveMessage } from '@/lib/dataService';

export default function ContactPreview() {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    studentClass: 'Class 12',
    subject: 'Batch Admission & Course Inquiry',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      showToast('Please fill out all required fields (Name, Phone, Message)', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await saveMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        studentClass: formData.studentClass,
        subject: formData.subject,
        message: formData.message
      });

      setSubmitted(true);
      showToast('Your message has been sent successfully to Ajay Sir!', 'success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        studentClass: 'Class 12',
        subject: 'Batch Admission & Course Inquiry',
        message: ''
      });
    } catch (err) {
      console.error(err);
      showToast('An error occurred. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Info Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 font-bold text-xs">
                <Mail className="w-3.5 h-3.5 text-cyan-600" />
                Direct Communication
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
                Have a Doubt or Admission Question?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Connect directly with Ajay Choudhary Sir for batch schedules, test series details, or academic guidance across all 3 coaching centers.
              </p>
            </div>

            {/* Coaching Centers Summary */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Teaching Centers & Batches
              </span>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-cyan-600" />
                  Catalyst Career Institute (Sector 14)
                </div>
                <p className="text-[11px] text-slate-500">Mon, Wed, Fri • Class 12 Boards & JEE Target</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-teal-600" />
                  Apex Science Academy (Model Town)
                </div>
                <p className="text-[11px] text-slate-500">Tue, Thu, Sat • Class 11 Foundation & GOC</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                  Prerana Learning Hub (South Extension)
                </div>
                <p className="text-[11px] text-slate-500">Sunday Special • NEET & Practical Lab Workshops</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-cyan-50/60 border border-cyan-200 text-xs text-cyan-950 space-y-1">
              <strong className="block font-bold">Privacy Guarantee:</strong>
              <p>Your phone number and inquiry details are strictly kept confidential and only used for academic communication.</p>
            </div>
          </div>

          {/* Right Form Column (7 cols) */}
          <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Send an Inquiry to Ajay Sir
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Fill out the details below and we will get back to you within 24 hours.
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-emerald-900">Message Received!</h4>
                <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                  Thank you for reaching out. Ajay Sir and the academic team will contact you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs font-bold text-emerald-800 underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Student / Parent Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Student Class / Stream
                    </label>
                    <select
                      value={formData.studentClass}
                      onChange={(e) => setFormData({ ...formData, studentClass: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="Class 11">Class 11 (Foundation / GOC)</option>
                      <option value="Class 12">Class 12 (Board + Competitive)</option>
                      <option value="Dropper / JEE / NEET">Dropper / JEE / NEET Repeater</option>
                      <option value="Parent / General Inquiry">Parent / General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Message / Question *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Ask about batch timings, fee structures, syllabus coverage, or doubt sessions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-cyan-400" />
                      <span>Submit Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
