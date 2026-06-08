import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ByzIcon from './ByzIcon.vue'

describe('ByzIcon', () => {
  it('renders an svg for a registered icon name', () => {
    const wrapper = mount(ByzIcon, {
      props: {
        name: 'check',
      },
    })

    expect(wrapper.find('svg').exists()).toBe(true)
    expect(wrapper.find('use').exists()).toBe(true)
  })

  it('applies an accessible name when ariaLabel is provided', () => {
    const wrapper = mount(ByzIcon, {
      props: {
        name: 'search',
        ariaLabel: 'Zoeken',
      },
    })

    const svg = wrapper.get('svg')
    expect(svg.attributes('aria-label')).toBe('Zoeken')
    expect(svg.attributes('role')).toBe('img')
  })

  it('resolves kebab-case lucide icon names', () => {
    const wrapper = mount(ByzIcon, {
      props: {
        name: 'arrow-right',
      },
    })

    expect(wrapper.find('svg').exists()).toBe(true)
    expect(wrapper.find('use').attributes('href')).toContain('#byz-icon-arrow-right')
  })

  it('falls back to slot content when no name is provided', () => {
    const wrapper = mount(ByzIcon, {
      slots: {
        default: '<span class="custom-icon">*</span>',
      },
    })

    expect(wrapper.find('.custom-icon').exists()).toBe(true)
  })
})
