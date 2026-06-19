'use client'

import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import type { ColumnDef } from '@tanstack/react-table'
import { fetchSuits } from '@/lib/api/suits'
import type { Suit, SuitCategory } from '@/lib/api/types'
import { filterSuits } from '@/lib/filter-suits'
import { DataTable } from '@/components/data-table'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'

const filterSchema = z.object({
  query: z.string(),
  category: z.enum(['all', 'wingsuit', 'tracksuit', 'slick']),
})

type FilterValues = z.infer<typeof filterSchema>

const CATEGORIES: SuitCategory[] = ['wingsuit', 'tracksuit', 'slick']

export function SuitsBrowser({ initialData }: { initialData: Suit[] }) {
  const t = useTranslations('suits')

  const { register, watch } = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: { query: '', category: 'all' },
  })

  const { data = [] } = useQuery({
    queryKey: ['suits'],
    queryFn: ({ signal }) => fetchSuits({ signal }),
    initialData,
  })

  const filters = watch()

  const rows = useMemo(() => filterSuits(data, filters), [data, filters])

  const columns = useMemo<ColumnDef<Suit, unknown>[]>(
    () => [
      {
        accessorKey: 'name',
        header: t('columns.name'),
        cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
      },
      {
        accessorKey: 'make',
        header: t('columns.make'),
        cell: ({ row }) => row.original.make ?? '—',
      },
      {
        accessorKey: 'category',
        header: t('columns.category'),
        cell: ({ row }) => t(`categories.${row.original.category}`),
      },
    ],
    [t]
  )

  return (
    <div className="space-y-4">
      <form className="flex flex-col gap-3 sm:flex-row sm:items-center" role="search">
        <Input
          type="search"
          placeholder={t('search')}
          aria-label={t('search')}
          className="sm:max-w-xs"
          {...register('query')}
        />
        <Select aria-label={t('category')} {...register('category')}>
          <option value="all">{t('allCategories')}</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {t(`categories.${category}`)}
            </option>
          ))}
        </Select>
        <span className="text-sm text-slate-500" aria-live="polite">
          {t('count', { count: rows.length })}
        </span>
      </form>

      <DataTable columns={columns} data={rows} emptyLabel={t('empty')} />
    </div>
  )
}
