'use client';

import {
  DatabaseSchema,
  NoticeUpdate,
  QuestionPaper,
  SolutionItem,
  StudyMaterial,
  TeamMember,
  SiteSettings,
  TaxonomyData,
  ContactMessage,
  Testimonial,
} from '@/lib/types';
import { initialDatabase } from '@/data/initialData';
import {
  CONTENT_PATH,
  GitHubError,
  getSignedInLogin,
  hasAdminSession,
  readJsonFile,
  uploadDataUrl,
  writeJsonFile,
} from '@/lib/github';

/**
 * Data layer
 * ----------
 * - Visitors: content comes from site-content.json, baked into the build.
 * - Admin (signed in with a GitHub token): content is read live from the
 *   repository, and every save commits the updated JSON back to GitHub.
 *   The GitHub Pages workflow then redeploys the site (about 1–2 minutes).
 */

type Content = Omit<DatabaseSchema, 'contactMessages'>;

let liveCache: Content | null = null;

const today = () => new Date().toISOString().split('T')[0];

/** Synchronous snapshot, used by search. */
export function getLocalDatabase(): DatabaseSchema {
  return liveCache ? { ...liveCache, contactMessages: [] } : initialDatabase;
}

async function load(): Promise<Content> {
  if (!hasAdminSession()) return initialDatabase;
  if (liveCache) return liveCache;
  const { data } = await readJsonFile<Content>(CONTENT_PATH);
  liveCache = data;
  return data;
}

/** Re-reads the content file from GitHub on the next request (admin only). */
export function refreshAdminData(): void {
  liveCache = null;
}

/**
 * Applies a change to the latest content and commits it to GitHub.
 * Retries once if someone else saved in the meantime.
 */
async function commit<T>(summary: string, change: (db: Content) => T): Promise<T> {
  if (!hasAdminSession()) {
    throw new GitHubError('Please sign in to the admin panel to make changes.', 401);
  }
  const who = getSignedInLogin();
  const message = `Admin: ${summary}${who ? ` (via ${who})` : ''}`;

  for (let attempt = 0; attempt < 2; attempt++) {
    const { data, sha } = await readJsonFile<Content>(CONTENT_PATH);
    const result = change(data);
    try {
      await writeJsonFile(CONTENT_PATH, data, sha, message);
      liveCache = data;
      return result;
    } catch (err) {
      if (err instanceof GitHubError && (err.status === 409 || err.status === 422) && attempt === 0) continue;
      throw err;
    }
  }
  throw new GitHubError('Could not save the change. Please try again.', 409);
}

/** If a field holds a freshly picked file (data: URL), upload it and return the site path. */
async function persistFile(url: string | undefined, fileName: string | undefined): Promise<string | undefined> {
  if (url && url.startsWith('data:')) {
    return uploadDataUrl(url, fileName || 'document.pdf');
  }
  return url;
}

/** Drop undefined values so a partial update never blanks existing fields. */
function defined<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as Partial<T>;
}

/**
 * Builds the record to save: existing record (if editing) or defaults,
 * overlaid with the fields the admin actually changed.
 */
function mergeRecord<T extends { id: string }>(list: T[], item: Partial<T>, defaults: T): T {
  const existing = item.id ? list.find((x) => x.id === item.id) : undefined;
  return { ...(existing ?? defaults), ...defined(item), id: existing?.id ?? item.id ?? defaults.id } as T;
}

function upsert<T extends { id: string }>(list: T[], item: T, position: 'start' | 'end' = 'start'): T {
  const index = list.findIndex((x) => x.id === item.id);
  if (index >= 0) {
    list[index] = { ...list[index], ...item };
    return list[index];
  }
  if (position === 'start') list.unshift(item);
  else list.push(item);
  return item;
}

// ---------------- Study Materials ----------------
export async function getStudyMaterials(): Promise<StudyMaterial[]> {
  return (await load()).studyMaterials;
}

export async function saveStudyMaterial(item: Partial<StudyMaterial>): Promise<StudyMaterial> {
  const fileUrl = await persistFile(item.fileUrl, item.fileName);
  const defaults: StudyMaterial = {
    id: item.id || `mat-${Date.now()}`,
    title: item.title || 'Untitled Material',
    subject: item.subject || 'Organic Chemistry',
    className: item.className || 'Class 12',
    chapter: item.chapter || '',
    resourceType: item.resourceType || 'Chapter Notes',
    description: item.description || '',
    fileUrl: fileUrl || '',
    fileName: item.fileName || 'Chemistry_Notes.pdf',
    fileSize: item.fileSize || '',
    downloadsCount: item.downloadsCount || 0,
    uploadDate: item.uploadDate || today(),
    isFeatured: item.isFeatured || false,
  };
  return commit(`${item.id ? 'update' : 'add'} study material "${(item.title ?? 'item')}"`, (db) =>
    upsert(db.studyMaterials, mergeRecord(db.studyMaterials, { ...item, fileUrl }, defaults))
  );
}

