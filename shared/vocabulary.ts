/**
 * Faste ordlister, som både Studio og sitet bruger.
 * Rækkefølgen her er også rækkefølgen i Studio og i filtre.
 */

export const sourceTypes = [
  {value: 'reportage', title: 'Reportage'},
  {value: 'analyse', title: 'Analyse'},
  {value: 'taenketank', title: 'Tænketank'},
  {value: 'primaerkilde', title: 'Primærkilde'},
  {value: 'kommentar', title: 'Kommentar'},
] as const
export type SourceType = (typeof sourceTypes)[number]['value']

/** ISO 639-1 (og kl for grønlandsk). `short` bruges på værkskiltet. */
export const languages = [
  {value: 'da', title: 'Dansk', short: 'DA'},
  {value: 'en', title: 'Engelsk', short: 'EN'},
  {value: 'kl', title: 'Grønlandsk', short: 'KL'},
  {value: 'de', title: 'Tysk', short: 'DE'},
  {value: 'fr', title: 'Fransk', short: 'FR'},
  {value: 'sv', title: 'Svensk', short: 'SV'},
  {value: 'no', title: 'Norsk', short: 'NO'},
  {value: 'fi', title: 'Finsk', short: 'FI'},
  {value: 'et', title: 'Estisk', short: 'ET'},
  {value: 'lv', title: 'Lettisk', short: 'LV'},
  {value: 'lt', title: 'Litauisk', short: 'LT'},
  {value: 'pl', title: 'Polsk', short: 'PL'},
  {value: 'uk', title: 'Ukrainsk', short: 'UK'},
  {value: 'ru', title: 'Russisk', short: 'RU'},
  {value: 'zh', title: 'Kinesisk', short: 'ZH'},
  {value: 'other', title: 'Andet', short: '–'},
] as const
export type Language = (typeof languages)[number]['value']

export const bundleKinds = [
  {value: 'traad', title: 'Tråd – flere kilder om én sag'},
  {value: 'diskurs', title: 'Diskurs – samme historie set fra forskellige steder'},
  {value: 'kort', title: 'Kort – én kilde, nyhedsnotits'},
] as const
export type BundleKind = (typeof bundleKinds)[number]['value']

export const headlineTreatments = [
  {value: 'stor', title: 'Stor – overskriften bærer forsiden'},
  {value: 'stille', title: 'Stille – lille overskrift, meget luft'},
  {value: 'billede', title: 'Billede – forsideværket bærer forsiden'},
] as const
export type HeadlineTreatment = (typeof headlineTreatments)[number]['value']

export const videoFormats = [
  {value: 'kort', title: 'Kort (under 3 min.)'},
  {value: 'lang', title: 'Lang'},
] as const

export const accessLevels = [
  {value: 'public', title: 'Offentlig'},
  {value: 'members', title: 'Kun medlemmer (bruges ikke endnu)'},
] as const

/** Grænser, som både valideres i Studio og respekteres i layoutet. */
export const limits = {
  precis: 220,
  whyItMatters: 300,
  quote: 300,
  itemComment: 500,
  headline: 90,
  dek: 220,
  kicker: 24,
  dossierIntro: 600,
  sidePlacements: {min: 1, max: 3},
  briefs: {min: 0, max: 6},
} as const

export const labelFor = <T extends readonly {value: string; title: string}[]>(list: T, value?: string) =>
  list.find((item) => item.value === value)?.title ?? value ?? ''
