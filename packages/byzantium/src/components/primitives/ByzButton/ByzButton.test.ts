import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ByzButton from './ByzButton.vue'

describe('ByzButton', () => {
  it('renders with default props (variant=primary, size=md)', () => {
    const wrapper = mount(ByzButton)
    expect(wrapper.classes()).toContain('byz-button--primary')
    expect(wrapper.classes()).toContain('byz-button--md')
  })

  it('renders slot content', () => {
    const wrapper = mount(ByzButton, {
      slots: { default: 'Save changes' },
    })
    expect(wrapper.text()).toContain('Save changes')
  })

  it('emits click event when clicked and not disabled', async () => {
    const wrapper = mount(ByzButton, {
      slots: { default: 'Click me' },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(ByzButton, {
      props: { disabled: true },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('does not emit click when loading', async () => {
    const wrapper = mount(ByzButton, {
      props: { loading: true },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('applies the correct variant class', () => {
    const variants = ['primary', 'secondary', 'ghost', 'danger'] as const
    for (const variant of variants) {
      const wrapper = mount(ByzButton, { props: { variant } })
      expect(wrapper.classes()).toContain(`byz-button--${variant}`)
    }
  })

  it('shows the spinner element when loading=true', () => {
    const wrapper = mount(ByzButton, { props: { loading: true } })
    expect(wrapper.find('.byz-button__spinner').exists()).toBe(true)
  })

  it('does not show the spinner when loading=false', () => {
    const wrapper = mount(ByzButton, { props: { loading: false } })
    expect(wrapper.find('.byz-button__spinner').exists()).toBe(false)
  })

  it('has aria-busy="true" when loading', () => {
    const wrapper = mount(ByzButton, { props: { loading: true } })
    expect(wrapper.attributes('aria-busy')).toBe('true')
  })

  it('does not have aria-busy when not loading', () => {
    const wrapper = mount(ByzButton, { props: { loading: false } })
    // Vue omits boolean false attributes entirely
    expect(wrapper.attributes('aria-busy')).toBeFalsy()
  })
})
