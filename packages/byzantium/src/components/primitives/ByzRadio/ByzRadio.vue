<script setup lang="ts">
  defineOptions({ name: 'ByzRadio' })

  interface Props {
    modelValue?: string | number
    value: string | number
    label: string
    name: string
    disabled?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    disabled: false
  })

  const emit = defineEmits<{
    'update:modelValue': [value: string | number]
  }>()

  const id = `byz-radio-${Math.random().toString(36).slice(2, 9)}`

  function handleChange() {
    emit('update:modelValue', props.value)
  }
</script>

<template>
  <div :class="['byz-radio', { 'byz-radio--disabled': disabled }]">
    <label :for="id" class="byz-radio__wrapper">
      <input
        :id="id"
        type="radio"
        :name="name"
        :value="value"
        :checked="modelValue === value"
        :disabled="disabled"
        class="byz-radio__input"
        @change="handleChange"
      />
      <span
        :class="['byz-radio__circle', { 'byz-radio__circle--selected': modelValue === value }]"
        aria-hidden="true"
      />
      <span class="byz-radio__label">{{ label }}</span>
    </label>
  </div>
</template>

<style lang="scss" scoped>
.byz-radio {
  display: inline-flex;

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;

    .byz-radio__wrapper {
      cursor: not-allowed;
    }
  }

  &__wrapper {
    display: inline-flex;
    align-items: center;
    gap: var(--byz-space-2);
    cursor: pointer;
    user-select: none;
  }

  &__input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;

    &:focus-visible ~ .byz-radio__circle {
      outline: 2px solid var(--byz-color-focus);
      outline-offset: 2px;
    }
  }

  &__circle {
    position: relative;
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    border: 2px solid var(--byz-color-border);
    border-radius: 50%;
    background-color: var(--byz-color-background);
    transition:
      background-color var(--byz-duration-fast) var(--byz-ease-default),
      border-color var(--byz-duration-fast) var(--byz-ease-default);

    &--selected {
      border-color: var(--byz-brand-500);

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 8px;
        height: 8px;
        background: linear-gradient(135deg, var(--byz-brand-500), var(--byz-brand-400));
        border-radius: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

  &__label {
    font-size: var(--byz-text-sm);
    color: var(--byz-color-text-primary);
    line-height: 1.4;
  }
}
</style>
