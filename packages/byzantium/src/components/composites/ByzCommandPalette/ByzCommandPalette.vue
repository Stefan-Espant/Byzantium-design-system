<script setup lang="ts">
import { ref, computed, watch, nextTick, onUnmounted } from 'vue'
import { useFocusTrap } from '../../../composables/useFocusTrap'

defineOptions({ name: 'ByzCommandPalette' })

interface Command {
  id: string
  label: string
  description?: string
  icon?: string
  shortcut?: string
  group?: string
  action: () => void
}

interface Props {
  open: boolean
  commands: Command[]
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Typ een commando of zoek…',
})

const emit = defineEmits<{
  close: []
  select: [command: Command]
}>()

const { trap, release } = useFocusTrap()

const searchQuery = ref('')
const activeIndex = ref(0)
const searchInputEl = ref<HTMLInputElement | null>(null)
const panelEl = ref<HTMLElement | null>(null)
const listEl = ref<HTMLElement | null>(null)

// Fuzzy filter: simple includes match on label + description
const filteredCommands = computed((): Command[] => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return props.commands
  return props.commands.filter((cmd) => {
    const inLabel = cmd.label.toLowerCase().includes(q)
    const inDesc = cmd.description?.toLowerCase().includes(q) ?? false
    return inLabel || inDesc
  })
})

// Group commands by group key
interface GroupedSection {
  group: string | null
  commands: Command[]
}

const groupedSections = computed((): GroupedSection[] => {
  const sections: Map<string | null, Command[]> = new Map()
  for (const cmd of filteredCommands.value) {
    const key = cmd.group ?? null
    if (!sections.has(key)) sections.set(key, [])
    sections.get(key)!.push(cmd)
  }

  const result: GroupedSection[] = []
  for (const [group, commands] of sections) {
    result.push({ group, commands })
  }
  return result
})

// Flat list of commands in display order (for keyboard navigation)
const flatCommands = computed((): Command[] =>
  groupedSections.value.flatMap((s) => s.commands)
)

function getCommandIndex(cmd: Command): number {
  return flatCommands.value.findIndex((c) => c.id === cmd.id)
}

function isActive(cmd: Command): boolean {
  return getCommandIndex(cmd) === activeIndex.value
}

function selectCommand(cmd: Command) {
  cmd.action()
  emit('select', cmd)
  emit('close')
}

function scrollActiveIntoView() {
  nextTick(() => {
    const active = listEl.value?.querySelector('.byz-command-palette__item--active')
    active?.scrollIntoView({ block: 'nearest' })
  })
}

function handleKeydown(e: KeyboardEvent) {
  if (!props.open) return

  if (e.key === 'Escape') {
    e.preventDefault()
    emit('close')
    return
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    activeIndex.value = Math.min(activeIndex.value + 1, flatCommands.value.length - 1)
    scrollActiveIntoView()
    return
  }

  if (e.key === 'ArrowUp') {
    e.preventDefault()
    activeIndex.value = Math.max(activeIndex.value - 1, 0)
    scrollActiveIntoView()
    return
  }

  if (e.key === 'Enter') {
    e.preventDefault()
    const cmd = flatCommands.value[activeIndex.value]
    if (cmd) selectCommand(cmd)
    return
  }
}

watch(() => props.open, (val) => {
  if (val) {
    searchQuery.value = ''
    activeIndex.value = 0

    nextTick(() => {
      searchInputEl.value?.focus()
      if (panelEl.value) trap(panelEl.value)
      document.addEventListener('keydown', handleKeydown)
    })
  } else {
    release()
    document.removeEventListener('keydown', handleKeydown)
  }
})

// Reset active index when filter results change
watch(filteredCommands, () => {
  activeIndex.value = 0
})

