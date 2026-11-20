'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { GITHUB_OWNER, GITHUB_REPO, signInWithToken } from '@/lib/github';
import { refreshAdminData } from '@/lib/dataService';
import ElementTile from '@/components/ui/ElementTile';

export default function AdminLoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [token, setToken] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithToken(token);
      refreshAdminData();
      showToast('Signed in. You can now manage the website.', 'success');
      router.push('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign-in failed. Please check the token.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3">
          <ElementTile symbol="Ac" number={89} size="sm" tone="dark" />
          <span className="font-display text-xl text-ink">Ajay Choudhary</span>
        </div>

        <h1 className="mt-10 text-4xl text-ink">Admin sign in</h1>
        <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">
          Paste the access key you were given. It is saved only in this browser, so you only need to do this
          once on each device.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-ink">Access key (GitHub token)</span>
            <div className="mt-2 flex border border-line bg-white focus-within:border-ink transition-colors">
              <input
                type={show ? 'text' : 'password'}
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="github_pat_…"
                autoComplete="off"
                spellCheck={false}
                className="flex-1 min-w-0 px-4 py-3.5 bg-transparent text-ink text-sm font-mono outline-none"
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="px-4 text-muted hover:text-ink"
                aria-label={show ? 'Hide key' : 'Show key'}
              >
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </label>

          {error && (
            <p className="flex items-start gap-2 text-sm text-accent">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !token.trim()}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-ink text-paper text-sm font-medium hover:bg-accent disabled:opacity-50 transition-colors"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
            {loading ? 'Checking…' : 'Sign in'}
          </button>
        </form>

        <details className="mt-10 border-t border-line pt-5 text-sm text-muted">
          <summary className="cursor-pointer text-ink font-medium">How to create a new access key</summary>
          <ol className="mt-4 space-y-2 list-decimal pl-5 leading-relaxed">
            <li>
              Sign in to GitHub as the owner of <span className="font-mono text-ink">{GITHUB_OWNER}/{GITHUB_REPO}</span>.
            </li>
            <li>Open Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token.</li>
            <li>Repository access: “Only select repositories” → choose {GITHUB_REPO}.</li>
            <li>Permissions → Repository permissions → Contents: “Read and write”. Leave everything else as “No access”.</li>
            <li>Choose an expiry (for example 1 year), generate, copy it and paste it above.</li>
          </ol>
          <p className="mt-4 leading-relaxed">
            Never share this key publicly. If a device is lost, delete the key on GitHub and create a new one.
          </p>
        </details>

        <Link href="/" className="mt-10 inline-block text-sm text-muted hover:text-ink">
          ← Back to website
        </Link>
      </div>
    </div>
  );
}
