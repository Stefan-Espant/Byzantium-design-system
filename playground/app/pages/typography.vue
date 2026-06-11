<script setup lang="ts">
import { ByzFooter } from '@byzantium-design-system/core'
import { usePlaygroundLocale } from '~/composables/usePlaygroundLocale'

const { p } = usePlaygroundLocale()

const typeScales = [
  { name: 'text-xs',   token: '--byz-text-xs',   clamp: '0.75rem → 0.875rem',  sample: 'Kleine bijschriften, labels, metadata' },
  { name: 'text-sm',   token: '--byz-text-sm',   clamp: '0.875rem → 1rem',     sample: 'Secundaire tekst, hints, captions' },
  { name: 'text-base', token: '--byz-text-base',  clamp: '1rem → 1.125rem',     sample: 'Hoofdtekst — leesbaar en rustig' },
  { name: 'text-lg',   token: '--byz-text-lg',   clamp: '1.125rem → 1.25rem',  sample: 'Iets grotere body tekst, introductie' },
  { name: 'text-xl',   token: '--byz-text-xl',   clamp: '1.25rem → 1.5rem',    sample: 'Kleine koppen, card titels' },
  { name: 'text-2xl',  token: '--byz-text-2xl',  clamp: '1.5rem → 2rem',       sample: 'Sectiekoppen, prominent' },
  { name: 'text-3xl',  token: '--byz-text-3xl',  clamp: '1.875rem → 2.5rem',   sample: 'Paginatitels, krachtige koppen' },
  { name: 'text-4xl',  token: '--byz-text-4xl',  clamp: '2.25rem → 3rem',      sample: 'Hero headlines' },
]

const fontWeights = [
  { label: 'Normal',   token: '--byz-font-normal',   value: '400' },
  { label: 'Medium',   token: '--byz-font-medium',   value: '500' },
  { label: 'Semibold', token: '--byz-font-semibold', value: '600' },
  { label: 'Bold',     token: '--byz-font-bold',     value: '700' },
]

const leadings = [
  { label: 'Tight',   token: '--byz-leading-tight',   value: '1.05', sample: 'Koppen en display tekst profiteren van strakke regelafstand. Byzantium gebruikt dit voor alle heading-elementen.' },
  { label: 'Normal',  token: '--byz-leading-normal',  value: '1.5',  sample: 'Standaard regelafstand voor body text. Prettig leesbaar op alle schermformaten zonder te veel witruimte.' },
  { label: 'Relaxed', token: '--byz-leading-relaxed', value: '1.625', sample: 'Ruime regelafstand voor langere teksten. Wordt gebruikt in artikelen, documentatie en instructieteksten.' },
]
</script>

