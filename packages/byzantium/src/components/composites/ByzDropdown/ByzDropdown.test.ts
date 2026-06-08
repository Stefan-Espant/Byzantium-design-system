import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ByzDropdown from './ByzDropdown.vue'

describe('ByzDropdown', () => {
  const items = [
    { label: 'Bewerken', value: 'edit' },
    { label: 'Archiveren', value: 'archive', disabled: true },
    { label: 'Verwijderen', value: 'delete' },
  ]

  it('exposes menu trigger semantics', () => {
    const wrapper = mount(ByzDropdown, {
      props: { items },
      slots: {
        trigger: '<span>Acties</span>',
      },
    })

    const trigger = wrapper.get('.byz-dropdown__trigger')
    expect(trigger.attributes('role')).toBe('button')
    expect(trigger.attributes('aria-haspopup')).toBe('menu')
    expect(trigger.attributes('tabindex')).toBe('0')
  })

  it('opens with ArrowDown and focuses the first enabled item', async () => {
    const wrapper = mount(ByzDropdown, {
      attachTo: document.body,
      props: { items },
      slots: {
        trigger: '<span>Acties</span>',
      },
    })

    const trigger = wrapper.get('.byz-dropdown__trigger')
    await trigger.trigger('keydown', { key: 'ArrowDown' })
    await wrapper.vm.$nextTick()

    const menuItems = wrapper.findAll('.byz-dropdown__item')
    expect(menuItems).toHaveLength(3)
    expect(document.activeElement).toBe(menuItems[0].element)

    wrapper.unmount()
  })

  it('skips disabled items during keyboard navigation', async () => {
    const wrapper = mount(ByzDropdown, {
      attachTo: document.body,
      props: { items },
      slots: {
        trigger: '<span>Acties</span>',
      },
    })

    const trigger = wrapper.get('.byz-dropdown__trigger')
    await trigger.trigger('keydown', { key: 'ArrowDown' })
    await wrapper.vm.$nextTick()

    const menuItems = wrapper.findAll('.byz-dropdown__item')
    await menuItems[0].trigger('keydown', { key: 'ArrowDown' })

    expect(document.activeElement).toBe(menuItems[2].element)
    wrapper.unmount()
  })
})
