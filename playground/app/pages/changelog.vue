<script setup lang="ts">
import { useTheme, ByzDrawer } from '@byzantium/core'
import { usePlaygroundLocale } from '~/composables/usePlaygroundLocale'

const { theme, toggle } = useTheme()
const { p } = usePlaygroundLocale()
const menuOpen = ref(false)

const releases = [
  {
    version: '0.6.0',
    date: '2026-06-09',
    label: 'latest',
    changes: [
      { type: 'feat', text: 'Icon sprite uitgebreid naar 1707 iconen: alle 1704 Lucide-iconen + 3 custom Byzantium-iconen (byz-crown, byz-seal, byz-arch)' },
      { type: 'feat', text: 'Custom icon infrastructuur: SVG-bestanden in scripts/custom-icons/ worden automatisch meegenomen bij generatie' },
      { type: 'feat', text: 'Vercel Analytics en Speed Insights toegevoegd aan playground' },
      { type: 'fix', text: 'Hover- en focus-states toegevoegd aan alle interactieve elementen op /icons' },
      { type: 'fix', text: 'Footer-links gecorrigeerd: Changelog → /changelog, License → GitHub' },
      { type: 'fix', text: 'CI-workflows bijgewerkt naar Node.js 22 voor pnpm@11.5.2 compatibiliteit' },
      { type: 'fix', text: 'Release-workflow bijgewerkt naar npm OIDC Trusted Publishers (geen token meer nodig)' },
      { type: 'fix', text: 'Storybook workspace hernoemd naar @byzantium/storybook om naambotsing met npm-pakket te voorkomen (fix voor changeset version corruptie)' },
      { type: 'fix', text: 'ByzIcon sprite fetch: try-catch toegevoegd zodat relatieve URL geen unhandled rejection gooit in Vitest/Node.js' },
    ],
  },
  {
    version: '0.5.0',
    date: '2026-06-07',
    label: null,
    changes: [
      { type: 'feat', text: 'ByzDrawer — zijpaneel met 4 posities (left/right/top/bottom), focus-trap en scroll-lock' },
      { type: 'feat', text: 'ByzStepper — wizard component met lineaire en vrije navigatie, verticale modus' },
      { type: 'feat', text: 'ByzDataTable — sorteerbare en filterbare tabel met paginering en zoekfunctie' },
      { type: 'feat', text: 'ByzColorPicker — HSL-kleurkiezer met swatches, hex-input en live preview' },
      { type: 'feat', text: 'ByzRichText — WYSIWYG editor met toolbar (bold, italic, links, lijsten)' },
      { type: 'feat', text: 'ByzGrid — 12-koloms grid (standaard) met varianten 4/8/12/16/24 en auto-fill' },
      { type: 'feat', text: 'useBreakpoint — reactieve xs/sm/md/lg/xl/2xl breakpoint-detectie' },
      { type: 'feat', text: 'useScrollLock — vergrendel body-scroll (gebruikt door ByzDrawer en ByzModal)' },
      { type: 'feat', text: 'useClipboard — kopieer naar klembord met succes-feedback' },
      { type: 'feat', text: 'useIntersection — IntersectionObserver composable voor lazy loading en animaties' },
      { type: 'feat', text: 'i18n uitgebreid naar 23 EU-talen: NL, EN, DE, FR, ES, IT, PT, PL, RO, HU, CS, SK, HR, SL, SV, DA, FI, NO, EL, BG, LT, LV, ET' },
      { type: 'feat', text: 'useLocale: Intl.DateTimeFormat, Intl.NumberFormat, Intl.RelativeTimeFormat toegevoegd' },
      { type: 'feat', text: 'VSCode snippets voor alle componenten en composables' },
    ],
  },
  {
    version: '0.4.0',
    date: '2026-06-01',
    label: null,
    changes: [
      { type: 'feat', text: 'i18n: useLocale composable met NL/EN, localStorage-persistentie' },
      { type: 'feat', text: 'Componenten reageren op actieve locale (ByzModal, ByzAlert, ByzBreadcrumb, ByzSkeleton, ByzToastContainer)' },
      { type: 'feat', text: 'Playground: locale-toggle in alle pagina-navigaties' },
    ],
  },
  {
    version: '0.3.0',
    date: '2026-05-20',
    label: null,
    changes: [
      { type: 'feat', text: 'GitHub Actions CI (lint → typecheck → test → build)' },
      { type: 'feat', text: 'Changesets voor geautomatiseerde npm-release' },
      { type: 'feat', text: 'Bundle-size check workflow' },
      { type: 'feat', text: 'axe-core accessibility tests via vitest-axe' },
      { type: 'feat', text: 'Storybook 8 met 5 stories (ByzButton, ByzInput, ByzAlert, ByzCard, ByzBadge)' },
      { type: 'feat', text: 'VitePress documentatiesite' },
    ],
  },
  {
    version: '0.2.0',
    date: '2026-05-10',
    label: null,
    changes: [
      { type: 'feat', text: '44 componenten: 19 primitives, 18 composites, 6 patronen' },
      { type: 'feat', text: 'Light/dark theme via useTheme + CSS custom properties' },
      { type: 'feat', text: 'Cormorant Garamond (headings) + Syne (body) + Source Code Pro (mono)' },
      { type: 'feat', text: 'useForm composable met validatie, touched-state en submit-handling' },
      { type: 'feat', text: 'useToast, useFocusTrap, useAnnouncer composables' },
      { type: 'feat', text: 'Component-status registry (stable/beta/experimental)' },
    ],
  },
  {
    version: '0.1.0',
    date: '2026-05-01',
    label: null,
    changes: [
      { type: 'feat', text: 'Initieel scaffold: pnpm workspaces, packages/byzantium, playground (Nuxt 4)' },
      { type: 'feat', text: 'Imperial Dark thema: crimson/burgundy kleurpalet' },
      { type: 'feat', text: 'Design tokens: kleuren, spacing, typografie, motion, shadows, z-index' },
      { type: 'feat', text: 'Vite lib-build + vue-tsc type declarations' },
    ],
  },
]

