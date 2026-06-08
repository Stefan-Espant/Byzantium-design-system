<script setup lang="ts">
import { computed, watch, ref, nextTick, useId } from 'vue'
import { useFocusTrap }   from '../../../composables/useFocusTrap'
import { useScrollLock }  from '../../../composables/useScrollLock'
import { useLocale }      from '../../../composables/useLocale'

defineOptions({ name: 'ByzDrawer' })

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom'

interface Props {
  modelValue: boolean
  side?:       DrawerSide
  size?:       string
  title?:      string
  closeLabel?: string
  persistent?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  side:       'right',
  size:       '24rem',
  persistent: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

const { t } = useLocale()
const resolvedCloseLabel = computed(() => props.closeLabel ?? t('closeDrawer'))
const resolvedAriaLabel = computed(() => props.title || resolvedCloseLabel.value)
const titleId = useId()

const drawerRef          = ref<HTMLDivElement | null>(null)
const { trap, release }  = useFocusTrap()
const { locked }         = useScrollLock()

watch(() => props.modelValue, async (val) => {
  locked.value = val
  if (val) {
    await nextTick()
    if (drawerRef.value) {
      trap(drawerRef.value)
      drawerRef.value.focus()
    }
  } else {
    release()
  }
})

function close() {
  if (props.persistent) return
  emit('update:modelValue', false)
  emit('close')
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

const sizeStyle = computed(() => {
  if (props.side === 'left' || props.side === 'right') {
    return { width: props.size, maxWidth: '100vw' }
  }
  return { height: props.size, maxHeight: '100vh' }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="byz-drawer-fade">
      <div
        v-if="modelValue"
        class="byz-drawer-backdrop"
        aria-hidden="true"
        @click="close"
      />
    </Transition>

    <Transition :name="`byz-drawer-slide-${side}`">
      <div
        v-if="modelValue"
        ref="drawerRef"
        class="byz-drawer"
        :class="`byz-drawer--${side}`"
        :style="sizeStyle"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="title ? titleId : undefined"
        :aria-label="title ? undefined : resolvedAriaLabel"
        tabindex="-1"
        @keydown="onKeydown"
      >
        <div v-if="title || $slots.header" class="byz-drawer__header">
          <slot name="header">
            <h2 :id="titleId" class="byz-drawer__title">{{ title }}</h2>
          </slot>
          <button
            type="button"
            class="byz-drawer__close"
            :aria-label="resolvedCloseLabel"
            @click="close"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
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
.byz-drawer-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
  z-index: var(--byz-z-overlay, 200);
}

.byz-drawer {
  position: fixed;
  z-index: calc(var(--byz-z-overlay, 200) + 1);
  background: var(--byz-color-surface);
  border-color: var(--byz-color-border);
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &--right  { top: 0; right: 0; bottom: 0; border-left:   1px solid var(--byz-color-border); }
  &--left   { top: 0; left: 0;  bottom: 0; border-right:  1px solid var(--byz-color-border); }
  &--bottom { left: 0; right: 0; bottom: 0; border-top:    1px solid var(--byz-color-border); }
  &--top    { left: 0; right: 0; top: 0;    border-bottom: 1px solid var(--byz-color-border); }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--byz-color-border);
    flex-shrink: 0;
  }

  &__title {
    font-family: var(--byz-font-serif);
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--byz-color-heading);
    margin: 0;
  }

  &__close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.75rem;
    height: 2.75rem;
    min-width: 44px;
    min-height: 44px;
    background: var(--byz-color-surface-raised);
    border: 1px solid var(--byz-color-border);
    border-radius: 0.375rem;
    color: var(--byz-color-text-muted);
    cursor: pointer;
    transition: all 0.15s;
    &:hover { background: var(--byz-color-surface-hover); color: var(--byz-color-text); }
  }

  &__body {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
  }

  &__footer {
    padding: 1rem 1.5rem;
    border-top: 1px solid var(--byz-color-border);
    flex-shrink: 0;
  }
}

.byz-drawer-fade-enter-active,
.byz-drawer-fade-leave-active { transition: opacity 0.2s ease; }
.byz-drawer-fade-enter-from,
.byz-drawer-fade-leave-to     { opacity: 0; }

.byz-drawer-slide-right-enter-active,
.byz-drawer-slide-right-leave-active { transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
.byz-drawer-slide-right-enter-from,
.byz-drawer-slide-right-leave-to     { transform: translateX(100%); }

.byz-drawer-slide-left-enter-active,
.byz-drawer-slide-left-leave-active { transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
.byz-drawer-slide-left-enter-from,
.byz-drawer-slide-left-leave-to     { transform: translateX(-100%); }

.byz-drawer-slide-bottom-enter-active,
.byz-drawer-slide-bottom-leave-active { transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
.byz-drawer-slide-bottom-enter-from,
.byz-drawer-slide-bottom-leave-to     { transform: translateY(100%); }

.byz-drawer-slide-top-enter-active,
.byz-drawer-slide-top-leave-active { transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
.byz-drawer-slide-top-enter-from,
.byz-drawer-slide-top-leave-to     { transform: translateY(-100%); }
</style>
