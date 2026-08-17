import { NextResponse } from 'next/server';
import { verifyAdminSession, ADMIN_EMAIL } from '@/lib/auth';

export const dynamic = 'force-static';

export async function GET() {
  const isAuthenticated = await verifyAdminSession();
  if (!isAuthenticated) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ 
    authenticated: true, 
    user: {
      email: ADMIN_EMAIL,
      name: 'Ajay Choudhary',
      role: 'Administrator'
    } 
  });
}
