import type { Meta, StoryObj } from '@storybook/vue3'
import { ByzBadge } from '@byzantium-design-system/core'

const meta: Meta<typeof ByzBadge> = {
  title: 'Primitives/ByzBadge',
  component: ByzBadge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
      description: 'Color scheme of the badge',
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Size of the badge',
    },
    dot: {
      control: 'boolean',
      description: 'Renders as a small colored dot without text',
    },
  },
}
export default meta
type Story = StoryObj<typeof ByzBadge>

export const Default: Story = {
  render: (args) => ({
    components: { ByzBadge },
    setup() { return { args } },
    template: `<ByzBadge v-bind="args">Byzantium</ByzBadge>`,
  }),
  args: { variant: 'default', size: 'md' },
}

export const Success: Story = {
  render: (args) => ({
    components: { ByzBadge },
    setup() { return { args } },
    template: `<ByzBadge v-bind="args">Actief</ByzBadge>`,
  }),
  args: { variant: 'success', size: 'md' },
}

export const Warning: Story = {
  render: (args) => ({
    components: { ByzBadge },
    setup() { return { args } },
    template: `<ByzBadge v-bind="args">In behandeling</ByzBadge>`,
  }),
  args: { variant: 'warning', size: 'md' },
}

export const Error: Story = {
  render: (args) => ({
    components: { ByzBadge },
    setup() { return { args } },
    template: `<ByzBadge v-bind="args">Fout</ByzBadge>`,
  }),
  args: { variant: 'error', size: 'md' },
}

export const Info: Story = {
  render: (args) => ({
    components: { ByzBadge },
    setup() { return { args } },
    template: `<ByzBadge v-bind="args">Nieuw</ByzBadge>`,
  }),
  args: { variant: 'info', size: 'md' },
}

export const SmallSize: Story = {
  render: (args) => ({
    components: { ByzBadge },
    setup() { return { args } },
    template: `<ByzBadge v-bind="args">Klein</ByzBadge>`,
  }),
  args: { variant: 'default', size: 'sm' },
}

export const DotDefault: Story = {
  name: 'Dot (Default)',
  render: (args) => ({
    components: { ByzBadge },
    setup() { return { args } },
    template: `
      <div style="display:flex;align-items:center;gap:8px;">
        <ByzBadge v-bind="args" />
        <span>Status indicator</span>
      </div>
    `,
  }),
  args: { variant: 'default', dot: true },
}

export const DotSuccess: Story = {
  name: 'Dot (Success)',
  render: (args) => ({
    components: { ByzBadge },
    setup() { return { args } },
    template: `
      <div style="display:flex;align-items:center;gap:8px;">
        <ByzBadge v-bind="args" />
        <span>Online</span>
      </div>
    `,
  }),
  args: { variant: 'success', dot: true },
}

export const DotError: Story = {
  name: 'Dot (Error)',
  render: (args) => ({
    components: { ByzBadge },
    setup() { return { args } },
    template: `
      <div style="display:flex;align-items:center;gap:8px;">
        <ByzBadge v-bind="args" />
        <span>Offline</span>
      </div>
    `,
  }),
  args: { variant: 'error', dot: true },
}

export const AllVariants: Story = {
  render: () => ({
    components: { ByzBadge },
    template: `
      <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;">
        <ByzBadge variant="default">Default</ByzBadge>
        <ByzBadge variant="success">Succes</ByzBadge>
        <ByzBadge variant="warning">Waarschuwing</ByzBadge>
        <ByzBadge variant="error">Fout</ByzBadge>
        <ByzBadge variant="info">Info</ByzBadge>
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { ByzBadge },
    template: `
      <div style="display:flex;gap:12px;align-items:center;">
        <ByzBadge variant="default" size="sm">Klein (sm)</ByzBadge>
        <ByzBadge variant="default" size="md">Normaal (md)</ByzBadge>
      </div>
    `,
  }),
}

export const AllDots: Story = {
  render: () => ({
    components: { ByzBadge },
    template: `
      <div style="display:flex;gap:16px;align-items:center;">
        <div style="display:flex;align-items:center;gap:6px;">
          <ByzBadge variant="default" :dot="true" />
          <span style="font-size:0.875rem;">Default</span>
        </div>
        <div style="display:flex;align-items:center;gap:6px;">
          <ByzBadge variant="success" :dot="true" />
          <span style="font-size:0.875rem;">Actief</span>
        </div>
        <div style="display:flex;align-items:center;gap:6px;">
          <ByzBadge variant="warning" :dot="true" />
          <span style="font-size:0.875rem;">Bezig</span>
        </div>
        <div style="display:flex;align-items:center;gap:6px;">
          <ByzBadge variant="error" :dot="true" />
          <span style="font-size:0.875rem;">Offline</span>
        </div>
        <div style="display:flex;align-items:center;gap:6px;">
          <ByzBadge variant="info" :dot="true" />
          <span style="font-size:0.875rem;">Info</span>
        </div>
      </div>
    `,
  }),
}
