import type { components } from './schema'

/**
 * Curated, ergonomic app types. `schema.d.ts` is generated from `openapi.yaml`
 * (run `npm run gen:api`); the checks at the bottom of this file fail the
 * typecheck if these types drift from the documented API contract.
 */
type Schemas = components['schemas']

export type SuitCategory = 'wingsuit' | 'tracksuit' | 'slick'

export interface Suit {
  id: number
  name: string
  make: string | null
  makeCode: string | null
  category: SuitCategory
}

export interface OnlineCompetitionGroup {
  id: number
  name: string
}

export interface OnlineCompetition {
  id: number
  name: string
  discipline: string
  rangeFrom: number | null
  rangeTo: number | null
  disciplineParameter: string | null
  periodFrom: string | null
  periodTo: string | null
  jumpsKind: string | null
  suitsKind: string | null
  group: OnlineCompetitionGroup | null
}

export interface PageMeta {
  currentPage: number
  totalPages: number
  totalCount: number
}

export interface Paginated<T> {
  items: T[]
  meta: PageMeta
}

export type PlaceKind = 'skydive' | 'base'

export interface Place {
  id: number
  name: string
  kind: PlaceKind
  latitude: number
  longitude: number
  country: { name: string | null; code: string | null }
}

export interface Profile {
  id: number
  name: string
  countryId: number | null
}

export interface TrackPoint {
  t: number
  altitude: number
  horizontalSpeed: number
  verticalSpeed: number
  glideRatio: number
  latitude: number
  longitude: number
}

// Compile-time guards: curated types must stay assignable to the generated schema.
type Extends<A, B> = A extends B ? true : false
type Assert<T extends true> = T
type _SuitMatches = Assert<Extends<Suit, Schemas['Suit']>>
type _PlaceMatches = Assert<Extends<Place, Schemas['Place']>>
type _ProfileMatches = Assert<Extends<Profile, Schemas['Profile']>>
