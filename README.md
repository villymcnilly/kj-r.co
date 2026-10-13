# ARBEJDSTITEL

Ugentlig geopolitisk avis set fra København. Én forside om ugen, bygget af opslag med kilder og kommentarer.

> Brandnavnet ligger i [`brand.config.ts`](brand.config.ts). Skift det der.

## Struktur

```
brand.config.ts   navn, tagline, by, standardfarve – ét sted
shared/           ordlister, tegngrænser og kontrastberegning (bruges af både Studio og site)
studio/           Sanity Studio – indholdsmodellen
seed/             eksempelnummer (opdigtet) + script der laver NDJSON til import
web/              Astro-sitet (kommer i næste fase)
```

## Indholdsmodellen

| Type | Hvad det er |
|---|---|
| **Nummer** (`issue`) | Ugens forside. Fast skabelon med pladser: forsidehistorie, sidespalte (1–3), Diskursen, Kort nyt (0–6), leder, refleksion, ugens video. Plus kunstnerisk styring (ugens farve, tema-CSS, forsideværk). |
| **Opslag** (`bundle`) | Grundenheden. Overskrift med din vinkel + en eller flere henvisninger, hver med din kommentar. Tre slags: *tråd*, *diskurs* (hver henvisning har et sted som etiket) og *kort* (én kilde). |
| **Kildekort** (`sourceCard`) | Én artikel, bygget som et værkskilt: medie, titel, type · sprog · dato, præcis, »hvorfor det betyder noget for os«, valgfrit citat (max 300 tegn) med dansk oversættelse. |
| **Medie** (`outlet`) | Mediet/institutionen bag en kilde. |
| **Dossier** (`dossier`) | Temaside. Samler automatisk alle opslag og kildekort mærket med emnet. |
| **Video** (`video`) | YouTube-video, kort/lang. Knyttes til et nummer fra nummerets side. |
| **Indstillinger** | Om-tekst og standard-delingsbillede. |

Kommentaren til en kilde bor på henvisningen i opslaget – ikke på kildekortet – så samme kilde kan bruges flere steder med forskellige pointer.

Klar til senere: `access` på numre (betalingsmur), `layoutVersion` (redesign uden at ændre gamle forsider), `theme` (ugens egen CSS).

## Kom i gang

Kræver Node 22.18+.

```sh
npm install

# 1. Opret et Sanity-projekt (gratis) – log ind i browseren når du bliver bedt om det
cd studio
npx sanity login
npx sanity projects create "ARBEJDSTITEL"      # notér projekt-id'et
npx sanity dataset create production --visibility public
cp .env.example .env                           # indsæt projekt-id'et i .env
cd ..

# 2. Importér eksempelnummeret
npm run seed:import

# 3. Start Studio
npm run studio                                 # → http://localhost:3333
```

Eksempelindholdet fjernes igen med `npm run seed:remove`.
