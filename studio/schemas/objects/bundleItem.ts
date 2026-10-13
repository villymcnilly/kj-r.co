import {defineField, defineType} from 'sanity'
import {limits} from '../../../shared/vocabulary.ts'

/**
 * En henvisning i et opslag: kildekortet plus din kommentar til netop den kilde i netop
 * denne sammenhæng. Kommentaren bor her og ikke på kortet, så samme kilde kan bruges
 * i flere opslag med forskellige pointer.
 */
export const bundleItem = defineType({
  name: 'bundleItem',
  title: 'Henvisning',
  type: 'object',
  fields: [
    defineField({
      name: 'source',
      title: 'Kildekort',
      type: 'reference',
      to: [{type: 'sourceCard'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Etiket',
      type: 'string',
      description: 'Fx »Washington«, »Nuuk« eller »Modargument«. Påkrævet i diskurs-opslag.',
      validation: (rule) => rule.max(32),
    }),
    defineField({
      name: 'comment',
      title: 'Din kommentar',
      type: 'text',
      rows: 3,
      description: `Hvad gør denne kilde i sammenhængen? Max ${limits.itemComment} tegn.`,
      validation: (rule) => rule.max(limits.itemComment),
    }),
  ],
  preview: {
    select: {label: 'label', outlet: 'source.outlet.name', title: 'source.title', comment: 'comment'},
    prepare: ({label, outlet, title, comment}) => ({
      title: [label, outlet].filter(Boolean).join(' – ') || 'Vælg kildekort',
      subtitle: comment || title,
    }),
  },
})
