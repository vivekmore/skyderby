import { NextResponse, type NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import {
  authConfig,
  authConfigured,
  SESSION_COOKIE,
  STATE_COOKIE,
  VERIFIER_COOKIE,
} from '@/lib/auth/config'

export async function GET(request: NextRequest) {
  if (!authConfigured()) {
    return NextResponse.json({ error: 'OAuth is not configured.' }, { status: 503 })
  }

  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')

  const jar = await cookies()
  const verifier = jar.get(VERIFIER_COOKIE)?.value
  const expectedState = jar.get(STATE_COOKIE)?.value

  if (!code || !verifier || !state || state !== expectedState) {
    return NextResponse.json({ error: 'Invalid OAuth callback.' }, { status: 400 })
  }

  const res = await fetch(authConfig.tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      code,
      client_id: authConfig.clientId,
      redirect_uri: authConfig.redirectUri,
      code_verifier: verifier,
    }),
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'Token exchange failed.' }, { status: 502 })
  }

  const token = (await res.json()) as { access_token: string; expires_in?: number }

  const response = NextResponse.redirect(new URL('/', request.url))
  const secure = process.env.NODE_ENV === 'production'
  response.cookies.set(SESSION_COOKIE, token.access_token, {
    httpOnly: true,
    sameSite: 'lax',
    secure,
    path: '/',
    maxAge: token.expires_in ?? 3600,
  })
  response.cookies.delete(VERIFIER_COOKIE)
  response.cookies.delete(STATE_COOKIE)
  return response
}
