import { NextResponse } from 'next/server';
import { getSolutions, createSolution, updateSolution, deleteSolution } from '@/lib/db';
import { verifyAdminSession } from '@/lib/auth';

export async function GET() {
  const solutions = await getSolutions();
  return NextResponse.json(solutions);
}

export async function POST(request: Request) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.title || !body.questionPaperId) {
      return NextResponse.json({ error: 'Title and Linked Question Paper are required' }, { status: 400 });
    }

    const newSolution = await createSolution({
      title: body.title,
      questionPaperId: body.questionPaperId,
      questionPaperTitle: body.questionPaperTitle || '',
      subject: body.subject || 'Organic Chemistry',
      chapter: body.chapter || '',
      className: body.className || 'Class 12',
      uploadDate: body.uploadDate || new Date().toISOString().split('T')[0],
      description: body.description || '',
      solutionPdfUrl: body.solutionPdfUrl || '/uploads/sample_solution.pdf',
      solutionPdfName: body.solutionPdfName || `${body.title.replace(/\s+/g, '_')}.pdf`,
      solutionPdfSize: body.solutionPdfSize || '2.0 MB',
      stepByStepContent: body.stepByStepContent || '',
      answerKey: body.answerKey || [],
      verifiedBy: body.verifiedBy || 'Ajay Choudhary'
    });

    return NextResponse.json(newSolution, { status: 201 });
  } catch (error) {
    console.error('Error creating solution:', error);
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

    const updated = await updateSolution(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Solution not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error modifying solution:', error);
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

  const success = await deleteSolution(id);
  if (!success) {
    return NextResponse.json({ error: 'Solution not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: 'Solution deleted' });
}
