import { ref } from 'vue'

type Politeness = 'polite' | 'assertive'

export function useAnnouncer() {
  const message = ref('')
  const politeness = ref<Politeness>('polite')

  function announce(text: string, mode: Politeness = 'polite') {
    politeness.value = mode
    message.value = ''
    requestAnimationFrame(() => {
      message.value = text
    })
  }

  return { message, politeness, announce }
}
