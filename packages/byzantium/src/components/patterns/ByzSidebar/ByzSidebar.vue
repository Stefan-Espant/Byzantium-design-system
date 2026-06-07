<script setup lang="ts">
  import { computed } from 'vue'

  // ── ByzSidebarItem (internal sub-component) ──────────────────────────────────

  interface SidebarItemProps {
    href: string
    label: string
    icon?: string
    active?: boolean
  }

  // ── ByzSidebar ───────────────────────────────────────────────────────────────

  defineOptions({ name: 'ByzSidebar' })

  interface Props {
    open?: boolean
    width?: string
    collapsible?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    open: true,
    width: '240px',
    collapsible: true
  })

  const emit = defineEmits<{
    'update:open': [value: boolean]
  }>()

  const sidebarWidth = computed(() => {
    if (props.collapsible && !props.open) return '0px'
    return props.width
  })

  function toggle() {
    if (props.collapsible) {
      emit('update:open', !props.open)
    }
  }
</script>

<!-- ByzSidebarItem used inside default slot via scoped expose -->
<script lang="ts">
  import { defineComponent, h } from 'vue'

  export const ByzSidebarItem = defineComponent({
    name: 'ByzSidebarItem',
    props: {
      href: { type: String, required: true },
      label: { type: String, required: true },
      icon: { type: String, default: undefined },
      active: { type: Boolean, default: false }
    },
    setup(props) {
      return () =>
        h(
          'a',
          {
            href: props.href,
            class: ['byz-sidebar-item', { 'byz-sidebar-item--active': props.active }],
            'aria-current': props.active ? 'page' : undefined
          },
          [
            props.icon
              ? h('span', { class: 'byz-sidebar-item__icon', 'aria-hidden': 'true' }, props.icon)
              : null,
            h('span', { class: 'byz-sidebar-item__label' }, props.label)
          ]
        )
    }
  })
</script>

<template>
  <aside
    class="byz-sidebar"
    :class="{ 'byz-sidebar--collapsed': collapsible && !open }"
    :style="{ width: sidebarWidth }"
    :aria-hidden="collapsible && !open ? 'true' : undefined"
  >
    <div class="byz-sidebar__inner">
      <div v-if="$slots.header" class="byz-sidebar__header">
        <slot name="header" />
      </div>

      <nav class="byz-sidebar__nav" aria-label="Sidebar navigation">
        <slot />
      </nav>

      <div v-if="$slots.footer" class="byz-sidebar__footer">
        <slot name="footer" />
      </div>
    </div>

    <button
      v-if="collapsible"
      class="byz-sidebar__toggle"
      :aria-label="open ? 'Collapse sidebar' : 'Expand sidebar'"
      :aria-expanded="open"
      @click="toggle"
    >
      <span class="byz-sidebar__toggle-icon" aria-hidden="true">{{ open ? '‹' : '›' }}</span>
    </button>
  </aside>
</template>

<style lang="scss" scoped>
.byz-sidebar {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--byz-color-surface);
  border-right: 1px solid var(--byz-color-border);
  overflow: hidden;
  transition: width var(--byz-duration-normal) var(--byz-ease-default);
  flex-shrink: 0;

  &--collapsed {
    width: 0 !important;
    border-right-color: transparent;
  }

  &__inner {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    min-width: v-bind(width);
  }

  &__header {
    padding: var(--byz-space-4) var(--byz-space-4) var(--byz-space-3);
    border-bottom: 1px solid var(--byz-color-border);
    flex-shrink: 0;
  }

  &__nav {
    flex: 1;
    overflow-y: auto;
    padding: var(--byz-space-3) var(--byz-space-2);
    display: flex;
    flex-direction: column;
    gap: var(--byz-space-1);
  }

  &__footer {
    padding: var(--byz-space-3) var(--byz-space-4);
    border-top: 1px solid var(--byz-color-border);
    flex-shrink: 0;
  }

  &__toggle {
    position: absolute;
    top: 50%;
    right: -12px;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 1px solid var(--byz-color-border);
    background: var(--byz-color-surface-raised);
    color: var(--byz-color-text-muted);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--byz-text-sm);
    z-index: 10;
    transition:
      background var(--byz-duration-fast) var(--byz-ease-default),
      color var(--byz-duration-fast) var(--byz-ease-default);

    &:hover {
      background: var(--byz-color-surface-raised);
      color: var(--byz-color-text-primary);
    }
  }

  &__toggle-icon {
    line-height: 1;
  }
}
</style>

<style lang="scss">
/* Unscoped so ByzSidebarItem renders correctly inside the slot */
.byz-sidebar-item {
  display: flex;
  align-items: center;
  gap: var(--byz-space-3);
  width: 100%;
  padding: var(--byz-space-2) var(--byz-space-3);
  border-radius: 4px;
  border-left: 3px solid transparent;
  text-decoration: none;
  font-family: var(--byz-font-sans);
  font-size: var(--byz-text-sm);
  font-weight: var(--byz-font-medium);
  color: var(--byz-color-text-secondary);
  transition:
    background var(--byz-duration-fast) var(--byz-ease-default),
    color var(--byz-duration-fast) var(--byz-ease-default),
    border-left-color var(--byz-duration-fast) var(--byz-ease-default);
  white-space: nowrap;
  overflow: hidden;

  &:hover {
    background: var(--byz-color-surface-raised);
    color: var(--byz-color-text-primary);
  }

  &--active {
    border-left-color: var(--byz-brand-500);
    color: var(--byz-color-text-primary);
    background: color-mix(in srgb, var(--byz-brand-500) 10%, transparent);
    font-weight: var(--byz-font-semibold);
  }

  &__icon {
    font-size: var(--byz-text-base);
    flex-shrink: 0;
    width: 1.25rem;
    text-align: center;
  }

  &__label {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
