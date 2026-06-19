import { setRequestLocale, getTranslations } from 'next-intl/server'
import { fetchOnlineCompetitions } from '@/lib/api/online-competitions'
import type { OnlineCompetition } from '@/lib/api/types'
import { Table, TBody, TD, TH, THead, TR } from '@/components/ui/table'

export const dynamic = 'force-dynamic'

export default async function OnlineCompetitionsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('competitions')
  const tErrors = await getTranslations('errors')

  let competitions: OnlineCompetition[] = []
  let loadError = false
  try {
    competitions = await fetchOnlineCompetitions({ revalidate: 300 })
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
        <Table>
          <THead>
            <TR>
              <TH>{t('columns.name')}</TH>
              <TH>{t('columns.discipline')}</TH>
              <TH>{t('columns.group')}</TH>
            </TR>
          </THead>
          <TBody>
            {competitions.length === 0 ? (
              <TR>
                <TD colSpan={3} className="py-8 text-center text-slate-500">
                  {t('empty')}
                </TD>
              </TR>
            ) : (
              competitions.map((c) => (
                <TR key={c.id}>
                  <TD className="font-medium">{c.name}</TD>
                  <TD>{c.discipline}</TD>
                  <TD>{c.group?.name ?? '—'}</TD>
                </TR>
              ))
            )}
          </TBody>
        </Table>
      )}
    </div>
  )
}