const typeColors: Record<string, string> = {
  feat:     '#c01030',
  fix:      '#16a34a',
  breaking: '#d97706',
  docs:     '#2563eb',
  perf:     '#7c3aed',
}
</script>

<template>
  <div class="cl-page">

    <header class="cl-header">
      <nav class="cl-header__inner">
        <a href="/" class="cl-header__brand">Byzantium</a>
        <span class="cl-header__title">Changelog</span>
        <div class="cl-header__controls">
          <LanguageSelector />
          <button class="cl-header__toggle" :aria-label="p('lightMode')" @click="toggle">
            {{ theme === 'dark' ? '☀' : '☾' }}
          </button>
          <a href="/" class="cl-header__back">{{ p('navBack') }}</a>
        </div>
        <button
          class="cl-header__hamburger"
          :aria-expanded="menuOpen"
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

    <main class="cl-main">
      <h1 class="cl-title">{{ p('changelogTitle') }}</h1>
      <p class="cl-subtitle">{{ p('changelogSub') }}</p>

      <div class="cl-timeline">
        <article
          v-for="release in releases"
          :key="release.version"
          class="cl-release"
        >
          <div class="cl-release__header">
            <span class="cl-release__version">v{{ release.version }}</span>
            <span v-if="release.label" class="cl-release__badge">{{ release.label }}</span>
            <span class="cl-release__date">{{ release.date }}</span>
          </div>

          <ul class="cl-changes">
            <li
              v-for="(change, i) in release.changes"
              :key="i"
              class="cl-change"
            >
              <span
                class="cl-change__type"
                :style="{ background: typeColors[change.type] ?? '#888', color: '#fff' }"
              >{{ change.type }}</span>
              <span class="cl-change__text">{{ change.text }}</span>
            </li>
          </ul>
        </article>
      </div>
    </main>

  </div>
</template>

<style lang="scss" scoped>
.cl-page {
  min-height: 100vh;
  background: var(--byz-color-background);
  color: var(--byz-color-text);
  font-family: var(--byz-font-sans);
}

.cl-header {
  position: sticky;
  top: 0;
  z-index: var(--byz-z-sticky, 100);
  background: rgba(14, 3, 5, 0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--byz-color-border);

  &__inner {
    display: flex;
    align-items: center;
    gap: 1rem;
    max-width: 800px;
    margin: 0 auto;
    padding: 0.75rem 1.5rem;
  }

  &__brand {
    font-family: var(--byz-font-serif);
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--byz-brand-500);
    text-decoration: none;
  }

  &__title { font-size: 0.875rem; color: var(--byz-color-text-muted); flex: 1; }

  &__toggle {
    background: var(--byz-color-surface-raised);
    border: 1px solid var(--byz-color-border);
    color: var(--byz-color-text);
    padding: 0.25rem 0.625rem;
    border-radius: 0.375rem;
    font-size: 0.75rem;
    cursor: pointer;
    &:hover { background: var(--byz-color-surface-hover); }
  }

  &__back { font-size: 0.8rem; color: var(--byz-color-text-muted); text-decoration: none; &:hover { color: var(--byz-brand-500); } }
}

.cl-main {
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 1.5rem 6rem;
}

.cl-title {
  font-family: var(--byz-font-serif);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: var(--byz-color-heading);
  margin-bottom: 0.5rem;
}

.cl-subtitle {
  color: var(--byz-color-text-muted);
  margin-bottom: 3rem;
}

.cl-timeline {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  border-left: 2px solid var(--byz-color-border);
  padding-left: 2rem;
  position: relative;
}

.cl-release {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: -2.375rem;
    top: 0.375rem;
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    background: var(--byz-brand-500);
    border: 2px solid var(--byz-color-background);
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }

  &__version {
    font-family: var(--byz-font-mono);
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--byz-color-heading);
  }

  &__badge {
    background: var(--byz-brand-500);
    color: #fff;
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 0.15rem 0.5rem;
    border-radius: 9999px;
  }

  &__date {
    font-size: 0.8rem;
    color: var(--byz-color-text-muted);
    font-family: var(--byz-font-mono);
    margin-left: auto;
  }
}

.cl-changes {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.cl-change {
  display: flex;
  align-items: baseline;
  gap: 0.625rem;
  font-size: 0.875rem;

  &__type {
    flex-shrink: 0;
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 0.15rem 0.45rem;
    border-radius: 0.25rem;
    font-family: var(--byz-font-mono);
  }

  &__text { color: var(--byz-color-text); line-height: 1.5; }
}

/* ─── Hamburger / controls ─────────────────────────────────────────────────── */
.cl-header__controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.cl-header__hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  margin-left: auto;
  width: 36px;
  height: 36px;
  flex-shrink: 0;

  span {
    display: block;
    width: 20px;
    height: 2px;
    border-radius: 1px;
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
  .cl-header__inner { padding: 0.5rem 1rem; flex-wrap: wrap; }
  .cl-header__title { display: none; }
  .cl-header__controls { display: none; }
  .cl-header__hamburger { display: flex; }

  .cl-main { padding: 2rem 1rem 4rem; }
  .cl-timeline { padding-left: 1.25rem; }
  .cl-release::before { left: -1.625rem; }
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
