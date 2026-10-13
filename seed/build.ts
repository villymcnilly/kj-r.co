/**
 * Skriver seed/seed.ndjson til `sanity dataset import` og tjekker samtidig,
 * at eksempelindholdet overholder de samme grænser som Studio.
 */
import {writeFileSync} from 'node:fs'
import {fileURLToPath} from 'node:url'
import {limits} from '../shared/vocabulary.ts'
import {documents} from './data.ts'

type Doc = Record<string, any> & {_id: string; _type: string}
const docs = documents as Doc[]
const errors: string[] = []
const check = (ok: boolean, msg: string) => ok || errors.push(msg)
const ids = new Set(docs.map((d) => d._id))

// Alle referencer skal pege på et dokument i seedet.
const walk = (value: unknown, from: string) => {
  if (Array.isArray(value)) value.forEach((v) => walk(v, from))
  else if (value && typeof value === 'object') {
    const ref = (value as {_ref?: string})._ref
    if (ref) check(ids.has(ref), `${from}: reference til ukendt dokument ${ref}`)
    Object.values(value).forEach((v) => walk(v, from))
  }
}

for (const d of docs) {
  walk(d, d._id)
  check(!d._id.includes('.'), `${d._id}: id må ikke indeholde punktum (gør dokumentet privat)`)
  if (d._type === 'sourceCard') {
    check(d.precis.length <= limits.precis, `${d._id}: præcis er ${d.precis.length} tegn`)
    check(d.whyItMatters.length <= limits.whyItMatters, `${d._id}: »hvorfor« er ${d.whyItMatters.length} tegn`)
    check((d.quote ?? '').length <= limits.quote, `${d._id}: citat er ${d.quote.length} tegn`)
  }
  if (d._type === 'bundle') {
    check(d.headline.length <= limits.headline, `${d._id}: overskrift er ${d.headline.length} tegn`)
    check((d.dek ?? '').length <= limits.dek, `${d._id}: manchet er ${d.dek.length} tegn`)
    check((d.kicker ?? '').length <= limits.kicker, `${d._id}: overrubrik er for lang`)
    for (const i of d.items) check(i.comment.length <= limits.itemComment, `${d._id}: kommentar for lang`)
    if (d.kind === 'kort') check(d.items.length === 1, `${d._id}: kort opslag skal have én henvisning`)
    if (d.kind === 'diskurs') check(d.items.every((i: any) => i.label), `${d._id}: diskurs mangler etiketter`)
  }
}

if (errors.length) {
  console.error(`Seed-indholdet har ${errors.length} fejl:\n  ${errors.join('\n  ')}`)
  process.exit(1)
}

const out = fileURLToPath(new URL('./seed.ndjson', import.meta.url))
writeFileSync(out, docs.map((d) => JSON.stringify(d)).join('\n') + '\n')
const count = (t: string) => docs.filter((d) => d._type === t).length
console.log(
  `Skrev ${docs.length} dokumenter til seed/seed.ndjson – ` +
    `${count('issue')} nummer, ${count('bundle')} opslag, ${count('sourceCard')} kildekort, ` +
    `${count('outlet')} medier, ${count('dossier')} dossierer, ${count('video')} video.`,
)
