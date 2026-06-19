const base = process.env.API_BASE_URL ?? 'http://localhost:3000'

export const authConfig = {
  clientId: process.env.OAUTH_CLIENT_ID ?? '',
  redirectUri: process.env.OAUTH_REDIRECT_URI ?? 'http://localhost:3000/api/auth/callback',
  authorizeUrl: `${base}/oauth/authorize`,
  tokenUrl: `${base}/oauth/token`,
  scope: process.env.OAUTH_SCOPE ?? 'read',
}

export function authConfigured(): boolean {
  return authConfig.clientId.length > 0
}

export const SESSION_COOKIE = 'skyderby_token'
export const VERIFIER_COOKIE = 'skyderby_pkce'
export const STATE_COOKIE = 'skyderby_oauth_state'
