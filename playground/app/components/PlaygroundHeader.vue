<script setup lang="ts">
import { useTheme } from '@byzantium-design-system/core'
import { usePlaygroundLocale } from '~/composables/usePlaygroundLocale'
import LanguageSelector from '~/components/LanguageSelector.vue'

const { theme, toggle } = useTheme()
const { p } = usePlaygroundLocale()
const route = useRoute()
const menuOpen = ref(false)
const triggerRef = ref<HTMLButtonElement | null>(null)

function close() {
  menuOpen.value = false
  triggerRef.value?.focus()
}

function handleKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && menuOpen.value) close()
}

onMounted(() => document.addEventListener('keydown', handleKey))
onUnmounted(() => document.removeEventListener('keydown', handleKey))

const groups = computed(() => [
  {
    label: p('menuGroupStyle'),
    items: [
      { href: '/tokens',     label: 'Tokens',          desc: p('menuDescTokens') },
      { href: '/typography', label: p('navTypography'), desc: p('menuDescTypography') },
      { href: '/icons',      label: 'Icons',            desc: p('menuDescIcons') },
    ],
  },
  {
    label: p('menuGroupComponents'),
    items: [
      { href: '/components', label: p('navComponents'), desc: p('menuDescComponents') },
      { href: '/forms',      label: p('navForms'),      desc: p('menuDescForms') },
    ],
  },
  {
    label: p('menuGroupLayout'),
    items: [
      { href: '/grid',       label: p('navGrid'),       desc: p('menuDescGrid') },
      { href: '/patterns',   label: p('navPatterns'),   desc: p('menuDescPatterns') },
    ],
  },
  {
    label: p('menuGroupMeta'),
    items: [
      { href: '/changelog',  label: p('navChangelog'),  desc: p('menuDescChangelog') },
    ],
  },
])
</script>

<template>
  <header class="ph">
    <nav class="ph__bar" aria-label="Hoofdnavigatie">
      <a href="/" class="ph__brand">Byzantium</a>
      <div class="ph__controls">
        <button
          class="ph__theme-btn"
          :aria-label="theme === 'dark' ? p('lightMode') : p('darkMode')"
          @click="toggle"
        >
          <span aria-hidden="true">{{ theme === 'dark' ? '☀' : '☾' }}</span>
        </button>
        <button
          ref="triggerRef"
          class="ph__menu-btn"
          :class="{ 'ph__menu-btn--open': menuOpen }"
          :aria-expanded="menuOpen"
          aria-controls="ph-mega-panel"
          aria-haspopup="true"
          @click="menuOpen = !menuOpen"
        >
          <svg class="ph__menu-icon" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
            <rect x="0" y="2" width="16" height="2" rx="1" />
            <rect x="0" y="7" width="16" height="2" rx="1" />
            <rect x="0" y="12" width="16" height="2" rx="1" />
          </svg>
          <span class="ph__menu-label">Menu</span>
        </button>
      </div>
    </nav>

    <Transition name="ph-mega">
      <nav
        v-if="menuOpen"
        id="ph-mega-panel"
        class="ph-mega"
        aria-label="Sitenavigatie"
      >
        <div class="ph-mega__inner">
          <div
            v-for="group in groups"
            :key="group.label"
            class="ph-mega__group"
          >
            <span class="ph-mega__group-label">{{ group.label }}</span>
            <a
              v-for="item in group.items"
              :key="item.href"
              :href="item.href"
              class="ph-mega__link"
              :aria-current="route.path === item.href ? 'page' : undefined"
              @click="close"
            >
              <span class="ph-mega__link-name">{{ item.label }}</span>
              <span class="ph-mega__link-desc">{{ item.desc }}</span>
            </a>
          </div>
        </div>
        <div class="ph-mega__footer">
          <LanguageSelector />
        </div>
      </nav>
    </Transition>

    <div
      v-if="menuOpen"
      class="ph-backdrop"
      aria-hidden="true"
      @click="close"
    />
  </header>
</template>

