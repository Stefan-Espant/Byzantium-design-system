<script setup lang="ts">
  import { computed } from 'vue'

  defineOptions({ name: 'ByzFormField' })

  interface Props {
    label: string
    error?: string
    hint?: string
    required?: boolean
    touched?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    required: false,
    touched: false,
  })

  const id = `byz-form-field-${Math.random().toString(36).slice(2, 9)}`
  const errorId = `${id}-error`
  const hintId = `${id}-hint`

  const showError = computed(() => !!props.error && props.touched)
</script>

<template>
  <div
    :class="['byz-form-field', { 'byz-form-field--error': showError }]"
    :aria-describedby="[showError ? errorId : '', hint && !showError ? hintId : ''].filter(Boolean).join(' ') || undefined"
  >
    <label :for="id" class="byz-form-field__label">
      {{ label }}
      <span v-if="required" class="byz-form-field__required" aria-hidden="true">*</span>
    </label>

    <div class="byz-form-field__control">
      <slot />
    </div>

    <span v-if="hint && !showError" :id="hintId" class="byz-form-field__hint">{{ hint }}</span>
    <span v-if="showError" :id="errorId" class="byz-form-field__error" role="alert">{{ error }}</span>
  </div>
</template>

<style lang="scss" scoped>
.byz-form-field {
  display: flex;
  flex-direction: column;
  gap: var(--byz-space-2);

  &__label {
    font-size: var(--byz-text-sm);
    font-weight: var(--byz-font-medium);
    color: var(--byz-color-text-primary);
    font-family: var(--byz-font-sans);
  }

  &__required {
    color: var(--byz-color-error);
    margin-left: var(--byz-space-1);
  }

  &__control {
    display: contents;
  }

  &__hint {
    font-size: var(--byz-text-sm);
    color: var(--byz-color-text-secondary);
    font-family: var(--byz-font-sans);
  }

  &__error {
    font-size: var(--byz-text-sm);
    color: var(--byz-color-error);
    font-family: var(--byz-font-sans);
  }
}
</style>
