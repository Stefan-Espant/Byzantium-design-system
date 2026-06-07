<script setup lang="ts">
import {
  ByzButton,
  ByzInput,
  ByzAlert,
  ByzCard,
} from '@byzantium/core'
import { useTheme } from '@byzantium/core'

const { theme, toggle } = useTheme()
const inputValue = ref('')
const showAlert  = ref(true)
</script>

<template>
  <div class="byz-page">

    <!-- NAVBAR -->
    <header class="byz-nav">
      <nav class="byz-nav__inner" aria-label="Hoofdnavigatie">
        <span class="byz-nav__brand">Byzantium</span>
        <ul class="byz-nav__links" role="list">
          <li><a href="/tokens">Tokens</a></li>
          <li><a href="/components">Components</a></li>
          <li><a href="/patterns">Patronen</a></li>
        </ul>
        <button class="byz-nav__theme-toggle" :aria-label="theme === 'dark' ? 'Schakel naar licht' : 'Schakel naar donker'" @click="toggle">
          {{ theme === 'dark' ? '☀' : '☾' }}
        </button>
        <ByzButton variant="ghost" size="sm" aria-label="GitHub">GitHub</ByzButton>
      </nav>
    </header>

    <!-- HERO -->
    <section class="byz-hero" aria-labelledby="hero-title">
      <div class="byz-hero__glow" aria-hidden="true" />
      <div class="byz-hero__eyebrow">Design System</div>
      <h1 id="hero-title" class="byz-hero__title">
        Built to<br><em>endure.</em>
      </h1>
      <p class="byz-hero__subtitle">
        Toegankelijk van nature. Één bron van waarheid<br>voor alles wat visueel is.
      </p>
      <div class="byz-hero__actions">
        <ByzButton variant="primary" size="lg">Aan de slag</ByzButton>
        <ByzButton variant="ghost" size="lg">Bekijk componenten</ByzButton>
      </div>
      <div class="byz-hero__divider" aria-hidden="true" />
    </section>

    <!-- STATS -->
    <div class="byz-stats" role="list">
      <div class="byz-stats__item" role="listitem">
        <span class="byz-stats__value">32+</span>
        <span class="byz-stats__label">Design tokens</span>
      </div>
      <div class="byz-stats__item" role="listitem">
        <span class="byz-stats__value">8</span>
        <span class="byz-stats__label">Componenten</span>
      </div>
      <div class="byz-stats__item" role="listitem">
        <span class="byz-stats__value">4</span>
        <span class="byz-stats__label">Composables</span>
      </div>
      <div class="byz-stats__item" role="listitem">
        <span class="byz-stats__value">A11Y</span>
        <span class="byz-stats__label">Accessibility first</span>
      </div>
    </div>

    <!-- COMPONENTS SECTION -->
    <section id="components" class="byz-section">
      <div class="byz-section__header">
        <div class="byz-section__eyebrow">Componenten</div>
        <h2 class="byz-section__title">Alles wat je<br>nodig <em>hebt.</em></h2>
      </div>

      <div class="byz-showcase">

        <ByzCard class="byz-showcase__cell" elevated>
          <div class="byz-showcase__cell-label">Button</div>
          <div class="byz-showcase__row">
            <ByzButton variant="primary" size="sm">Primary</ByzButton>
            <ByzButton variant="secondary" size="sm">Secondary</ByzButton>
          </div>
          <div class="byz-showcase__row">
            <ByzButton variant="ghost" size="sm">Ghost</ByzButton>
            <ByzButton variant="danger" size="sm">Danger</ByzButton>
          </div>
        </ByzCard>

        <ByzCard class="byz-showcase__cell" elevated>
          <div class="byz-showcase__cell-label">Input</div>
          <ByzInput
            v-model="inputValue"
            label="E-mailadres"
            placeholder="stefan@byzantium.dev"
            hint="Gebruik een geldig e-mailadres"
            required
          />
        </ByzCard>

        <ByzCard class="byz-showcase__cell" elevated>
          <div class="byz-showcase__cell-label">Alert</div>
          <ByzAlert
            v-if="showAlert"
            type="info"
            title="Byzantium v0.1.0"
            dismissible
            @dismiss="showAlert = false"
          >
            Het design system is klaar om te gebruiken.
          </ByzAlert>
          <ByzAlert type="success">
            Opgeslagen — wijzigingen zijn bewaard.
          </ByzAlert>
        </ByzCard>

      </div>
    </section>

    <!-- FOOTER -->
    <footer class="byz-footer">
      <span class="byz-footer__brand">Byzantium</span>
      <div class="byz-footer__links">
        <a href="#">GitHub</a>
        <a href="#">Changelog</a>
        <a href="#">Licentie</a>
      </div>
      <span class="byz-footer__copy">MIT · v0.1.0</span>
    </footer>

  </div>
</template>

<style lang="scss" scoped>
.byz-page {
  min-height: 100vh;
}

