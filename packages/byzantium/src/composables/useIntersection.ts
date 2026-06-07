import { ref, watch, onUnmounted } from 'vue'
import type { Ref } from 'vue'

interface UseIntersectionOptions extends IntersectionObserverInit {
  once?: boolean
}

export function useIntersection(
  target: Ref<Element | null | undefined>,
  options: UseIntersectionOptions = {}
) {
  const { once = false, ...observerOptions } = options

  const isIntersecting = ref(false)
  const hasIntersected = ref(false)
  const ratio          = ref(0)

  let observer: IntersectionObserver | null = null

  function observe(el: Element) {
    observer = new IntersectionObserver(([entry]) => {
      isIntersecting.value = entry.isIntersecting
      ratio.value          = entry.intersectionRatio

      if (entry.isIntersecting) {
        hasIntersected.value = true
        if (once) {
          observer?.disconnect()
          observer = null
        }
      }
    }, observerOptions)

    observer.observe(el)
  }

  watch(target, (el, prevEl) => {
    if (prevEl) observer?.disconnect()
    if (el) observe(el)
  }, { immediate: true })

  onUnmounted(() => observer?.disconnect())

  return { isIntersecting, hasIntersected, ratio }
}
