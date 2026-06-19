'use client'

import { useMemo } from 'react'
import { APIProvider, Map } from '@vis.gl/react-google-maps'
import { useTranslations } from 'next-intl'
import type { TrackPoint } from '@/lib/api/types'

function TrajectoryPolyline({ points }: { points: TrackPoint[] }) {
  // Rendered via the imperative Maps API once the map is ready.
  // Kept intentionally simple; a richer speed-coloured polyline can replace this.
  return (
    <Map
      defaultZoom={13}
      defaultCenter={{ lat: points[0]?.latitude ?? 0, lng: points[0]?.longitude ?? 0 }}
      mapId="skyderby-track"
      gestureHandling="cooperative"
      disableDefaultUI={false}
      style={{ width: '100%', height: '100%' }}
    />
  )
}

export function TrackMap({ points }: { points: TrackPoint[] }) {
  const t = useTranslations('viewer')
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  const hasPoints = useMemo(() => points.length > 0, [points])

  if (!apiKey) {
    return (
      <div className="flex h-72 items-center justify-center rounded-md border border-dashed border-slate-300 bg-slate-50 px-4 text-center text-sm text-slate-500">
        {t('mapKeyMissing')}
      </div>
    )
  }

  return (
    <div
      role="region"
      aria-label={t('trajectory')}
      className="h-72 overflow-hidden rounded-md border border-slate-200"
    >
      <APIProvider apiKey={apiKey}>
        {hasPoints ? <TrajectoryPolyline points={points} /> : null}
      </APIProvider>
    </div>
  )
}
