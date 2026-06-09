<script setup lang="ts">
import { useTheme, ByzDrawer } from '@byzantium/core'
import { usePlaygroundLocale } from '~/composables/usePlaygroundLocale'

const { theme, toggle } = useTheme()
const { p } = usePlaygroundLocale()
const menuOpen = ref(false)

// Motion demo state — each key holds whether the indicator is in the "active" position
const motionActive = ref<Record<string, boolean>>({})
function triggerMotion(key: string) {
  motionActive.value[key] = !motionActive.value[key]
}

const brandColors = [
  { name: 'brand-50',  hex: '#fff0f0' },
  { name: 'brand-100', hex: '#ffd6d6' },
  { name: 'brand-200', hex: '#ffaaaa' },
  { name: 'brand-300', hex: '#ff7070' },
  { name: 'brand-400', hex: '#e84050' },
  { name: 'brand-500', hex: '#c01030' },
  { name: 'brand-600', hex: '#9a0020' },
  { name: 'brand-700', hex: '#720018' },
  { name: 'brand-800', hex: '#480010' },
  { name: 'brand-900', hex: '#1a0508' },
]

const semanticColors = [
  { name: 'success', hex: '#16a34a' },
  { name: 'warning', hex: '#d97706' },
  { name: 'error',   hex: '#dc2626' },
  { name: 'info',    hex: '#2563eb' },
]

const spacingTokens = [
  { name: 'space-1',  value: '0.25rem', rem: 0.25 },
  { name: 'space-2',  value: '0.5rem',  rem: 0.5  },
  { name: 'space-3',  value: '0.75rem', rem: 0.75 },
  { name: 'space-4',  value: '1rem',    rem: 1    },
  { name: 'space-5',  value: '1.25rem', rem: 1.25 },
  { name: 'space-6',  value: '1.5rem',  rem: 1.5  },
  { name: 'space-8',  value: '2rem',    rem: 2    },
  { name: 'space-10', value: '2.5rem',  rem: 2.5  },
  { name: 'space-12', value: '3rem',    rem: 3    },
  { name: 'space-16', value: '4rem',    rem: 4    },
  { name: 'space-20', value: '5rem',    rem: 5    },
  { name: 'space-24', value: '6rem',    rem: 6    },
]

const textSizes = [
  { name: 'xs',  label: 'text-xs',  clamp: '0.75rem' },
  { name: 'sm',  label: 'text-sm',  clamp: '0.875rem' },
  { name: 'base',label: 'text-base',clamp: '1rem' },
  { name: 'lg',  label: 'text-lg',  clamp: '1.125rem' },
  { name: 'xl',  label: 'text-xl',  clamp: '1.25rem' },
  { name: '2xl', label: 'text-2xl', clamp: '1.5rem' },
  { name: '3xl', label: 'text-3xl', clamp: '1.875rem' },
  { name: '4xl', label: 'text-4xl', clamp: '2.25rem' },
]

const motionTokens = [
  { name: 'duration-fast',   label: 'duration-fast',   value: '100ms' },
  { name: 'duration-normal', label: 'duration-normal', value: '200ms' },
  { name: 'duration-slow',   label: 'duration-slow',   value: '300ms' },
  { name: 'duration-slower', label: 'duration-slower', value: '500ms' },
]

