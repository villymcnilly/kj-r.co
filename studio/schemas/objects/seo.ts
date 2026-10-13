import {defineField, defineType} from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'Deling og søgemaskiner',
  type: 'object',
  options: {collapsible: true, collapsed: true},
  description: 'Valgfrit. Ellers bruges overskrift, manchet og et automatisk genereret delingsbillede.',
  fields: [
    defineField({name: 'title', title: 'Titel', type: 'string', validation: (rule) => rule.max(70)}),
    defineField({name: 'description', title: 'Beskrivelse', type: 'text', rows: 2, validation: (rule) => rule.max(160)}),
    defineField({name: 'image', title: 'Delingsbillede', type: 'image', description: '1200 × 630 px.'}),
  ],
})
