import {defineField, defineType} from 'sanity'
import {limits} from '../../../shared/vocabulary.ts'
import {isDummyField} from '../objects/dummy.ts'

export const dossier = defineType({
  name: 'dossier',
  title: 'Dossier',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Navn', type: 'string', validation: (rule) => rule.required().max(40)}),
    defineField({
      name: 'slug',
      title: 'Adresse',
      type: 'slug',
      description: 'Bliver til /dossier/…',
      options: {source: 'name', maxLength: 48},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Introduktion',
      type: 'text',
      rows: 4,
      description: `Hvad handler dossieret om, og hvorfor følger vi det? Max ${limits.dossierIntro} tegn.`,
      validation: (rule) => rule.max(limits.dossierIntro),
    }),
    isDummyField,
  ],
  orderings: [{title: 'Navn', name: 'name', by: [{field: 'name', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'intro'}},
})
