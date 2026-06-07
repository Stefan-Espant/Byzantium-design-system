<script setup lang="ts">
import {
  ByzButton,
  ByzInput,
  ByzAlert,
  ByzCard,
  ByzBadge,
  ByzProgress,
  ByzFooter,
} from '@byzantium/core'
import { useTheme } from '@byzantium/core'

const { theme, toggle } = useTheme()
const inputValue  = ref('')
const showAlert   = ref(true)
const pkgManager  = ref<'pnpm' | 'npm' | 'yarn'>('pnpm')
const pkgManagers = ['pnpm', 'npm', 'yarn'] as const

const installCmd: Record<string, string> = {
  pnpm: 'pnpm add @byzantium/core',
  npm:  'npm install @byzantium/core',
  yarn: 'yarn add @byzantium/core',
}
</script>

<template>
  <div class="bp">

    <!-- ── NAVBAR ───────────────────────────────── -->
    <header class="bp-nav">
      <nav class="bp-nav__inner" aria-label="Hoofdnavigatie">
        <span class="bp-nav__brand">Byzantium</span>
        <ul class="bp-nav__links" role="list">
          <li><a href="/tokens">Tokens</a></li>
          <li><a href="/components">Components</a></li>
          <li><a href="/patterns">Patronen</a></li>
        </ul>
        <button class="bp-nav__toggle" :aria-label="theme === 'dark' ? 'Licht' : 'Donker'" @click="toggle">
          {{ theme === 'dark' ? '☀' : '☾' }}
        </button>
        <ByzButton variant="ghost" size="sm">GitHub</ByzButton>
      </nav>
    </header>

    <!-- ── HERO ─────────────────────────────────── -->
    <section class="bp-hero" aria-labelledby="hero-title">
      <div class="bp-hero__glow" aria-hidden="true" />
      <div class="bp-hero__eyebrow">Design System · v0.1.0</div>
      <h1 id="hero-title" class="bp-hero__title">
        Built to<br><em>endure.</em>
      </h1>
      <p class="bp-hero__subtitle">
        Toegankelijk van nature. Één bron van waarheid<br>voor alles wat visueel is.
      </p>
      <div class="bp-hero__actions">
        <ByzButton variant="primary" size="lg" @click="$el.querySelector('#install')?.scrollIntoView({behavior:'smooth'})">
          Aan de slag
        </ByzButton>
        <ByzButton variant="ghost" size="lg" onclick="location.href='/components'">
          Bekijk componenten
        </ByzButton>
      </div>
      <div class="bp-hero__divider" aria-hidden="true" />
    </section>

    <!-- ── STATS ────────────────────────────────── -->
    <div class="bp-stats" role="list">
      <div class="bp-stats__item" role="listitem">
        <span class="bp-stats__value">36</span>
        <span class="bp-stats__label">Componenten</span>
      </div>
      <div class="bp-stats__item" role="listitem">
        <span class="bp-stats__value">60+</span>
        <span class="bp-stats__label">Design tokens</span>
      </div>
      <div class="bp-stats__item" role="listitem">
        <span class="bp-stats__value">4</span>
        <span class="bp-stats__label">Composables</span>
      </div>
      <div class="bp-stats__item" role="listitem">
        <span class="bp-stats__value">A11Y</span>
        <span class="bp-stats__label">Accessibility first</span>
      </div>
    </div>

    <!-- ── INSTALL ───────────────────────────────── -->
    <section id="install" class="bp-section">
      <div class="bp-section__header">
        <div class="bp-section__eyebrow">Installatie</div>
        <h2 class="bp-section__title">Aan de slag in<br><em>twee stappen.</em></h2>
      </div>

      <div class="bp-install">

        <!-- Step 1 -->
        <div class="bp-install__step">
          <div class="bp-install__step-num">01</div>
          <div class="bp-install__step-body">
            <h3 class="bp-install__step-title">Pakket installeren</h3>
            <p class="bp-install__step-desc">Voeg <code>@byzantium/core</code> toe aan je project.</p>

            <div class="bp-code-block">
              <div class="bp-code-block__tabs">
                <button
                  v-for="pm in pkgManagers"
                  :key="pm"
                  :class="['bp-code-block__tab', { 'is-active': pkgManager === pm }]"
                  @click="pkgManager = pm"
                >{{ pm }}</button>
              </div>
              <div class="bp-code-block__body">
                <pre><code>{{ installCmd[pkgManager] }}</code></pre>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 2 -->
        <div class="bp-install__step">
          <div class="bp-install__step-num">02</div>
          <div class="bp-install__step-body">
            <h3 class="bp-install__step-title">Importeer en gebruik</h3>
            <p class="bp-install__step-desc">Importeer componenten en stijlen in je Vue-bestand.</p>

            <div class="bp-code-block">
              <div class="bp-code-block__tabs">
                <button class="bp-code-block__tab is-active">Vue SFC</button>
              </div>
              <div class="bp-code-block__body">
                <pre><code><span class="ct-keyword">import</span> { ByzButton, ByzCard, useTheme } <span class="ct-keyword">from</span> <span class="ct-string">'@byzantium/core'</span>
