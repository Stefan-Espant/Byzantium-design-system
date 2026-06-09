<script setup lang="ts">
import {
  ByzButton,
  ByzInput,
  ByzAlert,
  ByzCard,
  ByzBadge,
  ByzProgress,
  ByzFooter,
  ByzDrawer,
  useTheme,
} from '@byzantium/core'
import { usePlaygroundLocale } from '~/composables/usePlaygroundLocale'

const { theme, toggle } = useTheme()
const { p } = usePlaygroundLocale()
const menuOpen = ref(false)
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
          <li><a href="/icons">Icons</a></li>
          <li><a href="/components">{{ p('navComponents') }}</a></li>
          <li><a href="/patterns">{{ p('navPatterns') }}</a></li>
          <li><a href="/grid">{{ p('navGrid') }}</a></li>
          <li><a href="/changelog">{{ p('navChangelog') }}</a></li>
        </ul>
        <div class="bp-nav__controls">
          <LanguageSelector />
          <button class="bp-nav__toggle" :aria-label="p('lightMode')" @click="toggle">
            {{ theme === 'dark' ? '☀' : '☾' }}
          </button>
          <a href="https://github.com/Stefan-Espant/Byzantium-design-system" target="_blank" rel="noopener" class="bp-nav__github">GitHub</a>
        </div>
        <button class="bp-nav__hamburger" :aria-expanded="menuOpen" aria-label="Menu" @click="menuOpen = !menuOpen">
          <span /><span /><span />
        </button>
      </nav>
    </header>

    <ByzDrawer v-model="menuOpen" side="left" title="Byzantium">
      <nav class="mobile-nav-links">
        <a href="/tokens" @click="menuOpen = false">Tokens</a>
        <a href="/icons" @click="menuOpen = false">Icons</a>
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

    <main>
    <!-- ── HERO ─────────────────────────────────── -->
    <section class="bp-hero" aria-labelledby="hero-title">
      <div class="bp-hero__glow" aria-hidden="true" />
      <div class="bp-hero__eyebrow">{{ p('heroEyebrow') }}</div>
      <h1 id="hero-title" class="bp-hero__title">{{ p('heroTitle') }}</h1>
      <p class="bp-hero__subtitle">{{ p('heroSubtitle') }}</p>
      <div class="bp-hero__actions">
        <ByzButton variant="primary" size="lg" @click="$el.querySelector('#install')?.scrollIntoView({behavior:'smooth'})">
          {{ p('heroCtaStart') }}
        </ByzButton>
        <ByzButton variant="ghost" size="lg" onclick="location.href='/components'">
          {{ p('heroCtaView') }}
        </ByzButton>
      </div>
      <div class="bp-hero__divider" aria-hidden="true" />
    </section>

    <!-- ── STATS ────────────────────────────────── -->
    <div class="bp-stats" role="list">
      <div class="bp-stats__item" role="listitem">
        <span class="bp-stats__value">36</span>
        <span class="bp-stats__label">{{ p('statComponents') }}</span>
      </div>
      <div class="bp-stats__item" role="listitem">
        <span class="bp-stats__value">60+</span>
        <span class="bp-stats__label">{{ p('statTokens') }}</span>
      </div>
      <div class="bp-stats__item" role="listitem">
        <span class="bp-stats__value">4</span>
        <span class="bp-stats__label">{{ p('statComposables') }}</span>
      </div>
      <div class="bp-stats__item" role="listitem">
        <span class="bp-stats__value">A11Y</span>
        <span class="bp-stats__label">{{ p('statA11y') }}</span>
      </div>
    </div>

    <!-- ── INSTALL ───────────────────────────────── -->
    <section id="install" class="bp-section">
      <div class="bp-section__header">
        <div class="bp-section__eyebrow">{{ p('eyebrowInstall') }}</div>
        <h2 class="bp-section__title">{{ p('installTitle') }}</h2>
      </div>

      <div class="bp-install">

        <!-- Step 1 -->
        <div class="bp-install__step">
          <div class="bp-install__step-num">01</div>
          <div class="bp-install__step-body">
            <h3 class="bp-install__step-title">{{ p('step1Title') }}</h3>
            <p class="bp-install__step-desc">{{ p('step1Desc') }}</p>

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
            <h3 class="bp-install__step-title">{{ p('step2Title') }}</h3>
            <p class="bp-install__step-desc">{{ p('step2Desc') }}</p>

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
  {{ p('codeStep') }}
