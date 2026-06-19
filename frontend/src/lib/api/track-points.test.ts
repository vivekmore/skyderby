import { describe, it, expect, vi, afterEach } from 'vitest'
import { fetchTrackPoints } from './track-points'

function mockFetch(body: unknown) {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => ({ ok: true, status: 200, json: async () => body }))
  )
}

afterEach(() => vi.unstubAllGlobals())

describe('fetchTrackPoints', () => {
  it('maps API points and converts speeds from m/s to km/h', async () => {
    mockFetch({
      points: [
        {
          flTime: 0,
          altitude: 3000,
          hSpeed: 30, // m/s -> 108 km/h
          vSpeed: 20, // m/s -> 72 km/h
          glideRatio: 1.5,
          latitude: 46.02,
          longitude: 11.12,
        },
      ],
    })

    const points = await fetchTrackPoints(123)
    expect(points).toHaveLength(1)
    expect(points[0].horizontalSpeed).toBe(108)
    expect(points[0].verticalSpeed).toBe(72)
    expect(points[0].altitude).toBe(3000)
  })

  it('returns an empty array when there are no points', async () => {
    mockFetch({ points: [] })
    expect(await fetchTrackPoints(1)).toEqual([])
  })
})