<template>
  <div class="ty-page">

    <PlaygroundHeader />

    <main class="ty-main">

      <!-- Lettertypes -->
      <section class="ty-section">
        <h2 class="ty-section__title">Lettertypes</h2>
        <div class="ty-fonts">
          <div class="ty-font-card">
            <div class="ty-font-card__meta">
              <span class="ty-font-card__label">Sans-serif</span>
              <code class="ty-font-card__token">--byz-font-sans</code>
            </div>
            <p class="ty-font-card__name" style="font-family: var(--byz-font-sans)">Syne</p>
            <p class="ty-font-card__specimen ty-font-card__specimen--sans">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>
              abcdefghijklmnopqrstuvwxyz<br>
              0123456789 !@#$%^&*()
            </p>
          </div>
          <div class="ty-font-card">
            <div class="ty-font-card__meta">
              <span class="ty-font-card__label">Serif</span>
              <code class="ty-font-card__token">--byz-font-serif</code>
            </div>
            <p class="ty-font-card__name" style="font-family: var(--byz-font-serif)">Cormorant Garamond</p>
            <p class="ty-font-card__specimen ty-font-card__specimen--serif">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>
              abcdefghijklmnopqrstuvwxyz<br>
              0123456789 !@#$%^&*()
            </p>
          </div>
          <div class="ty-font-card">
            <div class="ty-font-card__meta">
              <span class="ty-font-card__label">Mono</span>
              <code class="ty-font-card__token">--byz-font-mono</code>
            </div>
            <p class="ty-font-card__name" style="font-family: var(--byz-font-mono)">Source Code Pro</p>
            <p class="ty-font-card__specimen ty-font-card__specimen--mono">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>
              abcdefghijklmnopqrstuvwxyz<br>
              0123456789 !@#$%^&*()
            </p>
          </div>
        </div>
      </section>

      <!-- Schaalgrootten -->
      <section class="ty-section">
        <h2 class="ty-section__title">Schaalgrootten</h2>
        <div class="ty-scale">
          <div v-for="scale in typeScales" :key="scale.name" class="ty-scale-row">
            <div class="ty-scale-row__meta">
              <code class="ty-scale-row__name">{{ scale.name }}</code>
              <span class="ty-scale-row__clamp">{{ scale.clamp }}</span>
            </div>
            <p
              class="ty-scale-row__sample"
              :style="`font-size: var(${scale.token})`"
            >{{ scale.sample }}</p>
          </div>
        </div>
      </section>

      <!-- Gewichten -->
      <section class="ty-section">
        <h2 class="ty-section__title">Gewichten</h2>
        <div class="ty-weights">
          <div v-for="w in fontWeights" :key="w.value" class="ty-weight-row">
            <div class="ty-weight-row__meta">
              <span class="ty-weight-row__label">{{ w.label }}</span>
              <code class="ty-weight-row__token">{{ w.token }}</code>
              <span class="ty-weight-row__val">{{ w.value }}</span>
            </div>
            <p
              class="ty-weight-row__sample"
              :style="`font-weight: var(${w.token})`"
            >Byzantium Design System</p>
          </div>
        </div>
      </section>

      <!-- Regelafstand -->
      <section class="ty-section">
        <h2 class="ty-section__title">Regelafstand</h2>
        <div class="ty-leadings">
          <div v-for="l in leadings" :key="l.label" class="ty-leading-card">
            <div class="ty-leading-card__meta">
              <span class="ty-leading-card__label">{{ l.label }}</span>
              <code class="ty-leading-card__token">{{ l.token }}</code>
              <span class="ty-leading-card__val">{{ l.value }}</span>
            </div>
            <p
              class="ty-leading-card__sample"
              :style="`line-height: var(${l.token})`"
            >{{ l.sample }}</p>
          </div>
        </div>
      </section>

      <!-- Hiërarchie -->
      <section class="ty-section">
        <h2 class="ty-section__title">Teksthiërarchie</h2>
        <div class="ty-hierarchy">
          <div class="ty-hierarchy__block">
            <div class="ty-hierarchy__label">Koppen + body</div>
            <article class="ty-hierarchy__demo">
              <p class="ty-demo-eyebrow">Design system</p>
              <h1 class="ty-demo-h1">Byzantium</h1>
              <h2 class="ty-demo-h2">Kalm, krachtig, keizerlijk</h2>
              <h3 class="ty-demo-h3">Componentenbibliotheek voor Vue 3</h3>
              <p class="ty-demo-body">
                Byzantium is een open-source design system gebouwd op Vue 3 en TypeScript.
                Het biedt 45+ componenten, 9 composables en honderden design tokens.
              </p>
              <p class="ty-demo-caption">Versie 0.2.0 · MIT License · Semantique Agency</p>
            </article>
          </div>
          <div class="ty-hierarchy__block">
            <div class="ty-hierarchy__label">Serif + sans combinatie</div>
            <article class="ty-hierarchy__demo">
              <h2 class="ty-demo-serif-h2">Cormorant voor display</h2>
              <p class="ty-demo-body">
                Cormorant Garamond als heading — Syne als body. De combinatie voelt klassiek
                maar modern: imperial zonder arrogant te zijn.
              </p>
              <blockquote class="ty-demo-quote">
                "Design is the silent ambassador of your brand."
              </blockquote>
              <p class="ty-demo-caption">— Paul Rand</p>
            </article>
          </div>
        </div>
      </section>

    </main>

    <ByzFooter
      brand="Byzantium"
      :links="[
        { label: 'GitHub', href: 'https://github.com/byzantium-design-system/Byzantium-design-system' },
        { label: 'Changelog', href: '/changelog' },
      ]"
      copyright="MIT · v1.0.0"
    />
  </div>
