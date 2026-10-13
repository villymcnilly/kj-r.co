/**
 * EKSEMPELINDHOLD – ALT HER ER OPDIGTET.
 *
 * Medier, forfattere, artikler og citater er fiktive. Emnerne er virkelige, men indholdet
 * er skrevet for at vise designet med realistisk tekst. Alle dokumenter har isDummy: true
 * og kan slettes med `npm run seed:remove`. Alle URL'er peger på example.com.
 *
 * Filen bruges to steder: seed/build.ts laver NDJSON til Sanity, og sitet kan læse den
 * direkte, når der ikke er sat et Sanity-projekt op endnu.
 */

type Span = {_type: 'span'; _key: string; text: string; marks: string[]}
type Block = {_type: 'block'; _key: string; style: string; markDefs: unknown[]; children: Span[]}

let keyCounter = 0
const key = () => `k${(keyCounter++).toString(36).padStart(4, '0')}`
const ref = (id: string) => ({_type: 'reference', _ref: id})
const refItem = (id: string) => ({_key: key(), ...ref(id)})

/** Afsnit. *kursiv* og **fed** understøttes – nok til eksempelteksten. */
const p = (text: string, style = 'normal'): Block => ({
  _type: 'block',
  _key: key(),
  style,
  markDefs: [],
  children: text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/).filter(Boolean).map((part) => {
    const strong = part.startsWith('**')
    const em = !strong && part.startsWith('*')
    return {
      _type: 'span',
      _key: key(),
      text: strong ? part.slice(2, -2) : em ? part.slice(1, -1) : part,
      marks: strong ? ['strong'] : em ? ['em'] : [],
    }
  }),
})

const dummy = {isDummy: true}

// ─── Dossierer ──────────────────────────────────────────────────────────────

const dossiers = [
  {
    _id: 'dummy-dossier-arktis',
    _type: 'dossier',
    name: 'Arktis',
    slug: {_type: 'slug', current: 'arktis'},
    intro:
      'Grønland, Nordatlanten og kapløbet om ruter, råstoffer og militær tilstedeværelse. Rigsfællesskabet er ikke længere en tilskuer i stormagternes spil – det er en af brikkerne.',
    ...dummy,
  },
  {
    _id: 'dummy-dossier-oestersoeen',
    _type: 'dossier',
    name: 'Østersøen',
    slug: {_type: 'slug', current: 'oestersoeen'},
    intro:
      'NATO’s indre hav. Kabler, skyggeflåder, Kaliningrad og de baltiske landes sikkerhed – og hvad det betyder for et land, der ligger i indsejlingen.',
    ...dummy,
  },
  {
    _id: 'dummy-dossier-eu-forsvar',
    _type: 'dossier',
    name: 'EU-forsvar',
    slug: {_type: 'slug', current: 'eu-forsvar'},
    intro:
      'Fra forsvarsforbehold til fælles indkøb. Jeg følger, hvordan Bruxelles forsøger at blive en sikkerhedspolitisk aktør – og hvem der skal betale.',
    ...dummy,
  },
]
const D = {
  arktis: dossiers[0]._id,
  oest: dossiers[1]._id,
  eu: dossiers[2]._id,
}

// ─── Medier (fiktive) ───────────────────────────────────────────────────────

const outlet = (id: string, name: string, country: string, defaultLanguage: string) => ({
  _id: `dummy-outlet-${id}`,
  _type: 'outlet',
  name,
  slug: {_type: 'slug', current: id},
  country,
  defaultLanguage,
  homepage: `https://example.com/${id}`,
  ...dummy,
})

const outlets = [
  outlet('potomac', 'The Potomac Review', 'US', 'en'),
  outlet('courrier', 'Le Courrier européen', 'BE', 'fr'),
  outlet('vestnik', 'Severnyj Vestnik', 'RU', 'ru'),
  outlet('tusagassiat', 'Tusagassiat', 'GL', 'kl'),
  outlet('ibs', 'Institute for Baltic Security', 'EE', 'en'),
  outlet('kommissionen', 'Europa-Kommissionen', 'BE', 'en'),
]

