<script setup lang="ts">
  import { ref } from 'vue'

  defineOptions({ name: 'ByzAccordion' })

  interface AccordionItem {
    id: string
    title: string
    content: string
    disabled?: boolean
  }

  interface Props {
    items: AccordionItem[]
    multiple?: boolean
    defaultOpen?: string[]
  }

  const props = withDefaults(defineProps<Props>(), {
    multiple: false,
    defaultOpen: () => []
  })

  const openIds = ref<string[]>([...props.defaultOpen])

  function isOpen(id: string): boolean {
    return openIds.value.includes(id)
  }

  function toggle(id: string) {
    if (isOpen(id)) {
      openIds.value = openIds.value.filter(i => i !== id)
    } else {
      if (props.multiple) {
        openIds.value = [...openIds.value, id]
      } else {
        openIds.value = [id]
      }
    }
  }

  function onEnter(el: Element) {
    const htmlEl = el as HTMLElement
    htmlEl.style.maxHeight = '0px'
    htmlEl.style.overflow = 'hidden'
    requestAnimationFrame(() => {
      htmlEl.style.maxHeight = `${htmlEl.scrollHeight}px`
    })
  }

  function onAfterEnter(el: Element) {
    const htmlEl = el as HTMLElement
    htmlEl.style.maxHeight = ''
    htmlEl.style.overflow = ''
  }

  function onLeave(el: Element) {
    const htmlEl = el as HTMLElement
    htmlEl.style.maxHeight = `${htmlEl.scrollHeight}px`
    htmlEl.style.overflow = 'hidden'
    requestAnimationFrame(() => {
      htmlEl.style.maxHeight = '0px'
    })
  }

  function onAfterLeave(el: Element) {
    const htmlEl = el as HTMLElement
    htmlEl.style.maxHeight = ''
    htmlEl.style.overflow = ''
  }
</script>

<template>
  <div class="byz-accordion">
    <div
      v-for="item in items"
      :key="item.id"
      :class="[
        'byz-accordion__item',
        { 'byz-accordion__item--open': isOpen(item.id) },
        { 'byz-accordion__item--disabled': item.disabled }
      ]"
    >
      <button
        :id="`trigger-${item.id}`"
        class="byz-accordion__trigger"
        :aria-expanded="isOpen(item.id)"
        :aria-controls="`content-${item.id}`"
        :aria-disabled="item.disabled || undefined"
        :disabled="item.disabled"
        @click="toggle(item.id)"
      >
        <span class="byz-accordion__title">{{ item.title }}</span>
        <span
          class="byz-accordion__icon"
          :class="{ 'byz-accordion__icon--open': isOpen(item.id) }"
          aria-hidden="true"
        >▾</span>
      </button>

      <Transition
        name="byz-accordion"
        @enter="onEnter"
        @after-enter="onAfterEnter"
        @leave="onLeave"
        @after-leave="onAfterLeave"
      >
        <div
          v-show="isOpen(item.id)"
          :id="`content-${item.id}`"
          role="region"
          :aria-labelledby="`trigger-${item.id}`"
          class="byz-accordion__content"
        >
          <div class="byz-accordion__body">{{ item.content }}</div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.byz-accordion {
  display: flex;
  flex-direction: column;

  &__item {
    border-bottom: 1px solid var(--byz-color-border);

    &--disabled {
      opacity: 0.4;
      pointer-events: none;
    }
  }

  &__trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: var(--byz-space-4) 0;
    background: none;
    border: none;
    cursor: pointer;
    font-family: var(--byz-font-sans);
    font-size: var(--byz-text-base);
    font-weight: var(--byz-font-medium);
    color: var(--byz-color-text-primary);
    text-align: left;
    gap: var(--byz-space-4);
    transition: color var(--byz-duration-fast) var(--byz-ease-default);

    &:hover:not(:disabled) {
      color: var(--byz-color-text-secondary);
    }

    &:focus-visible {
      outline: 2px solid var(--byz-color-focus);
      outline-offset: 2px;
      border-radius: 2px;
    }
  }

  &__title {
    flex: 1;
  }

  &__icon {
    flex-shrink: 0;
    font-size: var(--byz-text-lg);
    color: var(--byz-color-text-muted);
    transition: transform var(--byz-duration-normal) var(--byz-ease-default);
    display: inline-block;

    &--open {
      transform: rotate(180deg);
    }
  }

  &__content {
    overflow: hidden;
  }

  &__body {
    padding-bottom: var(--byz-space-4);
    font-size: var(--byz-text-sm);
    color: var(--byz-color-text-secondary);
    line-height: 1.6;
  }
}

.byz-accordion-enter-active,
.byz-accordion-leave-active {
  transition: max-height var(--byz-duration-normal) var(--byz-ease-default);
}
</style>
