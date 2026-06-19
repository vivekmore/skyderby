import { describe, it, expect } from 'vitest'
import { randomVerifier, challengeFromVerifier, buildAuthorizeUrl } from './pkce'

describe('pkce', () => {
  it('generates URL-safe verifiers of varying length', () => {
    const a = randomVerifier()
    const b = randomVerifier()
    expect(a).not.toEqual(b)
    expect(a).toMatch(/^[A-Za-z0-9_-]+$/)
  })

  it('derives a deterministic S256 challenge from a verifier', async () => {
    const verifier = 'test-verifier-123'
    const c1 = await challengeFromVerifier(verifier)
    const c2 = await challengeFromVerifier(verifier)
    expect(c1).toEqual(c2)
    expect(c1).toMatch(/^[A-Za-z0-9_-]+$/)
    expect(c1).not.toContain('=')
  })

  it('builds an authorize URL with the PKCE parameters', () => {
    const url = new URL(
      buildAuthorizeUrl({
        authorizeUrl: 'http://localhost:3000/oauth/authorize',
        clientId: 'abc',
        redirectUri: 'http://localhost:3000/api/auth/callback',
        challenge: 'chal',
        state: 'xyz',
        scope: 'read',
      })
    )

    expect(url.searchParams.get('response_type')).toBe('code')
    expect(url.searchParams.get('client_id')).toBe('abc')
    expect(url.searchParams.get('code_challenge')).toBe('chal')
    expect(url.searchParams.get('code_challenge_method')).toBe('S256')
    expect(url.searchParams.get('state')).toBe('xyz')
  })
})
