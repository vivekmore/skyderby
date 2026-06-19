import { setRequestLocale, getTranslations } from 'next-intl/server'
import { TrackViewer } from '@/components/track-viewer'

export default async function TrackDemoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('viewer')

  return (
    <div className="space-y-5">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-slate-600">{t('subtitle')}</p>
      </header>
      <TrackViewer />
    </div>
  )
}
