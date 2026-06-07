import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Byzantium',
  description: 'A structured, accessible Vue 3 design system',

  appearance: true,

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Components', link: '/components/button' },
      { text: 'Tokens', link: '/tokens/color' },
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/guide/getting-started' },
          { text: 'Design Tokens', link: '/guide/tokens' },
        ],
      },
      {
        text: 'Primitives',
        collapsed: false,
        items: [
          { text: 'ByzAnnouncer', link: '/components/announcer' },
          { text: 'ByzAvatar', link: '/components/avatar' },
          { text: 'ByzBadge', link: '/components/badge' },
          { text: 'ByzButton', link: '/components/button' },
          { text: 'ByzCheckbox', link: '/components/checkbox' },
          { text: 'ByzFileUpload', link: '/components/file-upload' },
          { text: 'ByzIcon', link: '/components/icon' },
          { text: 'ByzInput', link: '/components/input' },
          { text: 'ByzLink', link: '/components/link' },
          { text: 'ByzNotificationBell', link: '/components/notification-bell' },
          { text: 'ByzRadio', link: '/components/radio' },
          { text: 'ByzSearchInput', link: '/components/search-input' },
          { text: 'ByzSelect', link: '/components/select' },
          { text: 'ByzSkeleton', link: '/components/skeleton' },
          { text: 'ByzSpinner', link: '/components/spinner' },
          { text: 'ByzSwitch', link: '/components/switch' },
        ],
      },
      {
        text: 'Composites',
        collapsed: false,
        items: [
          { text: 'ByzAccordion', link: '/components/accordion' },
          { text: 'ByzAlert', link: '/components/alert' },
          { text: 'ByzBreadcrumb', link: '/components/breadcrumb' },
          { text: 'ByzCard', link: '/components/card' },
          { text: 'ByzCombobox', link: '/components/combobox' },
          { text: 'ByzCommandPalette', link: '/components/command-palette' },
          { text: 'ByzDatePicker', link: '/components/date-picker' },
          { text: 'ByzDrawer', link: '/components/drawer' },
          { text: 'ByzDropdown', link: '/components/dropdown' },
          { text: 'ByzFormField', link: '/components/form-field' },
          { text: 'ByzModal', link: '/components/modal' },
          { text: 'ByzPagination', link: '/components/pagination' },
          { text: 'ByzPopover', link: '/components/popover' },
          { text: 'ByzProgress', link: '/components/progress' },
        ],
      },
      {
        text: 'Patterns',
        collapsed: false,
        items: [
          { text: 'ByzEmptyState', link: '/components/empty-state' },
          { text: 'ByzFooter', link: '/components/footer' },
          { text: 'ByzHero', link: '/components/hero' },
          { text: 'ByzNavbar', link: '/components/navbar' },
          { text: 'ByzPageHeader', link: '/components/page-header' },
          { text: 'ByzSidebar', link: '/components/sidebar' },
        ],
      },
      {
        text: 'Composables',
        collapsed: false,
        items: [
          { text: 'useTheme', link: '/composables/use-theme' },
          { text: 'useAnnouncer', link: '/composables/use-announcer' },
          { text: 'useFocusTrap', link: '/composables/use-focus-trap' },
          { text: 'useForm', link: '/composables/use-form' },
          { text: 'useToast', link: '/composables/use-toast' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/semantique-agency/Byzantium-design-system' },
    ],
  },
})
