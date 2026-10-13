import {brand} from '../../../brand.config.ts'
import {languages, sourceTypes, labelFor} from '../../../shared/vocabulary.ts'

const tz = 'Europe/Copenhagen'

/** Datoer uden klokkeslæt (2026-10-09) læses som middag, så de ikke skifter dag i nogen tidszone. */
const toDate = (iso: string) => new Date(/^\d{4}-\d{2}-\d{2}$/.test(iso) ? `${iso}T12:00:00Z` : iso)

/** »9. oktober 2026« */
export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat(brand.locale, {day: 'numeric', month: 'long', year: 'numeric', timeZone: tz}).format(toDate(iso))

/** »fredag den 9. oktober 2026« */
export const formatDateLong = (iso: string) =>
  new Intl.DateTimeFormat(brand.locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: tz,
  }).format(toDate(iso))

/** »9. okt.« – til tætte værkskilte */
export const formatDateShort = (iso: string) =>
  new Intl.DateTimeFormat(brand.locale, {day: 'numeric', month: 'short', timeZone: tz}).format(toDate(iso))

export const sourceTypeLabel = (type: string) => labelFor(sourceTypes, type)
export const languageLabel = (code: string) => labelFor(languages, code)
export const languageShort = (code: string) => languages.find((l) => l.value === code)?.short ?? code.toUpperCase()

/** Antal i ord, som avisen ville skrive det: »to kilder«. */
const words = ['nul', 'én', 'to', 'tre', 'fire', 'fem', 'seks', 'syv', 'otte', 'ni', 'ti']
export const countSources = (n: number) => `${words[n] ?? n} ${n === 1 ? 'kilde' : 'kilder'}`

/** YouTube-id fra en URL. */
export const youtubeId = (url?: string) =>
  url?.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/)?.[1] ?? null

/** ISO-ugenummer – »uge 41«. */
export const isoWeek = (iso: string) => {
  const d = new Date(`${iso.slice(0, 10)}T12:00:00Z`)
  const day = (d.getUTCDay() + 6) % 7
  d.setUTCDate(d.getUTCDate() - day + 3)
  const firstThursday = new Date(Date.UTC(d.getUTCFullYear(), 0, 4))
  return 1 + Math.round(((d.getTime() - firstThursday.getTime()) / 86400000 - 3 + ((firstThursday.getUTCDay() + 6) % 7)) / 7)
}
