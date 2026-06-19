import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { Providers } from '@/components/providers'
import { SiteNav } from '@/components/site-nav'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Skyderby',
  description:
    'GPS track analysis, rankings and competition scoring for skydivers and BASE jumpers.',
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  return (
    <html lang={locale}>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <NextIntlClientProvider>
          <Providers>
            <SiteNav />
            <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
