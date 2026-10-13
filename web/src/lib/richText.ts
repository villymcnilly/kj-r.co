/**
 * Minimal Portable Text → HTML. Dækker præcis det, schemaet tillader:
 * afsnit, mellemrubrik, citat, lister, fed/kursiv, links og henvisninger til kildekort.
 */
import type {PortableText} from './types.ts'

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

type MarkDef = {_key: string; _type: string; href?: string; source?: {_ref?: string; _id?: string; url?: string}}

const renderSpans = (block: Record<string, any>) => {
  const defs: MarkDef[] = block.markDefs ?? []
  return (block.children ?? [])
    .map((span: {text: string; marks?: string[]}) => {
      let html = esc(span.text).replace(/\n/g, '<br>')
      for (const mark of span.marks ?? []) {
        if (mark === 'strong') html = `<strong>${html}</strong>`
        else if (mark === 'em') html = `<em>${html}</em>`
        else {
          const def = defs.find((d) => d._key === mark)
          if (def?._type === 'link' && def.href) html = `<a href="${esc(def.href)}">${html}</a>`
          if (def?._type === 'sourceRef') {
            const id = def.source?._id ?? def.source?._ref
            html = `<a class="sref" href="#kilde-${esc(id ?? '')}">${html}</a>`
          }
        }
      }
      return html
    })
    .join('')
}

export function toHtml(blocks?: PortableText): string {
  if (!blocks?.length) return ''
  let out = ''
  let openList: string | null = null
  for (const block of blocks) {
    if (block._type !== 'block') continue
    const list = block.listItem === 'number' ? 'ol' : block.listItem === 'bullet' ? 'ul' : null
    if (openList && openList !== list) {
      out += `</${openList}>`
      openList = null
    }
    if (list) {
      if (!openList) out += `<${list}>`
      openList = list
      out += `<li>${renderSpans(block)}</li>`
      continue
    }
    const inner = renderSpans(block)
    if (block.style === 'h3') out += `<h3>${inner}</h3>`
    else if (block.style === 'blockquote') out += `<blockquote><p>${inner}</p></blockquote>`
    else out += `<p>${inner}</p>`
  }
  if (openList) out += `</${openList}>`
  return out
}

/** Ren tekst – til meta-beskrivelser. */
export const toPlain = (blocks?: PortableText) =>
  (blocks ?? [])
    .filter((b) => b._type === 'block')
    .map((b) => (b.children ?? []).map((c: {text: string}) => c.text).join(''))
    .join(' ')