// ─── Kildekort ──────────────────────────────────────────────────────────────

const sourceCards = [
  {
    _id: 'dummy-source-1',
    _type: 'sourceCard',
    outlet: ref('dummy-outlet-potomac'),
    title: 'The End of Arctic Exceptionalism',
    author: 'Margaret Hollis (fiktiv)',
    language: 'en',
    type: 'analyse',
    url: 'https://example.com/potomac/arctic-exceptionalism',
    publishedAt: '2026-10-05',
    precis:
      'Arktis kan ikke længere behandles som en zone for samarbejde. Washington bør se Grønland som en del af det nordamerikanske forsvar – ikke som et europæisk anliggende.',
    whyItMatters:
      'Analysen formulerer højt, hvad mange i Washington tænker: at Grønlands sikkerhed er for vigtig til at blive overladt til København. Det rykker grænsen for, hvad der kan siges i den amerikanske debat.',
    quote:
      'Greenland is not a European question with an American footnote. It is an American question with a Danish footnote.',
    quoteTranslation:
      'Grønland er ikke et europæisk spørgsmål med en amerikansk fodnote. Det er et amerikansk spørgsmål med en dansk fodnote.',
    dossiers: [refItem(D.arktis)],
    ...dummy,
  },
  {
    _id: 'dummy-source-2',
    _type: 'sourceCard',
    outlet: ref('dummy-outlet-tusagassiat'),
    title: 'Allanit oqaluttuarineqarneq',
    author: 'Aviaja Lynge (fiktiv)',
    language: 'kl',
    type: 'kommentar',
    url: 'https://example.com/tusagassiat/oqaluttuarineqarneq',
    publishedAt: '2026-10-07',
    precis:
      'Kommentar fra Nuuk: Grønlændere læser om deres eget land i amerikanske og danske medier, men bliver sjældent spurgt. Debatten handler om Grønland – ikke med Grønland.',
    whyItMatters:
      'Den grønlandske stemme forsvinder ofte i oversættelsen. Når den danske debat kun citerer Washington og København, gentager den præcis det mønster, kommentaren kritiserer.',
    quote: 'Nunarput pillugu oqallittoqartarpoq, uagut oqaluttuarinagut.',
    quoteTranslation: 'Man diskuterer vores land uden at lade os fortælle.',
    dossiers: [refItem(D.arktis)],
    ...dummy,
  },
  {
    _id: 'dummy-source-3',
    _type: 'sourceCard',
    outlet: ref('dummy-outlet-vestnik'),
    title: 'Северный морской путь: новая навигация, старые соперники',
    author: 'Ilja Sorokin (fiktiv)',
    language: 'ru',
    type: 'reportage',
    url: 'https://example.com/vestnik/sevmorput',
    publishedAt: '2026-10-03',
    precis:
      'Reportage fra Murmansk om rekordtrafik på Nordøstpassagen. Vestens interesse for Grønland fremstilles som et forsøg på at inddæmme Rusland i nord.',
    whyItMatters:
      'Moskvas framing er nyttig at kende: Her er det ikke Rusland, der opruster i Arktis, men NATO, der rykker ind. Den fortælling bruges også i Østersøen.',
    quote:
      'Пока Вашингтон спорит с Копенгагеном о Гренландии, наши ледоколы прокладывают путь.',
    quoteTranslation: 'Mens Washington skændes med København om Grønland, baner vores isbrydere vejen.',
    dossiers: [refItem(D.arktis), refItem(D.oest)],
    ...dummy,
  },
  {
    _id: 'dummy-source-4',
    _type: 'sourceCard',
    outlet: ref('dummy-outlet-courrier'),
    title: 'L’Arctique, angle mort de la défense européenne',
    author: 'Claire Vasseur (fiktiv)',
    language: 'fr',
    type: 'kommentar',
    url: 'https://example.com/courrier/arctique-angle-mort',
    publishedAt: '2026-10-06',
    precis:
      'Bruxelles har talt om strategisk autonomi i årevis, men glemt sin nordligste flanke. Grønland er Europas – også selvom Europa ikke har opført sig sådan.',
    whyItMatters:
      'Et sjældent fransk blik mod nord. Hvis EU begynder at tale om Grønland som europæisk territorium, ændrer det Danmarks forhandlingsposition – både over for USA og over for Nuuk.',
    quote: 'L’Europe découvre qu’elle a une frontière arctique au moment même où on la lui conteste.',
    quoteTranslation: 'Europa opdager, at det har en arktisk grænse, i samme øjeblik som den bliver anfægtet.',
    dossiers: [refItem(D.arktis), refItem(D.eu)],
    ...dummy,
  },
  {
    _id: 'dummy-source-5',
    _type: 'sourceCard',
    outlet: ref('dummy-outlet-ibs'),
    title: 'Cables, Anchors and Deniability: Mapping Seabed Incidents in the Baltic 2023–2026',
    author: 'Kadri Tamm og Jonas Petraitis (fiktive)',
    language: 'en',
    type: 'taenketank',
    url: 'https://example.com/ibs/seabed-incidents',
    publishedAt: '2026-10-01',
    precis:
      'Rapport, der kortlægger 31 hændelser med kabler og rørledninger i Østersøen. Mønsteret peger på skibe med uklart ejerskab, som er svære at holde ansvarlige.',
    whyItMatters:
      'Flere af hændelserne ligger tæt på danske farvande. Rapporten anbefaler fælles nordisk overvågning – et forslag, der vil lande på et dansk ministerbord.',
    quote:
      'The Baltic seabed has become the cheapest front line in Europe: low cost to attack, high cost to defend, near-zero cost to deny.',
    quoteTranslation:
      'Østersøens havbund er blevet Europas billigste frontlinje: billig at angribe, dyr at forsvare og næsten gratis at benægte.',
    dossiers: [refItem(D.oest)],
    ...dummy,
  },
  {
    _id: 'dummy-source-6',
    _type: 'sourceCard',
    outlet: ref('dummy-outlet-kommissionen'),
    title: 'Roadmap for a European Integrated Air Defence Shield (fiktivt dokument)',
    author: '',
    language: 'en',
    type: 'primaerkilde',
    url: 'https://example.com/kommissionen/air-defence-roadmap',
    publishedAt: '2026-10-08',
    precis:
      'Kommissionens køreplan for fælles luftforsvar: fælles indkøb, en finansieringsmekanisme på EU-niveau og en tidsplan frem mod 2030. Hvem der betaler, er stadig åbent.',
    whyItMatters:
      'Danmark har både brug for luftforsvar og en tradition for at vente og se. Dokumentet tvinger regeringen til at tage stilling til fælles gæld i forsvarets navn.',
    quote: '',
    dossiers: [refItem(D.eu)],
    ...dummy,
  },
]

