export type ComponentStatus = 'stable' | 'beta' | 'experimental' | 'deprecated'

export const componentStatus: Record<string, ComponentStatus> = {
  // Primitives
  ByzButton:           'stable',
  ByzInput:            'stable',
  ByzIcon:             'stable',
  ByzBadge:            'stable',
  ByzAvatar:           'stable',
  ByzSpinner:          'stable',
  ByzSkeleton:         'stable',
  ByzCheckbox:         'stable',
  ByzRadio:            'stable',
  ByzSwitch:           'stable',
  ByzTextarea:         'stable',
  ByzSelect:           'stable',
  ByzTooltip:          'stable',
  ByzTag:              'stable',
  ByzLink:             'stable',
  ByzAnnouncer:        'stable',
  ByzSearchInput:      'beta',
  ByzNotificationBell: 'beta',
  ByzRating:           'beta',
  ByzCode:             'beta',
  ByzKbd:              'stable',

  // Composites
  ByzAlert:            'stable',
  ByzCard:             'stable',
  ByzModal:            'stable',
  ByzToastContainer:   'stable',
  ByzBreadcrumb:       'stable',
  ByzProgress:         'stable',
  ByzTabs:             'stable',
  ByzAccordion:        'stable',
  ByzDropdown:         'stable',
  ByzTable:            'stable',
  ByzPagination:       'stable',
  ByzStepper:          'stable',
  ByzPopover:          'beta',
  ByzDrawer:           'stable',
  ByzCombobox:         'beta',
  ByzDatePicker:       'beta',
  ByzFileUpload:       'beta',
  ByzCommandPalette:   'experimental',
  ByzFormField:        'beta',

  // Patterns
  ByzHero:             'stable',
  ByzNavbar:           'stable',
  ByzPageHeader:       'stable',
  ByzEmptyState:       'stable',
  ByzFooter:           'stable',
  ByzSidebar:          'stable',
}

export function getStatus(name: string): ComponentStatus {
  return componentStatus[name] ?? 'experimental'
}