<span class="ct-keyword">import</span> <span class="ct-string">'@byzantium/core/styles'</span></code></pre>
              </div>
            </div>

            <div class="bp-code-block" style="margin-top: var(--byz-space-4);">
              <div class="bp-code-block__tabs">
                <button class="bp-code-block__tab is-active">Template</button>
              </div>
              <div class="bp-code-block__body">
                <pre><code><span class="ct-tag">&lt;ByzButton</span> <span class="ct-attr">variant</span>=<span class="ct-string">"primary"</span><span class="ct-tag">&gt;</span>
  Aan de slag
<span class="ct-tag">&lt;/ByzButton&gt;</span>

<span class="ct-tag">&lt;ByzCard</span> <span class="ct-attr">padding</span>=<span class="ct-string">"md"</span> <span class="ct-attr">:elevated</span>=<span class="ct-string">"true"</span><span class="ct-tag">&gt;</span>
  Inhoud van de card
<span class="ct-tag">&lt;/ByzCard&gt;</span></code></pre>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- ── ARCHITECTURE ───────────────────────────── -->
    <section class="bp-section bp-section--alt">
      <div class="bp-section__inner">
        <div class="bp-section__header">
          <div class="bp-section__eyebrow">Architectuur</div>
          <h2 class="bp-section__title">Drie lagen,<br>één <em>systeem.</em></h2>
        </div>

        <div class="bp-tiers">
          <ByzCard class="bp-tier" elevated>
            <div class="bp-tier__badge">Primitives</div>
            <div class="bp-tier__count">16</div>
            <p class="bp-tier__desc">Enkelvoudige bouwstenen zonder afhankelijkheden. Elk component heeft één duidelijk doel.</p>
            <ul class="bp-tier__list">
              <li>ByzButton</li><li>ByzInput</li><li>ByzSelect</li>
              <li>ByzCheckbox</li><li>ByzRadio</li><li>ByzSwitch</li>
              <li>ByzBadge</li><li>ByzAvatar</li><li>ByzTag</li>
              <li class="bp-tier__more">+ 7 meer →</li>
            </ul>
          </ByzCard>

          <ByzCard class="bp-tier bp-tier--featured" elevated>
            <div class="bp-tier__badge bp-tier__badge--accent">Composites</div>
            <div class="bp-tier__count">14</div>
            <p class="bp-tier__desc">Combinaties van primitives met eigen logica en toegankelijkheid ingebakken.</p>
            <ul class="bp-tier__list">
              <li>ByzModal</li><li>ByzDrawer</li><li>ByzTabs</li>
              <li>ByzAccordion</li><li>ByzTable</li><li>ByzStepper</li>
              <li>ByzDropdown</li><li>ByzToast</li><li>ByzPopover</li>
              <li class="bp-tier__more">+ 5 meer →</li>
            </ul>
          </ByzCard>

          <ByzCard class="bp-tier" elevated>
            <div class="bp-tier__badge">Patronen</div>
            <div class="bp-tier__count">6</div>
            <p class="bp-tier__desc">Volledige paginasecties die kant-en-klaar inzetbaar zijn in elke applicatie.</p>
            <ul class="bp-tier__list">
              <li>ByzHero</li><li>ByzNavbar</li><li>ByzFooter</li>
              <li>ByzSidebar</li><li>ByzPageHeader</li><li>ByzEmptyState</li>
            </ul>
          </ByzCard>
        </div>
      </div>
    </section>

    <!-- ── FEATURES ───────────────────────────────── -->
    <section class="bp-section">
      <div class="bp-section__header">
        <div class="bp-section__eyebrow">Kenmerken</div>
        <h2 class="bp-section__title">Gebouwd voor<br><em>de lange termijn.</em></h2>
      </div>

      <div class="bp-features">
        <div class="bp-feature">
          <div class="bp-feature__icon">◈</div>
          <h3 class="bp-feature__title">Semantische tokens</h3>
          <p class="bp-feature__desc">60+ design tokens als CSS custom properties — <code>--byz-*</code> variabelen voor kleur, spacing, typografie, motion, schaduwen en z-index.</p>
        </div>
        <div class="bp-feature">
          <div class="bp-feature__icon">♿</div>
          <h3 class="bp-feature__title">Accessibility first</h3>
          <p class="bp-feature__desc">ARIA-patronen, toetsenbordnavigatie, focus trap, live region announcer en minimale touch targets van 44px ingebakken in elk component.</p>
        </div>
        <div class="bp-feature">
          <div class="bp-feature__icon">🌙</div>
          <h3 class="bp-feature__title">Dark &amp; light mode</h3>
          <p class="bp-feature__desc">Imperial Dark als standaard. Schakel naar licht via <code>useTheme()</code>. Voorkeur wordt opgeslagen in localStorage en detecteert systeemvoorkeur.</p>
        </div>
        <div class="bp-feature">
          <div class="bp-feature__icon">⬡</div>
          <h3 class="bp-feature__title">TypeScript native</h3>
          <p class="bp-feature__desc">Volledige TypeScript-ondersteuning met strict mode. Typed props, emits en composables. Automatisch gegenereerde <code>.d.ts</code> declaraties.</p>
        </div>
        <div class="bp-feature">
          <div class="bp-feature__icon">⚡</div>
          <h3 class="bp-feature__title">Vue 3 &amp; Vite</h3>
          <p class="bp-feature__desc">Composition API, <code>&lt;script setup&gt;</code>, Teleport en Transition — alle moderne Vue-primitieven. Gebouwd met Vite voor snelle HMR.</p>
        </div>
        <div class="bp-feature">
          <div class="bp-feature__icon">↻</div>
          <h3 class="bp-feature__title">Prefers-reduced-motion</h3>
          <p class="bp-feature__desc">Alle animaties respecteren <code>prefers-reduced-motion</code> via CSS media queries. Geen JavaScript-detectie nodig.</p>
        </div>
      </div>
    </section>

    <!-- ── COMPONENT PREVIEW ─────────────────────── -->
    <section class="bp-section bp-section--alt">
      <div class="bp-section__inner">
        <div class="bp-section__header">
          <div class="bp-section__eyebrow">Componenten</div>
          <h2 class="bp-section__title">Klaar om te<br><em>gebruiken.</em></h2>
        </div>

        <div class="bp-preview-grid">
          <ByzCard class="bp-preview-cell" elevated>
            <div class="bp-preview-cell__label">Button</div>
            <div class="bp-preview-cell__row">
              <ByzButton variant="primary" size="sm">Primary</ByzButton>
              <ByzButton variant="secondary" size="sm">Secondary</ByzButton>
              <ByzButton variant="ghost" size="sm">Ghost</ByzButton>
            </div>
            <div class="bp-preview-cell__row" style="margin-top:var(--byz-space-2)">
              <ByzButton variant="danger" size="sm">Danger</ByzButton>
              <ByzButton variant="primary" size="sm" :loading="true">Laden</ByzButton>
            </div>
          </ByzCard>

          <ByzCard class="bp-preview-cell" elevated>
            <div class="bp-preview-cell__label">Input</div>
            <ByzInput
              v-model="inputValue"
              label="E-mailadres"
              placeholder="stefan@byzantium.dev"
              hint="Gebruik een geldig e-mailadres"
            />
          </ByzCard>

          <ByzCard class="bp-preview-cell" elevated>
            <div class="bp-preview-cell__label">Badge &amp; Progress</div>
            <div class="bp-preview-cell__row" style="margin-bottom:var(--byz-space-4)">
              <ByzBadge>Default</ByzBadge>
              <ByzBadge variant="success">Success</ByzBadge>
              <ByzBadge variant="error">Error</ByzBadge>
            </div>
            <ByzProgress :value="72" label="Voortgang" :show-value="true" size="sm" />
          </ByzCard>

          <ByzCard class="bp-preview-cell" elevated>
            <div class="bp-preview-cell__label">Alert</div>
            <ByzAlert
              v-if="showAlert"
              type="info"
              title="v0.1.0"
              dismissible
              @dismiss="showAlert = false"
            >
              Byzantium is klaar om te gebruiken.
            </ByzAlert>
            <ByzAlert v-else type="success">Goed bezig!</ByzAlert>
          </ByzCard>
        </div>

        <div class="bp-cta">
          <a href="/components">
            <ByzButton variant="secondary" size="lg">Bekijk alle 36 componenten →</ByzButton>
          </a>
        </div>
      </div>
    </section>

    <!-- ── FOOTER ────────────────────────────────── -->
    <ByzFooter
      brand="Byzantium"
      :links="[
        { label: 'GitHub',    href: '#' },
        { label: 'Changelog', href: '#' },
        { label: 'Tokens',    href: '/tokens' },
        { label: 'Licentie',  href: '#' },
      ]"
      copyright="MIT · v0.1.0"
    />

  </div>
