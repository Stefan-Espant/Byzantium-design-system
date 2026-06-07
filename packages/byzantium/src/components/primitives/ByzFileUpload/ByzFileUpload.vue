<script setup lang="ts">
import { ref, computed } from 'vue'

defineOptions({ name: 'ByzFileUpload' })

interface Props {
  modelValue?: File[]
  label?: string
  accept?: string
  multiple?: boolean
  maxSize?: number
  disabled?: boolean
  error?: string
}

const props = withDefaults(defineProps<Props>(), {
  multiple: false,
  maxSize: 10485760, // 10 MB
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [files: File[]]
  'error': [message: string]
}>()

const id = `byz-file-upload-${Math.random().toString(36).slice(2, 9)}`
const inputEl = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)

const currentFiles = computed(() => props.modelValue ?? [])

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function validateAndAdd(incoming: FileList | File[]) {
  const files = Array.from(incoming)
  const valid: File[] = []
  const maxBytes = props.maxSize

  for (const file of files) {
    if (file.size > maxBytes) {
      emit('error', `"${file.name}" overschrijdt de maximale bestandsgrootte van ${formatSize(maxBytes)}.`)
    } else {
      valid.push(file)
    }
  }

  if (valid.length === 0) return

  const updated = props.multiple
    ? [...currentFiles.value, ...valid]
    : valid.slice(0, 1)

  emit('update:modelValue', updated)
}

function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    validateAndAdd(input.files)
  }
  // Reset input so the same file can be re-selected after removal
  input.value = ''
}

function onDragOver(event: DragEvent) {
  event.preventDefault()
  if (!props.disabled) isDragging.value = true
}

function onDragLeave() {
  isDragging.value = false
}

function onDrop(event: DragEvent) {
  event.preventDefault()
  isDragging.value = false
  if (props.disabled) return
  const files = event.dataTransfer?.files
  if (files && files.length > 0) validateAndAdd(files)
}

function removeFile(index: number) {
  const updated = currentFiles.value.filter((_, i) => i !== index)
  emit('update:modelValue', updated)
}

function openFilePicker() {
  if (!props.disabled) inputEl.value?.click()
}
</script>

<template>
  <div :class="['byz-file-upload', { 'byz-file-upload--error': error, 'byz-file-upload--disabled': disabled }]">
    <label v-if="label" :for="id" class="byz-file-upload__label">{{ label }}</label>

    <!-- Hidden file input -->
    <input
      :id="id"
      ref="inputEl"
      type="file"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      class="byz-file-upload__input"
      aria-hidden="true"
      tabindex="-1"
      @change="onFileChange"
    />

    <!-- Drop zone -->
    <div
      :class="[
        'byz-file-upload__zone',
        {
          'byz-file-upload__zone--dragging': isDragging,
          'byz-file-upload__zone--disabled': disabled
        }
      ]"
      role="button"
      tabindex="0"
      :aria-label="label ? `${label}: sleep bestanden hierheen of bladeren` : 'Sleep bestanden hierheen of bladeren'"
      @click="openFilePicker"
      @keydown.enter.space.prevent="openFilePicker"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
      @drop="onDrop"
    >
      <span class="byz-file-upload__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 16V4M12 4L8 8M12 4L16 8" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" />
        </svg>
      </span>

      <p class="byz-file-upload__text">Sleep bestanden hierheen</p>
      <p class="byz-file-upload__or">of</p>

      <button
        type="button"
        class="byz-file-upload__browse"
        :disabled="disabled"
        tabindex="-1"
        @click.stop="openFilePicker"
      >
        Bladeren
      </button>

      <p v-if="accept" class="byz-file-upload__info">
        Toegestane typen: {{ accept }}
      </p>
      <p class="byz-file-upload__info">
        Max. {{ formatSize(maxSize) }} per bestand
      </p>
    </div>

    <!-- File list -->
    <ul v-if="currentFiles.length > 0" class="byz-file-upload__list">
      <li
        v-for="(file, index) in currentFiles"
        :key="`${file.name}-${index}`"
        class="byz-file-upload__file"
      >
        <span class="byz-file-upload__file-icon" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6L9 1Z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M9 1v5h5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
        <span class="byz-file-upload__file-name">{{ file.name }}</span>
        <span class="byz-file-upload__file-size">{{ formatSize(file.size) }}</span>
        <button
          type="button"
          class="byz-file-upload__file-remove"
          :aria-label="`Verwijder ${file.name}`"
          @click="removeFile(index)"
        >
          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" />
          </svg>
        </button>
      </li>
    </ul>

    <span v-if="error" class="byz-file-upload__error" role="alert">{{ error }}</span>
  </div>
