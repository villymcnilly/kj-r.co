import {issueByNumber, issueNumbers} from './queries.ts'
import {query} from './sanity.ts'
import type {Bundle, Issue} from './types.ts'

export const getIssueNumbers = () => query<number[]>(issueNumbers)

export const getIssue = (number: number) => query<Issue | null>(issueByNumber, {number})

/** Alle opslag på forsiden i læserækkefølge. */
export const placedBundles = (issue: Issue): Bundle[] =>
  [issue.lead, ...(issue.side ?? []), issue.discourse, ...(issue.briefs ?? [])].filter((b): b is Bundle => Boolean(b))

export const issuePath = (n: number) => `/nr/${n}/`
export const bundlePath = (n: number, slug: string) => `/nr/${n}/${slug}/`
