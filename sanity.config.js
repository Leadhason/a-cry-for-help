import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './src/schemaTypes'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectId || !dataset) {
  throw new Error('Missing projectId or dataset');
}


export default defineConfig({
  basePath: '/studio',
  name: 'default',
  title: 'e-commerce',
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