</template>

<style lang="scss" scoped>
.bp { min-height: 100vh; }

/* ── NAVBAR ───────────────────────── */
.bp-nav {
  position: sticky; top: 0; z-index: var(--byz-z-sticky);
  background: var(--byz-color-nav-bg);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--byz-color-border);
  transition: background var(--byz-duration-normal) var(--byz-ease-default);

  &__inner {
    display: flex; align-items: center; gap: var(--byz-space-8);
    max-width: 72rem; margin: 0 auto;
    padding: 0 var(--byz-space-8); min-height: 60px;
  }

  &__brand {
    font-family: var(--byz-font-serif); font-size: var(--byz-text-xl);
    font-weight: var(--byz-font-bold); letter-spacing: 0.03em;
    color: var(--byz-color-text-primary);
  }

  &__toggle {
    background: none; border: 1px solid var(--byz-color-border); border-radius: 50%;
    width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--byz-color-text-muted); font-size: 14px;
    transition: color var(--byz-duration-fast) var(--byz-ease-default),
                border-color var(--byz-duration-fast) var(--byz-ease-default);
    &:hover { color: var(--byz-color-accent); border-color: var(--byz-color-accent); }
  }

  &__links {
    display: flex; gap: var(--byz-space-6); list-style: none; margin: 0; padding: 0; flex: 1;
    a {
      font-size: var(--byz-text-xs); letter-spacing: 0.1em; text-transform: uppercase;
      font-weight: var(--byz-font-medium); color: var(--byz-color-text-muted); text-decoration: none;
      transition: color var(--byz-duration-fast) var(--byz-ease-default);
      &:hover { color: var(--byz-color-text-secondary); }
    }
  }
}

