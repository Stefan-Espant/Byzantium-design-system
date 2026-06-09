<script setup lang="ts">
import {
  ByzHero, ByzNavbar, ByzFooter, ByzSidebar, ByzPageHeader, ByzEmptyState,
  ByzButton, ByzBadge, ByzBreadcrumb, ByzDrawer,
  useTheme,
} from '@byzantium/core'
import { usePlaygroundLocale } from '~/composables/usePlaygroundLocale'

const { theme, toggle } = useTheme()
const { p } = usePlaygroundLocale()
const menuOpen = ref(false)

// Sidebar open state
const sidebarOpen = ref(true)
const sidebarCollapsed = ref(false)
</script>

<template>
  <div class="pt-page">

    <!-- HEADER -->
    <header class="pt-header">
      <nav class="pt-header__inner">
        <a href="/" class="pt-header__brand">Byzantium</a>
        <span class="pt-header__title">Patronen</span>
        <div class="pt-header__controls">
          <LanguageSelector />
          <button class="pt-header__toggle" :aria-label="p('lightMode')" @click="toggle">
            {{ theme === 'dark' ? '☀' : '☾' }}
          </button>
          <a href="/" class="pt-header__back">{{ p('navBack') }}</a>
        </div>
        <button
          class="pt-header__hamburger"
          :aria-expanded="menuOpen"
          aria-label="Menu"
          @click="menuOpen = !menuOpen"
        >
          <span></span><span></span><span></span>
        </button>
      </nav>
    </header>

    <ByzDrawer v-model="menuOpen" side="left" title="Byzantium">
      <nav class="mobile-nav-links">
        <a href="/" @click="menuOpen = false">{{ p('navBack') }}</a>
        <a href="/tokens" @click="menuOpen = false">Tokens</a>
        <a href="/components" @click="menuOpen = false">{{ p('navComponents') }}</a>
        <a href="/patterns" @click="menuOpen = false">{{ p('navPatterns') }}</a>
        <a href="/grid" @click="menuOpen = false">{{ p('navGrid') }}</a>
        <a href="/changelog" @click="menuOpen = false">{{ p('navChangelog') }}</a>
      </nav>
      <template #footer>
        <div class="mobile-nav-footer">
          <LanguageSelector />
          <button class="mobile-nav-toggle" :aria-label="p('lightMode')" @click="toggle">
            {{ theme === 'dark' ? '☀' : '☾' }}
          </button>
        </div>
      </template>
    </ByzDrawer>

    <main class="pt-main">

      <!-- ── ByzHero ──────────────────────────────────────────────────────────── -->
      <section class="pt-section">
        <h2 class="pt-section__title">ByzHero</h2>

        <div class="pt-group">
          <h3 class="pt-group__title">align="center" — met ondertitel en twee acties</h3>
          <div class="pt-preview">
            <ByzHero
              align="center"
              title="Welkom bij Byzantium"
              subtitle="Een dark-first design system voor moderne Vue 3 & Nuxt 4 applicaties."
            >
              <ByzButton variant="primary">Aan de slag</ByzButton>
              <ByzButton variant="secondary">Bekijk componenten</ByzButton>
            </ByzHero>
          </div>
        </div>

        <div class="pt-group">
          <h3 class="pt-group__title">align="left" — met één actie</h3>
          <div class="pt-preview">
            <ByzHero
              align="left"
              title="Bouw sneller. Bouw beter."
              subtitle="Herbruikbare patronen die je project in een vliegende start helpen."
            >
              <ByzButton variant="primary">Documentatie</ByzButton>
            </ByzHero>
          </div>
        </div>

        <div class="pt-group">
          <h3 class="pt-group__title">align="right" — alleen titel</h3>
          <div class="pt-preview">
            <ByzHero
              align="right"
              title="Byzantium Design System"
            />
          </div>
        </div>
      </section>

      <!-- ── ByzNavbar ───────────────────────────────────────────────────────── -->
      <section class="pt-section">
        <h2 class="pt-section__title">ByzNavbar</h2>
        <div class="pt-preview">
          <ByzNavbar
            brand="Byzantium"
            :items="[
              { label: 'Tokens',      href: '/tokens' },
              { label: 'Componenten', href: '/components' },
              { label: 'Patronen',    href: '/patterns' },
            ]"
          >
            <ByzButton variant="primary" size="sm">Aan de slag</ByzButton>
          </ByzNavbar>
        </div>
      </section>

      <!-- ── ByzPageHeader ───────────────────────────────────────────────────── -->
      <section class="pt-section">
        <h2 class="pt-section__title">ByzPageHeader</h2>
        <div class="pt-preview pt-preview--padded">
          <ByzPageHeader
            title="Projectoverzicht"
            subtitle="Beheer en bekijk al je projecten op één plek."
            :breadcrumbs="[
              { label: 'Home',      href: '/' },
              { label: 'Projecten', href: '#' },
              { label: 'Overzicht' },
            ]"
          >
            <template #actions>
              <ByzButton size="sm" variant="secondary">Exporteren</ByzButton>
              <ByzButton size="sm" variant="primary">Nieuw project</ByzButton>
            </template>
          </ByzPageHeader>
        </div>
      </section>

      <!-- ── ByzSidebar ──────────────────────────────────────────────────────── -->
      <section class="pt-section">
        <h2 class="pt-section__title">ByzSidebar</h2>

        <div class="pt-sidebar-row">
          <!-- Open state -->
          <div class="pt-group pt-group--flex">
            <h3 class="pt-group__title">Open</h3>
            <div class="pt-preview pt-preview--sidebar">
              <ByzSidebar :open="true" :collapsible="false">
                <template #header>
                  <span class="pt-sidebar-brand">Byzantium</span>
                </template>

                <nav class="pt-sidebar-nav">
                  <a href="#" class="pt-sidebar-item pt-sidebar-item--active">⊞ Dashboard</a>
                  <a href="#" class="pt-sidebar-item">◧ Componenten</a>
                  <a href="#" class="pt-sidebar-item">⬡ Patronen</a>
                  <a href="#" class="pt-sidebar-item">⚙ Instellingen</a>
                </nav>

                <template #footer>
                  <span class="pt-sidebar-user">Stefan van der Kort</span>
                </template>
              </ByzSidebar>
            </div>
          </div>

          <!-- Collapsed state -->
          <div class="pt-group pt-group--flex">
            <h3 class="pt-group__title">Collapsed</h3>
            <div class="pt-preview pt-preview--sidebar pt-preview--sidebar-collapsed">
              <ByzSidebar :open="false" :collapsible="true" @update:open="() => {}">
                <template #header>
                  <span class="pt-sidebar-brand">Byzantium</span>
                </template>
                <nav class="pt-sidebar-nav">
                  <a href="#" class="pt-sidebar-item pt-sidebar-item--active">⊞ Dashboard</a>
                  <a href="#" class="pt-sidebar-item">◧ Componenten</a>
                  <a href="#" class="pt-sidebar-item">⬡ Patronen</a>
                  <a href="#" class="pt-sidebar-item">⚙ Instellingen</a>
                </nav>
                <template #footer>
                  <span class="pt-sidebar-user">Stefan van der Kort</span>
                </template>
              </ByzSidebar>
            </div>
          </div>
        </div>
      </section>

      <!-- ── ByzEmptyState ───────────────────────────────────────────────────── -->
      <section class="pt-section">
        <h2 class="pt-section__title">ByzEmptyState</h2>
        <div class="pt-grid-2">
          <div class="pt-preview">
            <ByzEmptyState
              icon="◇"
              title="Geen componenten gevonden"
              description="Er zijn geen componenten die overeenkomen met je zoekopdracht. Probeer een andere term of reset de filters."
            >
              <template #actions>
                <ByzButton size="sm" variant="primary">Reset filters</ByzButton>
              </template>
            </ByzEmptyState>
          </div>

          <div class="pt-preview">
            <ByzEmptyState
              icon="🔍"
              title="Geen resultaten"
              description="Pas je zoekterm aan om andere resultaten te zien."
            />
          </div>
        </div>
      </section>

      <!-- ── ByzFooter ───────────────────────────────────────────────────────── -->
      <section class="pt-section">
        <h2 class="pt-section__title">ByzFooter</h2>
        <div class="pt-preview">
          <ByzFooter
            brand="Byzantium"
            :links="[
              { label: 'GitHub',      href: '#' },
              { label: 'Changelog',   href: '#' },
              { label: 'Licentie',    href: '#' },
            ]"
            copyright="© 2026 Byzantium Design System"
          />
        </div>
      </section>

    </main>

  </div>
