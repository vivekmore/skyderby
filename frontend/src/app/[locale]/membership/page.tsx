import { setRequestLocale, getTranslations } from 'next-intl/server'
import { apiBaseUrl } from '@/lib/api/client'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export default async function MembershipPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('membership')

  const subscriptionsUrl = `${apiBaseUrl()}/subscriptions`

  return (
    <div className="space-y-5">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-slate-600">{t('subtitle')}</p>
      </header>

      <Card>
        <CardContent className="space-y-4 pt-5">
          <CardTitle className="text-base">{t('cta')}</CardTitle>
          <p className="text-sm text-slate-600">{t('note')}</p>
          <a
            href={subscriptionsUrl}
            className={cn(buttonVariants({ variant: 'primary', size: 'md' }))}
          >
            {t('cta')}
          </a>
        </CardContent>
      </Card>
    </div>
  )
}