</template>

<style lang="scss" scoped>
.ty-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--byz-color-background);
  color: var(--byz-color-text-primary);
  font-family: var(--byz-font-sans);
}

// ── Main ─────────────────────────────────────────────────────────
.ty-main {
  flex: 1;
  max-width: 72rem;
  margin: 0 auto;
  width: 100%;
  padding: var(--byz-space-12) var(--byz-space-8) var(--byz-space-24);
}

// ── Section ──────────────────────────────────────────────────────
.ty-section {
  padding: var(--byz-space-10) 0;
  border-bottom: 1px solid var(--byz-color-border);
  &:last-child { border-bottom: none; }

  &__title {
    font-family: var(--byz-font-serif);
    font-size: var(--byz-text-2xl);
    font-weight: var(--byz-font-semibold);
    margin: 0 0 var(--byz-space-8);
    padding-bottom: var(--byz-space-3);
    border-bottom: 2px solid var(--byz-brand-500);
    display: inline-block;
  }
}

// ── Font cards ───────────────────────────────────────────────────
.ty-fonts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--byz-space-6);
}

.ty-font-card {
  border: 1px solid var(--byz-color-border);
  border-radius: 0.75rem;
  padding: var(--byz-space-6);
  background: var(--byz-color-surface);

  &__meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--byz-space-4);
  }

  &__label {
    font-size: var(--byz-text-xs);
    font-weight: var(--byz-font-semibold);
    color: var(--byz-brand-400);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  &__token {
    font-family: var(--byz-font-mono);
    font-size: 0.65rem;
    color: var(--byz-color-text-muted);
    background: var(--byz-color-surface-raised);
    padding: 0.125rem var(--byz-space-2);
    border-radius: 0.25rem;
  }

  &__name {
    font-size: var(--byz-text-xl);
    font-weight: var(--byz-font-semibold);
    margin: 0 0 var(--byz-space-4);
    color: var(--byz-color-text-primary);
  }

  &__specimen {
    font-size: var(--byz-text-sm);
    line-height: var(--byz-leading-relaxed);
    color: var(--byz-color-text-secondary);
    margin: 0;

    &--sans  { font-family: var(--byz-font-sans); }
    &--serif { font-family: var(--byz-font-serif); font-size: var(--byz-text-base); }
    &--mono  { font-family: var(--byz-font-mono); }
  }
}

// ── Scale ────────────────────────────────────────────────────────
.ty-scale { display: flex; flex-direction: column; }

.ty-scale-row {
  display: grid;
  grid-template-columns: 12rem 1fr;
  align-items: baseline;
  gap: var(--byz-space-4);
  padding: var(--byz-space-4) 0;
  border-bottom: 1px solid rgba(192, 16, 48, 0.08);

  &:last-child { border-bottom: none; }

  &__meta {
    display: flex;
    flex-direction: column;
    gap: var(--byz-space-1);
    flex-shrink: 0;
  }

  &__name {
    font-family: var(--byz-font-mono);
    font-size: var(--byz-text-xs);
    color: var(--byz-brand-400);
  }

  &__clamp {
    font-family: var(--byz-font-mono);
    font-size: 0.65rem;
    color: var(--byz-color-text-muted);
  }

  &__sample {
    margin: 0;
    color: var(--byz-color-text-primary);
    line-height: var(--byz-leading-tight);
  }
}

// ── Weights ──────────────────────────────────────────────────────
.ty-weights { display: flex; flex-direction: column; gap: var(--byz-space-4); }

.ty-weight-row {
  display: grid;
  grid-template-columns: 14rem 1fr;
  align-items: center;
  gap: var(--byz-space-4);

  &__meta {
    display: flex;
    flex-direction: column;
    gap: var(--byz-space-1);
  }

  &__label {
    font-size: var(--byz-text-sm);
    color: var(--byz-color-text-secondary);
  }

  &__token {
    font-family: var(--byz-font-mono);
    font-size: 0.65rem;
    color: var(--byz-color-text-muted);
  }

  &__val {
    font-size: var(--byz-text-xs);
    color: var(--byz-color-text-muted);
  }

  &__sample {
    margin: 0;
    font-size: var(--byz-text-2xl);
    color: var(--byz-color-text-primary);
  }
}

