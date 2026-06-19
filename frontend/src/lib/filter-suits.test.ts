import { describe, it, expect } from 'vitest'
import { filterSuits } from './filter-suits'
import type { Suit } from './api/types'

const SUITS: Suit[] = [
  { id: 1, name: 'Freak', make: 'Squirrel', makeCode: 'SQ', category: 'wingsuit' },
  { id: 2, name: 'Aura', make: 'Squirrel', makeCode: 'SQ', category: 'wingsuit' },
  { id: 3, name: 'Mojo', make: 'Phoenix-Fly', makeCode: 'PF', category: 'tracksuit' },
  { id: 4, name: 'Slick', make: null, makeCode: null, category: 'slick' },
]

describe('filterSuits', () => {
  it('returns all suits with an empty query and no category', () => {
    expect(filterSuits(SUITS, { query: '', category: 'all' })).toHaveLength(4)
  })

  it('matches by suit name (case-insensitive)', () => {
    const result = filterSuits(SUITS, { query: 'aura', category: 'all' })
    expect(result.map((s) => s.id)).toEqual([2])
  })

  it('matches by manufacturer name', () => {
    const result = filterSuits(SUITS, { query: 'squirrel', category: 'all' })
    expect(result.map((s) => s.id)).toEqual([1, 2])
  })

  it('filters by category', () => {
    const result = filterSuits(SUITS, { query: '', category: 'tracksuit' })
    expect(result.map((s) => s.id)).toEqual([3])
  })

  it('combines query and category', () => {
    const result = filterSuits(SUITS, { query: 'squirrel', category: 'wingsuit' })
    expect(result.map((s) => s.id)).toEqual([1, 2])
  })

  it('tolerates suits without a manufacturer', () => {
    const result = filterSuits(SUITS, { query: 'slick', category: 'all' })
    expect(result.map((s) => s.id)).toEqual([4])
  })

  it('ignores surrounding whitespace in the query', () => {
    const result = filterSuits(SUITS, { query: '   mojo   ', category: 'all' })
    expect(result.map((s) => s.id)).toEqual([3])
  })
})
