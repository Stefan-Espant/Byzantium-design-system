<script setup lang="ts">
  import { ref } from 'vue'

  defineOptions({ name: 'ByzTooltip' })

  interface Props {
    content: string
    placement?: 'top' | 'bottom' | 'left' | 'right'
    delay?: number
  }

  const props = withDefaults(defineProps<Props>(), {
    placement: 'top',
    delay: 300
  })

  const visible = ref(false)
  let showTimer: ReturnType<typeof setTimeout> | null = null

  function show() {
    if (showTimer) clearTimeout(showTimer)
    showTimer = setTimeout(() => {
      visible.value = true
    }, props.delay)
  }

  function hide() {
    if (showTimer) {
      clearTimeout(showTimer)
      showTimer = null
    }
    visible.value = false
  }
</script>

<template>
  <span
    class="byz-tooltip-wrap"
    @mouseenter="show"
    @mouseleave="hide"
    @focusin="show"
    @focusout="hide"
  >
    <slot />
    <div
      v-show="visible"
      :class="['byz-tooltip', `byz-tooltip--${placement}`]"
      role="tooltip"
    >
      {{ content }}
    </div>
  </span>
</template>

<style lang="scss" scoped>
.byz-tooltip-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.byz-tooltip {
  position: absolute;
  background: var(--byz-color-surface-raised);
  border: 1px solid var(--byz-color-border);
  color: var(--byz-color-text-primary);
  font-size: var(--byz-text-xs);
  padding: var(--byz-space-1) var(--byz-space-3);
  border-radius: 4px;
  white-space: nowrap;
  z-index: 100;
  pointer-events: none;
  opacity: 1;
  transition: opacity var(--byz-duration-fast) var(--byz-ease-default);

  &[style*="display: none"] {
    opacity: 0;
  }

  // Arrow shared styles
  &::before {
    content: '';
    position: absolute;
    border: 5px solid transparent;
  }

  // Top placement
  &--top {
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);

    &::before {
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-top-color: var(--byz-color-border);
    }
  }

  // Bottom placement
  &--bottom {
    top: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);

    &::before {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-bottom-color: var(--byz-color-border);
    }
  }

  // Left placement
  &--left {
    right: calc(100% + 8px);
    top: 50%;
    transform: translateY(-50%);

    &::before {
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      border-left-color: var(--byz-color-border);
    }
  }

  // Right placement
  &--right {
    left: calc(100% + 8px);
    top: 50%;
    transform: translateY(-50%);

    &::before {
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      border-right-color: var(--byz-color-border);
    }
  }
}
</style>
