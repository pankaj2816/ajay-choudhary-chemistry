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
  ContactMessage 
} from '@/lib/types';
import { initialDatabase } from '@/data/initialData';

const STORAGE_KEY = 'ajay_chemistry_db_v2';

/**
 * Retrieves the active database from localStorage or initialDatabase
 */
export function getLocalDatabase(): DatabaseSchema {
  if (typeof window === 'undefined') {
    return initialDatabase;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialDatabase));
      return initialDatabase;
    }
    const parsed = JSON.parse(raw);
    return {
      settings: parsed.settings || initialDatabase.settings,
      taxonomies: parsed.taxonomies || initialDatabase.taxonomies,
      teamMembers: parsed.teamMembers || initialDatabase.teamMembers,
      updates: parsed.updates || initialDatabase.updates,
      questionPapers: parsed.questionPapers || initialDatabase.questionPapers,
      solutions: parsed.solutions || initialDatabase.solutions,
      studyMaterials: parsed.studyMaterials || initialDatabase.studyMaterials,
      contactMessages: parsed.contactMessages || initialDatabase.contactMessages || [],
    };
  } catch (err) {
    console.error('Error reading localStorage DB:', err);
    return initialDatabase;
  }
}

/**
 * Saves updated database to localStorage
 */
export function saveLocalDatabase(db: DatabaseSchema): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } catch (err) {
    console.error('Error writing to localStorage DB:', err);
  }
}

// ---------------- Study Materials ----------------
export async function getStudyMaterials(): Promise<StudyMaterial[]> {
  try {
    const res = await fetch('/api/study-materials');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) return data;
    }
  } catch {
    // fallback to local
  }
  return getLocalDatabase().studyMaterials;
}

export async function saveStudyMaterial(item: Partial<StudyMaterial>): Promise<StudyMaterial> {
  const db = getLocalDatabase();
  let savedItem: StudyMaterial;
  
  if (item.id) {
    const index = db.studyMaterials.findIndex(m => m.id === item.id);
    if (index >= 0) {
      savedItem = { ...db.studyMaterials[index], ...item } as StudyMaterial;
      db.studyMaterials[index] = savedItem;
    } else {
      savedItem = {
        id: item.id,
        title: item.title || 'Untitled Material',
        subject: item.subject || 'Organic Chemistry',
        className: item.className || 'Class 12',
        chapter: item.chapter || '',
        resourceType: item.resourceType || 'Chapter Notes',
        description: item.description || '',
        fileUrl: item.fileUrl || '/uploads/sample_chemistry_notes.pdf',
        fileName: item.fileName || 'Chemistry_Notes.pdf',
        fileSize: item.fileSize || '2.5 MB',
        downloadsCount: item.downloadsCount || 0,
        uploadDate: item.uploadDate || new Date().toISOString().split('T')[0],
        isFeatured: item.isFeatured || false
      };
      db.studyMaterials.unshift(savedItem);
    }
  } else {
    savedItem = {
      id: `mat-${Date.now()}`,
      title: item.title || 'Untitled Material',
      subject: item.subject || 'Organic Chemistry',
      className: item.className || 'Class 12',
      chapter: item.chapter || '',
      resourceType: item.resourceType || 'Chapter Notes',
      description: item.description || '',
      fileUrl: item.fileUrl || '/uploads/sample_chemistry_notes.pdf',
      fileName: item.fileName || 'Chemistry_Notes.pdf',
      fileSize: item.fileSize || '2.5 MB',
      downloadsCount: 0,
      uploadDate: new Date().toISOString().split('T')[0],
      isFeatured: item.isFeatured || false
    };
    db.studyMaterials.unshift(savedItem);
  }

  saveLocalDatabase(db);
  return savedItem;
}

export async function deleteStudyMaterial(id: string): Promise<boolean> {
  const db = getLocalDatabase();
  db.studyMaterials = db.studyMaterials.filter(m => m.id !== id);
  saveLocalDatabase(db);
  return true;
}

