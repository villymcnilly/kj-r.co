import {defineArrayMember, defineField, defineType} from 'sanity'
import {bundleKinds, labelFor, limits} from '../../../shared/vocabulary.ts'
import {dossiersField} from '../objects/dossiers.ts'
import {isDummyField} from '../objects/dummy.ts'

type Item = {label?: string}

/**
 * Opslaget – grundenheden. En overskrift med din vinkel og en samling henvisninger,
 * hver med din kommentar. Forsiden er bygget af opslag.
 */
export const bundle = defineType({
  name: 'bundle',
  title: 'Opslag',
  type: 'document',
  fields: [
    defineField({
      name: 'kind',
      title: 'Slags',
      type: 'string',
      initialValue: 'traad',
      options: {list: [...bundleKinds], layout: 'radio'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'kicker',
      title: 'Overrubrik',
      type: 'string',
      description: 'Fx »Arktis«. Står i små versaler over overskriften.',
      validation: (rule) => rule.max(limits.kicker),
    }),
    defineField({
      name: 'headline',
      title: 'Overskrift',
      type: 'string',
      description: `Din vinkel. Max ${limits.headline} tegn – forsiden er designet efter det.`,
      validation: (rule) => rule.required().max(limits.headline),
    }),
    defineField({
      name: 'slug',
      title: 'Adresse',
      type: 'slug',
      options: {source: 'headline', maxLength: 64},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'dek',
      title: 'Manchet',
      type: 'text',
      rows: 2,
      description: `En til to linjer under overskriften. Max ${limits.dek} tegn.`,
      validation: (rule) => rule.max(limits.dek),
    }),
    defineField({
      name: 'body',
      title: 'Din tekst',
      type: 'shortText',
      description: 'Valgfri indledning, før kilderne.',
    }),
    defineField({
      name: 'items',
      title: 'Henvisninger',
      type: 'array',
      of: [defineArrayMember({type: 'bundleItem'})],
      validation: (rule) =>
        rule.required().min(1).custom((items: Item[] | undefined, ctx) => {
          const kind = (ctx.document as {kind?: string})?.kind
          const n = items?.length ?? 0
          if (kind === 'kort' && n !== 1) return 'Et kort opslag har præcis én henvisning'
          if (kind === 'diskurs' && n < 2) return 'Et diskurs-opslag skal have mindst to steder'
          if (kind === 'diskurs' && items?.some((i) => !i.label))
            return 'Giv hver henvisning et sted som etiket, fx »Bruxelles«'
          return true
        }),
    }),
    dossiersField,
    defineField({
      name: 'publishedAt',
      title: 'Udgivet',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    isDummyField,
  ],
  orderings: [{title: 'Nyeste først', name: 'publishedDesc', by: [{field: 'publishedAt', direction: 'desc'}]}],
  preview: {
    select: {title: 'headline', kicker: 'kicker', kind: 'kind', items: 'items'},
    prepare: ({title, kicker, kind, items}) => ({
      title,
      subtitle: [kicker, labelFor(bundleKinds, kind).split(' –')[0], `${items?.length ?? 0} kilder`]
        .filter(Boolean)
        .join(' · '),
    }),
  },
})
