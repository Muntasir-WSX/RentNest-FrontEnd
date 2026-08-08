import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const BACKEND_API_URL =
  process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_BACKEND_API_URL;

export async function POST(request: Request) {
  if (!BACKEND_API_URL) {
    return NextResponse.json(
      {
        success: false,
        message: 'Backend API URL is not configured.',
      },
      { status: 500 }
    );
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return NextResponse.json(
      {
        success: false,
        message: 'Unauthorized. Please login first.',
      },
      { status: 401 }
    );
  }

  let payload: { propertyId?: string; startDate?: string; endDate?: string };

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Invalid request body.',
      },
      { status: 400 }
    );
  }

  if (!payload.propertyId || !payload.startDate || !payload.endDate) {
    return NextResponse.json(
      {
        success: false,
        message: 'propertyId, startDate, and endDate are required.',
      },
      { status: 400 }
    );
  }

  try {
    const backendResponse = await fetch(`${BACKEND_API_URL}/api/rentals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    const responseText = await backendResponse.text();

    try {
      const parsed = JSON.parse(responseText);
      return NextResponse.json(parsed, { status: backendResponse.status });
    } catch {
      return NextResponse.json(
        {
          success: backendResponse.ok,
          message: responseText || 'Unexpected backend response.',
        },
        { status: backendResponse.status }
      );
    }
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to connect to backend service.',
      },
      { status: 502 }
    );
  }
}