/* ── NAVBAR ───────────────────────── */
.byz-nav {
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--byz-color-nav-bg);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--byz-color-border);
  transition: background var(--byz-duration-normal) var(--byz-ease-default);

  &__inner {
    display: flex;
    align-items: center;
    gap: var(--byz-space-8);
    max-width: 72rem;
    margin: 0 auto;
    padding: 0 var(--byz-space-8);
    min-height: 60px;
  }

  &__brand {
    font-family: var(--byz-font-serif);
    font-size: var(--byz-text-xl);
    font-weight: var(--byz-font-bold);
    letter-spacing: 0.03em;
    color: var(--byz-color-text-primary);
  }

  &__theme-toggle {
    background: none;
    border: 1px solid var(--byz-color-border);
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--byz-color-text-muted);
    font-size: 14px;
    transition:
      color var(--byz-duration-fast) var(--byz-ease-default),
      border-color var(--byz-duration-fast) var(--byz-ease-default);

    &:hover {
      color: var(--byz-color-accent);
      border-color: var(--byz-color-accent);
    }
  }

  &__links {
    display: flex;
    gap: var(--byz-space-6);
    list-style: none;
    margin: 0;
    padding: 0;
    flex: 1;

    a {
      font-size: var(--byz-text-xs);
      letter-spacing: 0.1em;
      text-transform: uppercase;
      font-weight: var(--byz-font-medium);
      color: var(--byz-color-text-muted);
      text-decoration: none;
      transition: color var(--byz-duration-fast) var(--byz-ease-default);

      &:hover { color: var(--byz-color-text-secondary); }
    }
  }
}

/* ── HERO ─────────────────────────── */
.byz-hero {
  position: relative;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--byz-space-20) var(--byz-space-8);
  overflow: hidden;

  &__glow {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 50% 40%, var(--byz-color-hero-glow-1) 0%, transparent 70%),
      radial-gradient(ellipse 40% 30% at 30% 80%, var(--byz-color-hero-glow-2) 0%, transparent 60%);
    pointer-events: none;
    transition: background var(--byz-duration-slow) var(--byz-ease-default);
  }

  &__eyebrow {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--byz-space-3);
    font-size: var(--byz-text-xs);
    letter-spacing: 0.22em;
    text-transform: uppercase;
    font-weight: var(--byz-font-semibold);
    color: var(--byz-color-accent);
    margin-bottom: var(--byz-space-6);

    &::before,
    &::after {
      content: '';
      width: 32px;
      height: 1px;
      background: rgba(232, 64, 80, 0.4);
    }
  }

  &__title {
    position: relative;
    font-size: clamp(3.5rem, 10vw, 7rem);
    font-weight: var(--byz-font-bold);
    line-height: 0.95;
    letter-spacing: -0.03em;
    color: var(--byz-color-text-primary);
    margin-bottom: var(--byz-space-5);

    em {
      font-style: italic;
      color: var(--byz-color-accent);
      font-weight: 300;
    }
  }

  &__subtitle {
    position: relative;
    font-family: var(--byz-font-serif);
    font-size: var(--byz-text-xl);
    font-weight: 300;
    font-style: italic;
    color: var(--byz-color-text-secondary);
    margin-bottom: var(--byz-space-10);
    max-width: 36rem;
  }

  &__actions {
    position: relative;
    display: flex;
    gap: var(--byz-space-4);
    flex-wrap: wrap;
    justify-content: center;
  }

  &__divider {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    height: 60px;
    background: linear-gradient(to bottom, rgba(192, 16, 48, 0.6), transparent);
  }
}

/* ── STATS ────────────────────────── */
.byz-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid var(--byz-color-border);
  border-bottom: 1px solid var(--byz-color-border);

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--byz-space-2);
    padding: var(--byz-space-8) var(--byz-space-6);
    border-right: 1px solid rgba(192, 16, 48, 0.1);

    &:last-child { border-right: none; }
  }

  &__value {
    font-family: var(--byz-font-serif);
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: var(--byz-font-bold);
    line-height: 1;
    color: var(--byz-color-accent);
  }

  &__label {
    font-size: var(--byz-text-xs);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--byz-color-text-muted);
    font-weight: var(--byz-font-medium);
  }
}

/* ── SECTION ──────────────────────── */
.byz-section {
  max-width: 72rem;
  margin: 0 auto;
  padding: var(--byz-space-20) var(--byz-space-8);

  &__header { margin-bottom: var(--byz-space-12); }

  &__eyebrow {
    font-size: var(--byz-text-xs);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--byz-color-accent);
    font-weight: var(--byz-font-semibold);
    margin-bottom: var(--byz-space-3);
  }

  &__title {
    font-size: clamp(2rem, 4vw, 3.5rem);
    color: var(--byz-color-text-primary);

    em {
      font-style: italic;
      color: var(--byz-color-accent);
      font-weight: 300;
    }
  }
}

/* ── SHOWCASE ─────────────────────── */
.byz-showcase {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--byz-space-4);

  &__cell-label {
    font-size: var(--byz-text-xs);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--byz-color-text-muted);
    font-weight: var(--byz-font-semibold);
    margin-bottom: var(--byz-space-4);
  }

  &__row {
    display: flex;
    gap: var(--byz-space-2);
    flex-wrap: wrap;
    margin-bottom: var(--byz-space-2);
  }
}

/* ── FOOTER ───────────────────────── */
.byz-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--byz-space-10) var(--byz-space-8);
  border-top: 1px solid var(--byz-color-border);
  max-width: 72rem;
  margin: 0 auto;

  &__brand {
    font-family: var(--byz-font-serif);
    font-size: var(--byz-text-lg);
    font-weight: var(--byz-font-bold);
    color: var(--byz-color-text-muted);
  }

  &__links {
    display: flex;
    gap: var(--byz-space-6);

    a {
      font-size: var(--byz-text-xs);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--byz-color-text-muted);
      text-decoration: none;
      transition: color var(--byz-duration-fast) var(--byz-ease-default);

      &:hover { color: var(--byz-color-text-secondary); }
    }
  }

  &__copy {
    font-size: var(--byz-text-xs);
    color: var(--byz-color-text-muted);
  }
}
</style>