// ---------------- Question Papers ----------------
export async function getQuestionPapers(): Promise<QuestionPaper[]> {
  try {
    const res = await fetch('/api/question-papers');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) return data;
    }
  } catch {
    // fallback
  }
  return getLocalDatabase().questionPapers;
}

export async function saveQuestionPaper(item: Partial<QuestionPaper>): Promise<QuestionPaper> {
  const db = getLocalDatabase();
  let savedItem: QuestionPaper;

  if (item.id) {
    const index = db.questionPapers.findIndex(p => p.id === item.id);
    if (index >= 0) {
      savedItem = { ...db.questionPapers[index], ...item } as QuestionPaper;
      db.questionPapers[index] = savedItem;
    } else {
      savedItem = {
        id: item.id,
        title: item.title || 'Untitled Question Paper',
        subject: item.subject || 'Organic Chemistry',
        className: item.className || 'Class 12',
        chapter: item.chapter || '',
        testType: item.testType || 'Unit Test',
        year: item.year || '2026',
        uploadDate: item.uploadDate || new Date().toISOString().split('T')[0],
        totalMarks: item.totalMarks || 50,
        duration: item.duration || '90 Mins',
        description: item.description || '',
        fileUrl: item.fileUrl || '/uploads/sample_question_paper.pdf',
        fileName: item.fileName || 'Question_Paper.pdf',
        fileSize: item.fileSize || '1.8 MB',
        hasSolution: item.hasSolution || false,
        solutionId: item.solutionId
      };
      db.questionPapers.unshift(savedItem);
    }
  } else {
    savedItem = {
      id: `qp-${Date.now()}`,
      title: item.title || 'Untitled Question Paper',
      subject: item.subject || 'Organic Chemistry',
      className: item.className || 'Class 12',
      chapter: item.chapter || '',
      testType: item.testType || 'Unit Test',
      year: item.year || '2026',
      uploadDate: new Date().toISOString().split('T')[0],
      totalMarks: item.totalMarks || 50,
      duration: item.duration || '90 Mins',
      description: item.description || '',
      fileUrl: item.fileUrl || '/uploads/sample_question_paper.pdf',
      fileName: item.fileName || 'Question_Paper.pdf',
      fileSize: item.fileSize || '1.8 MB',
      hasSolution: item.hasSolution || false,
      solutionId: item.solutionId
    };
    db.questionPapers.unshift(savedItem);
  }

  saveLocalDatabase(db);
  return savedItem;
}

export async function deleteQuestionPaper(id: string): Promise<boolean> {
  const db = getLocalDatabase();
  db.questionPapers = db.questionPapers.filter(p => p.id !== id);
  saveLocalDatabase(db);
  return true;
}

// ---------------- Solutions ----------------
export async function getSolutions(): Promise<SolutionItem[]> {
  try {
    const res = await fetch('/api/solutions');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) return data;
    }
  } catch {
    // fallback
  }
  return getLocalDatabase().solutions;
}

