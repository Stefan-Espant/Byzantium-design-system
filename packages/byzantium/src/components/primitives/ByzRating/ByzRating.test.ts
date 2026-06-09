import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ByzRating from './ByzRating.vue'

describe('ByzRating', () => {
  it('renders the correct number of stars', () => {
    const wrapper = mount(ByzRating, { props: { max: 5 } })
    expect(wrapper.findAll('.byz-rating__star')).toHaveLength(5)
  })

  it('marks filled stars based on modelValue', () => {
    const wrapper = mount(ByzRating, { props: { modelValue: 3, max: 5 } })
    const filled = wrapper.findAll('.byz-rating__star--filled')
    expect(filled).toHaveLength(3)
  })

  it('emits update:modelValue on star click', async () => {
    const wrapper = mount(ByzRating, { props: { modelValue: 0, max: 5 } })
    await wrapper.findAll('.byz-rating__star')[2].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([3])
  })

  it('does not emit when readonly', async () => {
    const wrapper = mount(ByzRating, { props: { modelValue: 2, readonly: true } })
    await wrapper.findAll('.byz-rating__star')[3].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('applies size class', () => {
    const wrapper = mount(ByzRating, { props: { size: 'lg' } })
    expect(wrapper.classes()).toContain('byz-rating--lg')
  })

  it('uses role="img" when readonly', () => {
    const wrapper = mount(ByzRating, { props: { readonly: true } })
    expect(wrapper.attributes('role')).toBe('img')
  })

  it('uses role="radiogroup" when interactive', () => {
    const wrapper = mount(ByzRating)
    expect(wrapper.attributes('role')).toBe('radiogroup')
  })
})
