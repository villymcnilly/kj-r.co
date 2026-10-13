import {defineField, defineType} from 'sanity'
import {languages} from '../../../shared/vocabulary.ts'
import {isDummyField} from '../objects/dummy.ts'

/** Mediet eller institutionen bag en kilde. Holder navne ensartede og giver mulighed for kildesider senere. */
export const outlet = defineType({
  name: 'outlet',
  title: 'Medie',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Navn', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'slug',
      title: 'Adresse',
      type: 'slug',
      options: {source: 'name', maxLength: 64},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'country',
      title: 'Land',
      type: 'string',
      description: 'ISO-landekode, fx US, BE, GL.',
      validation: (rule) => rule.length(2).uppercase(),
    }),
    defineField({
      name: 'defaultLanguage',
      title: 'Standardsprog',
      type: 'string',
      options: {list: [...languages]},
      description: 'Det sprog mediet normalt udgiver på.',
    }),
    defineField({name: 'homepage', title: 'Hjemmeside', type: 'url'}),
    isDummyField,
  ],
  orderings: [{title: 'Navn', name: 'name', by: [{field: 'name', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'country'}},
})