export async function saveSolution(item: Partial<SolutionItem>): Promise<SolutionItem> {
  const db = getLocalDatabase();
  let savedItem: SolutionItem;

  if (item.id) {
    const index = db.solutions.findIndex(s => s.id === item.id);
    if (index >= 0) {
      savedItem = { ...db.solutions[index], ...item } as SolutionItem;
      db.solutions[index] = savedItem;
    } else {
      savedItem = {
        id: item.id,
        title: item.title || 'Solution',
        questionPaperId: item.questionPaperId || '',
        questionPaperTitle: item.questionPaperTitle || '',
        subject: item.subject || 'Organic Chemistry',
        chapter: item.chapter || '',
        className: item.className || 'Class 12',
        uploadDate: item.uploadDate || new Date().toISOString().split('T')[0],
        description: item.description || '',
        solutionPdfUrl: item.solutionPdfUrl || '/uploads/sample_chemistry_notes.pdf',
        solutionPdfName: item.solutionPdfName || 'Solution.pdf',
        solutionPdfSize: item.solutionPdfSize || '2.0 MB',
        stepByStepContent: item.stepByStepContent || '',
        answerKey: item.answerKey,
        verifiedBy: item.verifiedBy || 'Ajay Choudhary Sir'
      };
      db.solutions.unshift(savedItem);
    }
  } else {
    savedItem = {
      id: `sol-${Date.now()}`,
      title: item.title || 'Solution',
      questionPaperId: item.questionPaperId || '',
      questionPaperTitle: item.questionPaperTitle || '',
      subject: item.subject || 'Organic Chemistry',
      chapter: item.chapter || '',
      className: item.className || 'Class 12',
      uploadDate: new Date().toISOString().split('T')[0],
      description: item.description || '',
      solutionPdfUrl: item.solutionPdfUrl || '/uploads/sample_chemistry_notes.pdf',
      solutionPdfName: item.solutionPdfName || 'Solution.pdf',
      solutionPdfSize: item.solutionPdfSize || '2.0 MB',
      stepByStepContent: item.stepByStepContent || '',
      answerKey: item.answerKey,
      verifiedBy: 'Ajay Choudhary Sir'
    };
    db.solutions.unshift(savedItem);
  }

  saveLocalDatabase(db);
  return savedItem;
}

export async function deleteSolution(id: string): Promise<boolean> {
  const db = getLocalDatabase();
  db.solutions = db.solutions.filter(s => s.id !== id);
  saveLocalDatabase(db);
  return true;
}

// ---------------- Updates / Notices ----------------
export async function getUpdates(): Promise<NoticeUpdate[]> {
  try {
    const res = await fetch('/api/updates');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) return data;
    }
  } catch {
    // fallback
  }
  return getLocalDatabase().updates;
}

export async function saveUpdate(item: Partial<NoticeUpdate>): Promise<NoticeUpdate> {
  const db = getLocalDatabase();
  let savedItem: NoticeUpdate;

  if (item.id) {
    const index = db.updates.findIndex(u => u.id === item.id);
    if (index >= 0) {
      savedItem = { ...db.updates[index], ...item } as NoticeUpdate;
      db.updates[index] = savedItem;
    } else {
      savedItem = {
        id: item.id,
        title: item.title || 'Notice',
        category: item.category || 'Class Update',
        description: item.description || '',
        content: item.content || '',
        date: item.date || new Date().toISOString().split('T')[0],
        isPinned: item.isPinned || false,
        isPublished: item.isPublished !== undefined ? item.isPublished : true,
        attachmentName: item.attachmentName,
        attachmentUrl: item.attachmentUrl,
        attachmentSize: item.attachmentSize,
        targetClass: item.targetClass || 'All Classes'
      };
      db.updates.unshift(savedItem);
    }
  } else {
    savedItem = {
      id: `notif-${Date.now()}`,
      title: item.title || 'Notice',
      category: item.category || 'Class Update',
      description: item.description || '',
      content: item.content || '',
      date: new Date().toISOString().split('T')[0],
      isPinned: item.isPinned || false,
      isPublished: true,
      attachmentName: item.attachmentName,
      attachmentUrl: item.attachmentUrl,
      attachmentSize: item.attachmentSize,
      targetClass: item.targetClass || 'All Classes'
    };
    db.updates.unshift(savedItem);
  }

  saveLocalDatabase(db);
  return savedItem;
}

export async function deleteUpdate(id: string): Promise<boolean> {
  const db = getLocalDatabase();
  db.updates = db.updates.filter(u => u.id !== id);
  saveLocalDatabase(db);
  return true;
}

// ---------------- Taxonomies / Categories ----------------
export async function getTaxonomies(): Promise<TaxonomyData> {
  try {
    const res = await fetch('/api/categories');
    if (res.ok) {
      const data = await res.json();
      if (data && data.subjects) return data;
    }
  } catch {
    // fallback
  }
  return getLocalDatabase().taxonomies;
}