/* ── HERO ─────────────────────────── */
.bp-hero {
  position: relative; min-height: 90vh; display: flex; flex-direction: column;
  align-items: center; justify-content: center; text-align: center;
  padding: var(--byz-space-20) var(--byz-space-8); overflow: hidden;

  &__glow {
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 50% 40%, var(--byz-color-hero-glow-1) 0%, transparent 70%),
      radial-gradient(ellipse 40% 30% at 30% 80%, var(--byz-color-hero-glow-2) 0%, transparent 60%);
    pointer-events: none;
    transition: background var(--byz-duration-slow) var(--byz-ease-default);
  }

  &__eyebrow {
    position: relative; display: flex; align-items: center; gap: var(--byz-space-3);
    font-size: var(--byz-text-xs); letter-spacing: 0.22em; text-transform: uppercase;
    font-weight: var(--byz-font-semibold); color: var(--byz-color-accent);
    margin-bottom: var(--byz-space-6);
    &::before, &::after { content: ''; width: 32px; height: 1px; background: rgba(232,64,80,0.4); }
  }

  &__title {
    position: relative;
    font-size: clamp(3.5rem, 10vw, 7rem);
    font-weight: var(--byz-font-bold); line-height: 0.95; letter-spacing: -0.03em;
    color: var(--byz-color-text-primary); margin-bottom: var(--byz-space-5);
    em { font-style: italic; color: var(--byz-color-accent); font-weight: 300; }
  }

  &__subtitle {
    position: relative; font-family: var(--byz-font-serif); font-size: var(--byz-text-xl);
    font-weight: 300; font-style: italic; color: var(--byz-color-text-secondary);
    margin-bottom: var(--byz-space-10); max-width: 36rem;
  }

  &__actions {
    position: relative; display: flex; gap: var(--byz-space-4); flex-wrap: wrap; justify-content: center;
  }

  &__divider {
    position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
    width: 1px; height: 60px;
    background: linear-gradient(to bottom, rgba(192,16,48,0.6), transparent);
  }
}

