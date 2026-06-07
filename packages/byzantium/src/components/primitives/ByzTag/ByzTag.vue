<script setup lang="ts">
  defineOptions({ name: 'ByzTag' })

  interface Props {
    label: string
    removable?: boolean
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
    size?: 'sm' | 'md'
  }

  withDefaults(defineProps<Props>(), {
    removable: false,
    variant: 'default',
    size: 'md'
  })

  const emit = defineEmits<{ remove: [] }>()
</script>

<template>
  <span
    :class="[
      'byz-tag',
      `byz-tag--${variant}`,
      `byz-tag--${size}`
    ]"
  >
    <span class="byz-tag__label">{{ label }}</span>
    <button
      v-if="removable"
      class="byz-tag__remove"
      :aria-label="`Verwijder ${label}`"
      type="button"
      @click="emit('remove')"
    >×</button>
  </span>
</template>

<style lang="scss" scoped>
.byz-tag {
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  font-family: var(--byz-font-sans);
  font-weight: var(--byz-font-medium);
  line-height: 1;
  white-space: nowrap;
  vertical-align: middle;

  // Sizes
  &--md {
    gap: var(--byz-space-2);
    padding: var(--byz-space-1) var(--byz-space-3);
    font-size: var(--byz-text-xs);
    min-height: 1.5rem;
  }

  &--sm {
    gap: var(--byz-space-1);
    padding: 0.125rem var(--byz-space-2);
    font-size: 0.6875rem;
    min-height: 1.25rem;
  }

  // Variants
  &--default {
    background: rgba(232, 64, 80, 0.12);
    border: 1px solid rgba(232, 64, 80, 0.25);
    color: var(--byz-brand-400);
  }

  &--success {
    background: rgba(22, 163, 74, 0.12);
    border: 1px solid rgba(22, 163, 74, 0.25);
    color: #4ade80;
  }

  &--warning {
    background: rgba(217, 119, 6, 0.12);
    border: 1px solid rgba(217, 119, 6, 0.25);
    color: #fbbf24;
  }

  &--error {
    background: rgba(220, 38, 38, 0.12);
    border: 1px solid rgba(220, 38, 38, 0.25);
    color: #f87171;
  }

  &--info {
    background: rgba(37, 99, 235, 0.12);
    border: 1px solid rgba(37, 99, 235, 0.25);
    color: #60a5fa;
  }

  // Remove button
  &__remove {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
    color: inherit;
    font-size: 1em;
    line-height: 1;
    opacity: 0.7;
    transition: opacity var(--byz-duration-fast) var(--byz-ease-default);

    &:hover {
      opacity: 1;
    }

    &:focus-visible {
      outline: 2px solid var(--byz-color-focus);
      outline-offset: 2px;
      border-radius: 9999px;
    }
  }
}
</style>
