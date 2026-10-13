/** WCAG-kontrast, så ugens farve altid kan læses. */

const channel = (c: number) => {
  const s = c / 255
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
}

export const parseHex = (hex: string): [number, number, number] | null => {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim())
  if (!m) return null
  const n = parseInt(m[1], 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

const luminance = ([r, g, b]: [number, number, number]) => 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)

export const contrast = (a: string, b: string): number | null => {
  const ca = parseHex(a)
  const cb = parseHex(b)
  if (!ca || !cb) return null
  const [hi, lo] = [luminance(ca), luminance(cb)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

/** Papir- og nattefarver, som ugens farve testes imod. Holdes i takt med tokens.css. */
export const paper = {light: '#fcf8ee', dark: '#171614'} as const
