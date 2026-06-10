import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { ByzInput } from '@byzantium-design-system/core'

const meta: Meta<typeof ByzInput> = {
  title: 'Primitives/ByzInput',
  component: ByzInput,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label shown above the input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text inside the input',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'HTML input type',
    },
    hint: {
      control: 'text',
      description: 'Helper text shown below the input',
    },
    error: {
      control: 'text',
      description: 'Error message (overrides hint)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input',
    },
    required: {
      control: 'boolean',
      description: 'Marks the field as required',
    },
  },
}
export default meta
type Story = StoryObj<typeof ByzInput>

export const Default: Story = {
  render: (args) => ({
    components: { ByzInput },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `<ByzInput v-bind="args" v-model="value" style="width:320px;" />`,
  }),
  args: {
    label: 'Naam',
    placeholder: 'Voer uw naam in',
  },
}

export const WithHint: Story = {
  render: (args) => ({
    components: { ByzInput },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `<ByzInput v-bind="args" v-model="value" style="width:320px;" />`,
  }),
  args: {
    label: 'E-mailadres',
    placeholder: 'naam@example.com',
    type: 'email',
    hint: 'We delen uw e-mail niet met derden.',
  },
}

export const WithError: Story = {
  render: (args) => ({
    components: { ByzInput },
    setup() {
      const value = ref('ongeldig-email')
      return { args, value }
    },
    template: `<ByzInput v-bind="args" v-model="value" style="width:320px;" />`,
  }),
  args: {
    label: 'E-mailadres',
    placeholder: 'naam@example.com',
    type: 'email',
    error: 'Voer een geldig e-mailadres in.',
  },
}

export const Required: Story = {
  render: (args) => ({
    components: { ByzInput },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `<ByzInput v-bind="args" v-model="value" style="width:320px;" />`,
  }),
  args: {
    label: 'Verplicht veld',
    placeholder: 'Dit veld is verplicht',
    required: true,
  },
}

export const Disabled: Story = {
  render: (args) => ({
    components: { ByzInput },
    setup() {
      const value = ref('Uitgeschakelde waarde')
      return { args, value }
    },
    template: `<ByzInput v-bind="args" v-model="value" style="width:320px;" />`,
  }),
  args: {
    label: 'Uitgeschakeld veld',
    disabled: true,
  },
}

export const Password: Story = {
  render: (args) => ({
    components: { ByzInput },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `<ByzInput v-bind="args" v-model="value" style="width:320px;" />`,
  }),
  args: {
    label: 'Wachtwoord',
    placeholder: '••••••••',
    type: 'password',
    hint: 'Minimaal 8 tekens.',
  },
}

export const AllStates: Story = {
  render: () => ({
    components: { ByzInput },
    setup() {
      const normal = ref('')
      const withHint = ref('')
      const withError = ref('fout')
      const disabled = ref('Niet bewerkbaar')
      return { normal, withHint, withError, disabled }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;width:320px;">
        <ByzInput label="Normaal" placeholder="Typ hier..." v-model="normal" />
        <ByzInput label="Met hint" placeholder="Typ hier..." hint="Dit is een toelichting." v-model="withHint" />
        <ByzInput label="Met fout" placeholder="Typ hier..." error="Dit veld bevat een fout." v-model="withError" />
        <ByzInput label="Uitgeschakeld" v-model="disabled" :disabled="true" />
        <ByzInput label="Verplicht" placeholder="Verplicht veld" :required="true" v-model="normal" />
      </div>
    `,
  }),
}
