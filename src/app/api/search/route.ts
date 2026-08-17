import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get('q') || '').toLowerCase().trim();

  if (!query) {
    return NextResponse.json({
      query: '',
      results: {
        updates: [],
        questionPapers: [],
        solutions: [],
        studyMaterials: []
      },
      totalMatches: 0
    });
  }

  const db = await getDatabase();

  const updates = db.updates.filter(item => 
    item.isPublished && (
      item.title.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.content.toLowerCase().includes(query)
    )
  );

  const questionPapers = db.questionPapers.filter(item => 
    item.title.toLowerCase().includes(query) ||
    item.subject.toLowerCase().includes(query) ||
    item.chapter.toLowerCase().includes(query) ||
    item.className.toLowerCase().includes(query) ||
    item.testType.toLowerCase().includes(query) ||
    item.description.toLowerCase().includes(query)
  );

  const solutions = db.solutions.filter(item => 
    item.title.toLowerCase().includes(query) ||
    item.subject.toLowerCase().includes(query) ||
    item.chapter.toLowerCase().includes(query) ||
    item.questionPaperTitle.toLowerCase().includes(query) ||
    item.description.toLowerCase().includes(query) ||
    item.stepByStepContent.toLowerCase().includes(query)
  );

  const studyMaterials = db.studyMaterials.filter(item => 
    item.title.toLowerCase().includes(query) ||
    item.subject.toLowerCase().includes(query) ||
    item.chapter.toLowerCase().includes(query) ||
    item.className.toLowerCase().includes(query) ||
    item.resourceType.toLowerCase().includes(query) ||
    item.description.toLowerCase().includes(query)
  );

  const totalMatches = updates.length + questionPapers.length + solutions.length + studyMaterials.length;

  return NextResponse.json({
    query,
    totalMatches,
    results: {
      updates,
      questionPapers,
      solutions,
      studyMaterials
    }
  });
}