<style scoped lang="scss">
.ph {
  position: sticky;
  top: 0;
  z-index: var(--byz-z-sticky);
  background: var(--byz-color-nav-bg);
  border-bottom: 1px solid var(--byz-color-border);
  backdrop-filter: blur(12px);

  &__bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 80rem;
    margin: 0 auto;
    padding: var(--byz-space-3) var(--byz-space-6);
    height: 56px;
  }

  &__brand {
    font-family: var(--byz-font-serif);
    font-size: var(--byz-text-xl);
    font-weight: var(--byz-font-bold);
    color: var(--byz-brand-400);
    text-decoration: none;
    &:hover { color: var(--byz-brand-300); }
    &:focus-visible { outline: 2px solid var(--byz-brand-500); outline-offset: 3px; border-radius: 2px; }
  }

  &__controls {
    display: flex;
    align-items: center;
    gap: var(--byz-space-2);
  }

  &__theme-btn {
    background: none;
    border: 1px solid var(--byz-color-border);
    border-radius: 0.375rem;
    padding: var(--byz-space-1) var(--byz-space-2);
    color: var(--byz-color-text-secondary);
    cursor: pointer;
    font-size: var(--byz-text-sm);
    line-height: 1.5;
    transition: border-color 0.15s, color 0.15s;
    &:hover { border-color: var(--byz-brand-500); color: var(--byz-color-text-primary); }
    &:focus-visible { outline: 2px solid var(--byz-brand-500); outline-offset: 2px; }
  }

  &__menu-btn {
    display: flex;
    align-items: center;
    gap: var(--byz-space-2);
    background: none;
    border: 1px solid var(--byz-color-border);
    border-radius: 0.375rem;
    padding: var(--byz-space-1) var(--byz-space-3);
    color: var(--byz-color-text-secondary);
    cursor: pointer;
    font-size: var(--byz-text-sm);
    font-family: var(--byz-font-sans);
    transition: border-color 0.15s, color 0.15s, background 0.15s;

    &:hover,
    &--open {
      border-color: var(--byz-brand-500);
      color: var(--byz-brand-400);
      background: color-mix(in srgb, var(--byz-brand-500) 6%, transparent);
    }

    &:focus-visible { outline: 2px solid var(--byz-brand-500); outline-offset: 2px; }
  }

  &__menu-icon { flex-shrink: 0; }
}

.ph-mega {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--byz-color-nav-bg);
  border-bottom: 1px solid var(--byz-color-border);
  backdrop-filter: blur(16px);
  box-shadow: 0 8px 32px color-mix(in srgb, black 14%, transparent);

  &__inner {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--byz-space-8);
    max-width: 80rem;
    margin: 0 auto;
    padding: var(--byz-space-8) var(--byz-space-6);
  }

  &__group-label {
    display: block;
    font-size: var(--byz-text-xs);
    font-weight: var(--byz-font-semibold);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--byz-color-text-muted);
    margin-bottom: var(--byz-space-3);
    padding: 0 var(--byz-space-3);
  }

  &__link {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: var(--byz-space-2) var(--byz-space-3);
    border-radius: 0.5rem;
    text-decoration: none;
    margin-bottom: var(--byz-space-1);
    transition: background 0.12s;

    &:hover { background: color-mix(in srgb, var(--byz-brand-500) 8%, transparent); }

    &[aria-current='page'] {
      background: color-mix(in srgb, var(--byz-brand-500) 12%, transparent);
      .ph-mega__link-name { color: var(--byz-brand-400); }
    }

    &:focus-visible { outline: 2px solid var(--byz-brand-500); outline-offset: 2px; border-radius: 0.5rem; }
  }

  &__link-name {
    font-size: var(--byz-text-sm);
    font-weight: var(--byz-font-medium);
    color: var(--byz-color-text-primary);
  }

  &__link-desc {
    font-size: var(--byz-text-xs);
    color: var(--byz-color-text-muted);
  }

  &__footer {
    border-top: 1px solid var(--byz-color-border);
    max-width: 80rem;
    margin: 0 auto;
    padding: var(--byz-space-4) var(--byz-space-6);
    display: flex;
    align-items: center;
    gap: var(--byz-space-4);
  }
}

.ph-backdrop {
  position: fixed;
  inset: 0;
  z-index: calc(var(--byz-z-sticky) - 10);
  cursor: default;
}

.ph-mega-enter-active,
.ph-mega-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.ph-mega-enter-from,
.ph-mega-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (max-width: 640px) {
  .ph__menu-label { display: none; }

  .ph-mega__inner {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--byz-space-5);
    padding: var(--byz-space-6) var(--byz-space-4);
  }
}
</style>
