import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Progress sync endpoint ready for Prisma DB or LocalStorage client sync',
  });
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    return NextResponse.json({
      success: true,
      received: data,
      syncedAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to sync progress' },
      { status: 400 }
    );
  }
}
