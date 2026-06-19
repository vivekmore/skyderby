import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface SearchFormProps {
  name: string
  label: string
  defaultValue?: string
  submitLabel: string
}

/**
 * Progressive-enhancement search form: a plain GET form that submits to the
 * current route, so search works without client JavaScript and keeps the query
 * in the URL (shareable, SSR-friendly).
 */
export function SearchForm({ name, label, defaultValue = '', submitLabel }: SearchFormProps) {
  return (
    <form role="search" className="flex gap-2">
      <Input
        type="search"
        name={name}
        defaultValue={defaultValue}
        placeholder={label}
        aria-label={label}
        className="sm:max-w-sm"
      />
      <Button type="submit" variant="outline">
        {submitLabel}
      </Button>
    </form>
  )
}
