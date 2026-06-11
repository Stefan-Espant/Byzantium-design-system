import type { Preview } from '@storybook/vue3'
import '../../packages/byzantium/dist/byzantium.css'

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      defaultValue: 'dark',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'dark',  title: 'Dark' },
          { value: 'light', title: 'Light' },
        ],
        showName: true,
      },
    },
  },
  parameters: {
    backgrounds: { disable: true },
    layout: 'centered',
  },
  decorators: [
    (story, context) => ({
      components: { story },
      setup() {
        const theme = context.globals?.theme ?? 'dark'
        document.documentElement.setAttribute('data-theme', theme === 'light' ? 'light' : '')
      },
      template: '<story />',
    }),
  ],
}

export default preview
