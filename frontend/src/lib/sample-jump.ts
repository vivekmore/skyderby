import type { TrackPoint } from '@/lib/api/types'

/**
 * A representative wingsuit descent used to demonstrate the track viewer until
 * the per-track points endpoint is wired in. Roughly models a flight from
 * ~3000 m down to ~1500 m with a steadying glide ratio.
 */
export function sampleJump(): TrackPoint[] {
  const points: TrackPoint[] = []
  const startAlt = 3000
  const baseLat = 46.0207
  const baseLng = 11.123

  for (let i = 0; i <= 60; i++) {
    const altitude = startAlt - i * 25
    const progress = i / 60
    const horizontalSpeed = 120 + Math.sin(progress * Math.PI) * 60
    const verticalSpeed = 95 - Math.sin(progress * Math.PI) * 35
    const glideRatio = Number((horizontalSpeed / verticalSpeed).toFixed(2))

    points.push({
      t: i,
      altitude,
      horizontalSpeed: Math.round(horizontalSpeed),
      verticalSpeed: Math.round(verticalSpeed),
      glideRatio,
      latitude: baseLat + progress * 0.02,
      longitude: baseLng + progress * 0.03,
    })
  }

  return points
}
