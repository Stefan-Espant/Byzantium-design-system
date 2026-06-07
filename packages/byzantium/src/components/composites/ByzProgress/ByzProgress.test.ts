import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ByzProgress from './ByzProgress.vue'

describe('ByzProgress', () => {
  it('has role="progressbar" on the track element', () => {
    const wrapper = mount(ByzProgress, { props: { value: 50 } })
    expect(wrapper.find('[role="progressbar"]').exists()).toBe(true)
  })

  it('sets aria-valuenow to the current value', () => {
    const wrapper = mount(ByzProgress, { props: { value: 42 } })
    const track = wrapper.find('[role="progressbar"]')
    expect(track.attributes('aria-valuenow')).toBe('42')
  })

  it('does not set aria-valuenow when indeterminate', () => {
    const wrapper = mount(ByzProgress, { props: { value: 50, indeterminate: true } })
    const track = wrapper.find('[role="progressbar"]')
    expect(track.attributes('aria-valuenow')).toBeUndefined()
  })

  it('fills the bar to the correct percentage width', () => {
    const wrapper = mount(ByzProgress, { props: { value: 75, max: 100 } })
    const fill = wrapper.find('.byz-progress__fill')
    expect(fill.attributes('style')).toContain('width: 75%')
  })

  it('clamps the fill width to 100% when value exceeds max', () => {
    const wrapper = mount(ByzProgress, { props: { value: 120, max: 100 } })
    const fill = wrapper.find('.byz-progress__fill')
    expect(fill.attributes('style')).toContain('width: 100%')
  })

  it('clamps the fill width to 0% when value is negative', () => {
    const wrapper = mount(ByzProgress, { props: { value: -10, max: 100 } })
    const fill = wrapper.find('.byz-progress__fill')
    expect(fill.attributes('style')).toContain('width: 0%')
  })

  it('applies the indeterminate class when indeterminate=true', () => {
    const wrapper = mount(ByzProgress, { props: { value: 0, indeterminate: true } })
    expect(wrapper.find('.byz-progress__fill--indeterminate').exists()).toBe(true)
  })

  it('does not apply the indeterminate class when indeterminate=false', () => {
    const wrapper = mount(ByzProgress, { props: { value: 50 } })
    expect(wrapper.find('.byz-progress__fill--indeterminate').exists()).toBe(false)
  })

  it('applies the correct variant class to the fill', () => {
    const variants = ['default', 'success', 'error'] as const
    for (const variant of variants) {
      const wrapper = mount(ByzProgress, { props: { value: 50, variant } })
      expect(wrapper.find(`.byz-progress__fill--${variant}`).exists()).toBe(true)
    }
  })

  it('renders the label when provided', () => {
    const wrapper = mount(ByzProgress, { props: { value: 50, label: 'Uploading…' } })
    expect(wrapper.find('.byz-progress__label').text()).toBe('Uploading…')
  })

  it('shows the percentage value when showValue=true', () => {
    const wrapper = mount(ByzProgress, { props: { value: 60, showValue: true } })
    expect(wrapper.find('.byz-progress__value').text()).toBe('60%')
  })

  it('does not render the header when neither label nor showValue is set', () => {
    const wrapper = mount(ByzProgress, { props: { value: 50 } })
    expect(wrapper.find('.byz-progress__header').exists()).toBe(false)
  })
})
