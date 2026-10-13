import {defineField, defineType} from 'sanity'

/** Indstillinger for hele sitet. Brandnavnet ligger i brand.config.ts – ikke her. */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Indstillinger',
  type: 'document',
  fields: [
    defineField({name: 'aboutTitle', title: 'Om-sidens overskrift', type: 'string', initialValue: 'Om'}),
    defineField({name: 'about', title: 'Om-tekst', type: 'richText'}),
    defineField({
      name: 'defaultOgImage',
      title: 'Standard-delingsbillede',
      type: 'image',
      description: 'Bruges på sider uden eget delingsbillede. 1200 × 630 px.',
    }),
  ],
  preview: {prepare: () => ({title: 'Indstillinger'})},
})
