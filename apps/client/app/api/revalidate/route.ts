import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { APIError } from '@gratuity/shared/types/errors';

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  const path = request.nextUrl.searchParams.get('path');

  if (secret !== process.env.NEXT_REVALIDATE_SECRET) {
    const error: APIError = { statusCode: 401, message: 'Invalid secret', code: 'INVALID_SECRET' };
    return NextResponse.json(error, { status: error.statusCode });
  }

  if (!path) {
    const error: APIError = { statusCode: 400, message: 'Missing path parameter', code: 'MISSING_PATH' };
    return NextResponse.json(error, { status: error.statusCode });
  }

  try {
    revalidatePath(path);
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    console.error('Error revalidating path:', err);
    const error: APIError = { statusCode: 500, message: 'Error revalidating', code: 'REVALIDATION_FAILED', details: (err as Error).message };
    return NextResponse.json(error, { status: error.statusCode });
  }
}
