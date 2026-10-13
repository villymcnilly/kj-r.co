/**
 * Laver skitsesiden om til én selvstændig HTML-fil, der kan deles som link.
 * Kør: npm run export-sketch -w web  → dist-sketch/skitse.html
 */
import {readFileSync, writeFileSync} from 'node:fs'
import {brand} from '../../brand.config.ts'

const dir = new URL('../dist-sketch/', import.meta.url)
const html = readFileSync(new URL('index.html', dir), 'utf8')

const head = html.match(/<head>([\s\S]*?)<\/head>/)![1]
const body = html.match(/<body>([\s\S]*?)<\/body>/)![1]
const rootAttrs = html.match(/<html([^>]*)>/)![1]
const style = rootAttrs.match(/data-style="([^"]+)"/)?.[1] ?? 'review'
const color = rootAttrs.match(/--issue-color:\s*(#[0-9a-fA-F]{6})/)?.[1] ?? brand.defaultColor

const keep = [
  ...head.matchAll(/<link rel="stylesheet"[^>]*>|<style[\s\S]*?<\/style>|<script[\s\S]*?<\/script>/g),
].map((m) => m[0])

// Interne links til sider, der ikke er med i skitsen, gøres inaktive.
const content = body.replace(/href="\/(?!\/)[^"]*"(?![^>]*data-pop)/g, 'href="#"')

const out = `<title>${brand.name} stilretninger</title>
<script>
  document.documentElement.lang = '${brand.lang}'
  document.documentElement.dataset.style = '${style}'
  document.documentElement.style.setProperty('--issue-color', '${color}')
</script>
${keep.join('\n')}
${content}
`
writeFileSync(new URL('skitse.html', dir), out)
console.log(`Skrev dist-sketch/skitse.html (${Math.round(out.length / 1024)} kB)`)
