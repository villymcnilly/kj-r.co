/**
 * Brandet samlet ét sted. Skift navnet her, så følger både Studio og sitet med.
 */
export const brand = {
  name: 'ARBEJDSTITEL',
  tagline: 'Ugens geopolitik – set fra København',
  city: 'København',
  locale: 'da-DK',
  lang: 'da',
  /** Bruges når et nummer ikke har sat sin egen farve. */
  defaultColor: '#8a1c14',
  url: 'https://example.com',
} as const

export type Brand = typeof brand
