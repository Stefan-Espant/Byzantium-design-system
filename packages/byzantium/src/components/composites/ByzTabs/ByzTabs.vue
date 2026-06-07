<script setup lang="ts">
  import { ref, computed, watch, onMounted, nextTick } from 'vue'

  defineOptions({ name: 'ByzTabs' })

  interface Tab {
    id: string
    label: string
    disabled?: boolean
  }

  interface Props {
    modelValue?: string
    tabs: Tab[]
  }

  const props = defineProps<Props>()
  const emit = defineEmits<{ 'update:modelValue': [id: string] }>()

  const tabRefs = ref<HTMLButtonElement[]>([])
  const tabBarRef = ref<HTMLDivElement | null>(null)
  const indicatorStyle = ref({ transform: 'translateX(0px)', width: '0px' })

  const activeId = computed(() =>
    props.modelValue ?? (props.tabs.find(t => !t.disabled)?.id ?? '')
  )

  const activeIndex = computed(() =>
    props.tabs.findIndex(t => t.id === activeId.value)
  )

  function selectTab(id: string) {
    emit('update:modelValue', id)
  }

  function updateIndicator() {
    const idx = activeIndex.value
    if (idx < 0) return
    const btn = tabRefs.value[idx]
    if (!btn) return
    const barEl = tabBarRef.value
    if (!barEl) return
    const barRect = barEl.getBoundingClientRect()
    const btnRect = btn.getBoundingClientRect()
    indicatorStyle.value = {
      transform: `translateX(${btnRect.left - barRect.left}px)`,
      width: `${btnRect.width}px`
    }
  }

  function handleKeydown(e: KeyboardEvent, index: number) {
    const enabledTabs = props.tabs
      .map((t, i) => ({ ...t, i }))
      .filter(t => !t.disabled)

    const currentPos = enabledTabs.findIndex(t => t.i === index)
    let nextPos = currentPos

    if (e.key === 'ArrowRight') {
      nextPos = (currentPos + 1) % enabledTabs.length
    } else if (e.key === 'ArrowLeft') {
      nextPos = (currentPos - 1 + enabledTabs.length) % enabledTabs.length
    } else if (e.key === 'Home') {
      nextPos = 0
    } else if (e.key === 'End') {
      nextPos = enabledTabs.length - 1
    } else {
      return
    }

    e.preventDefault()
    const target = enabledTabs[nextPos]
    selectTab(target.id)
    nextTick(() => {
      tabRefs.value[target.i]?.focus()
    })
  }

  watch(activeIndex, () => nextTick(updateIndicator))

  onMounted(() => {
    nextTick(updateIndicator)
    window.addEventListener('resize', updateIndicator)
  })
</script>

<template>
  <div class="byz-tabs">
    <div ref="tabBarRef" class="byz-tabs__bar" role="tablist">
      <button
        v-for="(tab, index) in tabs"
        :key="tab.id"
        :ref="(el) => { if (el) tabRefs[index] = el as HTMLButtonElement }"
        role="tab"
        :aria-selected="tab.id === activeId"
        :aria-controls="`panel-${tab.id}`"
        :aria-disabled="tab.disabled || undefined"
        :disabled="tab.disabled"
        :class="[
          'byz-tabs__tab',
          { 'byz-tabs__tab--active': tab.id === activeId }
        ]"
        :tabindex="tab.id === activeId ? 0 : -1"
        @click="!tab.disabled && selectTab(tab.id)"
        @keydown="handleKeydown($event, index)"
      >
        {{ tab.label }}
      </button>

      <span class="byz-tabs__indicator" :style="indicatorStyle" aria-hidden="true" />
    </div>

    <div
      :id="`panel-${activeId}`"
      role="tabpanel"
      class="byz-tabs__panel"
    >
      <Transition name="byz-tabs-fade" mode="out-in">
        <div :key="activeId">
          <slot :activeId="activeId" />
        </div>
      </Transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.byz-tabs {
  display: flex;
  flex-direction: column;

  &__bar {
    position: relative;
    display: flex;
    border-bottom: 1px solid var(--byz-color-border);
  }

  &__tab {
    position: relative;
    padding: var(--byz-space-3) var(--byz-space-4);
    background: none;
    border: none;
    cursor: pointer;
    font-family: var(--byz-font-sans);
    font-size: var(--byz-text-sm);
    font-weight: var(--byz-font-medium);
    color: var(--byz-color-text-muted);
    transition:
      color var(--byz-duration-fast) var(--byz-ease-default);
    white-space: nowrap;

    &:hover:not(:disabled) {
      color: var(--byz-color-text-secondary);
    }

    &--active {
      color: var(--byz-color-text-primary);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.4;
    }

    &:focus-visible {
      outline: 2px solid var(--byz-color-focus);
      outline-offset: 2px;
      border-radius: 2px;
    }
  }

  &__indicator {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--byz-brand-500), var(--byz-brand-400));
    border-radius: 1px 1px 0 0;
    transition:
      transform var(--byz-duration-normal) var(--byz-ease-default),
      width var(--byz-duration-normal) var(--byz-ease-default);
    pointer-events: none;
  }

  &__panel {
    padding: var(--byz-space-4) 0;
  }
}

.byz-tabs-fade-enter-active,
.byz-tabs-fade-leave-active {
  transition: opacity var(--byz-duration-fast) var(--byz-ease-default);
}

.byz-tabs-fade-enter-from,
.byz-tabs-fade-leave-to {
  opacity: 0;
}
</style>
