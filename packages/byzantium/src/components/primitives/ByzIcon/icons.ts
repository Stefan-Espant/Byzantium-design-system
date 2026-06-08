import { generatedIconNames } from './icon-names.generated'

export const byzIconAliases = {
  check: 'check',
  x: 'x',
  plus: 'plus',
  minus: 'minus',
  chevronDown: 'chevron-down',
  chevronUp: 'chevron-up',
  chevronLeft: 'chevron-left',
  chevronRight: 'chevron-right',
  arrowRight: 'arrow-right',
  arrowLeft: 'arrow-left',
  search: 'search',
  menu: 'menu',
  settings: 'settings',
  bell: 'bell',
  info: 'info',
  warning: 'triangle-alert',
  error: 'circle-x',
  externalLink: 'external-link',
  download: 'download',
  upload: 'upload',
  copy: 'copy',
  trash: 'trash-2',
} as const

function normalizeToken(token: string): string {
  return token
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .trim()
    .split('-')
    .filter(Boolean)
    .map((part) => part.toLowerCase())
    .join('-')
}

const iconNameSet = new Set<string>(generatedIconNames)

export const byzIconNames = Object.freeze(generatedIconNames)

export type ByzIconName = (typeof byzIconNames)[number]

export function resolveByzIconName(name?: string) {
  if (!name) return null

  const aliasKey = Object.keys(byzIconAliases).find(
    (key) => key.toLowerCase() === name.toLowerCase(),
  ) as keyof typeof byzIconAliases | undefined

  const resolvedName = aliasKey
    ? byzIconAliases[aliasKey]
    : normalizeToken(name)

  return iconNameSet.has(resolvedName) ? resolvedName : null
}
