import {defineArrayMember, defineField, defineType} from 'sanity'

/** Annotationer, der findes i al løbende tekst: eksterne links og henvisninger til kildekort. */
const annotations = [
  defineArrayMember({
    name: 'link',
    type: 'object',
    title: 'Link',
    fields: [
      defineField({
        name: 'href',
        type: 'url',
        title: 'URL',
        validation: (rule) => rule.required().uri({scheme: ['http', 'https', 'mailto']}),
      }),
    ],
  }),
  defineArrayMember({
    name: 'sourceRef',
    type: 'object',
    title: 'Henvisning til kildekort',
    description: 'Gør teksten klikbar til et kildekort – vises som en lille markering i teksten.',
    fields: [
      defineField({
        name: 'source',
        type: 'reference',
        title: 'Kildekort',
        to: [{type: 'sourceCard'}],
        validation: (rule) => rule.required(),
      }),
    ],
  }),
]

const decorators = [
  {title: 'Fed', value: 'strong'},
  {title: 'Kursiv', value: 'em'},
]

/** Længere tekst: leder, refleksion, Om-siden. */
export const richText = defineType({
  name: 'richText',
  title: 'Tekst',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Brødtekst', value: 'normal'},
        {title: 'Mellemrubrik', value: 'h3'},
        {title: 'Citat', value: 'blockquote'},
      ],
      lists: [
        {title: 'Punktopstilling', value: 'bullet'},
        {title: 'Nummereret', value: 'number'},
      ],
      marks: {decorators, annotations},
    }),
  ],
})

/** Kort tekst uden mellemrubrikker: manchetter og kommentarer i opslag. */
export const shortText = defineType({
  name: 'shortText',
  title: 'Kort tekst',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [{title: 'Brødtekst', value: 'normal'}],
      lists: [],
      marks: {decorators, annotations},
    }),
  ],
})
