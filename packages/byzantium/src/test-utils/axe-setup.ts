import { mount, type VueWrapper } from '@vue/test-utils'
import axe from 'axe-core'

export async function axeCheck(wrapper: VueWrapper): Promise<axe.AxeResults> {
  const element = wrapper.element

  if (element instanceof HTMLElement && element.isConnected) {
    return axe.run(element, {
      rules: {
        'color-contrast': { enabled: false },
      },
    })
  }

  if (element instanceof HTMLElement) {
    const container = document.createElement('div')
    document.body.appendChild(container)
    container.appendChild(element)

    try {
      return await axe.run(container, {
        rules: {
          'color-contrast': { enabled: false },
        },
      })
    } finally {
      container.remove()
    }
  }

  return axe.run(document.body, {
    rules: {
      'color-contrast': { enabled: false },
    },
  })
}

export function expectNoViolations(results: axe.AxeResults) {
  const violations = results.violations
  if (violations.length > 0) {
    const messages = violations.map(v => `${v.id}: ${v.description} (${v.nodes.length} node(s))`).join('\n')
    throw new Error(`axe violations found:\n${messages}`)
  }
}
