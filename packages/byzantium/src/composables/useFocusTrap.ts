import { ref, onUnmounted } from 'vue'

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(', ')

export function useFocusTrap() {
  const container = ref<HTMLElement | null>(null)

  function trap(el: HTMLElement) {
    container.value = el
    el.addEventListener('keydown', handleKeydown)
  }

  function release() {
    container.value?.removeEventListener('keydown', handleKeydown)
    container.value = null
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key !== 'Tab' || !container.value) return

    const focusable = Array.from(
      container.value.querySelectorAll<HTMLElement>(FOCUSABLE)
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last?.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first?.focus()
    }
  }

  onUnmounted(release)

  return { trap, release }
}