</template>

<style lang="scss" scoped>
.pt-page { min-height: 100vh; display: flex; flex-direction: column; }

/* ── Header ────────────────────────────────────────────────────────────────── */
.pt-header {
  position: sticky; top: 0; z-index: 10;
  background: var(--byz-color-nav-bg);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--byz-color-border);

  &__inner {
    display: flex; align-items: center; gap: var(--byz-space-4);
    max-width: 72rem; margin: 0 auto;
    padding: 0 var(--byz-space-8); min-height: 56px;
  }
  &__brand {
    font-family: var(--byz-font-serif); font-size: var(--byz-text-lg);
    font-weight: var(--byz-font-bold); color: var(--byz-color-text-primary);
    text-decoration: none;
  }
  &__title { flex: 1; font-size: var(--byz-text-sm); color: var(--byz-color-text-muted); }
  &__toggle {
    background: none; border: 1px solid var(--byz-color-border); border-radius: 50%;
    width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--byz-color-text-muted); font-size: 14px;
    &:hover { color: var(--byz-color-accent); border-color: var(--byz-color-accent); }
  }
  &__back {
    font-size: var(--byz-text-sm); color: var(--byz-color-text-muted); text-decoration: none;
    &:hover { color: var(--byz-color-accent); }
  }
}

/* ── Main ──────────────────────────────────────────────────────────────────── */
.pt-main {
  flex: 1; max-width: 72rem; margin: 0 auto; width: 100%;
  padding: var(--byz-space-12) var(--byz-space-8) var(--byz-space-20);
  display: flex; flex-direction: column; gap: var(--byz-space-1);
}