/* ── STATS ────────────────────────── */
.bp-stats {
  display: grid; grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid var(--byz-color-border);
  border-bottom: 1px solid var(--byz-color-border);

  &__item {
    display: flex; flex-direction: column; align-items: center; gap: var(--byz-space-2);
    padding: var(--byz-space-8) var(--byz-space-6);
    border-right: 1px solid rgba(192,16,48,0.1);
    &:last-child { border-right: none; }
  }

  &__value {
    font-family: var(--byz-font-serif); font-size: clamp(2rem, 4vw, 3rem);
    font-weight: var(--byz-font-bold); line-height: 1; color: var(--byz-color-accent);
  }

  &__label {
    font-size: var(--byz-text-xs); letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--byz-color-text-muted); font-weight: var(--byz-font-medium);
  }
}

/* ── SECTION ──────────────────────── */
.bp-section {
  padding: var(--byz-space-24) var(--byz-space-8);

  &--alt {
    background: linear-gradient(180deg, var(--byz-color-surface) 0%, transparent 100%);
    border-top: 1px solid var(--byz-color-border);
    border-bottom: 1px solid var(--byz-color-border);
  }

  &__inner { max-width: 72rem; margin: 0 auto; }

  &__header {
    max-width: 72rem; margin: 0 auto var(--byz-space-12);
  }

  &__eyebrow {
    font-size: var(--byz-text-xs); letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--byz-color-accent); font-weight: var(--byz-font-semibold); margin-bottom: var(--byz-space-3);
  }

  &__title {
    font-size: clamp(2rem, 4vw, 3.5rem); color: var(--byz-color-text-primary);
    max-width: 72rem; margin: 0 auto;
    em { font-style: italic; color: var(--byz-color-accent); font-weight: 300; }
  }
}

/* ── INSTALL ──────────────────────── */
.bp-install {
  max-width: 72rem; margin: 0 auto;
  display: flex; flex-direction: column; gap: var(--byz-space-12);

  &__step {
    display: grid; grid-template-columns: 64px 1fr; gap: var(--byz-space-8); align-items: start;
  }

  &__step-num {
    font-family: var(--byz-font-serif); font-size: 3rem; font-weight: var(--byz-font-bold);
    line-height: 1; color: var(--byz-color-accent); opacity: 0.4;
  }

  &__step-title {
    font-size: var(--byz-text-xl); color: var(--byz-color-text-primary); margin-bottom: var(--byz-space-2);
  }

  &__step-desc {
    font-size: var(--byz-text-sm); color: var(--byz-color-text-muted); margin-bottom: var(--byz-space-4);
    code { font-family: var(--byz-font-mono); color: var(--byz-color-accent); }
  }
}