const easingCurves = [
  { name: 'ease-default', value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  { name: 'ease-in',      value: 'cubic-bezier(0.4, 0, 1, 1)' },
  { name: 'ease-out',     value: 'cubic-bezier(0, 0, 0.2, 1)' },
  { name: 'ease-bounce',  value: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
]

const shadowTokens = [
  { name: 'shadow-sm', label: 'sm',  css: '0 1px 2px 0 rgb(0 0 0 / 0.25)' },
  { name: 'shadow-md', label: 'md',  css: '0 4px 6px -1px rgb(0 0 0 / 0.35), 0 2px 4px -2px rgb(0 0 0 / 0.25)' },
  { name: 'shadow-lg', label: 'lg',  css: '0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.3)' },
  { name: 'shadow-xl', label: 'xl',  css: '0 20px 25px -5px rgb(0 0 0 / 0.45), 0 8px 10px -6px rgb(0 0 0 / 0.35)' },
]

const zIndexTokens = [
  { name: 'z-base',     value: 0    },
  { name: 'z-raised',   value: 10   },
  { name: 'z-dropdown', value: 1000 },
  { name: 'z-sticky',   value: 1020 },
  { name: 'z-overlay',  value: 1030 },
  { name: 'z-modal',    value: 1100 },
  { name: 'z-toast',    value: 1200 },
  { name: 'z-tooltip',  value: 1453 },
]

// Scale bar max width in px for spacing visualisation (space-24 = 6rem = max)
const SPACING_MAX_PX = 320
function barWidth(rem: number): string {
  return `${(rem / 6) * SPACING_MAX_PX}px`
}
</script>

<template>
  <div class="tk-page">

    <!-- HEADER -->
    <header class="cp-header">
      <nav class="cp-header__inner">
        <a href="/" class="cp-header__brand">Byzantium</a>
        <span class="cp-header__title">{{ p('tokensPageTitle') }}</span>
        <div class="cp-header__controls">
          <LanguageSelector />
          <button class="cp-header__toggle" :aria-label="p('lightMode')" @click="toggle">
            {{ theme === 'dark' ? '☀' : '☾' }}
          </button>
          <a href="/" class="cp-header__back">{{ p('navBack') }}</a>
        </div>
        <button
          class="cp-header__hamburger"
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
        <a href="/forms" @click="menuOpen = false">{{ p('navForms') }}</a>
        <a href="/typography" @click="menuOpen = false">{{ p('navTypography') }}</a>
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

    <main class="cp-main">

      <!-- 1. KLEUR -->
      <section class="cp-section">
        <h2 class="cp-section__title">{{ p('colorSection') }}</h2>

        <div class="cp-group">
          <h3 class="cp-group__title">{{ p('brandScale') }}</h3>
          <div class="tk-swatches">
            <div v-for="c in brandColors" :key="c.name" class="tk-swatch">
              <div class="tk-swatch__color" :style="{ background: c.hex }" />
              <span class="tk-swatch__name">{{ c.name }}</span>
              <span class="tk-swatch__hex">{{ c.hex }}</span>
            </div>
          </div>
        </div>

        <div class="cp-group">
          <h3 class="cp-group__title">{{ p('semantic') }}</h3>
          <div class="tk-swatches">
            <div v-for="c in semanticColors" :key="c.name" class="tk-swatch">
              <div class="tk-swatch__color" :style="{ background: c.hex }" />
              <span class="tk-swatch__name">{{ c.name }}</span>
              <span class="tk-swatch__hex">{{ c.hex }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. SPACING -->
      <section class="cp-section">
        <h2 class="cp-section__title">{{ p('spacingSection') }}</h2>
        <div class="tk-spacing-list">
          <div v-for="s in spacingTokens" :key="s.name" class="tk-spacing-row">
            <span class="tk-spacing-label">{{ s.name }}</span>
            <div class="tk-spacing-track">
              <div class="tk-spacing-bar" :style="{ width: barWidth(s.rem) }" />
            </div>
            <span class="tk-spacing-value">{{ s.value }}</span>
          </div>
        </div>
      </section>

      <!-- 3. TYPOGRAFIE -->
      <section class="cp-section">
        <h2 class="cp-section__title">{{ p('typoSection') }}</h2>

        <div class="cp-group">
          <h3 class="cp-group__title">{{ p('fontSizes') }}</h3>
          <div class="tk-type-list">
            <div v-for="t in textSizes" :key="t.name" class="tk-type-row">
              <span
                class="tk-type-sample"
                :style="{ fontSize: `var(--byz-text-${t.name})` }"
              >Byzantium Design System</span>
              <span class="tk-type-meta">
                <code>--byz-text-{{ t.name }}</code>
                <span class="tk-type-clamp">{{ t.clamp }}</span>
              </span>
            </div>
          </div>
        </div>

        <div class="cp-group">
          <h3 class="cp-group__title">{{ p('fontFamilies') }}</h3>
          <div class="tk-font-families">
            <div class="tk-font-row">
              <span class="tk-font-sample tk-font-sample--serif">Cormorant Garamond</span>
              <code class="tk-font-token">--byz-font-serif</code>
            </div>
            <div class="tk-font-row">
              <span class="tk-font-sample tk-font-sample--sans">Syne</span>
              <code class="tk-font-token">--byz-font-sans</code>
            </div>
            <div class="tk-font-row">
              <span class="tk-font-sample tk-font-sample--mono">Fira Code</span>
              <code class="tk-font-token">--byz-font-mono</code>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. MOTION -->
      <section class="cp-section">
        <h2 class="cp-section__title">{{ p('motionSection') }}</h2>

        <div class="cp-group">
          <h3 class="cp-group__title">Durations</h3>
          <div class="tk-motion-list">
            <div v-for="m in motionTokens" :key="m.name" class="tk-motion-row">
              <span class="tk-motion-label">{{ m.label }}</span>
              <span class="tk-motion-value">{{ m.value }}</span>
              <button
                class="tk-motion-btn"
                :class="{ 'is-active': motionActive[m.name] }"
                :style="{ '--motion-dur': m.value }"
                @click="triggerMotion(m.name)"
              >
                <span class="tk-motion-dot" />
              </button>
              <span class="tk-motion-hint">Klik om te voelen</span>
            </div>
          </div>
        </div>

        <div class="cp-group">
          <h3 class="cp-group__title">Easing curves</h3>
          <div class="tk-easing-list">
            <div v-for="e in easingCurves" :key="e.name" class="tk-easing-row">
              <code class="tk-easing-name">{{ e.name }}</code>
              <code class="tk-easing-value">{{ e.value }}</code>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. SCHADUWEN -->
      <section class="cp-section">
        <h2 class="cp-section__title">{{ p('shadowSection') }}</h2>
        <div class="tk-shadow-grid">
          <div v-for="s in shadowTokens" :key="s.name" class="tk-shadow-card" :style="{ boxShadow: s.css }">
            <span class="tk-shadow-label">{{ s.name }}</span>
          </div>
        </div>
      </section>

      <!-- 6. Z-INDEX -->
      <section class="cp-section">
        <h2 class="cp-section__title">{{ p('zindexSection') }}</h2>
        <div class="tk-zindex-table">
          <div class="tk-zindex-header">
            <span>Token</span>
            <span>Waarde</span>
          </div>
          <div v-for="z in zIndexTokens" :key="z.name" class="tk-zindex-row">
            <code>{{ z.name }}</code>
            <span class="tk-zindex-value">{{ z.value }}</span>
          </div>
        </div>
      </section>

    </main>
  </div>
</template>

<style lang="scss" scoped>
.tk-page { min-height: 100vh; display: flex; flex-direction: column; }

/* ─── Header (mirrors components.vue) ─────────────────────────────────────── */
.cp-header {
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

/* ─── Main layout ──────────────────────────────────────────────────────────── */
.cp-main {
  flex: 1; max-width: 72rem; margin: 0 auto; width: 100%;
  padding: var(--byz-space-12) var(--byz-space-8) var(--byz-space-20);
  display: flex; flex-direction: column; gap: var(--byz-space-1);
}

.cp-section {
  padding: var(--byz-space-10) 0;
  border-bottom: 1px solid var(--byz-color-border);
  &:last-child { border-bottom: none; }

  &__title {
    font-family: var(--byz-font-serif);
    font-size: var(--byz-text-3xl); color: var(--byz-color-text-primary);
    margin-bottom: var(--byz-space-8);
    &::after {
      content: ''; display: block; width: 32px; height: 2px;
      background: var(--byz-color-accent); margin-top: var(--byz-space-3); border-radius: 1px;
    }
  }
}

.cp-group { margin-bottom: var(--byz-space-8); &:last-child { margin-bottom: 0; } }
.cp-group__title {
  font-size: var(--byz-text-xs); letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--byz-color-text-muted); font-weight: var(--byz-font-semibold);
  margin-bottom: var(--byz-space-4);
}

/* ─── 1. Color swatches ────────────────────────────────────────────────────── */
.tk-swatches {
  display: flex; flex-wrap: wrap; gap: var(--byz-space-3);
}

.tk-swatch {
  display: flex; flex-direction: column; align-items: center; gap: var(--byz-space-2);

  &__color {
    width: 56px; height: 56px; border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.08);
    box-shadow: 0 1px 3px rgb(0 0 0 / 0.3);
  }
  &__name {
    font-size: 10px; color: var(--byz-color-text-muted);
    font-family: var(--byz-font-mono);
  }
  &__hex {
    font-size: 9px; color: var(--byz-color-text-muted);
    font-family: var(--byz-font-mono); opacity: 0.7;
  }
}

/* ─── 2. Spacing ───────────────────────────────────────────────────────────── */
.tk-spacing-list { display: flex; flex-direction: column; gap: var(--byz-space-3); }

.tk-spacing-row {
  display: flex; align-items: center; gap: var(--byz-space-4);
}

.tk-spacing-label {
  width: 80px; flex-shrink: 0;
  font-size: var(--byz-text-xs); font-family: var(--byz-font-mono);
  color: var(--byz-color-text-muted);
}

.tk-spacing-track {
  flex: 1; max-width: 320px; height: 8px;
  background: var(--byz-color-surface-raised, rgba(255,255,255,0.05));
  border-radius: 4px; overflow: hidden;
}

.tk-spacing-bar {
  height: 100%; border-radius: 4px;
  background: linear-gradient(90deg, #c01030, #e84050);
  min-width: 3px;
}

.tk-spacing-value {
  width: 56px; flex-shrink: 0;
  font-size: var(--byz-text-xs); font-family: var(--byz-font-mono);
  color: var(--byz-color-text-secondary, var(--byz-color-text-muted));
  text-align: right;
}

/* ─── 3. Typography ────────────────────────────────────────────────────────── */
.tk-type-list { display: flex; flex-direction: column; gap: var(--byz-space-4); }

.tk-type-row {
  display: flex; align-items: baseline; gap: var(--byz-space-6);
  padding-bottom: var(--byz-space-4);
  border-bottom: 1px solid var(--byz-color-border);
  &:last-child { border-bottom: none; }
}

.tk-type-sample {
  flex: 1; color: var(--byz-color-text-primary); line-height: 1.2;
  font-family: var(--byz-font-sans);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}

.tk-type-meta {
  display: flex; flex-direction: column; align-items: flex-end; gap: 2px;
  flex-shrink: 0;

  code {
    font-size: 11px; font-family: var(--byz-font-mono);
    color: var(--byz-color-accent);
  }
}

.tk-type-clamp {
  font-size: 10px; font-family: var(--byz-font-mono);
  color: var(--byz-color-text-muted);
}

.tk-font-families { display: flex; flex-direction: column; gap: var(--byz-space-4); }

.tk-font-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: var(--byz-space-4) var(--byz-space-6);
  background: var(--byz-color-surface-raised, rgba(255,255,255,0.03));
  border: 1px solid var(--byz-color-border);
  border-radius: 8px;
}

.tk-font-sample {
  font-size: var(--byz-text-xl); color: var(--byz-color-text-primary);

  &--serif { font-family: 'Cormorant Garamond', serif; }
  &--sans  { font-family: 'Syne', sans-serif; }
  &--mono  { font-family: 'Fira Code', monospace; }
}

.tk-font-token {
  font-size: 11px; font-family: var(--byz-font-mono);
  color: var(--byz-color-accent);
}

/* ─── 4. Motion ────────────────────────────────────────────────────────────── */
.tk-motion-list { display: flex; flex-direction: column; gap: var(--byz-space-4); }

.tk-motion-row {
  display: flex; align-items: center; gap: var(--byz-space-6);
}

.tk-motion-label {
  width: 140px; flex-shrink: 0;
  font-size: var(--byz-text-xs); font-family: var(--byz-font-mono);
  color: var(--byz-color-text-muted);
}

.tk-motion-value {
  width: 56px; flex-shrink: 0;
  font-size: var(--byz-text-xs); font-family: var(--byz-font-mono);
  color: var(--byz-color-text-secondary, var(--byz-color-text-muted));
}

.tk-motion-btn {
  width: 80px; height: 24px; border-radius: 12px;
  background: var(--byz-color-surface-raised, rgba(255,255,255,0.06));
  border: 1px solid var(--byz-color-border);
  cursor: pointer; position: relative; padding: 0;
  flex-shrink: 0;

  .tk-motion-dot {
    position: absolute; top: 3px; left: 4px;
    width: 16px; height: 16px; border-radius: 50%;
    background: linear-gradient(135deg, #c01030, #e84050);
    transition: transform var(--motion-dur, 200ms) cubic-bezier(0.4, 0, 0.2, 1);
  }

  &.is-active .tk-motion-dot {
    transform: translateX(56px);
  }
}

.tk-motion-hint {
  font-size: 10px; color: var(--byz-color-text-muted); opacity: 0.6;
}

.tk-easing-list { display: flex; flex-direction: column; gap: var(--byz-space-3); }

.tk-easing-row {
  display: flex; align-items: center; gap: var(--byz-space-6);
  padding: var(--byz-space-3) var(--byz-space-4);
  background: var(--byz-color-surface-raised, rgba(255,255,255,0.03));
  border: 1px solid var(--byz-color-border);
  border-radius: 6px;
}

.tk-easing-name {
  width: 140px; flex-shrink: 0;
  font-size: 12px; font-family: var(--byz-font-mono);
  color: var(--byz-color-accent);
}

.tk-easing-value {
  font-size: 11px; font-family: var(--byz-font-mono);
  color: var(--byz-color-text-muted);
}

/* ─── 5. Shadows ───────────────────────────────────────────────────────────── */
.tk-shadow-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--byz-space-8);

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.tk-shadow-card {
  aspect-ratio: 1;
  background: var(--byz-color-surface-raised, #1e1a1d);
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
}

.tk-shadow-label {
  font-size: var(--byz-text-xs); font-family: var(--byz-font-mono);
  color: var(--byz-color-text-muted);
}

/* ─── 6. Z-index ───────────────────────────────────────────────────────────── */
.tk-zindex-table {
  border: 1px solid var(--byz-color-border);
  border-radius: 8px;
  overflow: hidden;
  max-width: 400px;
}

.tk-zindex-header {
  display: grid; grid-template-columns: 1fr auto;
  padding: var(--byz-space-3) var(--byz-space-5);
  background: var(--byz-color-surface-raised, rgba(255,255,255,0.05));
  border-bottom: 1px solid var(--byz-color-border);
  font-size: var(--byz-text-xs); letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--byz-color-text-muted); font-weight: 600;
}

.tk-zindex-row {
  display: grid; grid-template-columns: 1fr auto;
  padding: var(--byz-space-3) var(--byz-space-5);
  border-bottom: 1px solid var(--byz-color-border);
  align-items: center;
  &:last-child { border-bottom: none; }

  code {
    font-size: 13px; font-family: var(--byz-font-mono);
    color: var(--byz-color-accent);
  }
}

.tk-zindex-value {
  font-size: 13px; font-family: var(--byz-font-mono);
  color: var(--byz-color-text-muted);
}

/* ─── Hamburger / controls ─────────────────────────────────────────────────── */
.cp-header__controls {
  display: flex; align-items: center; gap: var(--byz-space-4);
}

.cp-header__hamburger {
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
  .cp-header__inner { padding: 0 var(--byz-space-4); flex-wrap: wrap; }
  .cp-header__title { display: none; }
  .cp-header__controls { display: none; }
  .cp-header__hamburger { display: flex; }

  .cp-main { padding: var(--byz-space-8) var(--byz-space-4) var(--byz-space-16); }

  .tk-motion-row { flex-wrap: wrap; }
  .tk-motion-label { width: auto; flex: 1; }
  .tk-motion-hint { display: none; }

  .tk-easing-row { flex-direction: column; gap: var(--byz-space-1); }
  .tk-easing-name { width: auto; }

  .tk-type-row { flex-direction: column; align-items: flex-start; gap: var(--byz-space-2); }
  .tk-type-sample { white-space: normal; overflow: visible; }
  .tk-type-meta { align-items: flex-start; }

  .tk-zindex-table { max-width: 100%; }
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