// ── Leadings ─────────────────────────────────────────────────────
.ty-leadings { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--byz-space-6); }

.ty-leading-card {
  border: 1px solid var(--byz-color-border);
  border-radius: 0.75rem;
  padding: var(--byz-space-6);
  background: var(--byz-color-surface);

  &__meta {
    display: flex;
    flex-direction: column;
    gap: var(--byz-space-1);
    margin-bottom: var(--byz-space-4);
  }

  &__label { font-weight: var(--byz-font-semibold); font-size: var(--byz-text-sm); color: var(--byz-brand-400); }
  &__token { font-family: var(--byz-font-mono); font-size: 0.65rem; color: var(--byz-color-text-muted); }
  &__val   { font-size: var(--byz-text-xs); color: var(--byz-color-text-muted); }

  &__sample {
    margin: 0;
    font-size: var(--byz-text-sm);
    color: var(--byz-color-text-secondary);
  }
}

// ── Hierarchy ────────────────────────────────────────────────────
.ty-hierarchy {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--byz-space-8);
}

.ty-hierarchy__block {
  display: flex;
  flex-direction: column;
  gap: var(--byz-space-4);
}

.ty-hierarchy__label {
  font-size: var(--byz-text-xs);
  font-weight: var(--byz-font-semibold);
  color: var(--byz-color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.ty-hierarchy__demo {
  border: 1px solid var(--byz-color-border);
  border-radius: 0.75rem;
  padding: var(--byz-space-8);
  background: var(--byz-color-surface);
}

.ty-demo-eyebrow {
  font-size: var(--byz-text-xs);
  font-weight: var(--byz-font-semibold);
  color: var(--byz-brand-400);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0 0 var(--byz-space-2);
}

.ty-demo-h1 {
  font-family: var(--byz-font-serif);
  font-size: var(--byz-text-4xl);
  font-weight: var(--byz-font-bold);
  line-height: var(--byz-leading-tight);
  margin: 0 0 var(--byz-space-3);
  background: linear-gradient(135deg, var(--byz-brand-400), var(--byz-brand-200));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.ty-demo-h2 {
  font-family: var(--byz-font-sans);
  font-size: var(--byz-text-xl);
  font-weight: var(--byz-font-semibold);
  line-height: var(--byz-leading-tight);
  color: var(--byz-color-text-primary);
  margin: 0 0 var(--byz-space-2);
}

.ty-demo-h3 {
  font-size: var(--byz-text-lg);
  font-weight: var(--byz-font-medium);
  color: var(--byz-color-text-secondary);
  margin: 0 0 var(--byz-space-4);
}

.ty-demo-body {
  font-size: var(--byz-text-base);
  line-height: var(--byz-leading-normal);
  color: var(--byz-color-text-secondary);
  margin: 0 0 var(--byz-space-3);
}

.ty-demo-caption {
  font-size: var(--byz-text-xs);
  color: var(--byz-color-text-muted);
  margin: 0;
}

.ty-demo-serif-h2 {
  font-family: var(--byz-font-serif);
  font-size: var(--byz-text-3xl);
  font-weight: var(--byz-font-semibold);
  line-height: var(--byz-leading-tight);
  color: var(--byz-color-text-primary);
  margin: 0 0 var(--byz-space-4);
}

.ty-demo-quote {
  border-left: 3px solid var(--byz-brand-500);
  padding-left: var(--byz-space-4);
  margin: var(--byz-space-4) 0 var(--byz-space-2);
  font-family: var(--byz-font-serif);
  font-size: var(--byz-text-lg);
  font-style: italic;
  color: var(--byz-color-text-secondary);
}

// ── Mobile ───────────────────────────────────────────────────────
@media (max-width: 1080px) {
  .ty-main { padding: var(--byz-space-8) var(--byz-space-4) var(--byz-space-16); }
  .ty-fonts    { grid-template-columns: 1fr; }
  .ty-leadings { grid-template-columns: 1fr; }
  .ty-hierarchy { grid-template-columns: 1fr; }
  .ty-scale-row { grid-template-columns: 1fr; }
  .ty-weight-row { grid-template-columns: 1fr; }
}
</style>
