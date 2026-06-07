import { ref, computed, onMounted, onUnmounted } from 'vue'

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

const BREAKPOINTS: Record<Breakpoint, number> = {
  xs:  0,
  sm:  640,
  md:  768,
  lg:  1024,
  xl:  1280,
  '2xl': 1536,
}

const ORDER: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']

function getActive(width: number): Breakpoint {
  let active: Breakpoint = 'xs'
  for (const bp of ORDER) {
    if (width >= BREAKPOINTS[bp]) active = bp
  }
  return active
}

export function useBreakpoint() {
  const width   = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)
  const current = computed(() => getActive(width.value))

  const isXs  = computed(() => current.value === 'xs')
  const isSm  = computed(() => current.value === 'sm')
  const isMd  = computed(() => current.value === 'md')
  const isLg  = computed(() => current.value === 'lg')
  const isXl  = computed(() => current.value === 'xl')
  const is2xl = computed(() => current.value === '2xl')

  const isMobile  = computed(() => width.value < BREAKPOINTS.md)
  const isTablet  = computed(() => width.value >= BREAKPOINTS.md && width.value < BREAKPOINTS.lg)
  const isDesktop = computed(() => width.value >= BREAKPOINTS.lg)

  function gte(bp: Breakpoint) {
    return computed(() => width.value >= BREAKPOINTS[bp])
  }
  function lte(bp: Breakpoint) {
    return computed(() => width.value < BREAKPOINTS[bp])
  }
  function between(min: Breakpoint, max: Breakpoint) {
    return computed(() => width.value >= BREAKPOINTS[min] && width.value < BREAKPOINTS[max])
  }

  let handler: () => void

  onMounted(() => {
    handler = () => { width.value = window.innerWidth }
    window.addEventListener('resize', handler, { passive: true })
  })

  onUnmounted(() => {
    if (handler) window.removeEventListener('resize', handler)
  })

  return { width, current, isXs, isSm, isMd, isLg, isXl, is2xl, isMobile, isTablet, isDesktop, gte, lte, between }
}
