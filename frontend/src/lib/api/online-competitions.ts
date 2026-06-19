import { apiGet } from './client'
import type { OnlineCompetition } from './types'

interface RawGroup {
  id: number
  name: string
}

interface RawOnlineCompetition {
  id: number
  name: string
  discipline: string
  range_from?: number | null
  range_to?: number | null
  discipline_parameter?: string | null
  period_from?: string | null
  period_to?: string | null
  jumps_kind?: string | null
  suits_kind?: string | null
  group?: RawGroup | null
}

interface RawResponse {
  online_competitions?: RawOnlineCompetition[]
}

function normalize(raw: RawOnlineCompetition): OnlineCompetition {
  return {
    id: raw.id,
    name: raw.name,
    discipline: raw.discipline,
    rangeFrom: raw.range_from ?? null,
    rangeTo: raw.range_to ?? null,
    disciplineParameter: raw.discipline_parameter ?? null,
    periodFrom: raw.period_from ?? null,
    periodTo: raw.period_to ?? null,
    jumpsKind: raw.jumps_kind ?? null,
    suitsKind: raw.suits_kind ?? null,
    group: raw.group ?? null,
  }
}

export async function fetchOnlineCompetitions(options?: {
  revalidate?: number
  signal?: AbortSignal
}): Promise<OnlineCompetition[]> {
  const data = await apiGet<RawResponse>('/virtual_competitions.json', options)
  return (data.online_competitions ?? []).map(normalize)
}
