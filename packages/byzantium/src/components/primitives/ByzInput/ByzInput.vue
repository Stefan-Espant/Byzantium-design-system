<script setup lang="ts">
  defineOptions({ name: 'ByzInput' })

  interface Props {
    modelValue?: string
    label: string
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
    placeholder?: string
    disabled?: boolean
    error?: string
    hint?: string
    required?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    disabled: false,
    required: false
  })

  const emit = defineEmits<{
    'update:modelValue': [value: string]
  }>()

  const id = `byz-input-${Math.random().toString(36).slice(2, 9)}`
  const errorId = `${id}-error`
  const hintId = `${id}-hint`
</script>

<template>
  <div :class="['byz-input', { 'byz-input--error': error, 'byz-input--disabled': disabled }]">
    <label :for="id" class="byz-input__label">
      {{ label }}
      <span v-if="required" class="byz-input__required" aria-hidden="true">*</span>
    </label>

    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :aria-describedby="[error ? errorId : '', hint ? hintId : ''].filter(Boolean).join(' ') || undefined"
      :aria-invalid="!!error"
      class="byz-input__field"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />

    <span v-if="hint && !error" :id="hintId" class="byz-input__hint">{{ hint }}</span>
    <span v-if="error" :id="errorId" class="byz-input__error" role="alert">{{ error }}</span>
  </div>
</template>

<style lang="scss" scoped>
.byz-input {
  display: flex;
  flex-direction: column;
  gap: var(--byz-space-2);

  &__label {
    font-size: var(--byz-text-sm);
    font-weight: var(--byz-font-medium);
    color: var(--byz-color-text-primary);
  }

  &__required { color: var(--byz-color-error); margin-left: var(--byz-space-1); }

  &__field {
    min-height: 44px;
    padding: var(--byz-space-2) var(--byz-space-3);
    border: 2px solid var(--byz-color-border);
    border-radius: 0.375rem;
    background-color: var(--byz-color-background);
    color: var(--byz-color-text-primary);
    font-size: var(--byz-text-base);
    transition: border-color var(--byz-duration-fast) var(--byz-ease-default);

    &:focus { outline: none; border-color: var(--byz-color-focus); }
    &:disabled { opacity: 0.5; cursor: not-allowed; }
  }

  &--error &__field { border-color: var(--byz-color-error); }

  &__hint  { font-size: var(--byz-text-sm); color: var(--byz-color-text-secondary); }
  &__error { font-size: var(--byz-text-sm); color: var(--byz-color-error); }
}
</style>
