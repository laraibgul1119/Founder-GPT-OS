import { NextResponse } from 'next/server';
import { clearSessionCookie } from '@/lib/auth';

export async function POST() {
  try {
    await clearSessionCookie();
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error in POST /api/auth/signout:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
