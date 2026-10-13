/** GROQ-forespørgsler. Køres mod Sanity – eller mod seed-filen, når Sanity ikke er sat op. */

const card = `{
  _id, title, author, language, type, url, publishedAt, precis, whyItMatters, quote, quoteTranslation,
  "outlet": outlet->{name, country},
  "dossiers": dossiers[]->{name, "slug": slug.current}
}`

export const bundleProjection = `{
  _id, kind, kicker, headline, "slug": slug.current, dek, body, publishedAt,
  items[]{_key, label, comment, "source": source->${card}},
  "dossiers": dossiers[]->{name, "slug": slug.current}
}`

export const issueByNumber = `*[_type == "issue" && number == $number][0]{
  number, date, title, openQuestion, leader, reflection, artDirection, layoutVersion, access, seo, isDummy,
  "lead": lead->${bundleProjection},
  "side": side[]->${bundleProjection},
  "discourse": discourse->${bundleProjection},
  "briefs": briefs[]->${bundleProjection},
  "video": video->{title, youtubeUrl, format, description}
}`

export const issueNumbers = `*[_type == "issue" && defined(number)] | order(number desc).number`
