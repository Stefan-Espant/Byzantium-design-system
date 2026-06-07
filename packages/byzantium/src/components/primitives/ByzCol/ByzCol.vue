<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'ByzCol' })

type SpanValue = number | 'auto' | 'full'

interface ResponsiveSpan {
  default?: SpanValue
  sm?:      SpanValue
  md?:      SpanValue
  lg?:      SpanValue
  xl?:      SpanValue
}

interface Props {
  span?:   SpanValue | ResponsiveSpan
  start?:  number | 'auto'
  end?:    number | 'auto'
  rowSpan?: number
  as?:     string
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
})

function resolveSpan(val: SpanValue | undefined): string {
  if (val === undefined) return ''
  if (val === 'full')  return 'span var(--byz-grid-cols, 12)'
  if (val === 'auto')  return 'auto'
  return `span ${val}`
}

const isResponsive = computed(
  () => props.span !== null && typeof props.span === 'object'
)

const inlineStyle = computed(() => {
  const styles: Record<string, string> = {}

  if (!isResponsive.value) {
    const s = resolveSpan(props.span as SpanValue | undefined)
    if (s) styles['--byz-col-span'] = s
  } else {
    const r = props.span as ResponsiveSpan
    if (r.default) styles['--byz-col-span']    = resolveSpan(r.default)
    if (r.sm)      styles['--byz-col-span-sm']  = resolveSpan(r.sm)
    if (r.md)      styles['--byz-col-span-md']  = resolveSpan(r.md)
    if (r.lg)      styles['--byz-col-span-lg']  = resolveSpan(r.lg)
    if (r.xl)      styles['--byz-col-span-xl']  = resolveSpan(r.xl)
  }

  if (props.start) styles['grid-column-start'] = String(props.start)
  if (props.end)   styles['grid-column-end']   = String(props.end)
  if (props.rowSpan) styles['grid-row'] = `span ${props.rowSpan}`

  return styles
})
</script>

<template>
  <component :is="as" class="byz-col" :style="inlineStyle">
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.byz-col {
  grid-column: var(--byz-col-span, auto);

  @media (min-width: 640px) {
    grid-column: var(--byz-col-span-sm, var(--byz-col-span, auto));
  }
  @media (min-width: 768px) {
    grid-column: var(--byz-col-span-md, var(--byz-col-span-sm, var(--byz-col-span, auto)));
  }
  @media (min-width: 1024px) {
    grid-column: var(--byz-col-span-lg, var(--byz-col-span-md, var(--byz-col-span-sm, var(--byz-col-span, auto))));
  }
  @media (min-width: 1280px) {
    grid-column: var(--byz-col-span-xl, var(--byz-col-span-lg, var(--byz-col-span-md, var(--byz-col-span-sm, var(--byz-col-span, auto)))));
  }
}
</style>
