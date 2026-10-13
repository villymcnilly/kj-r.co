/**
 * Temaregister. Et nyt ugetema = en ny CSS-fil her + en linje i listen.
 * Feltet »Tema (CSS)« på nummeret i Sanity peger på nøglen.
 */
export interface Theme {
  name: string
  /** Google Fonts-familier (css2-syntaks). Hostes selv inden lancering. */
  fonts: string[]
}

export const themes: Record<string, Theme> = {
  review: {
    name: 'A · Review',
    fonts: ['Libre+Caslon+Display', 'Libre+Caslon+Text:ital,wght@0,400;0,700;1,400'],
  },
  magasin: {
    name: 'B · Magasin',
    fonts: ['Bodoni+Moda:ital,opsz,wght@0,6..96,400..700;1,6..96,400..700', 'Source+Serif+4:ital,opsz,wght@0,8..60,300..700;1,8..60,300..700'],
  },
  museum: {
    name: 'C · Museum',
    fonts: ['Instrument+Serif:ital@0;1', 'Newsreader:ital,opsz,wght@0,6..72,300..700;1,6..72,300..700'],
  },
}

/** »standard« peger på den valgte retning. */
export const defaultStyle = 'review'

export const resolveStyle = (theme?: string) => (theme && theme !== 'standard' && themes[theme] ? theme : defaultStyle)

const css = import.meta.glob('./*.css', {query: '?raw', import: 'default', eager: true}) as Record<string, string>
export const themeCss = (key: string) => css[`./${key}.css`] ?? ''

export const fontsHref = (keys: string[]) =>
  `https://fonts.googleapis.com/css2?${keys
    .flatMap((k) => themes[k]?.fonts ?? [])
    .map((f) => `family=${f}`)
    .join('&')}&display=swap`
