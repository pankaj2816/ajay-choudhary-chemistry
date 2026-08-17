import fs from 'fs';
import path from 'path';
import { initialDatabase } from '@/data/initialData';
import { 
  DatabaseSchema, 
  NoticeUpdate, 
  QuestionPaper, 
  SolutionItem, 
  StudyMaterial, 
  TeamMember, 
  ContactMessage, 
  SiteSettings, 
  TaxonomyData 
} from './types';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'store.json');

function ensureDataFile(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(initialDatabase, null, 2), 'utf-8');
  }
}

export async function getDatabase(): Promise<DatabaseSchema> {
  try {
    ensureDataFile();
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return {
      ...initialDatabase,
      ...parsed,
      settings: { ...initialDatabase.settings, ...parsed.settings },
      taxonomies: { ...initialDatabase.taxonomies, ...parsed.taxonomies }
    };
  } catch (error) {
    console.error('Error reading database:', error);
    return initialDatabase;
  }
}

export async function saveDatabase(data: DatabaseSchema): Promise<boolean> {
  try {
    ensureDataFile();
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving database:', error);
    return false;
  }
}

// Notice Updates
export async function getUpdates(): Promise<NoticeUpdate[]> {
  const db = await getDatabase();
  return db.updates || [];
}

export async function createUpdate(item: Omit<NoticeUpdate, 'id'>): Promise<NoticeUpdate> {
  const db = await getDatabase();
  const newItem: NoticeUpdate = {
    ...item,
    id: `notif-${Date.now()}`
  };
  db.updates.unshift(newItem);
  await saveDatabase(db);
  return newItem;
}

export async function updateUpdate(id: string, updates: Partial<NoticeUpdate>): Promise<NoticeUpdate | null> {
  const db = await getDatabase();
  const index = db.updates.findIndex(u => u.id === id);
  if (index === -1) return null;
  db.updates[index] = { ...db.updates[index], ...updates };
  await saveDatabase(db);
  return db.updates[index];
}

export async function deleteUpdate(id: string): Promise<boolean> {
  const db = await getDatabase();
  const initialLen = db.updates.length;
  db.updates = db.updates.filter(u => u.id !== id);
  if (db.updates.length === initialLen) return false;
  await saveDatabase(db);
  return true;
}

// Question Papers
export async function getQuestionPapers(): Promise<QuestionPaper[]> {
  const db = await getDatabase();
  return db.questionPapers || [];
}

export async function createQuestionPaper(item: Omit<QuestionPaper, 'id'>): Promise<QuestionPaper> {
  const db = await getDatabase();
  const newItem: QuestionPaper = {
    ...item,
    id: `qp-${Date.now()}`
  };
  db.questionPapers.unshift(newItem);
  await saveDatabase(db);
  return newItem;
}

export async function updateQuestionPaper(id: string, updates: Partial<QuestionPaper>): Promise<QuestionPaper | null> {
  const db = await getDatabase();
  const index = db.questionPapers.findIndex(q => q.id === id);
  if (index === -1) return null;
  db.questionPapers[index] = { ...db.questionPapers[index], ...updates };
  await saveDatabase(db);
  return db.questionPapers[index];
}

export async function deleteQuestionPaper(id: string): Promise<boolean> {
  const db = await getDatabase();
  const initialLen = db.questionPapers.length;
  db.questionPapers = db.questionPapers.filter(q => q.id !== id);
  if (db.questionPapers.length === initialLen) return false;
  await saveDatabase(db);
  return true;
}

// Solutions
export async function getSolutions(): Promise<SolutionItem[]> {
  const db = await getDatabase();
  return db.solutions || [];
}

export async function createSolution(item: Omit<SolutionItem, 'id'>): Promise<SolutionItem> {
  const db = await getDatabase();
  const newItem: SolutionItem = {
    ...item,
    id: `sol-${Date.now()}`
  };
  db.solutions.unshift(newItem);

  // Link to question paper if questionPaperId is present
  if (newItem.questionPaperId) {
    const qpIndex = db.questionPapers.findIndex(q => q.id === newItem.questionPaperId);
    if (qpIndex !== -1) {
      db.questionPapers[qpIndex].hasSolution = true;
      db.questionPapers[qpIndex].solutionId = newItem.id;
    }
  }

  await saveDatabase(db);
  return newItem;
}

export async function updateSolution(id: string, updates: Partial<SolutionItem>): Promise<SolutionItem | null> {
  const db = await getDatabase();
  const index = db.solutions.findIndex(s => s.id === id);
  if (index === -1) return null;
  db.solutions[index] = { ...db.solutions[index], ...updates };
  await saveDatabase(db);
  return db.solutions[index];
}

