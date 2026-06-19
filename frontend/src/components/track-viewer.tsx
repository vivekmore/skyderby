'use client'

import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import type { TrackPoint } from '@/lib/api/types'

const TrackChart = dynamic(() => import('./track-chart').then((m) => m.TrackChart), {
  ssr: false,
  loading: () => <ChartSkeleton />,
})

const TrackMap = dynamic(() => import('./track-map').then((m) => m.TrackMap), {
  ssr: false,
  loading: () => <div className="h-72 animate-pulse rounded-md bg-slate-100" />,
})

function ChartSkeleton() {
  return <div className="h-80 animate-pulse rounded-md bg-slate-100" />
}

export function TrackViewer({ points, isSample }: { points: TrackPoint[]; isSample: boolean }) {
  const t = useTranslations('viewer')

  return (
    <div className="space-y-4">
      {isSample ? <p className="text-sm text-slate-500">{t('sampleNotice')}</p> : null}
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <TrackChart points={points} />
      </div>
      <TrackMap points={points} />
    </div>
  )
}
