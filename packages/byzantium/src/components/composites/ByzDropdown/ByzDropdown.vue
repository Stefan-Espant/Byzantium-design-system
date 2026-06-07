<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

defineOptions({ name: 'ByzDropdown' })

interface DropdownItem {
  label: string
  value: string
  icon?: string
  disabled?: boolean
  separator?: boolean
}

interface Props {
  items: DropdownItem[]
  placement?: 'bottom-start' | 'bottom-end'
}

const props = withDefaults(defineProps<Props>(), {
  placement: 'bottom-start'
})

const emit = defineEmits<{
  select: [value: string]
}>()

const isOpen = ref(false)
const rootEl = ref<HTMLElement | null>(null)

function toggle() {
  isOpen.value = !isOpen.value
}

function close() {
  isOpen.value = false
}

function handleSelect(item: DropdownItem) {
  if (item.disabled) return
  emit('select', item.value)
  close()
}

function closeOnOutside(event: MouseEvent) {
  if (rootEl.value && !rootEl.value.contains(event.target as Node)) {
    close()
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    close()
  }
}

onMounted(() => {
  document.addEventListener('click', closeOnOutside)
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeOnOutside)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div ref="rootEl" class="byz-dropdown">
    <div class="byz-dropdown__trigger" @click="toggle">
      <slot name="trigger" />
    </div>

    <Transition name="byz-dropdown-fade">
      <div
        v-if="isOpen"
        :class="['byz-dropdown__menu', `byz-dropdown__menu--${placement}`]"
        role="menu"
      >
        <template v-for="(item, index) in items" :key="index">
          <hr v-if="item.separator" class="byz-dropdown__separator" />
          <button
            v-else
            class="byz-dropdown__item"
            role="menuitem"
            :disabled="item.disabled"
            :class="{ 'byz-dropdown__item--disabled': item.disabled }"
            @click="handleSelect(item)"
          >
            <span v-if="item.icon" class="byz-dropdown__item-icon">{{ item.icon }}</span>
            <span class="byz-dropdown__item-label">{{ item.label }}</span>
          </button>
        </template>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.byz-dropdown {
  position: relative;
  display: inline-block;

  &__trigger {
    cursor: pointer;
  }

  &__menu {
    position: absolute;
    top: calc(100% + 4px);
    z-index: 50;
    min-width: 160px;
    background: var(--byz-color-surface-raised);
    border: 1px solid var(--byz-color-border);
    border-radius: 6px;
    box-shadow:
      0 8px 24px rgba(0, 0, 0, 0.4),
      0 2px 8px rgba(0, 0, 0, 0.2);
    padding: var(--byz-space-1) 0;
    outline: none;

    &--bottom-start {
      left: 0;
    }

    &--bottom-end {
      right: 0;
    }
  }

  &__item {
    display: flex;
    align-items: center;
    gap: var(--byz-space-2);
    width: 100%;
    padding: var(--byz-space-2) var(--byz-space-3);
    background: transparent;
    border: none;
    color: var(--byz-color-text-primary);
    font-family: var(--byz-font-sans);
    font-size: var(--byz-text-sm);
    text-align: left;
    cursor: pointer;
    transition: background var(--byz-duration-fast) var(--byz-ease-default);

    &:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.05);
    }

    &--disabled,
    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  &__item-icon {
    flex-shrink: 0;
    font-size: var(--byz-text-base);
  }

  &__item-label {
    flex: 1;
  }

  &__separator {
    margin: var(--byz-space-1) 0;
    border: none;
    border-top: 1px solid var(--byz-color-border);
  }
}

// Transition
.byz-dropdown-fade-enter-active,
.byz-dropdown-fade-leave-active {
  transition:
    opacity var(--byz-duration-fast) var(--byz-ease-default),
    transform var(--byz-duration-fast) var(--byz-ease-default);
}

.byz-dropdown-fade-enter-from,
.byz-dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
