/**
 * Brandet samlet ét sted. Skift navnet her, så følger både Studio og sitet med.
 */
export const brand = {
  name: 'ARBEJDSTITEL',
  tagline: 'Det jeg har læst i ugen – noter fra København',
  /** Underskriften under refleksionen og i sidefoden. */
  author: 'Dit navn',
  city: 'København',
  locale: 'da-DK',
  lang: 'da',
  /** Bruges når et nummer ikke har sat sin egen farve. */
  defaultColor: '#3a4482',
  url: 'https://example.com',
} as const

export type Brand = typeof brand
