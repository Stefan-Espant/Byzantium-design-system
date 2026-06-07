<script setup lang="ts">
  import { useToast } from '../../../composables/useToast'

  defineOptions({ name: 'ByzToastContainer' })

  const { toasts, remove } = useToast()

  const typeIcon: Record<string, string> = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  }
</script>

<template>
  <Teleport to="body">
    <div class="byz-toast-container" aria-live="polite" aria-atomic="false">
      <TransitionGroup name="byz-toast" tag="div" class="byz-toast-list">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="['byz-toast', `byz-toast--${toast.type}`]"
          role="alert"
        >
          <span class="byz-toast__icon" aria-hidden="true">{{ typeIcon[toast.type] }}</span>
          <span class="byz-toast__message">{{ toast.message }}</span>
          <button
            class="byz-toast__close"
            aria-label="Sluiten"
            @click="remove(toast.id)"
          >×</button>
          <div
            class="byz-toast__progress"
            :style="{ animationDuration: `${toast.duration ?? 4000}ms` }"
          />
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.byz-toast-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  pointer-events: none;
}

.byz-toast-list {
  display: flex;
  flex-direction: column;
  gap: var(--byz-space-3);
  align-items: flex-end;
}

.byz-toast {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--byz-space-3);
  background-color: var(--byz-color-surface-raised);
  border-radius: 0.5rem;
  padding: var(--byz-space-3) var(--byz-space-4);
  min-width: 280px;
  max-width: 400px;
  border-left: 4px solid;
  overflow: hidden;
  pointer-events: all;
  box-shadow: 0 4px 16px rgb(0 0 0 / 0.4);

  &--success { border-left-color: var(--byz-color-success); }
  &--error   { border-left-color: var(--byz-color-error); }
  &--warning { border-left-color: var(--byz-color-warning); }
  &--info    { border-left-color: var(--byz-color-info); }

  &__icon {
    flex-shrink: 0;
    font-size: var(--byz-text-base);
    line-height: 1;
  }

  &--success &__icon { color: var(--byz-color-success); }
  &--error   &__icon { color: var(--byz-color-error); }
  &--warning &__icon { color: var(--byz-color-warning); }
  &--info    &__icon { color: var(--byz-color-info); }

  &__message {
    flex: 1;
    font-size: var(--byz-text-sm);
    color: var(--byz-color-text-primary);
    line-height: 1.4;
  }

  &__close {
    flex-shrink: 0;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--byz-color-text-muted);
    font-size: var(--byz-text-lg);
    line-height: 1;
    padding: 0;
    min-width: 24px;
    min-height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color var(--byz-duration-fast) var(--byz-ease-default);

    &:hover { color: var(--byz-color-text-primary); }
  }

  &__progress {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: currentColor;
    opacity: 0.4;
    transform-origin: left center;
    animation: byz-toast-progress linear forwards;
  }
}

@keyframes byz-toast-progress {
  from { transform: scaleX(1); }
  to   { transform: scaleX(0); }
}

/* TransitionGroup animations */
.byz-toast-enter-active {
  transition:
    opacity var(--byz-duration-normal) var(--byz-ease-default),
    transform var(--byz-duration-normal) var(--byz-ease-bounce);
}

.byz-toast-leave-active {
  transition:
    opacity var(--byz-duration-fast) var(--byz-ease-default),
    transform var(--byz-duration-fast) var(--byz-ease-default);
}

.byz-toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.byz-toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.byz-toast-move {
  transition: transform var(--byz-duration-normal) var(--byz-ease-default);
}
</style>
