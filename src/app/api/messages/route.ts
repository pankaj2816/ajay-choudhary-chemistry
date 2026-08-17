import { NextResponse } from 'next/server';
import { getContactMessages, createContactMessage, updateContactMessage, deleteContactMessage } from '@/lib/db';
import { verifyAdminSession } from '@/lib/auth';

export const dynamic = 'force-static';

export async function GET() {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const messages = await getContactMessages();
  return NextResponse.json(messages);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, studentClass, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, Email, and Message are required' }, { status: 400 });
    }

    const newMsg = await createContactMessage({
      name,
      email,
      phone: phone || '',
      studentClass: studentClass || 'Class 12',
      subject: subject || 'General Query',
      message
    });

    return NextResponse.json(newMsg, { status: 201 });
  } catch (error) {
    console.error('Error submitting contact message:', error);
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

    const updated = await updateContactMessage(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating message:', error);
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

  const success = await deleteContactMessage(id);
  if (!success) {
    return NextResponse.json({ error: 'Message not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: 'Message deleted' });
}
