'use client';

import { NoticeUpdate, QuestionPaper, SolutionItem, StudyMaterial } from '@/lib/types';
import { getLocalDatabase } from '@/lib/dataService';

export interface SearchResults {
  updates: NoticeUpdate[];
  questionPapers: QuestionPaper[];
  solutions: SolutionItem[];
  studyMaterials: StudyMaterial[];
}

export function searchClientDatabase(query: string): { results: SearchResults; totalMatches: number } {
  const q = query.toLowerCase().trim();
  if (!q) {
    return {
      results: { updates: [], questionPapers: [], solutions: [], studyMaterials: [] },
      totalMatches: 0
    };
  }

  const db = getLocalDatabase();

  const updates = db.updates.filter(item => 
    item.isPublished && (
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      (item.content && item.content.toLowerCase().includes(q))
    )
  );

  const questionPapers = db.questionPapers.filter(item => 
    item.title.toLowerCase().includes(q) ||
    item.subject.toLowerCase().includes(q) ||
    item.chapter.toLowerCase().includes(q) ||
    item.className.toLowerCase().includes(q) ||
    item.testType.toLowerCase().includes(q) ||
    item.description.toLowerCase().includes(q)
  );

  const solutions = db.solutions.filter(item => 
    item.title.toLowerCase().includes(q) ||
    item.subject.toLowerCase().includes(q) ||
    item.chapter.toLowerCase().includes(q) ||
    item.questionPaperTitle.toLowerCase().includes(q) ||
    item.description.toLowerCase().includes(q) ||
    (item.stepByStepContent && item.stepByStepContent.toLowerCase().includes(q))
  );

  const studyMaterials = db.studyMaterials.filter(item => 
    item.title.toLowerCase().includes(q) ||
    item.subject.toLowerCase().includes(q) ||
    item.chapter.toLowerCase().includes(q) ||
    item.className.toLowerCase().includes(q) ||
    item.resourceType.toLowerCase().includes(q) ||
    item.description.toLowerCase().includes(q)
  );

  const totalMatches = updates.length + questionPapers.length + solutions.length + studyMaterials.length;

  return {
    results: {
      updates,
      questionPapers,
      solutions,
      studyMaterials
    },
    totalMatches
  };
}
