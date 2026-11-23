export type SubjectType = 'Organic Chemistry' | 'Inorganic Chemistry' | 'Practical Chemistry' | 'Physical Chemistry' | 'Science';

export type ClassLevel = 'Class 9' | 'Class 10' | 'Class 11' | 'Class 12' | 'Dropper / JEE / NEET' | 'All Classes';

export type NoticeCategory = 
  | 'Important Notice' 
  | 'Class Update' 
  | 'Test / Examination' 
  | 'Assignment' 
  | 'Study Material' 
  | 'Question Paper' 
  | 'General Announcement';

export type ResourceType = 
  | 'Chapter Notes' 
  | 'Reaction Sheet' 
  | 'Formula Sheet' 
  | 'Important Questions' 
  | 'Practice Worksheet' 
  | 'Practical Manual' 
  | 'Revision Material'
  | 'Book'
  | 'Other';

export type TestType = 
  | 'Unit Test' 
  | 'Periodic Test' 
  | 'Term Examination' 
  | 'Board Mock Test' 
  | 'JEE Main & Adv DPP' 
  | 'NEET Practice';

export interface NoticeUpdate {
  id: string;
  title: string;
  category: NoticeCategory;
  description: string;
  content: string;
  date: string;
  isPinned: boolean;
  isPublished: boolean;
  attachmentName?: string;
  attachmentUrl?: string;
  attachmentSize?: string;
  targetClass?: ClassLevel;
}

export interface QuestionPaper {
  id: string;
  title: string;
  subject: SubjectType;
  className: ClassLevel;
  chapter: string;
  testType: TestType;
  year: string;
  uploadDate: string;
  totalMarks: number;
  duration: string;
  description: string;
  fileUrl: string;
  fileName: string;
  fileSize: string;
  hasSolution: boolean;
  solutionId?: string;
}

export interface AnswerKeyItem {
  questionNo: string | number;
  answer: string;
  explanation: string;
}

export interface SolutionItem {
  id: string;
  title: string;
  questionPaperId: string;
  questionPaperTitle: string;
  subject: SubjectType;
  chapter: string;
  className: ClassLevel;
  uploadDate: string;
  description: string;
  solutionPdfUrl?: string;
  solutionPdfName?: string;
  solutionPdfSize?: string;
  stepByStepContent: string;
  answerKey?: AnswerKeyItem[];
  verifiedBy: string;
}

export interface StudyMaterial {
  id: string;
  title: string;
  subject: SubjectType;
  className: ClassLevel;
  chapter: string;
  resourceType: ResourceType;
  description: string;
  fileUrl: string;
  fileName: string;
  fileSize: string;
  uploadDate: string;
  downloadsCount: number;
  isFeatured: boolean;
}

export interface CoachingCenter {
  id: string;
  name: string;
  location: string;
  address: string;
  batches: string;
  schedule: string;
  contactNumber: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  designation: string;
  specialization: string;
  experience: string;
  centers: string;
  image: string;
  bio: string;
  email?: string;
  phone?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  studentClass: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
  isArchived: boolean;
  replyStatus?: 'Pending' | 'Replied';
}

export interface SiteSettings {
  teacherName: string;
  tagline: string;
  bioShort: string;
  experienceYears: number;
  centersCount: number;
  studentsCount: string;
  email: string;
  phone: string;
  whatsapp: string;
  /** Where contact-form enquiries are emailed. Falls back to `email`. */
  enquiryEmail?: string;
  bannerActive: boolean;
  bannerAlert: string;
  bannerLink?: string;
  coachingCenters: CoachingCenter[];
}

export interface TaxonomyData {
  subjects: string[];
  classes: string[];
  chapters: {
    'Organic Chemistry': string[];
    'Inorganic Chemistry': string[];
    'Practical Chemistry': string[];
    'Physical Chemistry': string[];
  };
  resourceTypes: string[];
  testTypes: string[];
  noticeCategories: string[];
}

export interface Testimonial {
  id: string;
  /** Student or parent name, as they agreed to be shown (e.g. "Riya S."). */
  name: string;
  /** Short context, e.g. "Class 12, 2025 · 95% in Boards". */
  detail: string;
  quote: string;
  isPublished: boolean;
}

export interface ConceptNote {
  id: string;
  slug: string;
  /** '11' or '12' (also '9' / '10' if added later) */
  grade: string;
  chapter: number;
  title: string;
  summary: string;
  /** Simple Markdown: ## headings, - lists, | tables |, > tips, **bold** */
  body: string;
  isPublished: boolean;
  updatedDate: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  tags: string[];
  body: string;
  date: string;
  isPublished: boolean;
}

export interface DatabaseSchema {
  updates: NoticeUpdate[];
  questionPapers: QuestionPaper[];
  solutions: SolutionItem[];
  studyMaterials: StudyMaterial[];
  teamMembers: TeamMember[];
  contactMessages: ContactMessage[];
  testimonials?: Testimonial[];
  conceptNotes?: ConceptNote[];
  articles?: Article[];
  settings: SiteSettings;
  taxonomies: TaxonomyData;
}
