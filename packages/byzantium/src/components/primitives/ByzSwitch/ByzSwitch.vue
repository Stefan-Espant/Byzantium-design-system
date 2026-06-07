<script setup lang="ts">
  defineOptions({ name: 'ByzSwitch' })

  interface Props {
    modelValue?: boolean
    label: string
    disabled?: boolean
    size?: 'sm' | 'md'
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: false,
    disabled: false,
    size: 'md'
  })

  const emit = defineEmits<{
    'update:modelValue': [value: boolean]
  }>()

  function toggle() {
    if (!props.disabled) {
      emit('update:modelValue', !props.modelValue)
    }
  }
</script>

<template>
  <div :class="['byz-switch', { 'byz-switch--disabled': disabled }]">
    <button
      type="button"
      role="switch"
      :aria-checked="modelValue"
      :aria-label="label"
      :disabled="disabled"
      :class="[
        'byz-switch__track',
        `byz-switch__track--${size}`,
        { 'byz-switch__track--on': modelValue }
      ]"
      @click="toggle"
    >
      <span
        :class="[
          'byz-switch__thumb',
          `byz-switch__thumb--${size}`,
          { 'byz-switch__thumb--on': modelValue }
        ]"
      />
    </button>
    <span class="byz-switch__label" @click="toggle">{{ label }}</span>
  </div>
</template>

<style lang="scss" scoped>
.byz-switch {
  display: inline-flex;
  align-items: center;
  gap: var(--byz-space-2);

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;

    .byz-switch__label,
    .byz-switch__track {
      cursor: not-allowed;
    }
  }

  &__label {
    font-size: var(--byz-text-sm);
    color: var(--byz-color-text-primary);
    cursor: pointer;
    user-select: none;
    line-height: 1.4;
  }

  &__track {
    position: relative;
    flex-shrink: 0;
    border: none;
    border-radius: 9999px;
    background-color: var(--byz-color-border);
    cursor: pointer;
    padding: 0;
    transition: background-color var(--byz-duration-normal) var(--byz-ease-default);

    &--md {
      width: 44px;
      height: 24px;
    }

    &--sm {
      width: 36px;
      height: 20px;
    }

    &--on {
      background: linear-gradient(135deg, var(--byz-brand-500), var(--byz-brand-400));
    }

    &:focus-visible {
      outline: 2px solid var(--byz-color-focus);
      outline-offset: 2px;
    }
  }

  &__thumb {
    position: absolute;
    top: 50%;
    background-color: #ffffff;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    transform: translateY(-50%) translateX(0);
    transition: transform var(--byz-duration-normal) var(--byz-ease-default);

    &--md {
      width: 18px;
      height: 18px;
      left: 3px;

      &.byz-switch__thumb--on {
        transform: translateY(-50%) translateX(20px);
      }
    }

    &--sm {
      width: 14px;
      height: 14px;
      left: 3px;

      &.byz-switch__thumb--on {
        transform: translateY(-50%) translateX(16px);
      }
    }
  }
}
</style>
