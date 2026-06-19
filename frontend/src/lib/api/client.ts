const SERVER_BASE = process.env.API_BASE_URL ?? 'http://localhost:3000'
const CLIENT_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000'

export function apiBaseUrl(): string {
  return typeof window === 'undefined' ? SERVER_BASE : CLIENT_BASE
}

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

interface ApiGetOptions {
  /** Next.js revalidate window in seconds for server-side fetches. */
  revalidate?: number
  signal?: AbortSignal
}

export async function apiGet<T>(path: string, options: ApiGetOptions = {}): Promise<T> {
  const url = `${apiBaseUrl()}/api/v1${path}`

  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
    signal: options.signal,
    next: options.revalidate !== undefined ? { revalidate: options.revalidate } : undefined,
  })

  if (!res.ok) {
    throw new ApiError(`GET ${path} failed with ${res.status}`, res.status)
  }

  return (await res.json()) as T
}

/** GET a site-level (non /api/v1) JSON endpoint, e.g. public track points. */
export async function siteGet<T>(path: string, options: ApiGetOptions = {}): Promise<T> {
  const res = await fetch(`${apiBaseUrl()}${path}`, {
    headers: { Accept: 'application/json' },
    signal: options.signal,
    next: options.revalidate !== undefined ? { revalidate: options.revalidate } : undefined,
  })

  if (!res.ok) {
    throw new ApiError(`GET ${path} failed with ${res.status}`, res.status)
  }

  return (await res.json()) as T
}
