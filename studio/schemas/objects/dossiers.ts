import {defineArrayMember, defineField} from 'sanity'

/** Emnemærker. Alt der mærkes med et dossier, dukker automatisk op på dossierets side. */
export const dossiersField = defineField({
  name: 'dossiers',
  title: 'Dossierer',
  type: 'array',
  of: [defineArrayMember({type: 'reference', to: [{type: 'dossier'}]})],
  validation: (rule) => rule.unique(),
})
