'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Mail, Settings } from 'lucide-react';
import { getSettings } from '@/lib/dataService';

export default function AdminMessagesPage() {
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    getSettings()
      .then((s) => setEmail(s.enquiryEmail || s.email || ''))
      .catch(() => {});
  }, []);

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl text-white flex items-center gap-3">
          <Mail className="w-6 h-6 text-indigo-400" />
          Student enquiries
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Enquiries from the website&apos;s contact form are emailed to you, so you can reply straight from your inbox.
        </p>
      </div>

      <div className="p-6 bg-slate-950 border border-slate-800 space-y-4 text-sm leading-relaxed text-slate-300">
        <p>
          Enquiries are currently sent to:{' '}
          <span className="font-semibold text-white">{email || 'no email set'}</span>
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            The first time a student sends an enquiry, you will receive an email from <strong>FormSubmit</strong> asking
            you to confirm. Click <strong>Activate Form</strong> in that email once.
          </li>
          <li>After that, every enquiry arrives in your inbox with the student&apos;s name, phone, class and message.</li>
          <li>Reply to the email directly. It goes to the student&apos;s email address.</li>
        </ol>
        <p className="text-slate-400">
          Tip: send yourself a test enquiry from the Contact page after changing the email, so the confirmation step is
          done before students start writing.
        </p>
        <Link
          href="/admin/settings"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white transition-colors"
        >
          <Settings className="w-4 h-4" />
          Change enquiry email in Settings
        </Link>
      </div>
    </div>
  );
}
