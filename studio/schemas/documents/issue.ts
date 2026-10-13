import {defineArrayMember, defineField, defineType} from 'sanity'
import {accessLevels, limits} from '../../../shared/vocabulary.ts'
import {isDummyField} from '../objects/dummy.ts'

type Ref = {_ref?: string}
type IssueDoc = {
  _id: string
  lead?: Ref
  side?: Ref[]
  discourse?: Ref
  briefs?: Ref[]
}

const placedRefs = (doc?: IssueDoc) =>
  [doc?.lead, ...(doc?.side ?? []), doc?.discourse, ...(doc?.briefs ?? [])]
    .map((r) => r?._ref)
    .filter((id): id is string => Boolean(id))

/** Et opslag må kun stå ét sted på forsiden. */
const notPlacedTwice = (ref: Ref | undefined, ctx: {document?: unknown}) => {
  if (!ref?._ref) return true
  const all = placedRefs(ctx.document as IssueDoc)
  return all.filter((id) => id === ref._ref).length > 1 ? 'Opslaget står allerede et andet sted på forsiden' : true
}

/**
 * Nummeret er ugens forside. Skabelonen er fast – du udfylder pladserne.
 * Felterne står i samme rækkefølge som på siden.
 */
export const issue = defineType({
  name: 'issue',
  title: 'Nummer',
  type: 'document',
  groups: [
    {name: 'page', title: 'Forsiden', default: true},
    {name: 'art', title: 'Udtryk'},
    {name: 'meta', title: 'Udgivelse'},
  ],
  fields: [
    defineField({
      name: 'number',
      title: 'Nummer',
      type: 'number',
      group: 'meta',
      description: 'Bliver til /nr/…',
      initialValue: async ({getClient}) => {
        const max: number | null = await getClient({apiVersion: '2025-01-01'}).fetch(
          'math::max(*[_type == "issue" && !(_id in path("drafts.**"))].number)',
        )
        return (max ?? 0) + 1
      },
      validation: (rule) =>
        rule
          .required()
          .integer()
          .positive()
          .custom(async (value, ctx) => {
            if (!value) return true
            const id = ctx.document?._id.replace(/^drafts\./, '')
            const taken = await ctx
              .getClient({apiVersion: '2025-01-01'})
              .fetch<number>('count(*[_type == "issue" && number == $value && !(_id in [$id, "drafts." + $id])])', {
                value,
                id,
              })
            return taken > 0 ? `Nr. ${value} findes allerede` : true
          }),
    }),
    defineField({
      name: 'date',
      title: 'Dato',
      type: 'date',
      group: 'meta',
      options: {dateFormat: 'D. MMMM YYYY'},
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Ugens titel',
      type: 'string',
      group: 'page',
      description: 'Valgfri. Står i avishovedet og bruges i arkivet – ellers bruges forsidehistoriens overskrift.',
      validation: (rule) => rule.max(limits.headline),
    }),
    defineField({
      name: 'openQuestion',
      title: 'Ugens åbne spørgsmål',
      type: 'string',
      group: 'page',
      description: 'Valgfrit. Ét spørgsmål, du ikke kender svaret på. Står stort under titlen på forsiden.',
      validation: (rule) => rule.max(140),
    }),
    defineField({
      name: 'leader',
      title: 'Leder',
      type: 'shortText',
      group: 'page',
      description: 'Din åbning – et kort afsnit om ugen.',
    }),
    defineField({
      name: 'lead',
      title: 'Forsidehistorie',
      type: 'reference',
      group: 'page',
      to: [{type: 'bundle'}],
      options: {filter: 'kind != "kort"'},
      validation: (rule) => rule.required().custom(notPlacedTwice),
    }),
    defineField({
      name: 'side',
      title: 'Sidespalte',
      type: 'array',
      group: 'page',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'bundle'}],
          options: {filter: 'kind != "kort"'},
          validation: (rule) => rule.custom(notPlacedTwice),
        }),
      ],
      validation: (rule) => rule.min(limits.sidePlacements.min).max(limits.sidePlacements.max).unique(),
    }),
    defineField({
      name: 'discourse',
      title: 'Diskursen',
      type: 'reference',
      group: 'page',
      to: [{type: 'bundle'}],
      options: {filter: 'kind == "diskurs"'},
      validation: (rule) => rule.custom(notPlacedTwice),
    }),
    defineField({
      name: 'briefs',
      title: 'Kort nyt',
      type: 'array',
      group: 'page',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'bundle'}],
          options: {filter: 'kind == "kort"'},
          validation: (rule) => rule.custom(notPlacedTwice),
        }),
      ],
      validation: (rule) => rule.max(limits.briefs.max).unique(),
    }),
    defineField({
      name: 'reflection',
      title: 'Refleksion',
      type: 'richText',
      group: 'page',
      description: 'Den længere tekst om kilderne og diskursen.',
    }),
    defineField({
      name: 'video',
      title: 'Ugens video',
      type: 'reference',
      group: 'page',
      to: [{type: 'video'}],
    }),
    defineField({name: 'artDirection', title: 'Kunstnerisk styring', type: 'artDirection', group: 'art'}),
    defineField({
      name: 'layoutVersion',
      title: 'Layoutversion',
      type: 'number',
      group: 'art',
      initialValue: 1,
      readOnly: true,
      description: 'Hvilken udgave af forsideskabelonen nummeret er lavet til. Sikrer gamle forsider ved et redesign.',
    }),
    defineField({
      name: 'access',
      title: 'Adgang',
      type: 'string',
      group: 'meta',
      initialValue: 'public',
      options: {list: [...accessLevels], layout: 'radio'},
      description: 'Klar til en senere betalingsmur – har ingen effekt endnu.',
    }),
    defineField({name: 'seo', title: 'Deling og søgemaskiner', type: 'seo', group: 'meta'}),
    isDummyField,
  ],
  orderings: [{title: 'Nyeste først', name: 'numberDesc', by: [{field: 'number', direction: 'desc'}]}],
  preview: {
    select: {number: 'number', title: 'title', leadHeadline: 'lead.headline', date: 'date', media: 'artDirection.coverArt'},
    prepare: ({number, title, leadHeadline, date, media}) => ({
      title: `Nr. ${number ?? '?'} – ${title || leadHeadline || 'Uden titel'}`,
      subtitle: date,
      media,
    }),
  },
})
