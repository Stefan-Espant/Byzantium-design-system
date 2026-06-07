<script setup lang="ts">
defineOptions({ name: 'ByzSearchInput' })

interface Props {
  modelValue?: string
  placeholder?: string
  loading?: boolean
  clearable?: boolean
  size?: 'sm' | 'md'
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Zoeken…',
  loading: false,
  clearable: true,
  size: 'md'
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'clear': []
  'search': [value: string]
}>()

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    emit('search', props.modelValue ?? '')
  }
}

function onClear() {
  emit('update:modelValue', '')
  emit('clear')
}
</script>

<template>
  <div :class="['byz-search-input', `byz-search-input--${size}`]">
    <!-- Left icon area: spinner or search icon -->
    <span class="byz-search-input__icon" aria-hidden="true">
      <span v-if="loading" class="byz-search-input__spinner" />
      <svg v-else viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="byz-search-input__search-svg">
        <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" stroke-width="1.75" />
        <path d="M13.5 13.5L17 17" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" />
      </svg>
    </span>

    <input
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="loading"
      type="search"
      autocomplete="off"
      class="byz-search-input__field"
      aria-label="Zoeken"
      @input="onInput"
      @keydown="onKeydown"
    />

    <button
      v-if="clearable && modelValue"
      type="button"
      class="byz-search-input__clear"
      aria-label="Zoekopdracht wissen"
      @click="onClear"
    >
      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" />
      </svg>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.byz-search-input {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  border: 2px solid var(--byz-color-border);
  border-radius: 0.375rem;
  background-color: var(--byz-color-background);
  transition: border-color var(--byz-duration-fast) var(--byz-ease-default);

  &:focus-within {
    border-color: var(--byz-color-focus);
    outline: none;
  }

  // Sizes
  &--md {
    min-height: 40px;
    padding: 0 var(--byz-space-3);
    gap: var(--byz-space-2);

    .byz-search-input__field {
      font-size: var(--byz-text-base);
      padding: var(--byz-space-2) 0;
    }

    .byz-search-input__icon {
      width: 18px;
      height: 18px;
    }

    .byz-search-input__clear {
      width: 20px;
      height: 20px;
    }
  }

  &--sm {
    min-height: 32px;
    padding: 0 var(--byz-space-2);
    gap: var(--byz-space-1);

    .byz-search-input__field {
      font-size: var(--byz-text-sm);
      padding: var(--byz-space-1) 0;
    }

    .byz-search-input__icon {
      width: 14px;
      height: 14px;
    }

    .byz-search-input__clear {
      width: 16px;
      height: 16px;
    }
  }

  &__icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--byz-color-text-muted);
    pointer-events: none;
  }

  &__search-svg {
    width: 100%;
    height: 100%;
  }

  &__spinner {
    display: block;
    width: 100%;
    height: 100%;
    border: 2px solid rgba(255, 255, 255, 0.12);
    border-top-color: var(--byz-brand-500, #c01030);
    border-radius: 9999px;
    animation: byz-search-spin 600ms linear infinite;

    @media (prefers-reduced-motion: reduce) {
      animation-play-state: paused;
    }
  }

  &__field {
    flex: 1;
    min-width: 0;
    background: transparent;
    border: none;
    outline: none;
    color: var(--byz-color-text-primary);
    font-family: var(--byz-font-sans);
    caret-color: var(--byz-color-focus);

    &::placeholder {
      color: var(--byz-color-text-muted);
    }

    // Hide native search input clear button
    &::-webkit-search-cancel-button,
    &::-webkit-search-decoration {
      appearance: none;
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  &__clear {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    color: var(--byz-color-text-muted);
    border-radius: 9999px;
    transition: color var(--byz-duration-fast) var(--byz-ease-default);

    svg {
      width: 100%;
      height: 100%;
    }

    &:hover {
      color: var(--byz-color-text-primary);
    }

    &:focus-visible {
      outline: 2px solid var(--byz-color-focus);
      outline-offset: 2px;
    }
  }
}

@keyframes byz-search-spin {
  to { transform: rotate(360deg); }
}
</style>
