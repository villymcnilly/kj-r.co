import type {BundleKind, HeadlineTreatment, Language, SourceType} from '../../../shared/vocabulary.ts'

export type PortableText = Array<Record<string, any>>

export interface DossierRef {
  name: string
  slug: string
}

export interface SourceCard {
  _id: string
  title: string
  author?: string
  language: Language
  type: SourceType
  url: string
  publishedAt: string
  precis: string
  whyItMatters: string
  quote?: string
  quoteTranslation?: string
  outlet: {name: string; country?: string}
  dossiers?: DossierRef[]
}

export interface BundleItem {
  _key: string
  label?: string
  comment?: string
  source: SourceCard
}

export interface Bundle {
  _id: string
  kind: BundleKind
  kicker?: string
  headline: string
  slug: string
  dek?: string
  body?: PortableText
  items: BundleItem[]
  dossiers?: DossierRef[]
  publishedAt: string
}

export interface Video {
  title: string
  youtubeUrl: string
  format: 'kort' | 'lang'
  description?: string
}

export interface Issue {
  number: number
  date: string
  title?: string
  openQuestion?: string
  leader?: PortableText
  lead: Bundle
  side?: Bundle[]
  discourse?: Bundle
  briefs?: Bundle[]
  reflection?: PortableText
  video?: Video
  artDirection?: {
    color?: string
    theme?: string
    headlineTreatment?: HeadlineTreatment
    coverArt?: {asset?: {_ref: string}; alt?: string; credit?: string}
  }
  layoutVersion?: number
  access?: 'public' | 'members'
  seo?: {title?: string; description?: string}
  isDummy?: boolean
}