</template>

<style lang="scss" scoped>
.byz-file-upload {
  display: flex;
  flex-direction: column;
  gap: var(--byz-space-2);

  &__label {
    font-size: var(--byz-text-sm);
    font-weight: var(--byz-font-medium);
    color: var(--byz-color-text-primary);
  }

  &__input {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
    opacity: 0;
    pointer-events: none;
  }

  &__zone {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--byz-space-2);
    padding: var(--byz-space-8) var(--byz-space-4);
    border: 2px dashed var(--byz-color-border);
    border-radius: 0.5rem;
    background-color: var(--byz-color-surface);
    cursor: pointer;
    text-align: center;
    transition:
      border-color var(--byz-duration-fast) var(--byz-ease-default),
      background-color var(--byz-duration-fast) var(--byz-ease-default);

    &:hover:not(&--disabled),
    &:focus-visible {
      border-color: var(--byz-color-accent, var(--byz-brand-400, #e84050));
      outline: none;
    }

    &--dragging {
      border-color: var(--byz-color-accent, var(--byz-brand-400, #e84050));
      background-color: rgba(192, 16, 48, 0.06);
    }

    &--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    color: var(--byz-color-text-muted);

    svg { width: 100%; height: 100%; }
  }

  &__text {
    font-size: var(--byz-text-sm);
    font-weight: var(--byz-font-medium);
    color: var(--byz-color-text-primary);
    margin: 0;
  }

  &__or {
    font-size: var(--byz-text-xs);
    color: var(--byz-color-text-muted);
    margin: 0;
  }

  &__browse {
    display: inline-flex;
    align-items: center;
    padding: var(--byz-space-1) var(--byz-space-3);
    background: transparent;
    border: 1px solid var(--byz-color-border);
    border-radius: 0.25rem;
    color: var(--byz-color-text-primary);
    font-family: var(--byz-font-sans);
    font-size: var(--byz-text-sm);
    font-weight: var(--byz-font-medium);
    cursor: pointer;
    transition:
      border-color var(--byz-duration-fast) var(--byz-ease-default),
      background-color var(--byz-duration-fast) var(--byz-ease-default);

    &:hover:not(:disabled) {
      border-color: var(--byz-color-accent, var(--byz-brand-400, #e84050));
      background-color: rgba(255, 255, 255, 0.04);
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  &__info {
    font-size: var(--byz-text-xs);
    color: var(--byz-color-text-muted);
    margin: 0;
  }

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--byz-space-2);
  }

  &__file {
    display: flex;
    align-items: center;
    gap: var(--byz-space-2);
    padding: var(--byz-space-2) var(--byz-space-3);
    background-color: var(--byz-color-surface-raised);
    border: 1px solid var(--byz-color-border);
    border-radius: 0.375rem;
  }

  &__file-icon {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    color: var(--byz-color-text-muted);

    svg { width: 100%; height: 100%; }
  }

  &__file-name {
    flex: 1;
    font-size: var(--byz-text-sm);
    color: var(--byz-color-text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
  }

  &__file-size {
    flex-shrink: 0;
    font-size: var(--byz-text-xs);
    color: var(--byz-color-text-muted);
  }

  &__file-remove {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    color: var(--byz-color-text-muted);
    border-radius: 9999px;
    transition: color var(--byz-duration-fast) var(--byz-ease-default);

    svg { width: 14px; height: 14px; }

    &:hover { color: var(--byz-color-text-primary); }

    &:focus-visible {
      outline: 2px solid var(--byz-color-focus);
      outline-offset: 2px;
    }
  }

  &__error {
    font-size: var(--byz-text-sm);
    color: var(--byz-color-error, #c01030);
  }

  &--error &__zone {
    border-color: var(--byz-color-error, #c01030);
  }
}
</style>
