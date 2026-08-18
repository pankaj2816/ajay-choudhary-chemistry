'use client';

import { NoticeUpdate, QuestionPaper, SolutionItem, StudyMaterial } from '@/lib/types';
import { getLocalDatabase } from '@/lib/dataService';

export interface ScoredResult<T> {
  item: T;
  score: number;
  matchedField: string;
  matchedSnippet: string;
}

export interface SearchResults {
  updates: NoticeUpdate[];
  questionPapers: QuestionPaper[];
  solutions: SolutionItem[];
  studyMaterials: StudyMaterial[];
  scoredUpdates?: ScoredResult<NoticeUpdate>[];
  scoredQuestionPapers?: ScoredResult<QuestionPaper>[];
  scoredSolutions?: ScoredResult<SolutionItem>[];
  scoredStudyMaterials?: ScoredResult<StudyMaterial>[];
}

function calculateScore(text: string, query: string, weight: number): { score: number; snippet: string } {
  if (!text) return { score: 0, snippet: '' };
  const lower = text.toLowerCase();
  const q = query.toLowerCase();
  const index = lower.indexOf(q);
  if (index === -1) return { score: 0, snippet: '' };

  let score = weight;
  // Word boundary bonus
  if (index === 0 || /\s|[(-]/.test(lower[index - 1])) {
    score += weight * 0.5;
  }
  // Exact match bonus
  if (lower === q) {
    score += weight * 1.5;
  }

  // Extract snippet around match
  const start = Math.max(0, index - 35);
  const end = Math.min(text.length, index + q.length + 45);
  let snippet = text.slice(start, end).trim();
  if (start > 0) snippet = '...' + snippet;
  if (end < text.length) snippet = snippet + '...';

  return { score, snippet };
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

  // Study Materials
  const scoredStudyMaterials: ScoredResult<StudyMaterial>[] = [];
  for (const item of db.studyMaterials) {
    let totalScore = 0;
    let bestSnippet = item.description || '';
    let bestField = 'title';

    const titleMatch = calculateScore(item.title, q, 100);
    if (titleMatch.score > 0) {
      totalScore += titleMatch.score;
      bestSnippet = titleMatch.snippet;
      bestField = 'title';
    }

    const chapterMatch = calculateScore(item.chapter, q, 60);
    if (chapterMatch.score > 0) {
      totalScore += chapterMatch.score;
      if (!bestSnippet || bestField !== 'title') {
        bestSnippet = chapterMatch.snippet;
        bestField = 'chapter';
      }
    }

    const subjMatch = calculateScore(item.subject, q, 30);
    if (subjMatch.score > 0) totalScore += subjMatch.score;

    const descMatch = calculateScore(item.description, q, 15);
    if (descMatch.score > 0) {
      totalScore += descMatch.score;
      if (bestField !== 'title' && bestField !== 'chapter') {
        bestSnippet = descMatch.snippet;
        bestField = 'description';
      }
    }

    if (totalScore > 0) {
      scoredStudyMaterials.push({ item, score: totalScore, matchedField: bestField, matchedSnippet: bestSnippet });
    }
  }
  scoredStudyMaterials.sort((a, b) => b.score - a.score);

  // Question Papers
  const scoredQuestionPapers: ScoredResult<QuestionPaper>[] = [];
  for (const item of db.questionPapers) {
    let totalScore = 0;
    let bestSnippet = item.description || '';
    let bestField = 'title';

    const titleMatch = calculateScore(item.title, q, 100);
    if (titleMatch.score > 0) {
      totalScore += titleMatch.score;
      bestSnippet = titleMatch.snippet;
      bestField = 'title';
    }

    const chapterMatch = calculateScore(item.chapter, q, 60);
    if (chapterMatch.score > 0) {
      totalScore += chapterMatch.score;
      if (bestField !== 'title') {
        bestSnippet = chapterMatch.snippet;
        bestField = 'chapter';
      }
    }

    const descMatch = calculateScore(item.description, q, 15);
    if (descMatch.score > 0) totalScore += descMatch.score;

    if (totalScore > 0) {
      scoredQuestionPapers.push({ item, score: totalScore, matchedField: bestField, matchedSnippet: bestSnippet });
    }
  }
  scoredQuestionPapers.sort((a, b) => b.score - a.score);

  // Solutions
  const scoredSolutions: ScoredResult<SolutionItem>[] = [];
  for (const item of db.solutions) {
    let totalScore = 0;
    let bestSnippet = item.description || '';
    let bestField = 'title';

    const titleMatch = calculateScore(item.title, q, 100);
    if (titleMatch.score > 0) {
      totalScore += titleMatch.score;
      bestSnippet = titleMatch.snippet;
      bestField = 'title';
    }

    const chapterMatch = calculateScore(item.chapter, q, 60);
    if (chapterMatch.score > 0) {
      totalScore += chapterMatch.score;
      if (bestField !== 'title') {
        bestSnippet = chapterMatch.snippet;
        bestField = 'chapter';
      }
    }

    const qpMatch = calculateScore(item.questionPaperTitle, q, 40);
    if (qpMatch.score > 0) totalScore += qpMatch.score;

    const descMatch = calculateScore(item.description, q, 15);
    if (descMatch.score > 0) totalScore += descMatch.score;

    const stepMatch = calculateScore(item.stepByStepContent || '', q, 10);
    if (stepMatch.score > 0) totalScore += stepMatch.score;

    if (totalScore > 0) {
      scoredSolutions.push({ item, score: totalScore, matchedField: bestField, matchedSnippet: bestSnippet });
    }
  }
  scoredSolutions.sort((a, b) => b.score - a.score);

  // Updates
  const scoredUpdates: ScoredResult<NoticeUpdate>[] = [];
  for (const item of db.updates) {
    if (!item.isPublished) continue;
    let totalScore = 0;
    let bestSnippet = item.description || '';
    let bestField = 'title';

    const titleMatch = calculateScore(item.title, q, 100);
    if (titleMatch.score > 0) {
      totalScore += titleMatch.score;
      bestSnippet = titleMatch.snippet;
      bestField = 'title';
    }

    const descMatch = calculateScore(item.description, q, 30);
    if (descMatch.score > 0) {
      totalScore += descMatch.score;
      if (bestField !== 'title') {
        bestSnippet = descMatch.snippet;
        bestField = 'description';
      }
    }

    const contentMatch = calculateScore(item.content || '', q, 15);
    if (contentMatch.score > 0) totalScore += contentMatch.score;

    if (totalScore > 0) {
      scoredUpdates.push({ item, score: totalScore, matchedField: bestField, matchedSnippet: bestSnippet });
    }
  }
  scoredUpdates.sort((a, b) => b.score - a.score);

  const updates = scoredUpdates.map(s => s.item);
  const questionPapers = scoredQuestionPapers.map(s => s.item);
  const solutions = scoredSolutions.map(s => s.item);
  const studyMaterials = scoredStudyMaterials.map(s => s.item);

  const totalMatches = updates.length + questionPapers.length + solutions.length + studyMaterials.length;

  return {
    results: {
      updates,
      questionPapers,
      solutions,
      studyMaterials,
      scoredUpdates,
      scoredQuestionPapers,
      scoredSolutions,
      scoredStudyMaterials
    },
    totalMatches
  };
}
