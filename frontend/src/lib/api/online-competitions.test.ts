import { describe, it, expect, vi, afterEach } from 'vitest'
import { fetchOnlineCompetitions } from './online-competitions'

function mockFetch(body: unknown, ok = true, status = 200) {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => ({
      ok,
      status,
      json: async () => body,
    }))
  )
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('fetchOnlineCompetitions', () => {
  it('normalizes snake_case fields to camelCase', async () => {
    mockFetch({
      online_competitions: [
        {
          id: 7,
          name: 'Wingsuit Distance',
          discipline: 'distance',
          range_from: 0,
          range_to: 3000,
          jumps_kind: 'wingsuit',
          group: { id: 1, name: 'Skydive' },
        },
      ],
    })

    const result = await fetchOnlineCompetitions()
    expect(result).toEqual([
      {
        id: 7,
        name: 'Wingsuit Distance',
        discipline: 'distance',
        rangeFrom: 0,
        rangeTo: 3000,
        disciplineParameter: null,
        periodFrom: null,
        periodTo: null,
        jumpsKind: 'wingsuit',
        suitsKind: null,
        group: { id: 1, name: 'Skydive' },
      },
    ])
  })

  it('returns an empty array when there are no competitions', async () => {
    mockFetch({ online_competitions: [] })
    expect(await fetchOnlineCompetitions()).toEqual([])
  })

  it('tolerates a missing key', async () => {
    mockFetch({})
    expect(await fetchOnlineCompetitions()).toEqual([])
  })
})
