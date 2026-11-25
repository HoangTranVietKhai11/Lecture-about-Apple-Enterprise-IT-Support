import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sanitizeSyncPayload } from '@/lib/syncCodec';
import { Prisma } from '@prisma/client';

function normalizeKey(raw: string | null): string | null {
  if (!raw) return null;
  const cleaned = raw.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');
  return cleaned.length >= 4 && cleaned.length <= 64 ? cleaned : null;
}

export async function GET(request: NextRequest) {
  const key = normalizeKey(request.nextUrl.searchParams.get('key'));
  if (!key) {
    return NextResponse.json(
      { success: false, error: 'INVALID_SYNC_KEY' },
      { status: 400 }
    );
  }

  try {
    const record = await prisma.progressSnapshot.findUnique({
      where: { syncKey: key },
    });

    if (!record) {
      return NextResponse.json(
        { success: false, error: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    const sanitized = sanitizeSyncPayload(record.payload);
    if (!sanitized) {
      return NextResponse.json(
        { success: false, error: 'CORRUPTED_SNAPSHOT' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        syncKey: record.syncKey,
        payload: sanitized,
        updatedAt: record.updatedAt.toISOString(),
      },
    });
  } catch {
    // Database is optional in serverless deployments without DATABASE_URL configured
    return NextResponse.json(
      { success: false, error: 'CLOUD_DB_UNAVAILABLE' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { success: false, error: 'INVALID_JSON' },
      { status: 400 }
    );
  }

  const key = normalizeKey(typeof body.syncKey === 'string' ? body.syncKey : null);
  const sanitized = sanitizeSyncPayload(body.payload);

  if (!key || !sanitized) {
    return NextResponse.json(
      { success: false, error: 'INVALID_PAYLOAD_OR_KEY' },
      { status: 400 }
    );
  }

  try {
    const payloadJson = JSON.parse(JSON.stringify(sanitized)) as Prisma.InputJsonValue;
    const saved = await prisma.progressSnapshot.upsert({
      where: { syncKey: key },
      update: { payload: payloadJson },
      create: { syncKey: key, payload: payloadJson },
    });

    return NextResponse.json({
      success: true,
      data: {
        syncKey: saved.syncKey,
        updatedAt: saved.updatedAt.toISOString(),
      },
    });
  } catch {
    // Database is optional in serverless deployments without DATABASE_URL configured
    return NextResponse.json(
      { success: false, error: 'CLOUD_DB_UNAVAILABLE' },
      { status: 500 }
    );
  }
}
