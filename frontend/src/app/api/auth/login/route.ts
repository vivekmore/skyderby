import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { authConfig, authConfigured, STATE_COOKIE, VERIFIER_COOKIE } from '@/lib/auth/config'
import { buildAuthorizeUrl, challengeFromVerifier, randomVerifier } from '@/lib/auth/pkce'

export async function GET() {
  if (!authConfigured()) {
    return NextResponse.json(
      { error: 'OAuth is not configured. Set OAUTH_CLIENT_ID.' },
      { status: 503 }
    )
  }

  const verifier = randomVerifier()
  const challenge = await challengeFromVerifier(verifier)
  const state = randomVerifier(16)

  const authorizeUrl = buildAuthorizeUrl({
    authorizeUrl: authConfig.authorizeUrl,
    clientId: authConfig.clientId,
    redirectUri: authConfig.redirectUri,
    challenge,
    state,
    scope: authConfig.scope,
  })

  const jar = await cookies()
  const secure = process.env.NODE_ENV === 'production'
  jar.set(VERIFIER_COOKIE, verifier, { httpOnly: true, sameSite: 'lax', secure, path: '/' })
  jar.set(STATE_COOKIE, state, { httpOnly: true, sameSite: 'lax', secure, path: '/' })

  return NextResponse.redirect(authorizeUrl)
}
