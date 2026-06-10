import type { Meta, StoryObj } from '@storybook/vue3'
import { ByzCard } from '@byzantium-design-system/core'

const meta: Meta<typeof ByzCard> = {
  title: 'Composites/ByzCard',
  component: ByzCard,
  tags: ['autodocs'],
  argTypes: {
    padding: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Internal padding of the card',
    },
    elevated: {
      control: 'boolean',
      description: 'Adds a drop shadow to lift the card visually',
    },
    as: {
      control: 'text',
      description: 'HTML element to render as (default: div)',
    },
  },
}
export default meta
type Story = StoryObj<typeof ByzCard>

export const Default: Story = {
  render: (args) => ({
    components: { ByzCard },
    setup() { return { args } },
    template: `
      <ByzCard v-bind="args" style="width:360px;">
        <h3 style="margin:0 0 8px;font-size:1.125rem;">Kaart titel</h3>
        <p style="margin:0;opacity:0.65;font-size:0.875rem;">Dit is de inhoud van de kaart. Hier staat aanvullende informatie.</p>
      </ByzCard>
    `,
  }),
  args: { padding: 'md', elevated: false },
}

export const SmallPadding: Story = {
  render: (args) => ({
    components: { ByzCard },
    setup() { return { args } },
    template: `
      <ByzCard v-bind="args" style="width:360px;">
        <h3 style="margin:0 0 8px;font-size:1.125rem;">Kleine padding</h3>
        <p style="margin:0;opacity:0.65;font-size:0.875rem;">Compacte kaart met minimale binnenruimte.</p>
      </ByzCard>
    `,
  }),
  args: { padding: 'sm' },
}

export const MediumPadding: Story = {
  render: (args) => ({
    components: { ByzCard },
    setup() { return { args } },
    template: `
      <ByzCard v-bind="args" style="width:360px;">
        <h3 style="margin:0 0 8px;font-size:1.125rem;">Gemiddelde padding</h3>
        <p style="margin:0;opacity:0.65;font-size:0.875rem;">Standaard kaart met normale binnenruimte.</p>
      </ByzCard>
    `,
  }),
  args: { padding: 'md' },
}

export const LargePadding: Story = {
  render: (args) => ({
    components: { ByzCard },
    setup() { return { args } },
    template: `
      <ByzCard v-bind="args" style="width:360px;">
        <h3 style="margin:0 0 8px;font-size:1.125rem;">Grote padding</h3>
        <p style="margin:0;opacity:0.65;font-size:0.875rem;">Ruime kaart met veel binnenruimte voor prominente inhoud.</p>
      </ByzCard>
    `,
  }),
  args: { padding: 'lg' },
}

export const Elevated: Story = {
  render: (args) => ({
    components: { ByzCard },
    setup() { return { args } },
    template: `
      <ByzCard v-bind="args" style="width:360px;">
        <h3 style="margin:0 0 8px;font-size:1.125rem;">Verhoogde kaart</h3>
        <p style="margin:0;opacity:0.65;font-size:0.875rem;">Deze kaart heeft een slagschaduw voor visuele diepte.</p>
      </ByzCard>
    `,
  }),
  args: { padding: 'md', elevated: true },
}

export const AsArticle: Story = {
  name: 'As <article>',
  render: (args) => ({
    components: { ByzCard },
    setup() { return { args } },
    template: `
      <ByzCard v-bind="args" style="width:360px;">
        <h3 style="margin:0 0 8px;font-size:1.125rem;">Artikel kaart</h3>
        <p style="margin:0;opacity:0.65;font-size:0.875rem;">Gerenderd als een semantisch article element.</p>
      </ByzCard>
    `,
  }),
  args: { as: 'article', padding: 'md', elevated: true },
}

export const AllPaddingSizes: Story = {
  render: () => ({
    components: { ByzCard },
    template: `
      <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start;">
        <ByzCard padding="sm" style="width:200px;">
          <p style="margin:0;font-size:0.875rem;"><strong>sm</strong> padding</p>
        </ByzCard>
        <ByzCard padding="md" style="width:200px;">
          <p style="margin:0;font-size:0.875rem;"><strong>md</strong> padding</p>
        </ByzCard>
        <ByzCard padding="lg" style="width:200px;">
          <p style="margin:0;font-size:0.875rem;"><strong>lg</strong> padding</p>
        </ByzCard>
        <ByzCard padding="md" :elevated="true" style="width:200px;">
          <p style="margin:0;font-size:0.875rem;"><strong>elevated</strong></p>
        </ByzCard>
      </div>
    `,
  }),
}
