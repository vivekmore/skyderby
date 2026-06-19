import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('home')

  const links = [
    { href: '/suits', label: t('exploreSuits') },
    { href: '/online-competitions', label: t('exploreCompetitions') },
    { href: '/tracks/demo', label: t('exploreViewer') },
  ]

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="max-w-2xl text-slate-600">{t('tagline')}</p>
      </section>

      <div className="grid gap-4 sm:grid-cols-3">
        {links.map((link) => (
          <Card key={link.href}>
            <CardContent className="flex h-full flex-col justify-between gap-4 pt-5">
              <CardTitle className="text-base">{link.label}</CardTitle>
              <Link
                href={link.href}
                className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
              >
                →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
