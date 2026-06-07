import { ref, watch, onUnmounted } from 'vue'

let lockCount = 0
let savedScrollY = 0

function lock() {
  if (lockCount === 0 && typeof document !== 'undefined') {
    savedScrollY = window.scrollY
    document.body.style.overflow   = 'hidden'
    document.body.style.position   = 'fixed'
    document.body.style.top        = `-${savedScrollY}px`
    document.body.style.width      = '100%'
  }
  lockCount++
}

function unlock() {
  lockCount = Math.max(0, lockCount - 1)
  if (lockCount === 0 && typeof document !== 'undefined') {
    document.body.style.overflow = ''
    document.body.style.position = ''
    document.body.style.top      = ''
    document.body.style.width    = ''
    window.scrollTo(0, savedScrollY)
  }
}

export function useScrollLock(initialLocked = false) {
  const locked = ref(initialLocked)

  if (initialLocked) lock()

  watch(locked, (val, prev) => {
    if (val === prev) return
    val ? lock() : unlock()
  })

  function toggle() { locked.value = !locked.value }

  onUnmounted(() => {
    if (locked.value) unlock()
  })

  return { locked, toggle }
}