// ─── Video ──────────────────────────────────────────────────────────────────

const videos = [
  {
    _id: 'dummy-video-1',
    _type: 'video',
    title: 'Tre minutter om Grønland og fodnoterne (eksempel)',
    // Pladsholder – Blender Foundations »Big Buck Bunny«, som må vises frit.
    youtubeUrl: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
    format: 'kort',
    description: 'Eksempelvideo. Erstattes af ugens rigtige video.',
    dossiers: [refItem(D.arktis)],
    publishedAt: '2026-10-09',
    ...dummy,
  },
]

// ─── Opslag ─────────────────────────────────────────────────────────────────

const item = (source: string, comment: string, label?: string) => ({
  _key: key(),
  _type: 'bundleItem',
  source: ref(source),
  ...(label ? {label} : {}),
  comment,
})

const bundles = [
  {
    _id: 'dummy-bundle-groenland',
    _type: 'bundle',
    kind: 'traad',
    kicker: 'Arktis',
    headline: 'Alle taler om Grønland – undtagen grønlænderne',
    slug: {_type: 'slug', current: 'alle-taler-om-groenland'},
    dek: 'En amerikansk analyse gør Danmark til en fodnote. En kommentar fra Nuuk minder om, hvem der bor i fodnoten.',
    body: [
      p(
        'De to tekster om Grønland, jeg ikke kunne slippe i denne uge, blev skrevet 5.000 kilometer fra hinanden. Jeg læste dem samme aften, og de handler om det samme: hvem der har ret til at fortælle historien om øen.',
      ),
    ],
    items: [
      item(
        'dummy-source-1',
        'Læs den for tonen mere end for argumentet. At en etableret Washington-stemme kan skrive »dansk fodnote« uden at blinke, siger noget om, hvor langt debatten har flyttet sig på et år.',
      ),
      item(
        'dummy-source-2',
        'Det modsatte perspektiv – og det, der mangler i både den amerikanske og den danske dækning. Kort, skarp og værd at få oversat i sin helhed.',
      ),
    ],
    dossiers: [refItem(D.arktis)],
    publishedAt: '2026-10-09T07:00:00Z',
    ...dummy,
  },
  {
    _id: 'dummy-bundle-kabler',
    _type: 'bundle',
    kind: 'traad',
    kicker: 'Østersøen',
    headline: 'Havbunden er Europas billigste frontlinje',
    slug: {_type: 'slug', current: 'havbunden-er-europas-billigste-frontlinje'},
    dek: 'En ny kortlægning af 31 kabelhændelser – og en russisk reportage, der fortæller den samme historie med omvendt fortegn.',
    body: [],
    items: [
      item(
        'dummy-source-5',
        'Den mest grundige oversigt, jeg har set. Kortet på side 12 er alene værd at åbne rapporten for.',
      ),
      item(
        'dummy-source-3',
        'Læs den sammen med rapporten. Her er der ingen skyggeflåde – kun en vestlig alliance, der føler sig truet af russisk skibsfart.',
        'Modbillede',
      ),
    ],
    dossiers: [refItem(D.oest)],
    publishedAt: '2026-10-09T07:00:00Z',
    ...dummy,
  },
  {
    _id: 'dummy-bundle-luftforsvar',
    _type: 'bundle',
    kind: 'traad',
    kicker: 'EU-forsvar',
    headline: 'Bruxelles vil bygge et skjold – men hvem betaler?',
    slug: {_type: 'slug', current: 'bruxelles-vil-bygge-et-skjold'},
    dek: 'Kommissionens køreplan for fælles luftforsvar er ambitiøs på alt undtagen finansieringen.',
    body: [],
    items: [
      item(
        'dummy-source-6',
        'Gå direkte til bilag B om finansiering. Resten er velkendt; det er her, de danske forbehold mod fælles gæld bliver sat på prøve.',
      ),
      item(
        'dummy-source-4',
        'En fransk påmindelse om, at »europæisk forsvar« sjældent har betydt nordligt forsvar. Det kan ændre sig nu.',
      ),
    ],
    dossiers: [refItem(D.eu), refItem(D.arktis)],
    publishedAt: '2026-10-09T07:00:00Z',
    ...dummy,
  },
  {
    _id: 'dummy-bundle-diskurs',
    _type: 'bundle',
    kind: 'diskurs',
    kicker: 'Diskursen',
    headline: 'Én ø, fire fortællinger',
    slug: {_type: 'slug', current: 'en-oe-fire-fortaellinger'},
    dek: 'Samme uge, samme ø. Sådan blev Grønland fortalt i Washington, Bruxelles, Moskva og Nuuk.',
    body: [],
    items: [
      item('dummy-source-1', 'Grønland som amerikansk sikkerhedsspørgsmål. Danmark er en praktisk detalje.', 'Washington'),
      item('dummy-source-4', 'Grønland som Europas glemte grænse – og en anledning til at tale om autonomi.', 'Bruxelles'),
      item('dummy-source-3', 'Grønland som bevis på vestlig indkredsning. Arktis er russisk hjemmebane.', 'Moskva'),
      item('dummy-source-2', 'Grønland som et sted, hvor mennesker bor – og bliver talt hen over hovedet på.', 'Nuuk'),
    ],
    dossiers: [refItem(D.arktis)],
    publishedAt: '2026-10-09T07:00:00Z',
    ...dummy,
  },
  {
    _id: 'dummy-bundle-kort-1',
    _type: 'bundle',
    kind: 'kort',
    kicker: 'Østersøen',
    headline: '31 hændelser på tre år',
    slug: {_type: 'slug', current: '31-haendelser-paa-tre-aar'},
    dek: '',
    body: [],
    items: [item('dummy-source-5', 'Tallet, der kommer til at gå igen i debatten.')],
    dossiers: [refItem(D.oest)],
    publishedAt: '2026-10-09T07:00:00Z',
    ...dummy,
  },
  {
    _id: 'dummy-bundle-kort-2',
    _type: 'bundle',
    kind: 'kort',
    kicker: 'EU-forsvar',
    headline: 'Køreplanen er ude',
    slug: {_type: 'slug', current: 'koereplanen-er-ude'},
    dek: '',
    body: [],
    items: [item('dummy-source-6', 'Primærkilden til ugens EU-historie – 48 sider, læs bilag B.')],
    dossiers: [refItem(D.eu)],
    publishedAt: '2026-10-09T07:00:00Z',
    ...dummy,
  },
]

