import { apiGet } from './client'
import type { Paginated, Place, PageMeta } from './types'

interface RawResponse {
  places: Place[]
  meta: PageMeta
}

export async function fetchPlaces(
  params: { query?: string; page?: number } = {},
  options?: { revalidate?: number; signal?: AbortSignal }
): Promise<Paginated<Place>> {
  const search = new URLSearchParams()
  if (params.query) search.set('query', params.query)
  if (params.page) search.set('page', String(params.page))
  const qs = search.toString()

  const data = await apiGet<RawResponse>(`/places.json${qs ? `?${qs}` : ''}`, options)
  return { items: data.places ?? [], meta: data.meta }
}
