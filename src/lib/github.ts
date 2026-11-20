'use client';

/**
 * Minimal GitHub client used by the admin panel.
 *
 * The site is a static export on GitHub Pages, so there is no server. Instead
 * the admin signs in with a fine-grained GitHub token that only has
 * "Contents: read & write" on this one repository. The token is kept in the
 * admin's own browser (localStorage) and is never part of the site's code.
 */

export const GITHUB_OWNER = process.env.NEXT_PUBLIC_GITHUB_OWNER || 'pankaj2816';
export const GITHUB_REPO = process.env.NEXT_PUBLIC_GITHUB_REPO || 'ajay-choudhary-chemistry';
export const GITHUB_BRANCH = process.env.NEXT_PUBLIC_GITHUB_BRANCH || 'main';
export const CONTENT_PATH = 'src/data/site-content.json';
export const UPLOADS_DIR = 'public/uploads';

const TOKEN_KEY = 'ajay_gh_token';
const LOGIN_KEY = 'ajay_gh_login';

// ---------------------------------------------------------------- session

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function getSignedInLogin(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(LOGIN_KEY);
  } catch {
    return null;
  }
}

export function hasAdminSession(): boolean {
  return !!getToken();
}

export function signOut(): void {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(LOGIN_KEY);
  } catch {
    // ignore
  }
}

// ---------------------------------------------------------------- encoding

export function utf8ToBase64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(binary);
}

export function base64ToUtf8(b64: string): string {
  const binary = atob(b64.replace(/\s/g, ''));
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

// ---------------------------------------------------------------- requests

export class GitHubError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function api<T>(path: string, init: RequestInit = {}, token = getToken()): Promise<T> {
  if (!token) throw new GitHubError('You have been signed out. Please sign in again.', 401);

  const res = await fetch(`https://api.github.com${path}`, {
    ...init,
    cache: 'no-store',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      ...(init.headers || {}),
    },
  });

  if (!res.ok) {
    const friendly =
      res.status === 401
        ? 'This access key is not working any more. Please ask your website manager for a new one.'
        : res.status === 403
          ? 'This access key can view but not save changes. Please ask your website manager for a new one.'
          : res.status === 404
            ? 'This access key is not valid for this website. Please check it and try again.'
            : res.status === 409
              ? 'Someone else saved a change at the same time. Please try again.'
              : `Something went wrong (code ${res.status}). Please try again in a minute.`;
    throw new GitHubError(friendly, res.status);
  }

  return res.status === 204 ? (undefined as T) : ((await res.json()) as T);
}

const repoPath = `/repos/${GITHUB_OWNER}/${GITHUB_REPO}`;

// ---------------------------------------------------------------- sign in

/**
 * Checks a token against the repository and, if it works, stores it.
 */
export async function signInWithToken(rawToken: string): Promise<{ login: string }> {
  const token = rawToken.trim();
  if (!token) throw new GitHubError('Please enter your access key.', 400);

  // 1. The token must be able to see the website repository.
  await api(`${repoPath}`, {}, token);
  // 2. ...and read the content file on the deploy branch.
  await api(`${repoPath}/contents/${CONTENT_PATH}?ref=${GITHUB_BRANCH}`, {}, token);

  let login = 'admin';
  try {
    const user = await api<{ login: string }>('/user', {}, token);
    login = user.login;
  } catch {
    // Not critical
  }

  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(LOGIN_KEY, login);
  return { login };
}

// ---------------------------------------------------------------- content

interface ContentsResponse {
  sha: string;
  content?: string;
  encoding?: string;
}

export async function readJsonFile<T>(path: string): Promise<{ data: T; sha: string }> {
  const file = await api<ContentsResponse>(
    `${repoPath}/contents/${path}?ref=${GITHUB_BRANCH}&t=${Date.now()}`
  );
  let text: string;
  if (file.content && file.encoding === 'base64') {
    text = base64ToUtf8(file.content);
  } else {
    // Files over 1 MB are returned without inline content
    text = await api<string>(`${repoPath}/contents/${path}?ref=${GITHUB_BRANCH}`, {
      headers: { Accept: 'application/vnd.github.raw+json' },
    }).catch(async () => {
      throw new GitHubError('Could not load the website content. Please try again.', 500);
    });
    if (typeof text !== 'string') text = JSON.stringify(text);
  }
  return { data: JSON.parse(text) as T, sha: file.sha };
}

export async function writeJsonFile(path: string, data: unknown, sha: string, message: string): Promise<string> {
  const result = await api<{ content: { sha: string } }>(`${repoPath}/contents/${path}`, {
    method: 'PUT',
    body: JSON.stringify({
      message,
      content: utf8ToBase64(JSON.stringify(data, null, 2) + '\n'),
      sha,
      branch: GITHUB_BRANCH,
    }),
  });
  return result.content.sha;
}

/**
 * Uploads a file (given as a data: URL) into public/uploads and returns the
 * site path to use, e.g. "/uploads/1732100000000_Unit_Test_3.pdf".
 * The commit is marked [skip ci]; the content commit that follows triggers
 * the single deploy.
 */
export async function uploadDataUrl(dataUrl: string, fileName: string): Promise<string> {
  const commaIndex = dataUrl.indexOf(',');
  if (!dataUrl.startsWith('data:') || commaIndex === -1) {
    throw new GitHubError('The selected file could not be read. Please choose it again.', 400);
  }
  const base64 = dataUrl.slice(commaIndex + 1);
  const approxBytes = (base64.length * 3) / 4;
  if (approxBytes > 40 * 1024 * 1024) {
    throw new GitHubError('This file is larger than 40 MB. Please compress the PDF and try again.', 413);
  }

  const safeName = (fileName || 'document.pdf').replace(/[^a-zA-Z0-9.\-_]/g, '_').replace(/_+/g, '_');
  const finalName = `${Date.now()}_${safeName}`;

  await api(`${repoPath}/contents/${UPLOADS_DIR}/${finalName}`, {
    method: 'PUT',
    body: JSON.stringify({
      message: `Upload ${safeName} [skip ci]`,
      content: base64,
      branch: GITHUB_BRANCH,
    }),
  });

  return `/uploads/${finalName}`;
}
