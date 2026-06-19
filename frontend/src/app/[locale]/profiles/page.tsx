import { setRequestLocale, getTranslations } from 'next-intl/server'
import { fetchProfiles } from '@/lib/api/profiles'
import type { Profile } from '@/lib/api/types'
import { SearchForm } from '@/components/search-form'
import { Table, TBody, TD, TH, THead, TR } from '@/components/ui/table'

export const dynamic = 'force-dynamic'

export default async function ProfilesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ query?: string }>
}) {
  const { locale } = await params
  const { query = '' } = await searchParams
  setRequestLocale(locale)
  const t = await getTranslations('profiles')
  const tErrors = await getTranslations('errors')
  const tNav = await getTranslations('nav')

  let profiles: Profile[] = []
  let loadError = false
  try {
    const result = await fetchProfiles({ query: query || undefined }, { revalidate: 300 })
    profiles = result.items
  } catch {
    loadError = true
  }

  return (
    <div className="space-y-5">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-slate-600">{t('subtitle')}</p>
      </header>

      <SearchForm
        name="query"
        label={t('search')}
        defaultValue={query}
        submitLabel={tNav('search')}
      />

      {loadError ? (
        <p className="rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {tErrors('loadFailed')}
        </p>
      ) : (
        <>
          <p className="text-sm text-slate-500">{t('count', { count: profiles.length })}</p>
          <Table>
            <THead>
              <TR>
                <TH>{t('columns.name')}</TH>
              </TR>
            </THead>
            <TBody>
              {profiles.length === 0 ? (
                <TR>
                  <TD className="py-8 text-center text-slate-500">{t('empty')}</TD>
                </TR>
              ) : (
                profiles.map((profile) => (
                  <TR key={profile.id}>
                    <TD className="font-medium">{profile.name}</TD>
                  </TR>
                ))
              )}
            </TBody>
          </Table>
        </>
      )}
    </div>
  )
}
