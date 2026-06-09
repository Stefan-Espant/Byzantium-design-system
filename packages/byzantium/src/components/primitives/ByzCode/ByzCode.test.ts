import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ByzCode from './ByzCode.vue'

describe('ByzCode', () => {
  it('renders code content', () => {
    const wrapper = mount(ByzCode, { props: { code: 'const x = 1' } })
    expect(wrapper.find('.byz-code__content').text()).toContain('const x = 1')
  })

  it('shows language badge when provided', () => {
    const wrapper = mount(ByzCode, { props: { code: '', language: 'typescript' } })
    expect(wrapper.find('.byz-code__lang').text()).toBe('typescript')
  })

  it('hides language badge when not provided', () => {
    const wrapper = mount(ByzCode, { props: { code: '' } })
    expect(wrapper.find('.byz-code__lang').exists()).toBe(false)
  })

  it('shows copy button by default', () => {
    const wrapper = mount(ByzCode, { props: { code: 'hello' } })
    expect(wrapper.find('.byz-code__copy').exists()).toBe(true)
  })

  it('hides copy button when copyable=false', () => {
    const wrapper = mount(ByzCode, { props: { code: 'hello', copyable: false } })
    expect(wrapper.find('.byz-code__copy').exists()).toBe(false)
  })
})
