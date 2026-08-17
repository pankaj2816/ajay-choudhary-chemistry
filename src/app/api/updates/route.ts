import { NextResponse } from 'next/server';
import { getUpdates, createUpdate, updateUpdate, deleteUpdate } from '@/lib/db';
import { verifyAdminSession } from '@/lib/auth';

export async function GET() {
  const updates = await getUpdates();
  return NextResponse.json(updates);
}

export async function POST(request: Request) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.title || !body.category) {
      return NextResponse.json({ error: 'Title and Category are required' }, { status: 400 });
    }

    const newUpdate = await createUpdate({
      title: body.title,
      category: body.category,
      description: body.description || '',
      content: body.content || '',
      date: body.date || new Date().toISOString().split('T')[0],
      isPinned: !!body.isPinned,
      isPublished: body.isPublished !== undefined ? body.isPublished : true,
      attachmentName: body.attachmentName,
      attachmentUrl: body.attachmentUrl,
      attachmentSize: body.attachmentSize,
      targetClass: body.targetClass || 'All Classes'
    });

    return NextResponse.json(newUpdate, { status: 201 });
  } catch (error) {
    console.error('Error creating update:', error);
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

    const updated = await updateUpdate(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Update not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error modifying update:', error);
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

  const success = await deleteUpdate(id);
  if (!success) {
    return NextResponse.json({ error: 'Update not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: 'Notice deleted' });
}
