'use client';

import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Loader2, 
  Building2, 
  HelpCircle, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { saveMessage } from '@/lib/dataService';

const FAQS = [
  {
    q: 'How can I enroll in Ajay Sir’s regular batches at the coaching centers?',
    a: 'You can submit the admission inquiry form on this page or visit any of the three coaching centers directly during counseling hours (4:00 PM – 7:30 PM). Our academic counselors will guide you through batch timings and seat availability.'
  },
  {
    q: 'Are separate doubt clearing sessions available for students?',
    a: 'Yes! In addition to classroom lectures, dedicated 45-minute doubt resolution clinics are conducted after every lecture across Catalyst, Apex, and Prerana centers.'
  },
  {
    q: 'Can students access question papers and verified solutions for free?',
    a: 'Absolutely. All enrolled and registered students can browse, preview, and download chapter test papers, previous years’ questions, and detailed verified solutions directly from this website.'
  },
  {
    q: 'How are Practical Chemistry & Salt Analysis classes organized?',
    a: 'Practical chemistry workshops are held on weekends in fully equipped partner laboratory facilities, covering systematic cation/anion analysis, volumetric titration, and board viva preparation.'
  }
];

export default function ContactPage() {
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
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      showToast('Please fill out all required fields (Name, Phone, Message)', 'error');
      return;
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      showToast('Please enter a valid 10-digit mobile or WhatsApp number', 'error');
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
      showToast('Your message has been received! Ajay Sir will contact you shortly.', 'success');
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
      showToast('Failed to send message. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* Top Banner */}
      <section className="bg-slate-950 text-white chem-hero-gradient py-16 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-300 font-bold text-xs">
              <MessageSquare className="w-3.5 h-3.5" />
              Student Helpdesk & Admissions
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              Contact Ajay Choudhary Sir
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed">
              Get in touch for batch admissions, academic counseling, test series registration, or doubt clarification across our three coaching locations.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Info + Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Info Column (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-700">
                Coaching Centers & Schedule
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                Where to Find Ajay Sir
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Lectures and personal mentoring sessions are distributed across the following centers:
              </p>
            </div>

            {/* 3 Centers List */}
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-cyan-600" />
                    Catalyst Career Institute
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-100 text-cyan-800">
                    Sector 14
                  </span>
                </div>
                <p className="text-xs text-slate-600">Plot 42, Knowledge Park, Sector 14, Metro Pillar 128</p>
                <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Mon, Wed, Fri (4:00 PM – 7:30 PM)</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-teal-600" />
                    Apex Science Academy
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800">
                    Model Town
                  </span>
                </div>
                <p className="text-xs text-slate-600">B-Block Main Market, Opposite City Park, Model Town</p>
                <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Tue, Thu, Sat (3:30 PM – 7:00 PM)</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-indigo-600" />
                    Prerana Learning Hub
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                    South Extension
                  </span>
                </div>
                <p className="text-xs text-slate-600">3rd Floor, Scholar Towers, Near Central Library</p>
                <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Sunday Intensive (8:30 AM – 2:00 PM)</span>
                </div>
              </div>
            </div>

            {/* Direct Contact Card */}
            <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3 shadow-lg">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Direct Communication Line
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-200">
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <span>+91 98765 43210 (Counseling Desk)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>contact@ajaychemistry.com</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Form Column (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-700">
                Online Inquiry
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                Send a Message to Ajay Sir
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Please provide accurate details so we can advise you on the most suitable batch.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-emerald-900">Inquiry Received!</h3>
                <p className="text-xs sm:text-sm text-emerald-700 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. Ajay Sir or our academic counselor will contact you at your phone/email within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
                >
                  Send Another Inquiry
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
                      placeholder="e.g. Aman Gupta"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. aman@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Student Academic Level
                    </label>
                    <select
                      value={formData.studentClass}
                      onChange={(e) => setFormData({ ...formData, studentClass: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="Class 11">Class 11 (Foundation Chemistry)</option>
                      <option value="Class 12">Class 12 (Board & Target Batch)</option>
                      <option value="Dropper / JEE / NEET">Dropper / JEE / NEET Intensive</option>
                      <option value="Parent / General Inquiry">Parent / General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Subject / Topic of Query
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Class 12 Organic Chemistry Batch Timing or Test Series"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Detailed Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your query, coaching center preference, or specific chemistry questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-colors"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                      <span>Submitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-cyan-400" />
                      <span>Send Message to Ajay Sir</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

        {/* FAQs Section */}
        <div className="pt-12 border-t border-slate-200 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Quick answers about batches, offline centers, test series, and study materials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2"
              >
                <h4 className="text-sm font-bold text-slate-900 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