export async function deleteSolution(id: string): Promise<boolean> {
  const db = await getDatabase();
  const sol = db.solutions.find(s => s.id === id);
  if (!sol) return false;

  db.solutions = db.solutions.filter(s => s.id !== id);
  
  // Update linked question paper
  if (sol.questionPaperId) {
    const qpIndex = db.questionPapers.findIndex(q => q.id === sol.questionPaperId);
    if (qpIndex !== -1 && db.questionPapers[qpIndex].solutionId === id) {
      db.questionPapers[qpIndex].hasSolution = false;
      delete db.questionPapers[qpIndex].solutionId;
    }
  }

  await saveDatabase(db);
  return true;
}

// Study Materials
export async function getStudyMaterials(): Promise<StudyMaterial[]> {
  const db = await getDatabase();
  return db.studyMaterials || [];
}

export async function createStudyMaterial(item: Omit<StudyMaterial, 'id'>): Promise<StudyMaterial> {
  const db = await getDatabase();
  const newItem: StudyMaterial = {
    ...item,
    id: `mat-${Date.now()}`
  };
  db.studyMaterials.unshift(newItem);
  await saveDatabase(db);
  return newItem;
}

export async function updateStudyMaterial(id: string, updates: Partial<StudyMaterial>): Promise<StudyMaterial | null> {
  const db = await getDatabase();
  const index = db.studyMaterials.findIndex(m => m.id === id);
  if (index === -1) return null;
  db.studyMaterials[index] = { ...db.studyMaterials[index], ...updates };
  await saveDatabase(db);
  return db.studyMaterials[index];
}

export async function deleteStudyMaterial(id: string): Promise<boolean> {
  const db = await getDatabase();
  const initialLen = db.studyMaterials.length;
  db.studyMaterials = db.studyMaterials.filter(m => m.id !== id);
  if (db.studyMaterials.length === initialLen) return false;
  await saveDatabase(db);
  return true;
}

// Team Members
export async function getTeamMembers(): Promise<TeamMember[]> {
  const db = await getDatabase();
  return db.teamMembers || [];
}

export async function createTeamMember(item: Omit<TeamMember, 'id'>): Promise<TeamMember> {
  const db = await getDatabase();
  const newItem: TeamMember = {
    ...item,
    id: `team-${Date.now()}`
  };
  db.teamMembers.push(newItem);
  await saveDatabase(db);
  return newItem;
}

export async function updateTeamMember(id: string, updates: Partial<TeamMember>): Promise<TeamMember | null> {
  const db = await getDatabase();
  const index = db.teamMembers.findIndex(t => t.id === id);
  if (index === -1) return null;
  db.teamMembers[index] = { ...db.teamMembers[index], ...updates };
  await saveDatabase(db);
  return db.teamMembers[index];
}

export async function deleteTeamMember(id: string): Promise<boolean> {
  const db = await getDatabase();
  const initialLen = db.teamMembers.length;
  db.teamMembers = db.teamMembers.filter(t => t.id !== id);
  if (db.teamMembers.length === initialLen) return false;
  await saveDatabase(db);
  return true;
}

// Contact Messages
export async function getContactMessages(): Promise<ContactMessage[]> {
  const db = await getDatabase();
  return db.contactMessages || [];
}

export async function createContactMessage(item: Omit<ContactMessage, 'id' | 'date' | 'isRead' | 'isArchived'>): Promise<ContactMessage> {
  const db = await getDatabase();
  const newItem: ContactMessage = {
    ...item,
    id: `msg-${Date.now()}`,
    date: new Date().toISOString(),
    isRead: false,
    isArchived: false,
    replyStatus: 'Pending'
  };
  db.contactMessages.unshift(newItem);
  await saveDatabase(db);
  return newItem;
}

export async function updateContactMessage(id: string, updates: Partial<ContactMessage>): Promise<ContactMessage | null> {
  const db = await getDatabase();
  const index = db.contactMessages.findIndex(m => m.id === id);
  if (index === -1) return null;
  db.contactMessages[index] = { ...db.contactMessages[index], ...updates };
  await saveDatabase(db);
  return db.contactMessages[index];
}

export async function deleteContactMessage(id: string): Promise<boolean> {
  const db = await getDatabase();
  const initialLen = db.contactMessages.length;
  db.contactMessages = db.contactMessages.filter(m => m.id !== id);
  if (db.contactMessages.length === initialLen) return false;
  await saveDatabase(db);
  return true;
}

// Settings & Taxonomies
export async function getSettings(): Promise<SiteSettings> {
  const db = await getDatabase();
  return db.settings;
}

export async function updateSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  const db = await getDatabase();
  db.settings = { ...db.settings, ...settings };
  await saveDatabase(db);
  return db.settings;
}

export async function getTaxonomies(): Promise<TaxonomyData> {
  const db = await getDatabase();
  return db.taxonomies;
}

export async function updateTaxonomies(taxonomies: Partial<TaxonomyData>): Promise<TaxonomyData> {
  const db = await getDatabase();
  db.taxonomies = { ...db.taxonomies, ...taxonomies };
  await saveDatabase(db);
  return db.taxonomies;
}
