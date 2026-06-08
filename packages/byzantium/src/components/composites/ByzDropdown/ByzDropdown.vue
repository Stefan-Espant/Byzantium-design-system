<script setup lang="ts">
import { ref, watch, nextTick, onUnmounted, useId } from 'vue'

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
const triggerEl = ref<HTMLElement | null>(null)
const itemRefs = ref<HTMLButtonElement[]>([])
const menuId = useId()

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

function enabledItems() {
  return props.items
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => !item.disabled && !item.separator)
}

function focusItem(index: number) {
  itemRefs.value[index]?.focus()
}

function focusFirstItem() {
  const firstEnabled = enabledItems()[0]
  if (firstEnabled) focusItem(firstEnabled.index)
}

function focusLastItem() {
  const lastEnabled = enabledItems().at(-1)
  if (lastEnabled) focusItem(lastEnabled.index)
}

function onDocumentKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && isOpen.value) {
    close()
    triggerEl.value?.focus()
  }
}

function onTriggerKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    if (!isOpen.value) {
      isOpen.value = true
      return
    }
    focusFirstItem()
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault()
    if (!isOpen.value) {
      isOpen.value = true
      nextTick(focusLastItem)
      return
    }
    focusLastItem()
  }
}

function onMenuKeydown(event: KeyboardEvent, index: number) {
  const available = enabledItems()
  const currentPos = available.findIndex(({ index: currentIndex }) => currentIndex === index)

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    const nextPos = currentPos >= 0 ? (currentPos + 1) % available.length : 0
    focusItem(available[nextPos].index)
    return
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault()
    const nextPos = currentPos >= 0 ? (currentPos - 1 + available.length) % available.length : available.length - 1
    focusItem(available[nextPos].index)
    return
  }

  if (event.key === 'Home') {
    event.preventDefault()
    focusFirstItem()
    return
  }

  if (event.key === 'End') {
    event.preventDefault()
    focusLastItem()
    return
  }

  if (event.key === 'Tab') {
    close()
    return
  }

  if (event.key === 'Escape') {
    event.preventDefault()
    close()
    triggerEl.value?.focus()
  }
}

watch(isOpen, async (open) => {
  if (open) {
    await nextTick()
    document.addEventListener('click', closeOnOutside)
    document.addEventListener('keydown', onDocumentKeydown)
    focusFirstItem()
    return
  }

  document.removeEventListener('click', closeOnOutside)
  document.removeEventListener('keydown', onDocumentKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeOnOutside)
  document.removeEventListener('keydown', onDocumentKeydown)
})
</script>

<template>
  <div ref="rootEl" class="byz-dropdown">
    <div
      ref="triggerEl"
      class="byz-dropdown__trigger"
      role="button"
      tabindex="0"
      aria-haspopup="menu"
      :aria-expanded="isOpen"
      :aria-controls="isOpen ? menuId : undefined"
      @click="toggle"
      @keydown="onTriggerKeydown"
    >
      <slot name="trigger" />
    </div>

    <Transition name="byz-dropdown-fade">
      <div
        v-if="isOpen"
        :id="menuId"
        :class="['byz-dropdown__menu', `byz-dropdown__menu--${placement}`]"
        role="menu"
      >
        <template v-for="(item, index) in items" :key="index">
          <hr v-if="item.separator" class="byz-dropdown__separator" />
          <button
            v-else
            :ref="(el) => { if (el) itemRefs[index] = el as HTMLButtonElement }"
            type="button"
            class="byz-dropdown__item"
            role="menuitem"
            :disabled="item.disabled"
            :class="{ 'byz-dropdown__item--disabled': item.disabled }"
            @click="handleSelect(item)"
            @keydown="onMenuKeydown($event, index)"
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
