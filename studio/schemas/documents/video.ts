import {defineField, defineType} from 'sanity'
import {videoFormats} from '../../../shared/vocabulary.ts'
import {dossiersField} from '../objects/dossiers.ts'
import {isDummyField} from '../objects/dummy.ts'

export const youtubeId = (url?: string) =>
  url?.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/)?.[1] ?? null

/** Videoen knyttes til et nummer fra nummerets side (»Ugens video«). */
export const video = defineType({
  name: 'video',
  title: 'Video',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Titel', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube-URL',
      type: 'url',
      validation: (rule) =>
        rule.required().custom((url?: string) => (!url || youtubeId(url) ? true : 'Kunne ikke finde et YouTube-id i URL’en')),
    }),
    defineField({
      name: 'format',
      title: 'Format',
      type: 'string',
      initialValue: 'kort',
      options: {list: [...videoFormats], layout: 'radio', direction: 'horizontal'},
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'description', title: 'Beskrivelse', type: 'text', rows: 3}),
    dossiersField,
    defineField({
      name: 'publishedAt',
      title: 'Udgivet',
      type: 'date',
      initialValue: () => new Date().toISOString().slice(0, 10),
    }),
    isDummyField,
  ],
  preview: {select: {title: 'title', subtitle: 'format'}},
})
