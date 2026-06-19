'use client'

import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

const ITEMS = [
  { href: '/', key: 'home' as const },
  { href: '/suits', key: 'suits' as const },
  { href: '/online-competitions', key: 'onlineCompetitions' as const },
  { href: '/tracks/demo', key: 'trackViewer' as const },
]

export function SiteNav() {
  const t = useTranslations('nav')
  const pathname = usePathname()

  return (
    <header className="border-b border-slate-200 bg-white">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-5xl flex-wrap items-center gap-1 px-4 py-3"
      >
        <Link href="/" className="mr-4 text-lg font-bold text-sky-700">
          Skyderby
        </Link>
        {ITEMS.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm font-medium',
                active ? 'bg-sky-50 text-sky-700' : 'text-slate-600 hover:bg-slate-100'
              )}
            >
              {t(item.key)}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
