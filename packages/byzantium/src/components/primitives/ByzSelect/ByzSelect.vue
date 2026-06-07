<script setup lang="ts">
  defineOptions({ name: 'ByzSelect' })

  interface Option {
    value: string | number
    label: string
    disabled?: boolean
  }

  interface Props {
    modelValue?: string | number
    label: string
    options: Option[]
    placeholder?: string
    disabled?: boolean
    error?: string
    hint?: string
    required?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    placeholder: 'Selecteer...',
    disabled: false,
    required: false
  })

  const emit = defineEmits<{
    'update:modelValue': [value: string | number]
  }>()

  const id = `byz-select-${Math.random().toString(36).slice(2, 9)}`
  const errorId = `${id}-error`
  const hintId = `${id}-hint`

  function handleChange(event: Event) {
    const target = event.target as HTMLSelectElement
    const selected = props.options.find(o => String(o.value) === target.value)
    if (selected !== undefined) {
      emit('update:modelValue', selected.value)
    }
  }
</script>

<template>
  <div :class="['byz-select', { 'byz-select--error': error, 'byz-select--disabled': disabled }]">
    <label :for="id" class="byz-select__label">
      {{ label }}
      <span v-if="required" class="byz-select__required" aria-hidden="true">*</span>
    </label>

    <div class="byz-select__wrapper">
      <select
        :id="id"
        :value="modelValue !== undefined ? String(modelValue) : ''"
        :disabled="disabled"
        :required="required"
        :aria-describedby="[error ? errorId : '', hint ? hintId : ''].filter(Boolean).join(' ') || undefined"
        :aria-invalid="!!error"
        class="byz-select__field"
        @change="handleChange"
      >
        <option v-if="placeholder" value="" disabled :selected="modelValue === undefined || modelValue === ''">
          {{ placeholder }}
        </option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="String(option.value)"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </option>
      </select>
      <span class="byz-select__chevron" aria-hidden="true">▾</span>
    </div>

    <span v-if="hint && !error" :id="hintId" class="byz-select__hint">{{ hint }}</span>
    <span v-if="error" :id="errorId" class="byz-select__error" role="alert">{{ error }}</span>
  </div>
</template>

<style lang="scss" scoped>
.byz-select {
  display: flex;
  flex-direction: column;
  gap: var(--byz-space-2);

  &__label {
    font-size: var(--byz-text-sm);
    font-weight: var(--byz-font-medium);
    color: var(--byz-color-text-primary);
  }

  &__required {
    color: var(--byz-color-error);
    margin-left: var(--byz-space-1);
  }

  &__wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  &__field {
    width: 100%;
    min-height: 44px;
    padding: var(--byz-space-2) var(--byz-space-8) var(--byz-space-2) var(--byz-space-3);
    border: 2px solid var(--byz-color-border);
    border-radius: 0.375rem;
    background-color: var(--byz-color-background);
    color: var(--byz-color-text-primary);
    font-size: var(--byz-text-base);
    font-family: inherit;
    appearance: none;
    -webkit-appearance: none;
    cursor: pointer;
    transition: border-color var(--byz-duration-fast) var(--byz-ease-default);

    &:focus {
      outline: none;
      border-color: var(--byz-color-focus);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    option {
      background-color: var(--byz-color-background);
      color: var(--byz-color-text-primary);
    }
  }

  &--error &__field {
    border-color: var(--byz-color-error);
  }

  &__chevron {
    position: absolute;
    right: var(--byz-space-3);
    pointer-events: none;
    color: var(--byz-color-text-secondary);
    font-size: var(--byz-text-base);
    line-height: 1;
  }

  &--disabled &__chevron {
    opacity: 0.5;
  }

  &__hint  { font-size: var(--byz-text-sm); color: var(--byz-color-text-secondary); }
  &__error { font-size: var(--byz-text-sm); color: var(--byz-color-error); }
}
</style>
