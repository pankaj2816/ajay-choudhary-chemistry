import { NextResponse } from 'next/server';
import { getQuestionPapers, createQuestionPaper, updateQuestionPaper, deleteQuestionPaper } from '@/lib/db';
import { verifyAdminSession } from '@/lib/auth';

export const dynamic = 'force-static';

export async function GET() {
  const papers = await getQuestionPapers();
  return NextResponse.json(papers);
}

export async function POST(request: Request) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.title || !body.subject || !body.className || !body.chapter) {
      return NextResponse.json({ error: 'Title, Subject, Class, and Chapter are required' }, { status: 400 });
    }

    const newPaper = await createQuestionPaper({
      title: body.title,
      subject: body.subject,
      className: body.className,
      chapter: body.chapter,
      testType: body.testType || 'Unit Test',
      year: body.year || '2026',
      uploadDate: body.uploadDate || new Date().toISOString().split('T')[0],
      totalMarks: Number(body.totalMarks) || 50,
      duration: body.duration || '60 Mins',
      description: body.description || '',
      fileUrl: body.fileUrl || '/uploads/sample_question_paper.pdf',
      fileName: body.fileName || `${body.title.replace(/\s+/g, '_')}.pdf`,
      fileSize: body.fileSize || '1.5 MB',
      hasSolution: !!body.hasSolution,
      solutionId: body.solutionId
    });

    return NextResponse.json(newPaper, { status: 201 });
  } catch (error) {
    console.error('Error creating question paper:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, ...updates } = body;
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const updated = await updateQuestionPaper(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Question Paper not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error modifying question paper:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  const success = await deleteQuestionPaper(id);
  if (!success) {
    return NextResponse.json({ error: 'Question paper not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: 'Question paper deleted' });
}
