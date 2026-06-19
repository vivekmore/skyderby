import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { fetchSuits } from '@/lib/api/suits'
import { fetchPlaces } from '@/lib/api/places'
import { fetchProfiles } from '@/lib/api/profiles'
import { filterSuits } from '@/lib/filter-suits'
import type { Place, Profile, Suit } from '@/lib/api/types'
import { SearchForm } from '@/components/search-form'
import { Card, CardContent, CardTitle } from '@/components/ui/card'

export const dynamic = 'force-dynamic'

interface Results {
  suits: Suit[]
  places: Place[]
  profiles: Profile[]
}

async function search(query: string): Promise<Results> {
  const [suits, places, profiles] = await Promise.all([
    fetchSuits().then((all) => filterSuits(all, { query, category: 'all' }).slice(0, 10)),
    fetchPlaces({ query }).then((r) => r.items.slice(0, 10)),
    fetchProfiles({ query }).then((r) => r.items.slice(0, 10)),
  ])
  return { suits, places, profiles }
}

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ q?: string }>
}) {
  const { locale } = await params
  const { q = '' } = await searchParams
  setRequestLocale(locale)
  const t = await getTranslations('search')
  const tErrors = await getTranslations('errors')

  const query = q.trim()
  let results: Results | null = null
  let loadError = false

  if (query) {
    try {
      results = await search(query)
    } catch {
      loadError = true
    }
  }

  const total = results ? results.suits.length + results.places.length + results.profiles.length : 0

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-slate-600">{t('subtitle')}</p>
      </header>

      <SearchForm name="q" label={t('placeholder')} defaultValue={q} submitLabel={t('title')} />

      {!query ? (
        <p className="text-slate-500">{t('prompt')}</p>
      ) : loadError ? (
        <p className="rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {tErrors('loadFailed')}
        </p>
      ) : total === 0 ? (
        <p className="text-slate-500">{t('noResults', { query })}</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          <ResultGroup title={t('groups.suits')}>
            {results!.suits.map((s) => (
              <li key={`suit-${s.id}`}>
                <Link href="/suits" className="text-sky-700 hover:underline">
                  {s.name}
                  {s.make ? ` · ${s.make}` : ''}
                </Link>
              </li>
            ))}
          </ResultGroup>
          <ResultGroup title={t('groups.places')}>
            {results!.places.map((p) => (
              <li key={`place-${p.id}`}>
                <Link href="/places" className="text-sky-700 hover:underline">
                  {p.name}
                </Link>
              </li>
            ))}
          </ResultGroup>
          <ResultGroup title={t('groups.profiles')}>
            {results!.profiles.map((p) => (
              <li key={`profile-${p.id}`}>
                <Link href="/profiles" className="text-sky-700 hover:underline">
                  {p.name}
                </Link>
              </li>
            ))}
          </ResultGroup>
        </div>
      )}
    </div>
  )
}

function ResultGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardContent className="space-y-2 pt-5">
        <CardTitle className="text-sm uppercase tracking-wide text-slate-500">{title}</CardTitle>
        <ul className="space-y-1 text-sm">{children}</ul>
      </CardContent>
    </Card>
  )
}
