<script setup lang="ts">
  defineOptions({ name: 'ByzIcon' })

  interface Props {
    name: string
    size?: 'sm' | 'md' | 'lg'
    ariaLabel?: string
  }

  withDefaults(defineProps<Props>(), {
    size: 'md'
  })
</script>

<template>
  <span
    :class="['byz-icon', `byz-icon--${size}`]"
    :aria-label="ariaLabel"
    :aria-hidden="!ariaLabel"
    role="img"
  >
    <slot />
  </span>
</template>

<style lang="scss" scoped>
.byz-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &--sm { width: 1rem;    height: 1rem; }
  &--md { width: 1.5rem;  height: 1.5rem; }
  &--lg { width: 2rem;    height: 2rem; }
}
</style>
