import { mount } from '@vue/test-utils'
import { describe, it } from 'vitest'
import ByzAlert from './ByzAlert.vue'
import { axeCheck, expectNoViolations } from '../../../test-utils/axe-setup'

describe('ByzAlert accessibility', () => {
  const types = ['success', 'error', 'warning', 'info'] as const

  types.forEach(type => {
    it(`has no axe violations for type="${type}"`, async () => {
      const wrapper = mount(ByzAlert, {
        props: { type, title: `${type} melding` },
        slots: { default: 'Dit is de berichttekst.' }
      })
      expectNoViolations(await axeCheck(wrapper))
    })
  })
})
