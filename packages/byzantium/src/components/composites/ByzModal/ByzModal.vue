<script setup lang="ts">
  import { onMounted, onUnmounted, watch } from 'vue'
  import { useFocusTrap } from '../../../composables/useFocusTrap'

  defineOptions({ name: 'ByzModal' })

  interface Props {
    open: boolean
    title: string
    closeLabel?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    closeLabel: 'Sluiten'
  })

  const emit = defineEmits<{ close: [] }>()
  const { trap, release } = useFocusTrap()
  let dialogEl: HTMLElement | null = null

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') emit('close')
  }

  watch(() => props.open, (val) => {
    if (val && dialogEl) {
      trap(dialogEl)
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
    <Transition name="byz-modal">
      <div v-if="open" class="byz-modal-overlay" @click.self="emit('close')">
        <div
          ref="dialogEl"
          role="dialog"
          :aria-label="title"
          aria-modal="true"
          class="byz-modal"
        >
          <div class="byz-modal__header">
            <h2 class="byz-modal__title">{{ title }}</h2>
            <button
              class="byz-modal__close"
              :aria-label="closeLabel"
              @click="emit('close')"
            >✕</button>
          </div>
          <div class="byz-modal__body"><slot /></div>
          <div v-if="$slots.footer" class="byz-modal__footer"><slot name="footer" /></div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.byz-modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: var(--byz-space-4);
}

.byz-modal {
  background-color: var(--byz-color-surface);
  border-radius: 0.5rem;
  width: 100%;
  max-width: 32rem;
  max-height: 90vh;
  overflow-y: auto;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--byz-space-6);
    border-bottom: 1px solid var(--byz-color-border);
  }

  &__title  { font-size: var(--byz-text-xl); font-weight: var(--byz-font-bold); }
  &__close  {
    background: none;
    border: none;
    cursor: pointer;
    min-width: 44px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--byz-color-text-secondary);
  }
  &__body   { padding: var(--byz-space-6); }
  &__footer { padding: var(--byz-space-6); border-top: 1px solid var(--byz-color-border); }
}

.byz-modal-enter-active,
.byz-modal-leave-active { transition: opacity var(--byz-duration-normal) var(--byz-ease-default); }
.byz-modal-enter-from,
.byz-modal-leave-to     { opacity: 0; }
</style>