<span class="ct-tag">&lt;/ByzButton&gt;</span>

<span class="ct-tag">&lt;ByzCard</span> <span class="ct-attr">padding</span>=<span class="ct-string">"md"</span> <span class="ct-attr">:elevated</span>=<span class="ct-string">"true"</span><span class="ct-tag">&gt;</span>
  {{ p('codeCard') }}
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
          <div class="bp-section__eyebrow">{{ p('eyebrowArch') }}</div>
          <h2 class="bp-section__title">{{ p('archTitle') }}</h2>
        </div>

        <div class="bp-tiers">
          <ByzCard class="bp-tier" elevated>
            <div class="bp-tier__badge">{{ p('primTitle') }}</div>
            <div class="bp-tier__count">16</div>
            <p class="bp-tier__desc">{{ p('primDesc') }}</p>
            <ul class="bp-tier__list">
              <li>ByzButton</li><li>ByzInput</li><li>ByzSelect</li>
              <li>ByzCheckbox</li><li>ByzRadio</li><li>ByzSwitch</li>
              <li>ByzBadge</li><li>ByzAvatar</li><li>ByzTag</li>
              <li class="bp-tier__more">+ 7 {{ p('moreLabel') }}</li>
            </ul>
          </ByzCard>

          <ByzCard class="bp-tier bp-tier--featured" elevated>
            <div class="bp-tier__badge bp-tier__badge--accent">{{ p('compTitle') }}</div>
            <div class="bp-tier__count">14</div>
            <p class="bp-tier__desc">{{ p('compDesc') }}</p>
            <ul class="bp-tier__list">
              <li>ByzModal</li><li>ByzDrawer</li><li>ByzTabs</li>
              <li>ByzAccordion</li><li>ByzTable</li><li>ByzStepper</li>
              <li>ByzDropdown</li><li>ByzToast</li><li>ByzPopover</li>
              <li class="bp-tier__more">+ 5 {{ p('moreLabel') }}</li>
            </ul>
          </ByzCard>

          <ByzCard class="bp-tier" elevated>
            <div class="bp-tier__badge">{{ p('patTitle') }}</div>
            <div class="bp-tier__count">6</div>
            <p class="bp-tier__desc">{{ p('patDesc') }}</p>
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
        <div class="bp-section__eyebrow">{{ p('eyebrowFeatures') }}</div>
        <h2 class="bp-section__title">{{ p('featuresTitle') }}</h2>
      </div>

      <div class="bp-features">
        <div class="bp-feature">
          <div class="bp-feature__icon">◈</div>
          <h3 class="bp-feature__title">{{ p('feat1Title') }}</h3>
          <p class="bp-feature__desc">{{ p('feat1Desc') }}</p>
        </div>
        <div class="bp-feature">
          <div class="bp-feature__icon">♿</div>
          <h3 class="bp-feature__title">Accessibility first</h3>
          <p class="bp-feature__desc">{{ p('feat2Desc') }}</p>
        </div>
        <div class="bp-feature">
          <div class="bp-feature__icon">🌙</div>
          <h3 class="bp-feature__title">Dark &amp; light mode</h3>
          <p class="bp-feature__desc">{{ p('feat3Desc') }}</p>
        </div>
        <div class="bp-feature">
          <div class="bp-feature__icon">⬡</div>
          <h3 class="bp-feature__title">TypeScript native</h3>
          <p class="bp-feature__desc">{{ p('feat4Desc') }}</p>
        </div>
        <div class="bp-feature">
          <div class="bp-feature__icon">⚡</div>
          <h3 class="bp-feature__title">Vue 3 &amp; Vite</h3>
          <p class="bp-feature__desc">{{ p('feat5Desc') }}</p>
        </div>
        <div class="bp-feature">
          <div class="bp-feature__icon">↻</div>
          <h3 class="bp-feature__title">Prefers-reduced-motion</h3>
          <p class="bp-feature__desc">{{ p('feat6Desc') }}</p>
        </div>
      </div>
    </section>

    <!-- ── COMPONENT PREVIEW ─────────────────────── -->
    <section class="bp-section bp-section--alt">
      <div class="bp-section__inner">
        <div class="bp-section__header">
          <div class="bp-section__eyebrow">{{ p('navComponents') }}</div>
          <h2 class="bp-section__title">{{ p('readyTitle') }}</h2>
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
              <ByzButton variant="primary" size="sm" :loading="true">{{ p('loadingLabel') }}</ByzButton>
            </div>
          </ByzCard>

          <ByzCard class="bp-preview-cell" elevated>
            <div class="bp-preview-cell__label">Input</div>
            <ByzInput
              v-model="inputValue"
              :label="p('emailLabel')"
              placeholder="stefan@byzantium.dev"
              :hint="p('emailHint')"
            />
          </ByzCard>

          <ByzCard class="bp-preview-cell" elevated>
            <div class="bp-preview-cell__label">Badge &amp; Progress</div>
            <div class="bp-preview-cell__row" style="margin-bottom:var(--byz-space-4)">
              <ByzBadge>Default</ByzBadge>
              <ByzBadge variant="success">Success</ByzBadge>
              <ByzBadge variant="error">Error</ByzBadge>
            </div>
            <ByzProgress :value="72" :label="p('progressLabel')" :show-value="true" size="sm" />
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
              {{ p('alertText') }}
            </ByzAlert>
            <ByzAlert v-else type="success">{{ p('alertSuccess') }}</ByzAlert>
          </ByzCard>
        </div>

        <div class="bp-cta">
          <a href="/components">
            <ByzButton variant="secondary" size="lg">{{ p('ctaViewAll') }}</ByzButton>
          </a>
        </div>
      </div>
    </section>

    </main>

    <!-- ── FOOTER ────────────────────────────────── -->
    <ByzFooter
      brand="Byzantium"
      :links="[
        { label: 'GitHub',    href: 'https://github.com/Stefan-Espant/Byzantium-design-system' },
        { label: 'Changelog', href: '/changelog' },
        { label: 'Tokens',    href: '/tokens' },
        { label: p('footerLicense'), href: 'https://github.com/Stefan-Espant/Byzantium-design-system/blob/main/LICENSE' },
      ]"
      copyright="MIT · v0.1.0"
    />

  </div>
