<script setup lang="ts">
  import { computed } from 'vue'

  defineOptions({ name: 'ByzSkeleton' })

  interface Props {
    width?: string
    height?: string
    rounded?: boolean
    lines?: number
  }

  const props = withDefaults(defineProps<Props>(), {
    width: '100%',
    height: '1rem',
    rounded: false,
    lines: 1
  })

  const isMultiLine = computed(() => props.lines > 1)

  function lineWidth(index: number): string {
    // Last line is narrower for a natural paragraph look
    if (isMultiLine.value && index === props.lines - 1) return '70%'
    return props.width
  }
</script>

<template>
  <span
    class="byz-skeleton-wrapper"
    role="status"
    aria-label="Laden..."
    aria-busy="true"
  >
    <span
      v-for="i in lines"
      :key="i"
      class="byz-skeleton"
      :class="{ 'byz-skeleton--rounded': rounded }"
      :style="{
        width: lineWidth(i - 1),
        height: height,
        marginBottom: lines > 1 && i < lines ? 'var(--byz-space-2, 0.5rem)' : undefined
      }"
      aria-hidden="true"
    />
  </span>
</template>

<style lang="scss" scoped>
.byz-skeleton-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

.byz-skeleton {
  display: block;
  background: var(--byz-color-surface, #160608);
  border-radius: 0.25rem;
  position: relative;
  overflow: hidden;

  &--rounded {
    border-radius: 9999px;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      var(--byz-color-surface-raised, #1e0a0d) 50%,
      transparent 100%
    );
    background-size: 200% 100%;
    animation: byz-shimmer 1.6s ease-in-out infinite;
  }
}

@keyframes byz-shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

@media (prefers-reduced-motion: reduce) {
  .byz-skeleton::after {
    animation: none;
    background: var(--byz-color-surface-raised, #1e0a0d);
    opacity: 0.6;
  }
}
</style>
