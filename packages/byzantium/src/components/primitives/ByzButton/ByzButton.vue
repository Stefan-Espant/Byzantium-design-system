<script setup lang="ts">
  defineOptions({ name: 'ByzButton' })

  interface Props {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    loading?: boolean
    type?: 'button' | 'submit' | 'reset'
    ariaLabel?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    type: 'button'
  })

  const emit = defineEmits<{
    click: [event: MouseEvent]
  }>()

  function handleClick(event: MouseEvent) {
    if (!props.disabled && !props.loading) {
      emit('click', event)
    }
  }
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :aria-disabled="disabled || loading"
    :aria-busy="loading"
    :aria-label="ariaLabel"
    :class="[
      'byz-button',
      `byz-button--${variant}`,
      `byz-button--${size}`,
      { 'byz-button--loading': loading }
    ]"
    @click="handleClick"
  >
    <span v-if="loading" class="byz-button__spinner" aria-hidden="true" />
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.byz-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--byz-space-2);
  border: 1.5px solid transparent;
  border-radius: 0.375rem;
  font-weight: var(--byz-font-semibold);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition:
    opacity var(--byz-duration-fast) var(--byz-ease-default),
    border-color var(--byz-duration-fast) var(--byz-ease-default),
    box-shadow var(--byz-duration-fast) var(--byz-ease-default);

  // Sizes
  &--sm  { padding: var(--byz-space-1) var(--byz-space-3); min-height: 36px; font-size: var(--byz-text-sm); }
  &--md  { padding: var(--byz-space-2) var(--byz-space-4); min-height: 40px; font-size: var(--byz-text-base); }
  &--lg  { padding: var(--byz-space-3) var(--byz-space-6); min-height: 44px; font-size: var(--byz-text-lg); }

  // Variants
  &--primary {
    background: linear-gradient(135deg, var(--byz-brand-500) 0%, var(--byz-brand-400) 100%);
    color: #ffffff;
    box-shadow: 0 2px 12px rgba(192, 16, 48, 0.35);
    &:hover:not(:disabled) {
      box-shadow: 0 4px 20px rgba(192, 16, 48, 0.5);
      opacity: 0.92;
    }
  }

  &--secondary {
    background: transparent;
    border-color: var(--byz-brand-500);
    color: var(--byz-brand-400);
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, rgba(192,16,48,0.08), rgba(232,64,80,0.04));
      border-color: var(--byz-brand-400);
    }
  }

  &--ghost {
    background: transparent;
    color: var(--byz-color-text-secondary);
    &:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.05);
      color: var(--byz-color-text-primary);
    }
  }

  &--danger {
    background: linear-gradient(135deg, #b91c1c 0%, #dc2626 100%);
    color: #ffffff;
    box-shadow: 0 2px 12px rgba(220, 38, 38, 0.3);
    &:hover:not(:disabled) { box-shadow: 0 4px 20px rgba(220, 38, 38, 0.45); opacity: 0.92; }
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    box-shadow: none;
  }

  &__spinner {
    width: 1em;
    height: 1em;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: byz-spin var(--byz-duration-slow) linear infinite;
  }
}

@keyframes byz-spin {
  to { transform: rotate(360deg); }
}
</style>
