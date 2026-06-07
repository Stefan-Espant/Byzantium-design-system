import { mount, type VueWrapper } from '@vue/test-utils'
import axe from 'axe-core'

export async function axeCheck(wrapper: VueWrapper): Promise<axe.AxeResults> {
  const results = await axe.run(wrapper.element as HTMLElement)
  return results
}

export function expectNoViolations(results: axe.AxeResults) {
  const violations = results.violations
  if (violations.length > 0) {
    const messages = violations.map(v => `${v.id}: ${v.description} (${v.nodes.length} node(s))`).join('\n')
    throw new Error(`axe violations found:\n${messages}`)
  }
}