/* ── Sections ──────────────────────────────────────────────────────────────── */
.pt-section {
  padding: var(--byz-space-10) 0;
  border-bottom: 1px solid var(--byz-color-border);
  &:last-child { border-bottom: none; }

  &__title {
    font-size: var(--byz-text-3xl); color: var(--byz-color-text-primary);
    margin-bottom: var(--byz-space-8);
    &::after {
      content: ''; display: block; width: 32px; height: 2px;
      background: var(--byz-color-accent); margin-top: var(--byz-space-3); border-radius: 1px;
    }
  }
}

/* ── Groups ────────────────────────────────────────────────────────────────── */
.pt-group {
  margin-bottom: var(--byz-space-8);
  &:last-child { margin-bottom: 0; }
  &--flex { flex: 1; }
}
.pt-group__title {
  font-size: var(--byz-text-xs); letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--byz-color-text-muted); font-weight: var(--byz-font-semibold);
  margin-bottom: var(--byz-space-4);
}

/* ── Preview frames ────────────────────────────────────────────────────────── */
.pt-preview {
  border: 1px solid var(--byz-color-border);
  border-radius: 0.5rem;
  overflow: hidden;

  &--padded { padding: var(--byz-space-8); }

  &--sidebar {
    height: 400px;
    display: flex;
    overflow: hidden;
  }

  &--sidebar-collapsed {
    width: 80px;
    flex-shrink: 0;
  }
}

/* ── Grids ─────────────────────────────────────────────────────────────────── */
.pt-grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--byz-space-6);
}

/* ── Sidebar row ───────────────────────────────────────────────────────────── */
.pt-sidebar-row {
  display: flex;
  gap: var(--byz-space-8);
  align-items: flex-start;
  flex-wrap: wrap;
}

/* ── Sidebar slot content ──────────────────────────────────────────────────── */
.pt-sidebar-brand {
  font-family: var(--byz-font-serif);
  font-size: var(--byz-text-base);
  font-weight: var(--byz-font-bold);
  color: var(--byz-color-text-primary);
}

.pt-sidebar-user {
  font-size: var(--byz-text-xs);
  color: var(--byz-color-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pt-sidebar-nav {
  display: flex; flex-direction: column; gap: 2px; padding: var(--byz-space-2);
}

.pt-sidebar-item {
  display: flex; align-items: center; gap: var(--byz-space-3);
  padding: var(--byz-space-2) var(--byz-space-3);
  border-radius: 4px; text-decoration: none;
  font-size: var(--byz-text-sm); color: var(--byz-color-text-muted);
  transition: background var(--byz-duration-fast) var(--byz-ease-default),
              color var(--byz-duration-fast) var(--byz-ease-default);

  &:hover { background: rgba(255,255,255,0.05); color: var(--byz-color-text-secondary); }

  &--active {
    background: rgba(192,16,48,0.12);
    color: var(--byz-color-accent);
    border-left: 2px solid var(--byz-color-accent);
    padding-left: calc(var(--byz-space-3) - 2px);
  }
}

/* ─── Hamburger / controls ─────────────────────────────────────────────────── */
.pt-header__controls {
  display: flex; align-items: center; gap: var(--byz-space-4);
}

.pt-header__hamburger {
  display: none; flex-direction: column; justify-content: center; gap: 5px;
  background: none; border: none; cursor: pointer;
  padding: 6px; margin-left: auto; width: 36px; height: 36px; flex-shrink: 0;

  span {
    display: block; width: 20px; height: 2px; border-radius: 1px;
    background: var(--byz-color-text-muted);
    transition: transform 0.2s ease, opacity 0.2s ease;
  }

  &[aria-expanded="true"] {
    span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    span:nth-child(2) { opacity: 0; }
    span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
  }
}

@media (max-width: 1080px) {
  .pt-header__inner { padding: 0 var(--byz-space-4); flex-wrap: wrap; }
  .pt-header__title { display: none; }
  .pt-header__controls { display: none; }
  .pt-header__hamburger { display: flex; }

  .pt-main { padding: var(--byz-space-8) var(--byz-space-4) var(--byz-space-16); }
  .pt-grid-2 { grid-template-columns: 1fr; }
}

.mobile-nav-links {
  display: flex; flex-direction: column;
  a {
    display: block; padding: var(--byz-space-3) var(--byz-space-4);
    font-size: var(--byz-text-sm); color: var(--byz-color-text-muted);
    text-decoration: none; letter-spacing: 0.06em;
    border-radius: 0.375rem;
    &:hover { color: var(--byz-color-accent); background: rgba(255,255,255,0.04); }
  }
}
.mobile-nav-footer {
  display: flex; align-items: center; gap: var(--byz-space-3); flex-wrap: wrap;
}
.mobile-nav-toggle {
  background: var(--byz-color-surface-raised); border: 1px solid var(--byz-color-border);
  color: var(--byz-color-text); padding: 0.25rem 0.625rem;
  border-radius: 0.375rem; font-size: 0.75rem; cursor: pointer;
  &:hover { background: var(--byz-color-surface-hover); }
}
</style>