export async function saveTaxonomies(tax: TaxonomyData): Promise<TaxonomyData> {
  const db = getLocalDatabase();
  db.taxonomies = tax;
  saveLocalDatabase(db);
  return tax;
}

// ---------------- Site Settings ----------------
export async function getSettings(): Promise<SiteSettings> {
  try {
    const res = await fetch('/api/settings');
    if (res.ok) {
      const data = await res.json();
      if (data && data.teacherName) return data;
    }
  } catch {
    // fallback
  }
  return getLocalDatabase().settings;
}

export async function saveSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  const db = getLocalDatabase();
  db.settings = { ...db.settings, ...settings };
  saveLocalDatabase(db);
  return db.settings;
}

// ---------------- Team Members ----------------
export async function getTeam(): Promise<TeamMember[]> {
  try {
    const res = await fetch('/api/team');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) return data;
    }
  } catch {
    // fallback
  }
  return getLocalDatabase().teamMembers;
}

export async function saveTeamMember(item: Partial<TeamMember>): Promise<TeamMember> {
  const db = getLocalDatabase();
  let savedItem: TeamMember;

  if (item.id) {
    const index = db.teamMembers.findIndex(t => t.id === item.id);
    if (index >= 0) {
      savedItem = { ...db.teamMembers[index], ...item } as TeamMember;
      db.teamMembers[index] = savedItem;
    } else {
      savedItem = {
        id: item.id,
        name: item.name || 'Ajay Choudhary Sir',
        role: item.role || 'Chemistry Educator',
        designation: item.designation || 'M.Sc., B.Ed',
        specialization: item.specialization || 'Chemistry',
        experience: item.experience || '8+ Years',
        centers: item.centers || 'Sector 14',
        image: item.image || '/images/ajay-choudhary.jpg',
        bio: item.bio || '',
        email: item.email || 'contact@ajaychemistry.com'
      };
      db.teamMembers.push(savedItem);
    }
  } else {
    savedItem = {
      id: `team-${Date.now()}`,
      name: item.name || 'Ajay Choudhary Sir',
      role: item.role || 'Chemistry Educator',
      designation: item.designation || 'M.Sc., B.Ed',
      specialization: item.specialization || 'Chemistry',
      experience: item.experience || '8+ Years',
      centers: item.centers || 'Sector 14',
      image: item.image || '/images/ajay-choudhary.jpg',
      bio: item.bio || '',
      email: item.email || 'contact@ajaychemistry.com'
    };
    db.teamMembers.push(savedItem);
  }

  saveLocalDatabase(db);
  return savedItem;
}

// ---------------- Messages ----------------
export async function getMessages(): Promise<ContactMessage[]> {
  try {
    const res = await fetch('/api/messages');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) return data;
    }
  } catch {
    // fallback
  }
  return getLocalDatabase().contactMessages;
}

export async function saveMessage(item: Partial<ContactMessage>): Promise<ContactMessage> {
  const db = getLocalDatabase();
  const newMsg: ContactMessage = {
    id: `msg-${Date.now()}`,
    name: item.name || 'Student',
    phone: item.phone || '',
    email: item.email || '',
    studentClass: item.studentClass || 'Class 12',
    subject: item.subject || 'General Inquiry',
    message: item.message || '',
    date: new Date().toISOString().split('T')[0],
    isRead: false,
    isArchived: false,
    replyStatus: 'Pending'
  };
  db.contactMessages.unshift(newMsg);
  saveLocalDatabase(db);
  return newMsg;
}

export async function markMessageRead(id: string): Promise<boolean> {
  const db = getLocalDatabase();
  const msg = db.contactMessages.find(m => m.id === id);
  if (msg) {
    msg.isRead = true;
    saveLocalDatabase(db);
  }
  return true;
}

export async function deleteMessage(id: string): Promise<boolean> {
  const db = getLocalDatabase();
  db.contactMessages = db.contactMessages.filter(m => m.id !== id);
  saveLocalDatabase(db);
  return true;
}
