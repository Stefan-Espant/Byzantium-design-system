<script setup lang="ts">
  import { watch, onUnmounted } from 'vue'
  import { useFocusTrap } from '../../../composables/useFocusTrap'

  defineOptions({ name: 'ByzDrawer' })

  interface Props {
    open: boolean
    placement?: 'left' | 'right' | 'bottom'
    width?: string
    height?: string
    title?: string
    closeLabel?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    placement: 'right',
    width: '400px',
    height: '50vh',
    closeLabel: 'Sluiten'
  })

  const emit = defineEmits<{ close: [] }>()
  const { trap, release } = useFocusTrap()
  let drawerEl: HTMLElement | null = null

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') emit('close')
  }

  watch(() => props.open, (val) => {
    if (val && drawerEl) {
      trap(drawerEl)
      document.addEventListener('keydown', handleKeydown)
    } else {
      release()
      document.removeEventListener('keydown', handleKeydown)
    }
  })

  onUnmounted(() => {
    release()
    document.removeEventListener('keydown', handleKeydown)
  })
</script>

<template>
  <Teleport to="body">
    <Transition name="byz-drawer-overlay">
      <div
        v-if="open"
        class="byz-drawer-overlay"
        @click.self="emit('close')"
      />
    </Transition>

    <Transition :name="`byz-drawer-${placement}`">
      <div
        v-if="open"
        ref="drawerEl"
        :class="['byz-drawer', `byz-drawer--${placement}`]"
        :style="
          placement === 'bottom'
            ? { height }
            : { width }
        "
        role="dialog"
        :aria-label="title"
        aria-modal="true"
      >
        <div class="byz-drawer__header">
          <h2 v-if="title" class="byz-drawer__title">{{ title }}</h2>
          <button
            class="byz-drawer__close"
            :aria-label="closeLabel"
            type="button"
            @click="emit('close')"
          >✕</button>
        </div>

        <div class="byz-drawer__body">
          <slot />
        </div>

        <div v-if="$slots.footer" class="byz-drawer__footer">
          <slot name="footer" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.byz-drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: var(--byz-z-modal);
}

.byz-drawer {
  position: fixed;
  background: var(--byz-color-surface);
  z-index: calc(var(--byz-z-modal) + 1);
  display: flex;
  flex-direction: column;
  box-shadow: var(--byz-shadow-lg);

  &--right {
    top: 0;
    right: 0;
    bottom: 0;
  }

  &--left {
    top: 0;
    left: 0;
    bottom: 0;
  }

  &--bottom {
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--byz-space-6);
    border-bottom: 1px solid var(--byz-color-border);
    flex-shrink: 0;
  }

  &__title {
    font-family: var(--byz-font-serif);
    font-weight: var(--byz-font-bold);
    font-size: var(--byz-text-xl);
    color: var(--byz-color-text-primary);
    margin: 0;
  }

  &__close {
    background: none;
    border: none;
    cursor: pointer;
    min-width: 44px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--byz-color-text-secondary);
    font-size: 1rem;
    border-radius: 4px;
    transition: color var(--byz-duration-fast) var(--byz-ease-default);

    &:hover {
      color: var(--byz-color-text-primary);
    }

    &:focus-visible {
      outline: 2px solid var(--byz-color-focus);
      outline-offset: 2px;
    }
  }

  &__body {
    flex: 1;
    overflow-y: auto;
    padding: var(--byz-space-6);
  }

  &__footer {
    flex-shrink: 0;
    padding: var(--byz-space-6);
    border-top: 1px solid var(--byz-color-border);
  }
}

// Overlay transitions
.byz-drawer-overlay-enter-active,
.byz-drawer-overlay-leave-active {
  transition: opacity var(--byz-duration-normal) var(--byz-ease-default);
}
.byz-drawer-overlay-enter-from,
.byz-drawer-overlay-leave-to {
  opacity: 0;
}

// Right drawer transitions
.byz-drawer-right-enter-active,
.byz-drawer-right-leave-active {
  transition: transform var(--byz-duration-normal) var(--byz-ease-default);
}
.byz-drawer-right-enter-from,
.byz-drawer-right-leave-to {
  transform: translateX(100%);
}

// Left drawer transitions
.byz-drawer-left-enter-active,
.byz-drawer-left-leave-active {
  transition: transform var(--byz-duration-normal) var(--byz-ease-default);
}
.byz-drawer-left-enter-from,
.byz-drawer-left-leave-to {
  transform: translateX(-100%);
}

// Bottom drawer transitions
.byz-drawer-bottom-enter-active,
.byz-drawer-bottom-leave-active {
  transition: transform var(--byz-duration-normal) var(--byz-ease-default);
}
.byz-drawer-bottom-enter-from,
.byz-drawer-bottom-leave-to {
  transform: translateY(100%);
}
</style>
