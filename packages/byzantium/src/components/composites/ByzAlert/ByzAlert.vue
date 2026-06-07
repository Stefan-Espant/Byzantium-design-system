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

  &--success { background: linear-gradient(135deg, #dcfce7, #bbf7d0); border-color: #16a34a; color: #14532d; }
  &--error   { background: linear-gradient(135deg, #fee2e2, #fecaca); border-color: #dc2626; color: #7f1d1d; }
  &--warning { background: linear-gradient(135deg, #fef9c3, #fef08a); border-color: #d97706; color: #78350f; }
  &--info    { background: linear-gradient(135deg, #dbeafe, #bfdbfe); border-color: #2563eb; color: #1e3a8a; }

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
