import { mount } from '@vue/test-utils'
import { describe, it } from 'vitest'
import ByzInput from './ByzInput.vue'
import { axeCheck, expectNoViolations } from '../../../test-utils/axe-setup'

describe('ByzInput accessibility', () => {
  it('has no axe violations with label', async () => {
    const wrapper = mount(ByzInput, {
      props: { label: 'E-mailadres', modelValue: '' }
    })
    expectNoViolations(await axeCheck(wrapper))
  })

  it('has no axe violations with required', async () => {
    const wrapper = mount(ByzInput, {
      props: { label: 'Naam', modelValue: '', required: true }
    })
    expectNoViolations(await axeCheck(wrapper))
  })

  it('has no axe violations with error state', async () => {
    const wrapper = mount(ByzInput, {
      props: { label: 'E-mail', modelValue: 'ongeldig', error: 'Ongeldig e-mailadres' }
    })
    expectNoViolations(await axeCheck(wrapper))
  })
})
