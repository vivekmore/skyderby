import { NextResponse, type NextRequest } from 'next/server'
import { SESSION_COOKIE } from '@/lib/auth/config'

export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(new URL('/', request.url))
  response.cookies.delete(SESSION_COOKIE)
  return response
}
