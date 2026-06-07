<script setup lang="ts">
  defineOptions({ name: 'ByzCheckbox' })

  interface Props {
    modelValue?: boolean
    label: string
    disabled?: boolean
    error?: string
    indeterminate?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: false,
    disabled: false,
    indeterminate: false
  })

  const emit = defineEmits<{
    'update:modelValue': [value: boolean]
  }>()

  const id = `byz-checkbox-${Math.random().toString(36).slice(2, 9)}`
  const errorId = `${id}-error`

  function handleChange(event: Event) {
    emit('update:modelValue', (event.target as HTMLInputElement).checked)
  }
</script>

<template>
  <div :class="['byz-checkbox', { 'byz-checkbox--error': error, 'byz-checkbox--disabled': disabled }]">
    <label :for="id" class="byz-checkbox__wrapper">
      <input
        :id="id"
        type="checkbox"
        :checked="modelValue"
        :disabled="disabled"
        :indeterminate="indeterminate"
        :aria-describedby="error ? errorId : undefined"
        :aria-invalid="!!error"
        class="byz-checkbox__input"
        @change="handleChange"
      />
      <span
        :class="[
          'byz-checkbox__box',
          {
            'byz-checkbox__box--checked': modelValue && !indeterminate,
            'byz-checkbox__box--indeterminate': indeterminate
          }
        ]"
        aria-hidden="true"
      />
      <span class="byz-checkbox__label">{{ label }}</span>
    </label>

    <span v-if="error" :id="errorId" class="byz-checkbox__error" role="alert">{{ error }}</span>
  </div>
</template>

<style lang="scss" scoped>
.byz-checkbox {
  display: flex;
  flex-direction: column;
  gap: var(--byz-space-1);

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;

    .byz-checkbox__wrapper {
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

    &:focus-visible ~ .byz-checkbox__box {
      outline: 2px solid var(--byz-color-focus);
      outline-offset: 2px;
    }
  }

  &__box {
    position: relative;
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    border: 2px solid var(--byz-color-border);
    border-radius: 4px;
    background-color: var(--byz-color-background);
    transition:
      background-color var(--byz-duration-fast) var(--byz-ease-default),
      border-color var(--byz-duration-fast) var(--byz-ease-default);

    &--checked {
      background: linear-gradient(135deg, var(--byz-brand-500), var(--byz-brand-400));
      border-color: transparent;

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 5px;
        height: 9px;
        border: 2px solid #ffffff;
        border-top: none;
        border-left: none;
        transform: translate(-50%, -60%) rotate(45deg);
      }
    }

    &--indeterminate {
      background: linear-gradient(135deg, var(--byz-brand-500), var(--byz-brand-400));
      border-color: transparent;

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 8px;
        height: 2px;
        background-color: #ffffff;
        transform: translate(-50%, -50%);
      }
    }
  }

  &--error .byz-checkbox__box {
    border-color: var(--byz-color-error);
  }

  &__label {
    font-size: var(--byz-text-sm);
    color: var(--byz-color-text-primary);
    line-height: 1.4;
  }

  &__error {
    font-size: var(--byz-text-sm);
    color: var(--byz-color-error);
    padding-left: calc(18px + var(--byz-space-2));
  }
}
</style>
