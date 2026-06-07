import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ByzBadge from './ByzBadge.vue'

describe('ByzBadge', () => {
  it('renders slot content', () => {
    const wrapper = mount(ByzBadge, {
      slots: { default: 'New' },
    })
    expect(wrapper.text()).toContain('New')
  })

  it('applies the correct variant class', () => {
    const variants = ['default', 'success', 'warning', 'error', 'info'] as const
    for (const variant of variants) {
      const wrapper = mount(ByzBadge, { props: { variant } })
      expect(wrapper.classes()).toContain(`byz-badge--${variant}`)
    }
  })

  it('applies the default variant class when no variant is given', () => {
    const wrapper = mount(ByzBadge)
    expect(wrapper.classes()).toContain('byz-badge--default')
  })

  it('renders in dot mode with the dot class and no slot content', () => {
    const wrapper = mount(ByzBadge, {
      props: { dot: true },
      slots: { default: 'should not appear' },
    })
    expect(wrapper.classes()).toContain('byz-badge--dot')
    // The template suppresses slot content when dot=true
    expect(wrapper.text()).toBe('')
  })

  it('applies the sm size class', () => {
    const wrapper = mount(ByzBadge, { props: { size: 'sm' } })
    expect(wrapper.classes()).toContain('byz-badge--sm')
  })

  it('applies the md size class by default', () => {
    const wrapper = mount(ByzBadge)
    expect(wrapper.classes()).toContain('byz-badge--md')
  })

  it('has role="status"', () => {
    const wrapper = mount(ByzBadge)
    expect(wrapper.attributes('role')).toBe('status')
  })
})
