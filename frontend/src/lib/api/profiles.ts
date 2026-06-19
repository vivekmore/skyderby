import { apiGet } from './client'
import type { Paginated, Profile, PageMeta } from './types'

interface RawResponse {
  profiles: Profile[]
  meta: PageMeta
}

export async function fetchProfiles(
  params: { query?: string; page?: number } = {},
  options?: { revalidate?: number; signal?: AbortSignal }
): Promise<Paginated<Profile>> {
  const search = new URLSearchParams()
  if (params.query) search.set('query', params.query)
  if (params.page) search.set('page', String(params.page))
  const qs = search.toString()

  const data = await apiGet<RawResponse>(`/profiles.json${qs ? `?${qs}` : ''}`, options)
  return { items: data.profiles ?? [], meta: data.meta }
}
