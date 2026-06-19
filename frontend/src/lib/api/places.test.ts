import { describe, it, expect, vi, afterEach } from 'vitest'
import { fetchPlaces } from './places'

function mockFetch(body: unknown) {
  vi.stubGlobal(
    'fetch',
    vi.fn(async (url: string) => {
      ;(mockFetch as unknown as { lastUrl: string }).lastUrl = url
      return { ok: true, status: 200, json: async () => body }
    })
  )
}

afterEach(() => vi.unstubAllGlobals())

describe('fetchPlaces', () => {
  it('returns items and meta', async () => {
    mockFetch({
      places: [
        {
          id: 1,
          name: 'Hellesylt',
          kind: 'base',
          latitude: 62.08,
          longitude: 6.86,
          country: { name: 'Norway', code: 'NO' },
        },
      ],
      meta: { currentPage: 1, totalPages: 1, totalCount: 1 },
    })

    const result = await fetchPlaces()
    expect(result.items).toHaveLength(1)
    expect(result.items[0].name).toBe('Hellesylt')
    expect(result.meta.totalCount).toBe(1)
  })

  it('encodes the query parameter', async () => {
    mockFetch({ places: [], meta: { currentPage: 1, totalPages: 0, totalCount: 0 } })
    await fetchPlaces({ query: 'monte brento' })
    expect((mockFetch as unknown as { lastUrl: string }).lastUrl).toContain('query=monte+brento')
  })
})
