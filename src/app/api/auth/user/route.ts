import { NextResponse } from 'next/server';
import { getOrCreateUser, getAuthSession, sanitizeUser } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const user = await getOrCreateUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json(sanitizeUser(user));
  } catch (error: any) {
    console.error('Error in /api/auth/user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { firstName, lastName } = body;

    const dbUser = await db.user.findUnique({
      where: { id: session.userId },
    });

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const updatedUser = await db.user.update({
      where: { id: dbUser.id },
      data: {
        ...(firstName !== undefined && { firstName }),
        ...(lastName !== undefined && { lastName }),
      },
    });

    return NextResponse.json(sanitizeUser(updatedUser));
  } catch (error: any) {
    console.error('Error in PATCH /api/auth/user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
