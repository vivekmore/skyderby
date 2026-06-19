import { setRequestLocale, getTranslations } from 'next-intl/server'
import { fetchSuits } from '@/lib/api/suits'
import type { Suit } from '@/lib/api/types'
import { SuitsBrowser } from '@/components/suits-browser'

export const dynamic = 'force-dynamic'

export default async function SuitsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('suits')
  const tErrors = await getTranslations('errors')

  let suits: Suit[] = []
  let loadError = false
  try {
    suits = await fetchSuits({ revalidate: 300 })
  } catch {
    loadError = true
  }

  return (
    <div className="space-y-5">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-slate-600">{t('subtitle')}</p>
      </header>

      {loadError ? (
        <p className="rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {tErrors('loadFailed')}
        </p>
      ) : (
        <SuitsBrowser initialData={suits} />
      )}
    </div>
  )
}