export async function deleteStudyMaterial(id: string): Promise<boolean> {
  await commit(`delete study material ${id}`, (db) => {
    db.studyMaterials = db.studyMaterials.filter((m) => m.id !== id);
  });
  return true;
}

// ---------------- Question Papers ----------------
export async function getQuestionPapers(): Promise<QuestionPaper[]> {
  return (await load()).questionPapers;
}

export async function saveQuestionPaper(item: Partial<QuestionPaper>): Promise<QuestionPaper> {
  const fileUrl = await persistFile(item.fileUrl, item.fileName);
  const defaults: QuestionPaper = {
    id: item.id || `qp-${Date.now()}`,
    title: item.title || 'Untitled Question Paper',
    subject: item.subject || 'Organic Chemistry',
    className: item.className || 'Class 12',
    chapter: item.chapter || '',
    testType: item.testType || 'Unit Test',
    year: item.year || String(new Date().getFullYear()),
    uploadDate: item.uploadDate || today(),
    totalMarks: item.totalMarks || 50,
    duration: item.duration || '90 Mins',
    description: item.description || '',
    fileUrl: fileUrl || '',
    fileName: item.fileName || 'Question_Paper.pdf',
    fileSize: item.fileSize || '',
    hasSolution: item.hasSolution || false,
    solutionId: item.solutionId,
  };
  return commit(`${item.id ? 'update' : 'add'} question paper "${(item.title ?? 'item')}"`, (db) =>
    upsert(db.questionPapers, mergeRecord(db.questionPapers, { ...item, fileUrl }, defaults))
  );
}

export async function deleteQuestionPaper(id: string): Promise<boolean> {
  await commit(`delete question paper ${id}`, (db) => {
    db.questionPapers = db.questionPapers.filter((p) => p.id !== id);
  });
  return true;
}

// ---------------- Solutions ----------------
export async function getSolutions(): Promise<SolutionItem[]> {
  return (await load()).solutions;
}

export async function saveSolution(item: Partial<SolutionItem>): Promise<SolutionItem> {
  const solutionPdfUrl = await persistFile(item.solutionPdfUrl, item.solutionPdfName);
  const defaults: SolutionItem = {
    id: item.id || `sol-${Date.now()}`,
    title: item.title || 'Solution',
    questionPaperId: item.questionPaperId || '',
    questionPaperTitle: item.questionPaperTitle || '',
    subject: item.subject || 'Organic Chemistry',
    chapter: item.chapter || '',
    className: item.className || 'Class 12',
    uploadDate: item.uploadDate || today(),
    description: item.description || '',
    solutionPdfUrl,
    solutionPdfName: item.solutionPdfName,
    solutionPdfSize: item.solutionPdfSize,
    stepByStepContent: item.stepByStepContent || '',
    answerKey: item.answerKey,
    verifiedBy: item.verifiedBy || 'Ajay Choudhary Sir',
  };
  return commit(`${item.id ? 'update' : 'add'} solution "${item.title ?? 'item'}"`, (db) => {
    const saved = upsert(db.solutions, mergeRecord(db.solutions, { ...item, solutionPdfUrl }, defaults));
    // Keep the linked question paper in sync so "View solution" works
    if (saved.questionPaperId) {
      const paper = db.questionPapers.find((p) => p.id === saved.questionPaperId);
      if (paper) {
        paper.hasSolution = true;
        paper.solutionId = saved.id;
      }
    }
    return saved;
  });
}

export async function deleteSolution(id: string): Promise<boolean> {
  await commit(`delete solution ${id}`, (db) => {
    db.solutions = db.solutions.filter((s) => s.id !== id);
    db.questionPapers.forEach((p) => {
      if (p.solutionId === id) {
        p.solutionId = undefined;
        p.hasSolution = false;
      }
    });
  });
  return true;
}

// ---------------- Updates / Notices ----------------
export async function getUpdates(): Promise<NoticeUpdate[]> {
  return (await load()).updates;
}

export async function saveUpdate(item: Partial<NoticeUpdate>): Promise<NoticeUpdate> {
  const attachmentUrl = await persistFile(item.attachmentUrl, item.attachmentName);
  const defaults: NoticeUpdate = {
    id: item.id || `notif-${Date.now()}`,
    title: item.title || 'Notice',
    category: item.category || 'Class Update',
    description: item.description || '',
    content: item.content || '',
    date: item.date || today(),
    isPinned: item.isPinned || false,
    isPublished: item.isPublished !== undefined ? item.isPublished : true,
    attachmentName: item.attachmentName,
    attachmentUrl,
    attachmentSize: item.attachmentSize,
    targetClass: item.targetClass || 'All Classes',
  };
  return commit(`${item.id ? 'update' : 'publish'} notice "${item.title ?? 'item'}"`, (db) =>
    upsert(db.updates, mergeRecord(db.updates, { ...item, attachmentUrl }, defaults))
  );
}

