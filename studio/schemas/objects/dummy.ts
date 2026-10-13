import {defineField} from 'sanity'

/** Markerer eksempelindhold, så det kan ryddes væk med `npm run seed:remove`. */
export const isDummyField = defineField({
  name: 'isDummy',
  title: 'Eksempelindhold',
  type: 'boolean',
  readOnly: true,
  hidden: ({value}) => !value,
  description: 'Dette er dummyindhold fra seed-filen.',
})
