import {createClient} from '@sanity/client'
import {evaluate, parse} from 'groq-js'
import {documents} from '../../../seed/data.ts'

const projectId = import.meta.env.SANITY_PROJECT_ID || import.meta.env.SANITY_STUDIO_PROJECT_ID
const dataset = import.meta.env.SANITY_DATASET || import.meta.env.SANITY_STUDIO_DATASET || 'production'

/** Uden Sanity-projekt læser sitet eksempelnummeret direkte fra seed/data.ts. */
export const usingSeed = !projectId

const client = projectId
  ? createClient({projectId, dataset, apiVersion: '2025-01-01', useCdn: true, perspective: 'published'})
  : null

export async function query<T>(groq: string, params: Record<string, unknown> = {}): Promise<T> {
  if (client) return client.fetch<T>(groq, params)
  const result = await evaluate(parse(groq, {params}), {dataset: documents, params})
  return (await result.get()) as T
}
