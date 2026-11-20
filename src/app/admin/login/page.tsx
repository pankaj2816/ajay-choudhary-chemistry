'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { signInWithToken } from '@/lib/github';
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
      showToast('Welcome! You are signed in.', 'success');
      router.push('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not sign in. Please check your access key.');
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

        <h1 className="mt-10 text-4xl text-ink">Welcome back</h1>
        <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">
          Enter your access key to manage notices, papers and study material. You only need to do this once on
          each device.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-ink">Access key</span>
            <div className="mt-2 flex border border-line bg-white focus-within:border-ink transition-colors">
              <input
                type={show ? 'text' : 'password'}
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Paste your access key"
                autoComplete="off"
                spellCheck={false}
                className="flex-1 min-w-0 px-4 py-3.5 bg-transparent text-ink text-sm outline-none"
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

        <p className="mt-8 text-sm text-muted leading-relaxed">
          Keep your access key private. If it stops working, ask your website manager for a new one.
        </p>

        <Link href="/" className="mt-10 inline-block text-sm text-muted hover:text-ink">
          ← Back to website
        </Link>
      </div>
    </div>
  );
}
