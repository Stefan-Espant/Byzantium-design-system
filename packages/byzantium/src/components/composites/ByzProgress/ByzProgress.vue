<script setup lang="ts">
  import { computed } from 'vue'

  defineOptions({ name: 'ByzProgress' })

  interface Props {
    value: number
    max?: number
    label?: string
    showValue?: boolean
    size?: 'sm' | 'md' | 'lg'
    variant?: 'default' | 'success' | 'error'
    indeterminate?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    max: 100,
    showValue: false,
    size: 'md',
    variant: 'default',
    indeterminate: false,
  })

  const percentage = computed(() => {
    if (props.indeterminate) return 0
    return Math.min(100, Math.max(0, (props.value / props.max) * 100))
  })

  const percentageLabel = computed(() => `${Math.round(percentage.value)}%`)
</script>

<template>
  <div class="byz-progress">
    <div
      v-if="label || showValue"
      class="byz-progress__header"
    >
      <span v-if="label" class="byz-progress__label">{{ label }}</span>
      <span v-if="showValue && !indeterminate" class="byz-progress__value">{{ percentageLabel }}</span>
    </div>

    <div
      :class="['byz-progress__track', `byz-progress__track--${size}`]"
      role="progressbar"
      :aria-valuenow="indeterminate ? undefined : value"
      :aria-valuemax="max"
      :aria-valuemin="0"
      :aria-label="label"
      :aria-busy="indeterminate"
    >
      <div
        :class="[
          'byz-progress__fill',
          `byz-progress__fill--${variant}`,
          { 'byz-progress__fill--indeterminate': indeterminate },
        ]"
        :style="indeterminate ? undefined : { width: `${percentage}%` }"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.byz-progress {
  width: 100%;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--byz-space-2);
  }

  &__label {
    font-size: var(--byz-text-sm);
    color: var(--byz-color-text-secondary);
  }

  &__value {
    font-size: var(--byz-text-sm);
    color: var(--byz-color-text-muted);
    font-weight: var(--byz-font-medium);
  }

  &__track {
    width: 100%;
    background-color: var(--byz-color-surface-raised);
    border-radius: 9999px;
    overflow: hidden;

    &--sm { height: 4px; }
    &--md { height: 8px; }
    &--lg { height: 12px; }
  }

  &__fill {
    height: 100%;
    border-radius: 9999px;
    transition: width 300ms var(--byz-ease-default);

    &--default {
      background: linear-gradient(90deg, var(--byz-brand-500), var(--byz-brand-400));
    }

    &--success {
      background-color: var(--byz-color-success);
    }

    &--error {
      background-color: var(--byz-color-error);
    }

    &--indeterminate {
      width: 40% !important;
      animation: byz-progress-indeterminate 1.4s var(--byz-ease-default) infinite;
    }
  }
}

@keyframes byz-progress-indeterminate {
  0% {
    transform: translateX(-150%);
  }
  100% {
    transform: translateX(350%);
  }
}
</style>