/* ── CODE BLOCK ───────────────────── */
.bp-code-block {
  background: var(--byz-color-surface);
  border: 1px solid var(--byz-color-border);
  border-radius: 0.5rem;
  overflow: hidden;

  &__tabs {
    display: flex; border-bottom: 1px solid var(--byz-color-border);
    padding: 0 var(--byz-space-2);
    gap: var(--byz-space-1);
  }

  &__tab {
    font-family: var(--byz-font-mono); font-size: var(--byz-text-xs);
    padding: var(--byz-space-2) var(--byz-space-3);
    background: none; border: none; cursor: pointer;
    color: var(--byz-color-text-muted); border-bottom: 2px solid transparent;
    margin-bottom: -1px; letter-spacing: 0.04em;
    transition: color var(--byz-duration-fast) var(--byz-ease-default);

    &.is-active { color: var(--byz-color-accent); border-bottom-color: var(--byz-color-accent); }
    &:hover:not(.is-active) { color: var(--byz-color-text-secondary); }
  }

  &__body {
    padding: var(--byz-space-4) var(--byz-space-6);
    pre { margin: 0; }
    code {
      font-family: var(--byz-font-mono); font-size: var(--byz-text-sm); line-height: 1.7;
      color: var(--byz-color-text-secondary); white-space: pre; display: block;
    }
  }
}

// Syntax colors
.ct-keyword { color: #e84050; }
.ct-string   { color: #ffd6d6; }
.ct-tag      { color: #e84050; }
.ct-attr     { color: rgba(255,255,255,0.7); }

/* ── TIERS ────────────────────────── */
.bp-tiers {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--byz-space-6);
  max-width: 72rem; margin: 0 auto;
}

.bp-tier {
  &__badge {
    display: inline-block; font-size: var(--byz-text-xs); letter-spacing: 0.12em;
    text-transform: uppercase; font-weight: var(--byz-font-semibold);
    color: var(--byz-color-text-muted); margin-bottom: var(--byz-space-3);
    &--accent { color: var(--byz-color-accent); }
  }

  &--featured {
    border-color: rgba(232,64,80,0.3) !important;
    background: linear-gradient(145deg, var(--byz-color-surface) 0%, rgba(192,16,48,0.05) 100%) !important;
  }

  &__count {
    font-family: var(--byz-font-serif); font-size: 3.5rem; font-weight: var(--byz-font-bold);
    line-height: 1; color: var(--byz-color-text-primary); margin-bottom: var(--byz-space-3);
  }

  &__desc {
    font-size: var(--byz-text-sm); color: var(--byz-color-text-muted); line-height: 1.6;
    margin-bottom: var(--byz-space-6);
  }

  &__list {
    list-style: none; padding: 0; margin: 0;
    display: flex; flex-direction: column; gap: var(--byz-space-1);

    li {
      font-family: var(--byz-font-mono); font-size: var(--byz-text-xs);
      color: var(--byz-color-text-secondary); padding: var(--byz-space-1) 0;
      border-bottom: 1px solid rgba(255,255,255,0.04);
    }
  }

  &__more {
    color: var(--byz-color-accent) !important; border-bottom: none !important;
    padding-top: var(--byz-space-2) !important; cursor: pointer;
  }
}

/* ── FEATURES ─────────────────────── */
.bp-features {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--byz-space-8);
  max-width: 72rem; margin: 0 auto;
}

.bp-feature {
  &__icon {
    font-size: 1.75rem; margin-bottom: var(--byz-space-4);
    color: var(--byz-color-accent);
  }

  &__title {
    font-size: var(--byz-text-lg); font-weight: var(--byz-font-bold);
    color: var(--byz-color-text-primary); margin-bottom: var(--byz-space-3);
  }

  &__desc {
    font-size: var(--byz-text-sm); color: var(--byz-color-text-muted); line-height: 1.7;
    code { font-family: var(--byz-font-mono); color: var(--byz-color-accent); font-size: 0.875em; }
  }
}

/* ── PREVIEW GRID ─────────────────── */
.bp-preview-grid {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--byz-space-4);
  max-width: 72rem; margin: 0 auto var(--byz-space-10);
}

.bp-preview-cell {
  &__label {
    font-size: var(--byz-text-xs); letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--byz-color-text-muted); font-weight: var(--byz-font-semibold);
    margin-bottom: var(--byz-space-4);
  }
  &__row { display: flex; gap: var(--byz-space-2); flex-wrap: wrap; align-items: center; }
}

.bp-cta {
  max-width: 72rem; margin: 0 auto; text-align: center;
  a { text-decoration: none; }
}
</style>
