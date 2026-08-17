import { NextResponse } from 'next/server';
import { getTaxonomies, updateTaxonomies } from '@/lib/db';
import { verifyAdminSession } from '@/lib/auth';

export const dynamic = 'force-static';

export async function GET() {
  const taxonomies = await getTaxonomies();
  return NextResponse.json(taxonomies);
}

export async function POST(request: Request) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const updated = await updateTaxonomies(body);
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating taxonomies:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