</template>

<style lang="scss" scoped>
.bp {
  min-height: 100vh;
  overflow-x: clip;
}

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
    display: flex; gap: var(--byz-space-6); list-style: none; margin: 0; padding: 0; flex: 1; align-items: center;
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
  overflow-x: clip;

  &--alt {
    background: linear-gradient(180deg, var(--byz-color-surface) 0%, transparent 100%);
    border-top: 1px solid var(--byz-color-border);
    border-bottom: 1px solid var(--byz-color-border);
  }

  &__inner { max-width: 72rem; margin: 0 auto; }

  &__header {
    width: min(100%, 72rem);
    margin: 0 auto var(--byz-space-12);
  }

  &__eyebrow {
    font-size: var(--byz-text-xs); letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--byz-color-accent); font-weight: var(--byz-font-semibold); margin-bottom: var(--byz-space-3);
  }

  &__title {
    font-size: clamp(2rem, 4vw, 3.5rem); color: var(--byz-color-text-primary);
    max-width: 72rem; margin: 0 auto;
    line-height: 1.05;
    text-wrap: balance;
    em { font-style: italic; color: var(--byz-color-accent); font-weight: 300; }
  }
}

/* ── INSTALL ──────────────────────── */
.bp-install {
  width: min(100%, 72rem);
  max-width: 72rem;
  margin: 0 auto;
  display: flex; flex-direction: column; gap: var(--byz-space-12);

  &__step {
    display: grid; grid-template-columns: 64px minmax(0, 1fr); gap: var(--byz-space-8); align-items: start;
  }

  &__step-body {
    min-width: 0;
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
  max-width: 100%;
  background: var(--byz-color-surface);
  border: 1px solid var(--byz-color-border);
  border-radius: 0.5rem;
  overflow: clip;

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
    max-width: 100%;
    padding: var(--byz-space-4) var(--byz-space-6);
    overflow-x: auto;
    pre { margin: 0; }
    code {
      font-family: var(--byz-font-mono); font-size: var(--byz-text-sm); line-height: 1.7;
      color: var(--byz-color-text-secondary); white-space: pre; display: block;
    }
  }
}

