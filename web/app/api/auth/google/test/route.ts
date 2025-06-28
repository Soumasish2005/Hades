import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const nextAuthUrl = process.env.NEXTAUTH_URL;
    const publicClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    const config = {
      hasClientId: !!clientId,
      hasClientSecret: !!clientSecret,
      hasNextAuthUrl: !!nextAuthUrl,
      hasPublicClientId: !!publicClientId,
      nextAuthUrl,
      clientIdPrefix: clientId ? clientId.substring(0, 10) + '...' : 'not set',
      publicClientIdPrefix: publicClientId ? publicClientId.substring(0, 10) + '...' : 'not set'
    };

    return NextResponse.json({
      status: 'ok',
      config,
      message: 'OAuth configuration check completed'
    });

  } catch (error) {
    console.error('OAuth test error:', error);
    return NextResponse.json({ 
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 