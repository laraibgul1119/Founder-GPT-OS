import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getOrCreateUser } from '@/lib/auth';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getOrCreateUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    const blueprint = await db.blueprint.findUnique({
      where: { id },
    });

    if (!blueprint) {
      return NextResponse.json({ error: 'Blueprint not found' }, { status: 404 });
    }

    // Verify ownership or check if public
    if (blueprint.userId !== user.id && !blueprint.isPublic) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Log view activity
    await db.activityLog.create({
      data: {
        userId: user.id,
        blueprintId: blueprint.id,
        action: 'viewed',
      }
    });

    return NextResponse.json({
      ...blueprint,
      output: (() => { try { return JSON.parse(blueprint.output); } catch { return blueprint.output; } })(),
    });

  } catch (error: any) {
    console.error(`Error in GET /api/blueprints/${params?.id}:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getOrCreateUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    const blueprint = await db.blueprint.findUnique({
      where: { id },
    });

    if (!blueprint) {
      return NextResponse.json({ error: 'Blueprint not found' }, { status: 404 });
    }

    if (blueprint.userId !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await db.blueprint.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, deletedId: id });

  } catch (error: any) {
    console.error(`Error in DELETE /api/blueprints/${params?.id}:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
