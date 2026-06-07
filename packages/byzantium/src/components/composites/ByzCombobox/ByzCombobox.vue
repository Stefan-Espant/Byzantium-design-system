<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'

defineOptions({ name: 'ByzCombobox' })

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
  clearable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Zoeken of selecteren…',
  disabled: false,
  required: false,
  clearable: true
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | undefined]
}>()

// IDs for accessibility
const id = `byz-combobox-${Math.random().toString(36).slice(2, 9)}`
const listboxId = `${id}-listbox`
const errorId = `${id}-error`
const hintId = `${id}-hint`

const inputEl = ref<HTMLInputElement | null>(null)
const rootEl = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const query = ref('')
const activeIndex = ref(-1)

// The label shown in the input when a value is selected and dropdown is closed
const selectedLabel = computed(() => {
  const found = props.options.find(o => o.value === props.modelValue)
  return found ? found.label : ''
})

// Filtered options based on query
const filteredOptions = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return props.options
  return props.options.filter(o => o.label.toLowerCase().includes(q))
})

// When dropdown opens, seed query with selected label so user can refine
function openDropdown() {
  if (props.disabled) return
  isOpen.value = true
  activeIndex.value = -1
  // Show all options initially; clear the query so user starts fresh
  query.value = ''
  nextTick(() => inputEl.value?.focus())
}

function closeDropdown() {
  isOpen.value = false
  // Restore the input display to the selected label
  query.value = selectedLabel.value
}

function selectOption(option: Option) {
  if (option.disabled) return
  emit('update:modelValue', option.value)
  closeDropdown()
}

function clearSelection() {
  emit('update:modelValue', undefined)
  query.value = ''
  nextTick(() => inputEl.value?.focus())
}

function onInputFocus() {
  openDropdown()
}

function onInputInput(event: Event) {
  query.value = (event.target as HTMLInputElement).value
  if (!isOpen.value) isOpen.value = true
  activeIndex.value = -1
}

function onKeydown(event: KeyboardEvent) {
  if (!isOpen.value) {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      openDropdown()
      event.preventDefault()
    }
    return
  }

  const enabledOptions = filteredOptions.value.filter(o => !o.disabled)

  switch (event.key) {
    case 'ArrowDown': {
      event.preventDefault()
      const nextIdx = activeIndex.value + 1
      const next = filteredOptions.value.findIndex((o, i) => i >= nextIdx && !o.disabled)
      if (next !== -1) activeIndex.value = next
      break
    }
    case 'ArrowUp': {
      event.preventDefault()
      const prevIdx = activeIndex.value - 1
      let prev = -1
      for (let i = prevIdx; i >= 0; i--) {
        if (!filteredOptions.value[i].disabled) { prev = i; break }
      }
      if (prev !== -1) activeIndex.value = prev
      break
    }
    case 'Enter': {
      event.preventDefault()
      if (activeIndex.value !== -1 && filteredOptions.value[activeIndex.value]) {
        selectOption(filteredOptions.value[activeIndex.value])
      } else if (enabledOptions.length === 1) {
        selectOption(enabledOptions[0])
      }
      break
    }
    case 'Escape': {
      event.preventDefault()
      closeDropdown()
      inputEl.value?.blur()
      break
    }
    case 'Tab': {
      closeDropdown()
      break
    }
  }
}

function onClickOutside(event: MouseEvent) {
  if (rootEl.value && !rootEl.value.contains(event.target as Node)) {
    if (isOpen.value) closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('mousedown', onClickOutside)
  // Init query to selected label
  query.value = selectedLabel.value
})

onUnmounted(() => {
  document.removeEventListener('mousedown', onClickOutside)
})

// Keep query in sync when modelValue changes externally
watch(() => props.modelValue, () => {
  if (!isOpen.value) {
    query.value = selectedLabel.value
  }
})
</script>

<template>
  <div
    ref="rootEl"
    :class="['byz-combobox', { 'byz-combobox--error': error, 'byz-combobox--disabled': disabled }]"
  >
    <label :for="id" class="byz-combobox__label">
      {{ label }}
      <span v-if="required" class="byz-combobox__required" aria-hidden="true">*</span>
    </label>

    <div class="byz-combobox__control">
      <input
        :id="id"
        ref="inputEl"
        v-model="query"
        type="text"
        autocomplete="off"
        role="combobox"
        :aria-expanded="isOpen"
        :aria-controls="listboxId"
        :aria-activedescendant="activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined"
        :aria-describedby="[error ? errorId : '', hint ? hintId : ''].filter(Boolean).join(' ') || undefined"
        :aria-invalid="!!error"
        :aria-required="required"
        :placeholder="placeholder"
        :disabled="disabled"
        class="byz-combobox__input"
        @focus="onInputFocus"
        @input="onInputInput"
        @keydown="onKeydown"
      />

      <div class="byz-combobox__actions">
        <button
          v-if="clearable && modelValue !== undefined && modelValue !== ''"
          type="button"
          tabindex="-1"
          class="byz-combobox__clear"
          aria-label="Selectie wissen"
          @mousedown.prevent
          @click="clearSelection"
        >
          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" />
          </svg>
        </button>

        <span class="byz-combobox__chevron" aria-hidden="true" :class="{ 'byz-combobox__chevron--open': isOpen }">
          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
      </div>
    </div>

    <Transition name="byz-combobox-fade">
      <ul
        v-if="isOpen"
        :id="listboxId"
        role="listbox"
        class="byz-combobox__listbox"
        :aria-label="label"
        @mousedown.prevent
      >
        <li v-if="filteredOptions.length === 0" class="byz-combobox__empty">
          Geen resultaten
        </li>
        <li
          v-for="(option, index) in filteredOptions"
          :id="`${id}-option-${index}`"
          :key="option.value"
          role="option"
          :aria-selected="option.value === modelValue"
          :aria-disabled="option.disabled"
          :class="[
            'byz-combobox__option',
            {
              'byz-combobox__option--selected': option.value === modelValue,
              'byz-combobox__option--active': index === activeIndex,
              'byz-combobox__option--disabled': option.disabled
            }
          ]"
          @mouseenter="activeIndex = index"
          @click="selectOption(option)"
        >
          <span class="byz-combobox__option-label">{{ option.label }}</span>
          <svg
            v-if="option.value === modelValue"
            class="byz-combobox__option-check"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </li>
      </ul>
    </Transition>

    <span v-if="hint && !error" :id="hintId" class="byz-combobox__hint">{{ hint }}</span>
    <span v-if="error" :id="errorId" class="byz-combobox__error" role="alert">{{ error }}</span>
  </div>
