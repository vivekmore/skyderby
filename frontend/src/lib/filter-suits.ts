import type { Suit, SuitCategory } from '@/lib/api/types'

export type CategoryFilter = SuitCategory | 'all'

export interface SuitFilters {
  query: string
  category: CategoryFilter
}

export function filterSuits(suits: Suit[], filters: SuitFilters): Suit[] {
  const q = filters.query.trim().toLowerCase()
  return suits.filter((suit) => {
    if (filters.category !== 'all' && suit.category !== filters.category) return false
    if (!q) return true
    return suit.name.toLowerCase().includes(q) || (suit.make ?? '').toLowerCase().includes(q)
  })
}
