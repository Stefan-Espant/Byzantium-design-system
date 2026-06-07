<script setup lang="ts">
  defineOptions({ name: 'ByzAlert' })

  interface Props {
    type?: 'success' | 'error' | 'warning' | 'info'
    title?: string
    dismissible?: boolean
  }

  withDefaults(defineProps<Props>(), {
    type: 'info',
    dismissible: false
  })

  const emit = defineEmits<{ dismiss: [] }>()
</script>

<template>
  <div
    :class="['byz-alert', `byz-alert--${type}`]"
    role="alert"
    aria-live="polite"
  >
    <div class="byz-alert__content">
      <strong v-if="title" class="byz-alert__title">{{ title }}</strong>
      <slot />
    </div>
    <button
      v-if="dismissible"
      class="byz-alert__dismiss"
      aria-label="Sluiten"
      @click="emit('dismiss')"
    >
      ✕
    </button>
  </div>
</template>

<style lang="scss" scoped>
.byz-alert {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--byz-space-4);
  padding: var(--byz-space-4);
  border-radius: 0.375rem;
  border: 2px solid transparent;

  &--success {
    background: linear-gradient(135deg, rgba(22,163,74,0.15), rgba(22,163,74,0.08));
    border-color: var(--byz-color-success);
    color: var(--byz-color-text-primary);
  }
  &--error {
    background: linear-gradient(135deg, rgba(220,38,38,0.15), rgba(220,38,38,0.08));
    border-color: var(--byz-color-error);
    color: var(--byz-color-text-primary);
  }
  &--warning {
    background: linear-gradient(135deg, rgba(217,119,6,0.15), rgba(217,119,6,0.08));
    border-color: var(--byz-color-warning);
    color: var(--byz-color-text-primary);
  }
  &--info {
    background: linear-gradient(135deg, rgba(37,99,235,0.15), rgba(37,99,235,0.08));
    border-color: var(--byz-color-info);
    color: var(--byz-color-text-primary);
  }

  &__title   { display: block; font-weight: var(--byz-font-semibold); margin-bottom: var(--byz-space-1); }
  &__dismiss {
    background: none;
    border: none;
    cursor: pointer;
    color: inherit;
    min-width: 44px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
