<script setup lang="ts">
  defineOptions({ name: 'ByzCard' })

  interface Props {
    as?: string
    padding?: 'sm' | 'md' | 'lg'
    elevated?: boolean
  }

  withDefaults(defineProps<Props>(), {
    as: 'div',
    padding: 'md',
    elevated: false
  })
</script>

<template>
  <component
    :is="as"
    :class="['byz-card', `byz-card--${padding}`, { 'byz-card--elevated': elevated }]"
  >
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.byz-card {
  background: linear-gradient(145deg, var(--byz-color-surface) 0%, var(--byz-color-surface-raised) 100%);
  border: 1px solid var(--byz-color-border);
  border-radius: 0.5rem;

  &--sm  { padding: var(--byz-space-4); }
  &--md  { padding: var(--byz-space-6); }
  &--lg  { padding: var(--byz-space-8); }

  &--elevated {
    box-shadow:
      0 4px 24px rgba(0, 0, 0, 0.2),
      0 1px 0 rgba(255, 255, 255, 0.04) inset;
  }
}
</style>