// ─── Nummer ─────────────────────────────────────────────────────────────────

const issues = [
  {
    _id: 'dummy-issue-1',
    _type: 'issue',
    number: 1,
    date: '2026-10-09',
    title: 'Fodnoterne',
    openQuestion: 'Hvem har egentlig ret til at fortælle historien om en ø?',
    leader: [
      p(
        '*Dette er et eksempel med opdigtet indhold.* Jeg har brugt ugen på at læse om fodnoter: hvem der bliver gjort til en, og hvem der skriver dem. Grønland blev beskrevet fra fire hovedstæder – og sjældnest fra sin egen.',
      ),
    ],
    lead: ref('dummy-bundle-groenland'),
    side: [refItem('dummy-bundle-kabler'), refItem('dummy-bundle-luftforsvar')],
    discourse: ref('dummy-bundle-diskurs'),
    briefs: [refItem('dummy-bundle-kort-1'), refItem('dummy-bundle-kort-2')],
    reflection: [
      p(
        'Det, der slog mig i ugens læsning, var ikke uenigheden, men symmetrien. Washington og Moskva beskriver Grønland som et stykke terræn i et spil mellem stormagter. Bruxelles beskriver det som en grænse, Europa har glemt at forsvare. Alle tre taler om øen – ingen af dem taler med den.',
      ),
      p('Hvor det efterlader mig', 'h3'),
      p(
        'Fristelsen er at tage parti for den fortælling, der giver København mest plads. Men den tekst, jeg bliver ved med at vende tilbage til, er den korteste: kommentaren fra Nuuk, som minder om, at fodnoten har indbyggere. Jeg ved ikke helt, hvad jeg skal stille op med det endnu.',
      ),
      p(
        'Næste uge vil jeg læse Kommissionens køreplan til ende – og prøve at finde ud af, om nogen i Folketinget har læst bilag B.',
      ),
    ],
    video: ref('dummy-video-1'),
    artDirection: {
      _type: 'artDirection',
      color: '#3a4482',
      theme: 'standard',
      headlineTreatment: 'stor',
    },
    layoutVersion: 1,
    access: 'public',
    ...dummy,
  },
]

// ─── Indstillinger ──────────────────────────────────────────────────────────

const settings = [
  {
    _id: 'siteSettings',
    _type: 'siteSettings',
    aboutTitle: 'Om',
    about: [
      p('*Eksempeltekst – skriv din egen i Studio under Indstillinger.*'),
      p(
        'Hver uge læser jeg mere om verden, end jeg kan nå at tale med nogen om. Det her er mine noter: de tekster, jeg ikke kunne slippe, hvad der står i dem, og hvorfor jeg tror, de betyder noget herfra.',
      ),
      p('Jeg læser på mange sprog, og jeg er mest interesseret i, hvordan den samme historie bliver fortalt forskellige steder. Jeg tager tit fejl. Skriv endelig, når jeg gør.'),
    ],
  },
]

export const documents = [
  ...dossiers,
  ...outlets,
  ...sourceCards,
  ...videos,
  ...bundles,
  ...issues,
  ...settings,
]