// Syntax colors — theme-aware
.ct-keyword { color: #e84050; }
.ct-string   { color: #b84060; }
.ct-tag      { color: #e84050; }
.ct-attr     { color: var(--byz-color-text-secondary); }

:global([data-theme="light"]) {
  .ct-string { color: #a0103a; }
}

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

/* ── RESPONSIVE ───────────────────── */

// Controls row (always visible alongside brand on desktop)
.bp-nav__controls {
  display: flex; align-items: center; gap: var(--byz-space-3); margin-left: auto;
}

.bp-nav__github {
  display: inline-flex; align-items: center;
  font-size: var(--byz-text-sm); font-weight: var(--byz-font-medium);
  color: var(--byz-color-text-muted); text-decoration: none;
  padding: 0.25rem 0.75rem;
  border: 1px solid var(--byz-color-border);
  border-radius: var(--byz-radius-md, 0.375rem);
  transition: color var(--byz-duration-fast) var(--byz-ease-default), border-color var(--byz-duration-fast) var(--byz-ease-default);
  &:hover { color: var(--byz-color-text); border-color: var(--byz-color-text-muted); }
}

// Hamburger button — hidden on desktop, shown on mobile
.bp-nav__hamburger {
  display: none; flex-direction: column; justify-content: center; gap: 5px;
  background: none; border: none; cursor: pointer; padding: 6px; width: 36px; height: 36px;
  margin-left: auto; flex-shrink: 0;
  span {
    display: block; width: 20px; height: 2px;
    background: var(--byz-color-text-muted); border-radius: 2px;
    transition: transform 0.2s, opacity 0.2s;
  }
  &[aria-expanded="true"] {
    span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    span:nth-child(2) { opacity: 0; }
    span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
  }
}

@media (max-width: 1080px) {
  // Navbar — hamburger layout
  .bp-nav__inner { flex-wrap: wrap; gap: 0; padding: 0 var(--byz-space-4); }
  .bp-nav__links { display: none; }
  .bp-nav__controls { display: none; }
  .bp-nav__hamburger { display: flex; }

  // Hero
  .bp-hero {
    min-height: 70vh;
    padding: var(--byz-space-16) var(--byz-space-4);
    &__actions { flex-direction: column; align-items: center; }
  }

  // Stats — 2×2
  .bp-stats { grid-template-columns: repeat(2, 1fr); }

  // Sections
  .bp-section { padding: var(--byz-space-8) var(--byz-space-4); }

  // Install step — remove number column
  .bp-install__step { grid-template-columns: 1fr; }
  .bp-install__step-num { font-size: 2rem; }

  // Architecture tiers — stacked
  .bp-tiers { grid-template-columns: 1fr; max-width: 32rem; }

  // Features — stacked below 600px, 2-col above
  .bp-features { grid-template-columns: 1fr; gap: var(--byz-space-6); }

  // Preview grid — stacked
  .bp-preview-grid { grid-template-columns: 1fr; }

  // Code blocks — scroll horizontally, tighter padding
  .bp-code-block__body { padding: var(--byz-space-4); }
}

@media (min-width: 600px) and (max-width: 1080px) {
  .bp-features { grid-template-columns: repeat(2, 1fr); }
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
