import { siteGet } from './client'
import type { TrackPoint } from './types'

interface RawPoint {
  flTime: number
  altitude: number
  hSpeed: number
  vSpeed: number
  glideRatio: number
  latitude: number
  longitude: number
}

interface RawResponse {
  points: RawPoint[]
}

const MS_TO_KMH = 3.6

/**
 * Fetches points for a public track from the site endpoint
 * (`/tracks/:id/points.json`) and maps them to the viewer's shape. Speeds are
 * returned in m/s by the API and converted to km/h here.
 */
export async function fetchTrackPoints(
  trackId: number | string,
  options?: { revalidate?: number; signal?: AbortSignal }
): Promise<TrackPoint[]> {
  const data = await siteGet<RawResponse>(`/tracks/${trackId}/points.json`, options)
  return (data.points ?? []).map((p) => ({
    t: p.flTime,
    altitude: p.altitude,
    horizontalSpeed: Math.round(p.hSpeed * MS_TO_KMH),
    verticalSpeed: Math.round(p.vSpeed * MS_TO_KMH),
    glideRatio: p.glideRatio,
    latitude: p.latitude,
    longitude: p.longitude,
  }))
}
