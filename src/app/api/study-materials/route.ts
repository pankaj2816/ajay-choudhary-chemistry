import { NextResponse } from 'next/server';
import { getStudyMaterials, createStudyMaterial, updateStudyMaterial, deleteStudyMaterial } from '@/lib/db';
import { verifyAdminSession } from '@/lib/auth';

export const dynamic = 'force-static';

export async function GET() {
  const materials = await getStudyMaterials();
  return NextResponse.json(materials);
}

export async function POST(request: Request) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.title || !body.subject || !body.chapter || !body.resourceType) {
      return NextResponse.json({ error: 'Title, Subject, Chapter, and Resource Type are required' }, { status: 400 });
    }

    const newMat = await createStudyMaterial({
      title: body.title,
      subject: body.subject,
      className: body.className || 'Class 12',
      chapter: body.chapter,
      resourceType: body.resourceType,
      description: body.description || '',
      fileUrl: body.fileUrl || '/uploads/sample_chemistry_notes.pdf',
      fileName: body.fileName || `${body.title.replace(/\s+/g, '_')}.pdf`,
      fileSize: body.fileSize || '2.5 MB',
      uploadDate: body.uploadDate || new Date().toISOString().split('T')[0],
      downloadsCount: 0,
      isFeatured: !!body.isFeatured
    });

    return NextResponse.json(newMat, { status: 201 });
  } catch (error) {
    console.error('Error creating study material:', error);
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

    const updated = await updateStudyMaterial(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Study Material not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error modifying study material:', error);
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

  const success = await deleteStudyMaterial(id);
  if (!success) {
    return NextResponse.json({ error: 'Study material not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: 'Study material deleted' });
}