onUnmounted(() => {
  release()
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="byz-cp">
      <div
        v-if="open"
        class="byz-command-palette-overlay"
        aria-modal="true"
        role="dialog"
        aria-label="Commando palet"
        @mousedown.self="emit('close')"
      >
        <div
          ref="panelEl"
          class="byz-command-palette"
        >
          <!-- Search input -->
          <div class="byz-command-palette__search">
            <svg class="byz-command-palette__search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref="searchInputEl"
              v-model="searchQuery"
              type="text"
              :placeholder="placeholder"
              class="byz-command-palette__input"
              autocomplete="off"
              spellcheck="false"
              aria-label="Zoeken in commando's"
            />
          </div>

          <div class="byz-command-palette__separator" />

          <!-- Command list -->
          <div
            ref="listEl"
            class="byz-command-palette__list"
            role="listbox"
            aria-label="Commando's"
          >
            <template v-if="filteredCommands.length > 0">
              <template v-for="section in groupedSections" :key="section.group ?? '__ungrouped__'">
                <!-- Group header -->
                <div v-if="section.group" class="byz-command-palette__group-label">
                  {{ section.group }}
                </div>

                <!-- Commands -->
                <button
                  v-for="cmd in section.commands"
                  :key="cmd.id"
                  type="button"
                  role="option"
                  :class="[
                    'byz-command-palette__item',
                    { 'byz-command-palette__item--active': isActive(cmd) },
                  ]"
                  :aria-selected="isActive(cmd)"
                  @mouseenter="activeIndex = getCommandIndex(cmd)"
                  @click="selectCommand(cmd)"
                >
                  <span v-if="cmd.icon" class="byz-command-palette__item-icon" aria-hidden="true">
                    {{ cmd.icon }}
                  </span>
                  <span class="byz-command-palette__item-content">
                    <span class="byz-command-palette__item-label">{{ cmd.label }}</span>
                    <span v-if="cmd.description" class="byz-command-palette__item-desc">
                      {{ cmd.description }}
                    </span>
                  </span>
                  <kbd v-if="cmd.shortcut" class="byz-command-palette__shortcut">{{ cmd.shortcut }}</kbd>
                </button>
              </template>
            </template>

            <!-- Empty state -->
            <div v-else class="byz-command-palette__empty">
              Geen resultaten voor "{{ searchQuery }}"
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.byz-command-palette-overlay {
  position: fixed;
  inset: 0;
  z-index: var(--byz-z-modal, 1100);
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 15vh;
}

.byz-command-palette {
  width: 100%;
  max-width: 560px;
  background: var(--byz-color-surface);
  border-radius: 0.75rem;
  box-shadow: var(--byz-shadow-lg, 0 24px 64px rgba(0, 0, 0, 0.6));
  overflow: hidden;
  border: 1px solid var(--byz-color-border);

  &__search {
    display: flex;
    align-items: center;
    gap: var(--byz-space-3);
    padding: var(--byz-space-4) var(--byz-space-4);
  }

  &__search-icon {
    flex-shrink: 0;
    color: var(--byz-color-text-muted);
  }

  &__input {
    flex: 1;
    background: none;
    border: none;
    outline: none;
    color: var(--byz-color-text-primary);
    font-family: var(--byz-font-sans);
    font-size: var(--byz-text-lg, 1.125rem);
    caret-color: var(--byz-color-accent, var(--byz-brand-400, #e84050));

    &::placeholder {
      color: var(--byz-color-text-muted);
    }
  }

  &__separator {
    height: 1px;
    background: var(--byz-color-border);
  }

  &__list {
    max-height: 400px;
    overflow-y: auto;
    padding: var(--byz-space-2) 0;

    // Custom scrollbar
    scrollbar-width: thin;
    scrollbar-color: var(--byz-color-border) transparent;

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--byz-color-border);
      border-radius: 2px;
    }
  }

  &__group-label {
    padding: var(--byz-space-2) var(--byz-space-4) var(--byz-space-1);
    font-size: var(--byz-text-xs);
    font-weight: var(--byz-font-semibold);
    color: var(--byz-color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: var(--byz-space-3);
    width: 100%;
    padding: var(--byz-space-3) var(--byz-space-4);
    background: transparent;
    border: none;
    border-left: 2px solid transparent;
    color: var(--byz-color-text-primary);
    font-family: var(--byz-font-sans);
    text-align: left;
    cursor: pointer;
    transition: background var(--byz-duration-fast) var(--byz-ease-default),
                border-color var(--byz-duration-fast) var(--byz-ease-default);

    &--active {
      background: rgba(192, 16, 48, 0.1);
      border-left-color: var(--byz-color-accent, var(--byz-brand-400, #e84050));
    }
  }

  &__item-icon {
    flex-shrink: 0;
    font-size: var(--byz-text-lg, 1.125rem);
    line-height: 1;
  }

  &__item-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  &__item-label {
    font-size: var(--byz-text-sm);
    font-weight: var(--byz-font-medium);
    color: var(--byz-color-text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__item-desc {
    font-size: var(--byz-text-xs);
    color: var(--byz-color-text-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__shortcut {
    flex-shrink: 0;
    padding: 2px var(--byz-space-2);
    border: 1px solid var(--byz-color-border);
    border-radius: 0.25rem;
    background: var(--byz-color-surface-raised);
    color: var(--byz-color-text-muted);
    font-family: var(--byz-font-sans);
    font-size: var(--byz-text-xs);
  }

  &__empty {
    padding: var(--byz-space-8) var(--byz-space-4);
    text-align: center;
    font-size: var(--byz-text-sm);
    color: var(--byz-color-text-muted);
  }
}

// Transition
.byz-cp-enter-active,
.byz-cp-leave-active {
  transition: opacity var(--byz-duration-normal) var(--byz-ease-default);

  .byz-command-palette {
    transition: opacity var(--byz-duration-normal) var(--byz-ease-default),
                transform var(--byz-duration-normal) var(--byz-ease-default);
  }
}

.byz-cp-enter-from,
.byz-cp-leave-to {
  opacity: 0;

  .byz-command-palette {
    opacity: 0;
    transform: scale(0.96) translateY(-8px);
  }
}
</style>
