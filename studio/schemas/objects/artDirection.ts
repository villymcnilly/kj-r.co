import {defineField, defineType} from 'sanity'
import {contrast, paper} from '../../../shared/color.ts'
import {headlineTreatments} from '../../../shared/vocabulary.ts'

/** Ugens kunstneriske styring. Strukturen er fast – udtrykket skifter. */
export const artDirection = defineType({
  name: 'artDirection',
  title: 'Kunstnerisk styring',
  type: 'object',
  options: {collapsible: true, collapsed: false},
  fields: [
    defineField({
      name: 'color',
      title: 'Ugens farve',
      type: 'string',
      description: 'Hex-kode, fx #3f4f8c. Bruges til overrubrikker, links og forsidens accent.',
      validation: (rule) => [
        rule.regex(/^#[0-9a-fA-F]{6}$/, {name: 'hex'}).error('Skal være en hex-kode som #3f4f8c'),
        rule.custom((value?: string) => {
          if (!value) return true
          const c = contrast(value, paper.light)
          return c === null || c >= 4.5 ? true : `For lav kontrast mod papir (${c.toFixed(1)}:1 – kræver 4,5:1)`
        }),
        rule
          .custom((value?: string) => {
            if (!value) return true
            const c = contrast(value, paper.dark)
            return c === null || c >= 3
              ? true
              : `Svag i mørk tilstand (${c.toFixed(1)}:1) – sitet lysner den automatisk, men tjek resultatet`
          })
          .warning(),
      ],
    }),
    defineField({
      name: 'theme',
      title: 'Tema (CSS)',
      type: 'string',
      initialValue: 'standard',
      description:
        'Navnet på en temafil i web/src/styles/themes/, fx »standard« eller »nr-14«. Gamle numre beholder deres tema.',
      validation: (rule) => rule.required().regex(/^[a-z0-9-]+$/, {name: 'slug'}),
    }),
    defineField({
      name: 'headlineTreatment',
      title: 'Forsidens behandling',
      type: 'string',
      initialValue: 'stor',
      options: {list: [...headlineTreatments], layout: 'radio'},
    }),
    defineField({
      name: 'coverArt',
      title: 'Forsideværk',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternativ tekst',
          type: 'string',
          validation: (rule) =>
            rule.custom((alt, ctx) =>
              (ctx.parent as {asset?: unknown})?.asset && !alt ? 'Beskriv billedet for skærmlæsere' : true,
            ),
        }),
        defineField({name: 'credit', title: 'Kreditering', type: 'string', description: 'Kunstner, fotograf, år.'}),
      ],
    }),
  ],
})
