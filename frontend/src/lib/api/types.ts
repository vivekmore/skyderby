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

export interface TrackPoint {
  t: number
  altitude: number
  horizontalSpeed: number
  verticalSpeed: number
  glideRatio: number
  latitude: number
  longitude: number
}