</template>

<style lang="scss" scoped>
.byz-combobox {
  display: flex;
  flex-direction: column;
  gap: var(--byz-space-2);
  position: relative;

  &__label {
    font-size: var(--byz-text-sm);
    font-weight: var(--byz-font-medium);
    color: var(--byz-color-text-primary);
  }

  &__required {
    color: var(--byz-color-error, #c01030);
    margin-left: var(--byz-space-1);
  }

  &__control {
    position: relative;
    display: flex;
    align-items: center;
  }

  &__input {
    width: 100%;
    min-height: 44px;
    padding: var(--byz-space-2) var(--byz-space-10) var(--byz-space-2) var(--byz-space-3);
    border: 2px solid var(--byz-color-border);
    border-radius: 0.375rem;
    background-color: var(--byz-color-background);
    color: var(--byz-color-text-primary);
    font-family: var(--byz-font-sans);
    font-size: var(--byz-text-base);
    transition: border-color var(--byz-duration-fast) var(--byz-ease-default);
    cursor: pointer;

    &::placeholder {
      color: var(--byz-color-text-muted);
    }

    &:focus {
      outline: none;
      border-color: var(--byz-color-focus);
      cursor: text;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &--error &__input {
    border-color: var(--byz-color-error, #c01030);
  }

  &__actions {
    position: absolute;
    right: var(--byz-space-3);
    display: flex;
    align-items: center;
    gap: var(--byz-space-1);
    pointer-events: none;
  }

  &__clear {
    pointer-events: all;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    color: var(--byz-color-text-muted);
    border-radius: 9999px;
    transition: color var(--byz-duration-fast) var(--byz-ease-default);

    svg { width: 100%; height: 100%; }

    &:hover { color: var(--byz-color-text-primary); }
  }

  &__chevron {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    color: var(--byz-color-text-muted);
    transition: transform var(--byz-duration-fast) var(--byz-ease-default);

    svg { width: 100%; height: 100%; }

    &--open {
      transform: rotate(180deg);
    }
  }

  &__listbox {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    z-index: var(--byz-z-dropdown, 1000);
    background: var(--byz-color-surface-raised);
    border: 1px solid var(--byz-color-border);
    border-radius: 6px;
    box-shadow: var(--byz-shadow-md, 0 8px 24px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.2));
    padding: var(--byz-space-1) 0;
    margin: 0;
    list-style: none;
    max-height: 240px;
    overflow-y: auto;
    outline: none;

    // Custom scrollbar
    &::-webkit-scrollbar { width: 4px; }
    &::-webkit-scrollbar-track { background: transparent; }
    &::-webkit-scrollbar-thumb {
      background: var(--byz-color-border);
      border-radius: 2px;
    }
  }

  &__empty {
    padding: var(--byz-space-3) var(--byz-space-3);
    font-size: var(--byz-text-sm);
    color: var(--byz-color-text-muted);
    text-align: center;
  }

  &__option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--byz-space-2);
    padding: var(--byz-space-2) var(--byz-space-3);
    font-family: var(--byz-font-sans);
    font-size: var(--byz-text-sm);
    color: var(--byz-color-text-primary);
    cursor: pointer;
    transition: background var(--byz-duration-fast) var(--byz-ease-default);

    &--active,
    &:hover:not(&--disabled) {
      background: rgba(255, 255, 255, 0.05);
    }

    &--selected {
      color: var(--byz-brand-400, #e84050);
    }

    &--disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  &__option-label {
    flex: 1;
  }

  &__option-check {
    flex-shrink: 0;
    width: 14px;
    height: 14px;
    color: var(--byz-brand-400, #e84050);
  }

  &__hint {
    font-size: var(--byz-text-sm);
    color: var(--byz-color-text-secondary);
  }

  &__error {
    font-size: var(--byz-text-sm);
    color: var(--byz-color-error, #c01030);
  }
}

// Transition
.byz-combobox-fade-enter-active,
.byz-combobox-fade-leave-active {
  transition:
    opacity var(--byz-duration-fast) var(--byz-ease-default),
    transform var(--byz-duration-fast) var(--byz-ease-default);
}

.byz-combobox-fade-enter-from,
.byz-combobox-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
