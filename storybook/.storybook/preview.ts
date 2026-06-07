import type { Preview } from '@storybook/vue3'
import { withThemeByDataAttribute } from '@storybook/addon-themes'
import '../../packages/byzantium/src/styles/index.scss'

const preview: Preview = {
  parameters: {
    backgrounds: { disable: true },
    layout: 'centered',
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        Dark: 'dark',
        Light: 'light',
      },
      defaultTheme: 'dark',
      attributeName: 'data-theme',
    }),
  ],
}

export default preview
