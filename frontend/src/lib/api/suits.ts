import { apiGet } from './client'
import type { Suit } from './types'

export function fetchSuits(options?: {
  revalidate?: number
  signal?: AbortSignal
}): Promise<Suit[]> {
  return apiGet<Suit[]>('/suits.json', options)
}
