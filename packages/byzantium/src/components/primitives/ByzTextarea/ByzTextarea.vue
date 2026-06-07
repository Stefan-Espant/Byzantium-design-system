<script setup lang="ts">
  import { computed } from 'vue'

  defineOptions({ name: 'ByzTextarea' })

  interface Props {
    modelValue?: string
    label: string
    placeholder?: string
    disabled?: boolean
    error?: string
    hint?: string
    required?: boolean
    rows?: number
    resize?: 'none' | 'vertical' | 'both'
  }

  const props = withDefaults(defineProps<Props>(), {
    disabled: false,
    required: false,
    rows: 4,
    resize: 'vertical'
  })

  const emit = defineEmits<{
    'update:modelValue': [value: string]
  }>()

  const id = `byz-textarea-${Math.random().toString(36).slice(2, 9)}`
  const errorId = `${id}-error`
  const hintId = `${id}-hint`

  const minHeight = computed(() => `calc(${props.rows} * 1.5rem + var(--byz-space-2) * 2)`)
</script>

<template>
  <div :class="['byz-textarea', { 'byz-textarea--error': error, 'byz-textarea--disabled': disabled }]">
    <label :for="id" class="byz-textarea__label">
      {{ label }}
      <span v-if="required" class="byz-textarea__required" aria-hidden="true">*</span>
    </label>

    <textarea
      :id="id"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :rows="rows"
      :aria-describedby="[error ? errorId : '', hint ? hintId : ''].filter(Boolean).join(' ') || undefined"
      :aria-invalid="!!error"
      class="byz-textarea__field"
      :style="{ resize, minHeight }"
      @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />

    <span v-if="hint && !error" :id="hintId" class="byz-textarea__hint">{{ hint }}</span>
    <span v-if="error" :id="errorId" class="byz-textarea__error" role="alert">{{ error }}</span>
  </div>
</template>

<style lang="scss" scoped>
.byz-textarea {
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

  &__field {
    padding: var(--byz-space-2) var(--byz-space-3);
    border: 2px solid var(--byz-color-border);
    border-radius: 0.375rem;
    background-color: var(--byz-color-background);
    color: var(--byz-color-text-primary);
    font-size: var(--byz-text-base);
    font-family: var(--byz-font-sans);
    line-height: 1.5;
    transition: border-color var(--byz-duration-fast) var(--byz-ease-default);

    &::placeholder {
      color: var(--byz-color-text-muted);
    }

    &:focus {
      outline: none;
      border-color: var(--byz-color-focus);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &--error &__field {
    border-color: var(--byz-color-error);
  }

  &__hint {
    font-size: var(--byz-text-sm);
    color: var(--byz-color-text-secondary);
  }

  &__error {
    font-size: var(--byz-text-sm);
    color: var(--byz-color-error);
  }
}
</style>
