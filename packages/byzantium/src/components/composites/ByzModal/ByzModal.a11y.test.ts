import { mount } from '@vue/test-utils'
import { describe, it } from 'vitest'
import ByzModal from './ByzModal.vue'
import { axeCheck, expectNoViolations } from '../../../test-utils/axe-setup'

describe('ByzModal accessibility', () => {
  it('has no axe violations when open', async () => {
    const wrapper = mount(ByzModal, {
      attachTo: document.body,
      props: {
        open: true,
        title: 'Instellingen',
      },
      slots: {
        default: '<p>Dialoog inhoud</p>',
        footer: '<button type="button">Opslaan</button>',
      },
    })

    expectNoViolations(await axeCheck(wrapper))
    wrapper.unmount()
  })
})
