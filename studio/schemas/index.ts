import {bundle} from './documents/bundle.ts'
import {dossier} from './documents/dossier.ts'
import {issue} from './documents/issue.ts'
import {outlet} from './documents/outlet.ts'
import {siteSettings} from './documents/siteSettings.ts'
import {sourceCard} from './documents/sourceCard.ts'
import {video} from './documents/video.ts'
import {artDirection} from './objects/artDirection.ts'
import {bundleItem} from './objects/bundleItem.ts'
import {richText, shortText} from './objects/richText.ts'
import {seo} from './objects/seo.ts'

export const schemaTypes = [
  issue,
  bundle,
  sourceCard,
  outlet,
  dossier,
  video,
  siteSettings,
  artDirection,
  bundleItem,
  richText,
  shortText,
  seo,
]
