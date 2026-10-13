import {daDKLocale} from '@sanity/locale-da-dk'
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {brand} from '../brand.config.ts'
import {schemaTypes} from './schemas/index.ts'
import {singletonTypes, structure} from './structure.ts'

export default defineConfig({
  name: 'default',
  title: brand.name,
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'mangler',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [structureTool({structure}), visionTool({defaultApiVersion: '2025-01-01'}), daDKLocale()],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (actions, {schemaType}) =>
      singletonTypes.has(schemaType)
        ? actions.filter(({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : actions,
  },
})
