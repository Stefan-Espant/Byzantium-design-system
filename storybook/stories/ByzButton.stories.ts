import type { Meta, StoryObj } from '@storybook/vue3'
import { ByzButton } from '@byzantium/core'

const meta: Meta<typeof ByzButton> = {
  title: 'Primitives/ByzButton',
  component: ByzButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
      description: 'Visual style of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
    loading: {
      control: 'boolean',
      description: 'Shows a spinner and disables interaction',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'HTML button type attribute',
    },
  },
}
export default meta
type Story = StoryObj<typeof ByzButton>

export const Primary: Story = {
  render: (args) => ({
    components: { ByzButton },
    setup() { return { args } },
    template: `<ByzButton v-bind="args">Klik hier</ByzButton>`,
  }),
  args: { variant: 'primary' },
}

export const Secondary: Story = {
  render: (args) => ({
    components: { ByzButton },
    setup() { return { args } },
    template: `<ByzButton v-bind="args">Klik hier</ByzButton>`,
  }),
  args: { variant: 'secondary' },
}

export const Ghost: Story = {
  render: (args) => ({
    components: { ByzButton },
    setup() { return { args } },
    template: `<ByzButton v-bind="args">Klik hier</ByzButton>`,
  }),
  args: { variant: 'ghost' },
}

export const Danger: Story = {
  render: (args) => ({
    components: { ByzButton },
    setup() { return { args } },
    template: `<ByzButton v-bind="args">Verwijderen</ByzButton>`,
  }),
  args: { variant: 'danger' },
}

export const Small: Story = {
  render: (args) => ({
    components: { ByzButton },
    setup() { return { args } },
    template: `<ByzButton v-bind="args">Klein</ByzButton>`,
  }),
  args: { variant: 'primary', size: 'sm' },
}

export const Large: Story = {
  render: (args) => ({
    components: { ByzButton },
    setup() { return { args } },
    template: `<ByzButton v-bind="args">Groot</ByzButton>`,
  }),
  args: { variant: 'primary', size: 'lg' },
}

export const Loading: Story = {
  render: (args) => ({
    components: { ByzButton },
    setup() { return { args } },
    template: `<ByzButton v-bind="args">Laden...</ByzButton>`,
  }),
  args: { variant: 'primary', loading: true },
}

export const Disabled: Story = {
  render: (args) => ({
    components: { ByzButton },
    setup() { return { args } },
    template: `<ByzButton v-bind="args">Uitgeschakeld</ByzButton>`,
  }),
  args: { variant: 'primary', disabled: true },
}

export const AllVariants: Story = {
  render: () => ({
    components: { ByzButton },
    template: `
      <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;">
        <ByzButton variant="primary">Primary</ByzButton>
        <ByzButton variant="secondary">Secondary</ByzButton>
        <ByzButton variant="ghost">Ghost</ByzButton>
        <ByzButton variant="danger">Danger</ByzButton>
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { ByzButton },
    template: `
      <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;">
        <ByzButton variant="primary" size="sm">Small</ByzButton>
        <ByzButton variant="primary" size="md">Medium</ByzButton>
        <ByzButton variant="primary" size="lg">Large</ByzButton>
      </div>
    `,
  }),
}
