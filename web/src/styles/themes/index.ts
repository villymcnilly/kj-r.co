/**
 * Temaregister. Et nyt ugetema = en CSS-fil i denne mappe + en linje her.
 * Feltet »Tema (CSS)« på nummeret i Sanity peger på nøglen.
 * Et tema overskriver tokens under :root[data-style='nøgle'] – se standard.css.
 */
export interface Theme {
  name: string
  /** Google Fonts-familier (css2-syntaks). Flyttes til egen hosting inden lancering. */
  fonts: string[]
}

const baseFonts = ['Instrument+Serif:ital@0;1', 'Newsreader:ital,opsz,wght@0,6..72,300..700;1,6..72,300..700']

export const themes: Record<string, Theme> = {
  standard: {name: 'Standard', fonts: baseFonts},
}

export const resolveStyle = (theme?: string) => (theme && themes[theme] ? theme : 'standard')

const css = import.meta.glob('./*.css', {query: '?raw', import: 'default', eager: true}) as Record<string, string>
export const themeCss = (key: string) => css[`./${key}.css`] ?? ''

export const fontsHref = (key: string) =>
  `https://fonts.googleapis.com/css2?${(themes[key]?.fonts ?? baseFonts).map((f) => `family=${f}`).join('&')}&display=swap`
