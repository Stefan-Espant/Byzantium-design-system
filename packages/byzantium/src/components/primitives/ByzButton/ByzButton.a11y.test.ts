import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ByzButton from './ByzButton.vue'
import { axeCheck, expectNoViolations } from '../../../test-utils/axe-setup'

describe('ByzButton accessibility', () => {
  it('has no axe violations in default state', async () => {
    const wrapper = mount(ByzButton, {
      slots: { default: 'Klik hier' }
    })
    const results = await axeCheck(wrapper)
    expectNoViolations(results)
  })

  it('has no axe violations when disabled', async () => {
    const wrapper = mount(ByzButton, {
      props: { disabled: true },
      slots: { default: 'Uitgeschakeld' }
    })
    const results = await axeCheck(wrapper)
    expectNoViolations(results)
  })

  it('has no axe violations with aria-label', async () => {
    const wrapper = mount(ByzButton, {
      props: { ariaLabel: 'Icoon knop' },
      slots: { default: '★' }
    })
    const results = await axeCheck(wrapper)
    expectNoViolations(results)
  })
})
