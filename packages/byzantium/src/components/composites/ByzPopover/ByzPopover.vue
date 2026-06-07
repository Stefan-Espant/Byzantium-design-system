<script setup lang="ts">
  import { ref, onUnmounted } from 'vue'

  defineOptions({ name: 'ByzPopover' })

  interface Props {
    placement?: 'top' | 'bottom' | 'left' | 'right'
    trigger?: 'click' | 'hover'
    offset?: number
  }

  const props = withDefaults(defineProps<Props>(), {
    placement: 'bottom',
    trigger: 'click',
    offset: 8
  })

  const visible = ref(false)
  const wrapEl = ref<HTMLElement | null>(null)
  let hideTimer: ReturnType<typeof setTimeout> | null = null

  // Click trigger
  function onTriggerClick() {
    if (props.trigger !== 'click') return
    visible.value = !visible.value
  }

  function onOutsideClick(e: MouseEvent) {
    if (wrapEl.value && !wrapEl.value.contains(e.target as Node)) {
      visible.value = false
    }
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') visible.value = false
  }

  // Watch open state to attach/detach listeners
  function openPopover() {
    visible.value = true
    document.addEventListener('click', onOutsideClick)
    document.addEventListener('keydown', onKeydown)
  }

  function closePopover() {
    visible.value = false
    document.removeEventListener('click', onOutsideClick)
    document.removeEventListener('keydown', onKeydown)
  }

  function handleTriggerClick() {
    if (props.trigger !== 'click') return
    if (visible.value) {
      closePopover()
    } else {
      openPopover()
    }
  }

  // Hover trigger
  function onMouseEnter() {
    if (props.trigger !== 'hover') return
    if (hideTimer) {
      clearTimeout(hideTimer)
      hideTimer = null
    }
    visible.value = true
  }

  function onMouseLeave() {
    if (props.trigger !== 'hover') return
    hideTimer = setTimeout(() => {
      visible.value = false
    }, 150)
  }

  onUnmounted(() => {
    document.removeEventListener('click', onOutsideClick)
    document.removeEventListener('keydown', onKeydown)
    if (hideTimer) clearTimeout(hideTimer)
  })
</script>

<template>
  <span
    ref="wrapEl"
    class="byz-popover-wrap"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <span
      class="byz-popover-trigger"
      @click="handleTriggerClick"
    >
      <slot name="trigger" />
    </span>

    <Transition name="byz-popover">
      <div
        v-if="visible"
        :class="['byz-popover', `byz-popover--${placement}`]"
        :style="{ '--byz-popover-offset': `${offset}px` }"
        role="dialog"
      >
        <slot />
      </div>
    </Transition>
  </span>
</template>

<style lang="scss" scoped>
.byz-popover-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.byz-popover-trigger {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.byz-popover {
  position: absolute;
  min-width: 200px;
  padding: var(--byz-space-4);
  background: var(--byz-color-surface-raised);
  border: 1px solid var(--byz-color-border);
  border-radius: 0.375rem;
  box-shadow: var(--byz-shadow-md);
  z-index: var(--byz-z-dropdown);
  color: var(--byz-color-text-primary);
  font-family: var(--byz-font-sans);
  font-size: var(--byz-text-sm, 0.875rem);

  // Placement positioning
  &--bottom {
    top: calc(100% + var(--byz-popover-offset));
    left: 50%;
    transform: translateX(-50%);
  }

  &--top {
    bottom: calc(100% + var(--byz-popover-offset));
    left: 50%;
    transform: translateX(-50%);
  }

  &--left {
    right: calc(100% + var(--byz-popover-offset));
    top: 50%;
    transform: translateY(-50%);
  }

  &--right {
    left: calc(100% + var(--byz-popover-offset));
    top: 50%;
    transform: translateY(-50%);
  }
}

.byz-popover-enter-active,
.byz-popover-leave-active {
  transition: opacity var(--byz-duration-fast) var(--byz-ease-default),
              transform var(--byz-duration-fast) var(--byz-ease-default);
}

.byz-popover-enter-from,
.byz-popover-leave-to {
  opacity: 0;
  transform: translateX(-50%) scale(0.97);
}
</style>
