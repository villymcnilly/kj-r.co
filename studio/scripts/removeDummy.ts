/**
 * Sletter alt eksempelindhold (isDummy == true).
 * Kør med: npm run seed:remove  (fra roden)
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-01-01'})

// Referencer peger fra forside → opslag → kildekort → medie/dossier, så vi sletter i den rækkefølge.
const order = ['issue', 'bundle', 'video', 'sourceCard', 'outlet', 'dossier']

for (const type of order) {
  const ids = await client.fetch<string[]>('*[_type == $type && isDummy == true]._id', {type})
  if (!ids.length) continue
  const tx = client.transaction()
  for (const id of ids) tx.delete(id).delete(`drafts.${id}`)
  await tx.commit()
  console.log(`Slettede ${ids.length} × ${type}`)
}
console.log('Færdig. Eksempelindholdet er væk.')
