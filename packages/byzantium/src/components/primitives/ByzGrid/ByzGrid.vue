<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'ByzGrid' })

export type GridCols = 4 | 8 | 12 | 16 | 24
export type GridGap  = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface Props {
  cols?:    GridCols
  gap?:     GridGap
  rowGap?:  GridGap
  colGap?:  GridGap
  dense?:   boolean
  as?:      string
}

const props = withDefaults(defineProps<Props>(), {
  cols:  12,
  gap:   'md',
  dense: false,
  as:    'div',
})

const GAP_MAP: Record<GridGap, string> = {
  none: '0',
  xs:   'var(--byz-space-2, 0.5rem)',
  sm:   'var(--byz-space-3, 0.75rem)',
  md:   'var(--byz-space-4, 1rem)',
  lg:   'var(--byz-space-6, 1.5rem)',
  xl:   'var(--byz-space-8, 2rem)',
}

const gridStyle = computed(() => ({
  '--byz-grid-cols':    String(props.cols),
  '--byz-grid-col-gap': GAP_MAP[props.colGap ?? props.gap],
  '--byz-grid-row-gap': GAP_MAP[props.rowGap ?? props.gap],
}))

const classes = computed(() => [
  'byz-grid',
  `byz-grid--${props.cols}`,
  props.dense && 'byz-grid--dense',
])
</script>

<template>
  <component :is="as" :class="classes" :style="gridStyle">
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.byz-grid {
  display: grid;
  grid-template-columns: repeat(var(--byz-grid-cols, 12), minmax(0, 1fr));
  column-gap: var(--byz-grid-col-gap, 1rem);
  row-gap:    var(--byz-grid-row-gap, 1rem);
  width: 100%;

  &--dense {
    grid-auto-flow: dense;
  }
}
</style>
