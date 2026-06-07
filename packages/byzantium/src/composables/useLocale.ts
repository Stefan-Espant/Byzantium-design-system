import { ref } from 'vue'

export interface ByzLocale {
  close:          string
  loading:        string
  remove:         string
  search:         string
  noResults:      string
  previous:       string
  next:           string
  breadcrumbNav:  string
  required:       string
  dropFiles:      string
  browseFiles:    string
  commandPalette: string
  today:          string
  clear:          string
  confirm:        string
  cancel:         string
}

export const defaultLocale: ByzLocale = {
  close:          'Sluiten',
  loading:        'Laden…',
  remove:         'Verwijder',
  search:         'Zoeken…',
  noResults:      'Geen resultaten',
  previous:       'Vorige',
  next:           'Volgende',
  breadcrumbNav:  'Broodkruimel',
  required:       'Verplicht',
  dropFiles:      'Sleep bestanden hierheen',
  browseFiles:    'Bladeren',
  commandPalette: 'Typ een commando of zoek…',
  today:          'Vandaag',
  clear:          'Wissen',
  confirm:        'Bevestigen',
  cancel:         'Annuleren',
}

export const englishLocale: ByzLocale = {
  close:          'Close',
  loading:        'Loading…',
  remove:         'Remove',
  search:         'Search…',
  noResults:      'No results',
  previous:       'Previous',
  next:           'Next',
  breadcrumbNav:  'Breadcrumb',
  required:       'Required',
  dropFiles:      'Drop files here',
  browseFiles:    'Browse',
  commandPalette: 'Type a command or search…',
  today:          'Today',
  clear:          'Clear',
  confirm:        'Confirm',
  cancel:         'Cancel',
}

const locale = ref<ByzLocale>({ ...defaultLocale })

export function useLocale() {
  function setLocale(newLocale: Partial<ByzLocale>) {
    locale.value = { ...defaultLocale, ...newLocale }
  }

  function t(key: keyof ByzLocale): string {
    return locale.value[key]
  }

  return { locale, setLocale, t }
}
