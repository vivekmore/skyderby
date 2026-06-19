'use client'

import { useMemo } from 'react'
import { MapContainer, TileLayer, Polyline, useMap } from 'react-leaflet'
import type { LatLngExpression } from 'leaflet'
import { useTranslations } from 'next-intl'
import 'leaflet/dist/leaflet.css'
import type { TrackPoint } from '@/lib/api/types'

function FitBounds({ positions }: { positions: LatLngExpression[] }) {
  const map = useMap()
  if (positions.length > 0) {
    map.fitBounds(positions as [number, number][], { padding: [24, 24] })
  }
  return null
}

export function TrackMap({ points }: { points: TrackPoint[] }) {
  const t = useTranslations('viewer')

  const positions = useMemo<LatLngExpression[]>(
    () => points.map((p) => [p.latitude, p.longitude]),
    [points]
  )

  if (positions.length === 0) {
    return (
      <div className="flex h-72 items-center justify-center rounded-md border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
        {t('trajectory')}
      </div>
    )
  }

  return (
    <div
      role="region"
      aria-label={t('trajectory')}
      className="h-72 overflow-hidden rounded-md border border-slate-200"
    >
      <MapContainer
        center={positions[0]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline positions={positions} pathOptions={{ color: '#0284c7', weight: 4 }} />
        <FitBounds positions={positions} />
      </MapContainer>
    </div>
  )
}
