<script setup lang="ts">
  defineOptions({ name: 'ByzBadge' })

  interface Props {
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
    size?: 'sm' | 'md'
    dot?: boolean
  }

  withDefaults(defineProps<Props>(), {
    variant: 'default',
    size: 'md',
    dot: false
  })
</script>

<template>
  <span
    :class="[
      'byz-badge',
      `byz-badge--${variant}`,
      `byz-badge--${size}`,
      { 'byz-badge--dot': dot }
    ]"
    role="status"
  >
    <template v-if="!dot">
      <slot />
    </template>
  </span>
</template>

<style lang="scss" scoped>
.byz-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  font-family: var(--byz-font-sans);
  font-weight: var(--byz-font-semibold);
  line-height: 1;
  white-space: nowrap;
  vertical-align: middle;

  // Sizes
  &--md {
    padding: var(--byz-space-1) var(--byz-space-3);
    font-size: var(--byz-text-xs);
    min-height: 1.375rem;
  }

  &--sm {
    padding: 0.125rem var(--byz-space-2);
    font-size: 0.6875rem;
    min-height: 1.125rem;
  }

  // Dot mode overrides
  &--dot {
    width: 8px;
    height: 8px;
    min-height: unset;
    padding: 0;
    border-radius: 9999px;
  }

  // Variants
  &--default {
    background: linear-gradient(135deg, var(--byz-brand-500) 0%, var(--byz-brand-400) 100%);
    color: #ffffff;
    box-shadow: 0 1px 6px rgba(192, 16, 48, 0.3);
  }

  &--success {
    background: rgba(22, 163, 74, 0.18);
    color: #4ade80;
    border: 1px solid rgba(22, 163, 74, 0.3);
  }

  &--warning {
    background: rgba(217, 119, 6, 0.18);
    color: #fbbf24;
    border: 1px solid rgba(217, 119, 6, 0.3);
  }

  &--error {
    background: rgba(220, 38, 38, 0.18);
    color: #f87171;
    border: 1px solid rgba(220, 38, 38, 0.3);
  }

  &--info {
    background: rgba(37, 99, 235, 0.18);
    color: #60a5fa;
    border: 1px solid rgba(37, 99, 235, 0.3);
  }
}
</style>
