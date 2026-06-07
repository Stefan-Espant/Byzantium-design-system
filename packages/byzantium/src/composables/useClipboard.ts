import { ref } from 'vue'

interface UseClipboardOptions {
  successDuration?: number
}

export function useClipboard(options: UseClipboardOptions = {}) {
  const { successDuration = 2000 } = options

  const copied  = ref(false)
  const error   = ref<Error | null>(null)
  let timer: ReturnType<typeof setTimeout> | null = null

  async function copy(text: string): Promise<boolean> {
    error.value = null

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
      } else {
        // Fallback for older browsers
        const el = document.createElement('textarea')
        el.value = text
        el.style.position = 'fixed'
        el.style.opacity  = '0'
        document.body.appendChild(el)
        el.focus()
        el.select()
        document.execCommand('copy')
        document.body.removeChild(el)
      }

      copied.value = true
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => { copied.value = false }, successDuration)
      return true
    } catch (e) {
      error.value  = e instanceof Error ? e : new Error(String(e))
      copied.value = false
      return false
    }
  }

  return { copied, error, copy }
}
