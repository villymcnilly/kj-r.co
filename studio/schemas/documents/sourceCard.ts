import {defineField, defineType} from 'sanity'
import {labelFor, languages, limits, sourceTypes} from '../../../shared/vocabulary.ts'
import {dossiersField} from '../objects/dossiers.ts'
import {isDummyField} from '../objects/dummy.ts'

/**
 * Kildekortet – sitets signaturelement. Opbygget som et værkskilt:
 * medie, titel, type · sprog · dato – og derunder præcis og hvorfor det betyder noget.
 */
export const sourceCard = defineType({
  name: 'sourceCard',
  title: 'Kildekort',
  type: 'document',
  groups: [
    {name: 'label', title: 'Værkskilt', default: true},
    {name: 'text', title: 'Tekst'},
  ],
  fields: [
    defineField({
      name: 'outlet',
      title: 'Medie',
      type: 'reference',
      to: [{type: 'outlet'}],
      group: 'label',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Originaltitel',
      type: 'string',
      group: 'label',
      description: 'Artiklens titel på originalsproget.',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'author', title: 'Forfatter', type: 'string', group: 'label'}),
    defineField({
      name: 'language',
      title: 'Originalsprog',
      type: 'string',
      group: 'label',
      options: {list: [...languages]},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      group: 'label',
      options: {list: [...sourceTypes], layout: 'radio', direction: 'horizontal'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      group: 'label',
      validation: (rule) => rule.required().uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Udgivet',
      type: 'date',
      group: 'label',
      options: {dateFormat: 'D. MMMM YYYY'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'precis',
      title: 'Præcis',
      type: 'text',
      rows: 2,
      group: 'text',
      description: `Hvad står der? To linjer på dansk – max ${limits.precis} tegn.`,
      validation: (rule) => rule.required().max(limits.precis),
    }),
    defineField({
      name: 'whyItMatters',
      title: 'Hvorfor det betyder noget for os',
      type: 'text',
      rows: 3,
      group: 'text',
      description: `Den danske/nordiske vinkel. Max ${limits.whyItMatters} tegn.`,
      validation: (rule) => rule.required().max(limits.whyItMatters),
    }),
    defineField({
      name: 'quote',
      title: 'Citat',
      type: 'text',
      rows: 3,
      group: 'text',
      description: `Valgfrit. På originalsproget, uden anførselstegn. Max ${limits.quote} tegn.`,
      validation: (rule) => rule.max(limits.quote).error(`Citatet må højst være ${limits.quote} tegn`),
    }),
    defineField({
      name: 'quoteTranslation',
      title: 'Citat på dansk',
      type: 'text',
      rows: 3,
      group: 'text',
      description: 'Din oversættelse, hvis citatet ikke er på dansk.',
      hidden: ({parent}) => !parent?.quote || parent?.language === 'da',
      validation: (rule) => rule.max(limits.quote + 100),
    }),
    {...dossiersField, group: 'label'},
    isDummyField,
  ],
  orderings: [
    {title: 'Nyeste først', name: 'publishedDesc', by: [{field: 'publishedAt', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'title', outlet: 'outlet.name', type: 'type', language: 'language'},
    prepare: ({title, outlet, type, language}) => ({
      title,
      subtitle: [outlet, labelFor(sourceTypes, type), languages.find((l) => l.value === language)?.short]
        .filter(Boolean)
        .join(' · '),
    }),
  },
})
