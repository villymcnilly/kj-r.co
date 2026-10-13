import type {StructureResolver} from 'sanity/structure'

/** Redaktionens menu – i den rækkefølge man arbejder: forside, opslag, kilder. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Redaktion')
    .items([
      S.documentTypeListItem('issue')
        .title('Forsider')
        .child(S.documentTypeList('issue').title('Forsider').defaultOrdering([{field: 'number', direction: 'desc'}])),
      S.documentTypeListItem('bundle')
        .title('Opslag')
        .child(
          S.documentTypeList('bundle').title('Opslag').defaultOrdering([{field: 'publishedAt', direction: 'desc'}]),
        ),
      S.documentTypeListItem('sourceCard')
        .title('Kildekort')
        .child(
          S.documentTypeList('sourceCard')
            .title('Kildekort')
            .defaultOrdering([{field: 'publishedAt', direction: 'desc'}]),
        ),
      S.divider(),
      S.documentTypeListItem('dossier').title('Dossierer'),
      S.documentTypeListItem('outlet').title('Medier'),
      S.documentTypeListItem('video').title('Videoer'),
      S.divider(),
      S.listItem()
        .title('Indstillinger')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings').title('Indstillinger')),
    ])

/** Typer der ikke skal kunne oprettes som nye dokumenter fra »Opret«-menuen. */
export const singletonTypes = new Set(['siteSettings'])
