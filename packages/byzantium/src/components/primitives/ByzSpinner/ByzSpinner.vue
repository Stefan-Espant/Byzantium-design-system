<script setup lang="ts">
  defineOptions({ name: 'ByzSpinner' })

  interface Props {
    size?: 'sm' | 'md' | 'lg'
    color?: 'brand' | 'white' | 'muted'
  }

  withDefaults(defineProps<Props>(), {
    size: 'md',
    color: 'brand'
  })
</script>

<template>
  <span
    role="status"
    :class="[
      'byz-spinner',
      `byz-spinner--${size}`,
      `byz-spinner--${color}`
    ]"
  >
    <span class="byz-spinner__ring" aria-hidden="true" />
    <span class="byz-spinner__sr-only">Laden...</span>
  </span>
</template>

<style lang="scss" scoped>
.byz-spinner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  // Sizes
  &--sm &__ring { width: 16px; height: 16px; border-width: 2px; }
  &--md &__ring { width: 24px; height: 24px; border-width: 2.5px; }
  &--lg &__ring { width: 40px; height: 40px; border-width: 3px; }

  // Colors
  &--brand &__ring {
    border-color: rgba(192, 16, 48, 0.25);
    border-top-color: var(--byz-brand-500, #c01030);
  }

  &--white &__ring {
    border-color: rgba(255, 255, 255, 0.25);
    border-top-color: #ffffff;
  }

  &--muted &__ring {
    border-color: rgba(255, 255, 255, 0.08);
    border-top-color: var(--byz-color-text-muted);
  }

  &__ring {
    display: block;
    border-style: solid;
    border-radius: 9999px;
    animation: byz-spin var(--byz-duration-slow, 300ms) linear infinite;
  }

  &__sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
}

@keyframes byz-spin {
  to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .byz-spinner__ring {
    animation-play-state: paused;
  }
}
</style>
