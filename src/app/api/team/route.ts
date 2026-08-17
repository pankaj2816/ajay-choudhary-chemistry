import { NextResponse } from 'next/server';
import { getTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember } from '@/lib/db';
import { verifyAdminSession } from '@/lib/auth';

export async function GET() {
  const team = await getTeamMembers();
  return NextResponse.json(team);
}

export async function POST(request: Request) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.name || !body.role) {
      return NextResponse.json({ error: 'Name and Role are required' }, { status: 400 });
    }

    const newMember = await createTeamMember({
      name: body.name,
      role: body.role,
      designation: body.designation || 'Chemistry Faculty',
      specialization: body.specialization || 'Chemistry',
      experience: body.experience || '5+ Years',
      centers: body.centers || 'All Centers',
      image: body.image || '/images/teaching-team.jpg',
      bio: body.bio || '',
      email: body.email,
      phone: body.phone
    });

    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    console.error('Error creating team member:', error);
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

    const updated = await updateTeamMember(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating team member:', error);
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

  const success = await deleteTeamMember(id);
  if (!success) {
    return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: 'Team member removed' });
}
