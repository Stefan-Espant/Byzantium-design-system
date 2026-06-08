import type { ByzIconName } from './icons'

export interface ByzCoreIconGroup {
  id: string
  title: string
  purpose: string
  icons: readonly ByzIconName[]
}

export const byzCoreIconGroups = [
  {
    id: 'navigation',
    title: 'Orientatie',
    purpose: 'Beweging, richting en rustige structuur in de interface.',
    icons: ['house', 'panel-left', 'menu', 'search', 'arrow-right', 'chevron-down'],
  },
  {
    id: 'actions',
    title: 'Handelingen',
    purpose: 'Dagelijkse acties, helder en beheerst zonder visuele haast.',
    icons: ['plus', 'x', 'check', 'copy', 'download', 'upload'],
  },
  {
    id: 'status',
    title: 'Zekerheid',
    purpose: 'Terugkoppeling, veiligheid en nadruk met een terughoudende toon.',
    icons: ['info', 'triangle-alert', 'circle-x', 'shield', 'lock', 'bell'],
  },
  {
    id: 'communication',
    title: 'Contact',
    purpose: 'Menselijke contactmomenten en service met warmte en vertrouwen.',
    icons: ['mail', 'phone', 'calendar-days', 'user-round', 'briefcase-business', 'book-open'],
  },
  {
    id: 'brand',
    title: 'Signatuur',
    purpose: 'Sporadische merkaccenten voor ceremonie, nadruk en verhaal.',
    icons: ['compass', 'sparkles', 'star'],
  },
] as const satisfies readonly ByzCoreIconGroup[]

export const byzCoreIconNames = Object.freeze(
  byzCoreIconGroups.flatMap((group) => group.icons),
)
