import { setRequestLocale, getTranslations } from 'next-intl/server'
import { TrackViewer } from '@/components/track-viewer'
import { fetchTrackPoints } from '@/lib/api/track-points'
import { sampleJump } from '@/lib/sample-jump'
import type { TrackPoint } from '@/lib/api/types'

export const dynamic = 'force-dynamic'

export default async function TrackDemoPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ track?: string }>
}) {
  const { locale } = await params
  const { track } = await searchParams
  setRequestLocale(locale)
  const t = await getTranslations('viewer')

  let points: TrackPoint[] = []
  let isSample = true

  if (track) {
    try {
      const real = await fetchTrackPoints(track, { revalidate: 300 })
      if (real.length > 0) {
        points = real
        isSample = false
      }
    } catch {
      // fall back to the sample jump below
    }
  }

  if (points.length === 0) {
    points = sampleJump()
    isSample = true
  }

  return (
    <div className="space-y-5">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-slate-600">{t('subtitle')}</p>
      </header>
      <TrackViewer points={points} isSample={isSample} />
    </div>
  )
}
