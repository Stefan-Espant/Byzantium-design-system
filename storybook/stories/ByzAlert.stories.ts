import type { Meta, StoryObj } from '@storybook/vue3'
import { ByzAlert } from '@byzantium/core'

const meta: Meta<typeof ByzAlert> = {
  title: 'Composites/ByzAlert',
  component: ByzAlert,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Visual style and semantic meaning of the alert',
    },
    title: {
      control: 'text',
      description: 'Optional bold title shown above the content',
    },
    dismissible: {
      control: 'boolean',
      description: 'Shows a close button when enabled',
    },
  },
}
export default meta
type Story = StoryObj<typeof ByzAlert>

export const Info: Story = {
  render: (args) => ({
    components: { ByzAlert },
    setup() { return { args } },
    template: `<ByzAlert v-bind="args" style="width:480px;">Dit is een informatieve melding.</ByzAlert>`,
  }),
  args: { type: 'info' },
}

export const Success: Story = {
  render: (args) => ({
    components: { ByzAlert },
    setup() { return { args } },
    template: `<ByzAlert v-bind="args" style="width:480px;">De actie is succesvol uitgevoerd.</ByzAlert>`,
  }),
  args: { type: 'success' },
}

export const Warning: Story = {
  render: (args) => ({
    components: { ByzAlert },
    setup() { return { args } },
    template: `<ByzAlert v-bind="args" style="width:480px;">Let op: deze actie kan niet ongedaan worden gemaakt.</ByzAlert>`,
  }),
  args: { type: 'warning' },
}

export const Error: Story = {
  render: (args) => ({
    components: { ByzAlert },
    setup() { return { args } },
    template: `<ByzAlert v-bind="args" style="width:480px;">Er is een fout opgetreden. Probeer het opnieuw.</ByzAlert>`,
  }),
  args: { type: 'error' },
}

export const WithTitle: Story = {
  render: (args) => ({
    components: { ByzAlert },
    setup() { return { args } },
    template: `<ByzAlert v-bind="args" style="width:480px;">Uw gegevens zijn opgeslagen en de wijzigingen zijn doorgevoerd.</ByzAlert>`,
  }),
  args: { type: 'success', title: 'Opgeslagen!' },
}

export const Dismissible: Story = {
  render: (args) => ({
    components: { ByzAlert },
    setup() { return { args } },
    template: `
      <ByzAlert v-bind="args" style="width:480px;" @dismiss="args.onDismiss?.()">
        Deze melding kan worden gesloten met de sluitknop.
      </ByzAlert>
    `,
  }),
  args: { type: 'info', title: 'Melding', dismissible: true },
}

export const DismissibleWithError: Story = {
  name: 'Dismissible (Error)',
  render: (args) => ({
    components: { ByzAlert },
    setup() { return { args } },
    template: `
      <ByzAlert v-bind="args" style="width:480px;" @dismiss="args.onDismiss?.()">
        Verbinding mislukt. Controleer uw internetverbinding.
      </ByzAlert>
    `,
  }),
  args: { type: 'error', title: 'Verbindingsfout', dismissible: true },
}

export const AllTypes: Story = {
  render: () => ({
    components: { ByzAlert },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;width:480px;">
        <ByzAlert type="info" title="Info">Dit is een informatieve melding.</ByzAlert>
        <ByzAlert type="success" title="Succes">De actie is succesvol uitgevoerd.</ByzAlert>
        <ByzAlert type="warning" title="Waarschuwing">Let op: controleer uw invoer.</ByzAlert>
        <ByzAlert type="error" title="Fout">Er is een fout opgetreden.</ByzAlert>
      </div>
    `,
  }),
}