export async function deleteUpdate(id: string): Promise<boolean> {
  await commit(`delete notice ${id}`, (db) => {
    db.updates = db.updates.filter((u) => u.id !== id);
  });
  return true;
}

// ---------------- Taxonomies / Categories ----------------
export async function getTaxonomies(): Promise<TaxonomyData> {
  return (await load()).taxonomies;
}

export async function saveTaxonomies(tax: TaxonomyData): Promise<TaxonomyData> {
  return commit('update subjects & chapters', (db) => {
    db.taxonomies = tax;
    return tax;
  });
}

// ---------------- Site Settings ----------------
export async function getSettings(): Promise<SiteSettings> {
  return (await load()).settings;
}

export async function saveSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  return commit('update site settings', (db) => {
    db.settings = { ...db.settings, ...settings };
    return db.settings;
  });
}

// ---------------- Team Members ----------------
export async function getTeam(): Promise<TeamMember[]> {
  return (await load()).teamMembers;
}

export async function saveTeamMember(item: Partial<TeamMember>): Promise<TeamMember> {
  const ext = item.image?.match(/^data:image\/(\w+)/)?.[1]?.replace('jpeg', 'jpg') || 'jpg';
  const image = await persistFile(item.image, `${(item.name || 'photo').replace(/\s+/g, '_')}.${ext}`);
  const defaults: TeamMember = {
    id: item.id || `team-${Date.now()}`,
    name: item.name || 'Ajay Choudhary Sir',
    role: item.role || 'Chemistry Educator',
    designation: item.designation || '',
    specialization: item.specialization || 'Chemistry',
    experience: item.experience || '',
    centers: item.centers || '',
    image: image || '/images/ajay-classroom.jpg',
    bio: item.bio || '',
    email: item.email,
    phone: item.phone,
  };
  return commit(`${item.id ? 'update' : 'add'} team member "${(item.name ?? 'member')}"`, (db) =>
    upsert(db.teamMembers, mergeRecord(db.teamMembers, { ...item, image }, defaults), 'end')
  );
}

export async function deleteTeamMember(id: string): Promise<boolean> {
  await commit(`delete team member ${id}`, (db) => {
    db.teamMembers = db.teamMembers.filter((t) => t.id !== id);
  });
  return true;
}

// ---------------- Testimonials ----------------
export async function getTestimonials(): Promise<Testimonial[]> {
  return (await load()).testimonials || [];
}

export async function saveTestimonial(item: Partial<Testimonial>): Promise<Testimonial> {
  const defaults: Testimonial = {
    id: item.id || `tm-${Date.now()}`,
    name: item.name || '',
    detail: item.detail || '',
    quote: item.quote || '',
    isPublished: item.isPublished !== undefined ? item.isPublished : true,
  };
  return commit(`${item.id ? 'update' : 'add'} testimonial from "${item.name ?? 'student'}"`, (db) => {
    db.testimonials = db.testimonials || [];
    return upsert(db.testimonials, mergeRecord(db.testimonials, item, defaults), 'end');
  });
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  await commit(`delete testimonial ${id}`, (db) => {
    db.testimonials = (db.testimonials || []).filter((t) => t.id !== id);
  });
  return true;
}

// ---------------- Contact enquiries ----------------
/**
 * Enquiries are emailed (via FormSubmit, free, no account) to the contact
 * email set in Settings. The very first enquiry sends a one-time activation
 * email to that address; click "Activate" in it and all later enquiries
 * arrive normally.
 */
export async function saveMessage(item: Partial<ContactMessage>): Promise<ContactMessage> {
  const settings = await getSettings();
  const to = (settings.enquiryEmail || settings.email || '').trim();
  if (!to) throw new Error('No contact email is configured.');

  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      _subject: `New enquiry: ${item.subject || 'Chemistry batch'} — ${item.name || 'Student'}`,
      _template: 'table',
      _replyto: item.email || '',
      Name: item.name || '',
      Email: item.email || '',
      Phone: item.phone || '',
      Class: item.studentClass || '',
      Topic: item.subject || '',
      Message: item.message || '',
    }),
  });

  let ok = res.ok;
  try {
    const body = await res.json();
    if (body && (body.success === false || body.success === 'false')) ok = false;
  } catch {
    // ignore non-JSON
  }
  if (!ok) throw new Error('Enquiry could not be sent.');

  return {
    id: `msg-${Date.now()}`,
    name: item.name || '',
    phone: item.phone || '',
    email: item.email || '',
    studentClass: item.studentClass || '',
    subject: item.subject || '',
    message: item.message || '',
    date: today(),
    isRead: false,
    isArchived: false,
    replyStatus: 'Pending',
  };
}

/** Enquiries now arrive by email, so there is no inbox to read here. */
export async function getMessages(): Promise<ContactMessage[]> {
  return [];
}

export async function markMessageRead(): Promise<boolean> {
  return true;
}

export async function deleteMessage(): Promise<boolean> {
  return true;
}
