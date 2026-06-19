import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NextIntlClientProvider } from 'next-intl'
import messages from '../../messages/en.json'
import { SuitsBrowser } from './suits-browser'
import type { Suit } from '@/lib/api/types'

const SUITS: Suit[] = [
  { id: 1, name: 'Freak', make: 'Squirrel', makeCode: 'SQ', category: 'wingsuit' },
  { id: 2, name: 'Mojo', make: 'Phoenix-Fly', makeCode: 'PF', category: 'tracksuit' },
]

function renderBrowser() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <QueryClientProvider client={client}>
        <SuitsBrowser initialData={SUITS} />
      </QueryClientProvider>
    </NextIntlClientProvider>
  )
}

describe('SuitsBrowser', () => {
  it('renders all suits initially', () => {
    renderBrowser()
    expect(screen.getByText('Freak')).toBeInTheDocument()
    expect(screen.getByText('Mojo')).toBeInTheDocument()
  })

  it('filters suits by the search box', async () => {
    const user = userEvent.setup()
    renderBrowser()

    await user.type(screen.getByRole('searchbox'), 'mojo')

    expect(screen.queryByText('Freak')).not.toBeInTheDocument()
    expect(screen.getByText('Mojo')).toBeInTheDocument()
  })

  it('filters suits by category', async () => {
    const user = userEvent.setup()
    renderBrowser()

    await user.selectOptions(screen.getByRole('combobox'), 'wingsuit')

    expect(screen.getByText('Freak')).toBeInTheDocument()
    expect(screen.queryByText('Mojo')).not.toBeInTheDocument()
  })

  it('shows an empty state when nothing matches', async () => {
    const user = userEvent.setup()
    renderBrowser()

    await user.type(screen.getByRole('searchbox'), 'zzz-no-match')

    const table = screen.getByRole('table')
    expect(within(table).getByText(messages.suits.empty)).toBeInTheDocument()
  })
})
