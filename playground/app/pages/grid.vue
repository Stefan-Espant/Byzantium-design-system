<script setup lang="ts">
import { ByzGrid, ByzCol } from '@byzantium-design-system/core'
import { usePlaygroundLocale } from '~/composables/usePlaygroundLocale'

const { p } = usePlaygroundLocale()

const activeVariant = ref<4 | 8 | 12 | 16 | 24>(12)
const activeGap     = ref<'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md')

const variants = [
  { cols: 4,  use: 'Dashboard tiles, feature blocks',     divisors: [2, 4] },
  { cols: 8,  use: 'Product-grids, galerijen',            divisors: [2, 4, 8] },
  { cols: 12, use: 'Algemene pagina-layouts (standaard)', divisors: [2, 3, 4, 6, 12] },
  { cols: 16, use: 'Admin, data-tabellen, design tools',  divisors: [2, 4, 8, 16] },
  { cols: 24, use: 'Complexe dashboards, maximale grip',  divisors: [2, 3, 4, 6, 8, 12, 24] },
]

const responsiveCode = `<ByzGrid :cols="12" gap="md">
  <ByzCol :span="{ default: 12, md: 6, lg: 4 }">
    Volledig → half → derde
  </ByzCol>
</ByzGrid>`

const utilityCode = `<!-- 12-koloms grid via utility classes -->
<div class="byz-grid byz-grid--12 byz-gap-md">
  <div class="byz-col-span-8 byz-col-span-md-6">Inhoud</div>
  <div class="byz-col-span-4 byz-col-span-md-6">Zijbalk</div>
</div>

<!-- Auto-fill kaart-grid -->
<div class="byz-grid byz-grid--auto-md byz-gap-lg">
  <div>Kaart A</div>
  <div>Kaart B</div>
</div>`
</script>

<template>
  <div class="gd-page">

    <PlaygroundHeader />

    <main class="gd-main">

      <!-- ── Intro ──────────────────────────────────────────────────────────── -->
      <section class="gd-section gd-section--intro">
        <h1 class="gd-hero-title">{{ p('gridPageTitle') }}</h1>
        <p class="gd-hero-sub">{{ p('gridSub') }}</p>

        <div class="gd-variants-table">
          <div class="gd-variants-table__row gd-variants-table__row--header">
            <span>Variant</span><span>Kolommen</span><span>Gebruik</span><span>Deelbaar door</span>
          </div>
          <div v-for="v in variants" :key="v.cols" class="gd-variants-table__row">
            <code class="gd-code">{{ v.cols }}-col</code>
            <span>{{ v.cols }}</span>
            <span>{{ v.use }}</span>
            <span class="gd-chips">
              <span v-for="d in v.divisors" :key="d" class="gd-chip">{{ d }}</span>
            </span>
          </div>
        </div>
      </section>

      <!-- ── Interactieve demo ──────────────────────────────────────────────── -->
      <section class="gd-section">
        <h2 class="gd-section__title">Interactieve demo</h2>

        <div class="gd-controls">
          <div class="gd-controls__group">
            <span class="gd-controls__label">Kolommen</span>
            <div class="gd-controls__pills">
              <button
                v-for="c in ([4, 8, 12, 16, 24] as const)"
                :key="c"
                class="gd-pill"
                :class="{ 'gd-pill--active': activeVariant === c }"
                @click="activeVariant = c"
              >{{ c }}</button>
            </div>
          </div>
          <div class="gd-controls__group">
            <span class="gd-controls__label">Gap</span>
            <div class="gd-controls__pills">
              <button
                v-for="g in (['none','xs','sm','md','lg','xl'] as const)"
                :key="g"
                class="gd-pill"
                :class="{ 'gd-pill--active': activeGap === g }"
                @click="activeGap = g"
              >{{ g }}</button>
            </div>
          </div>
        </div>

        <div class="gd-preview">
          <ByzGrid :cols="activeVariant" :gap="activeGap">
            <ByzCol
              v-for="i in activeVariant"
              :key="i"
              :span="1"
              class="gd-cell"
            >
              <span class="gd-cell__label">{{ i }}</span>
            </ByzCol>
          </ByzGrid>
        </div>

        <p class="gd-caption">
          <code>{{ `<ByzGrid :cols="${activeVariant}" gap="${activeGap}">` }}</code>
        </p>
      </section>

      <!-- ── Variant A: 4-koloms ────────────────────────────────────────────── -->
      <section class="gd-section">
        <h2 class="gd-section__title">Variant A — 4 kolommen</h2>
        <p class="gd-section__desc">Ideaal voor dashboard tiles, stat-kaarten en feature blocks. Breed en overzichtelijk.</p>

        <div class="gd-preview">
          <ByzGrid :cols="4" gap="md">
            <ByzCol :span="1" class="gd-demo-card gd-demo-card--brand">
              <strong>1/4</strong><br>Statistiek
            </ByzCol>
            <ByzCol :span="1" class="gd-demo-card gd-demo-card--muted">
              <strong>1/4</strong><br>Statistiek
            </ByzCol>
            <ByzCol :span="1" class="gd-demo-card gd-demo-card--muted">
              <strong>1/4</strong><br>Statistiek
            </ByzCol>
            <ByzCol :span="1" class="gd-demo-card gd-demo-card--muted">
              <strong>1/4</strong><br>Statistiek
            </ByzCol>
            <ByzCol :span="3" class="gd-demo-card gd-demo-card--surface">
              <strong>3/4</strong> — Hoofdinhoud
            </ByzCol>
            <ByzCol :span="1" class="gd-demo-card gd-demo-card--raised">
              <strong>1/4</strong><br>Zijpaneel
            </ByzCol>
          </ByzGrid>
        </div>
        <p class="gd-caption"><code>&lt;ByzGrid :cols="4" gap="md"&gt;</code></p>
      </section>

      <!-- ── Variant B: 8-koloms ────────────────────────────────────────────── -->
      <section class="gd-section">
        <h2 class="gd-section__title">Variant B — 8 kolommen</h2>
        <p class="gd-section__desc">Tussenliggende densiteit. Geschikt voor product-grids, galerijen en hybride layouts.</p>

        <div class="gd-preview">
          <ByzGrid :cols="8" gap="md">
            <ByzCol :span="8" class="gd-demo-card gd-demo-card--brand">Volledige breedte (8/8)</ByzCol>
            <ByzCol :span="4" class="gd-demo-card gd-demo-card--surface">Helft (4/8)</ByzCol>
            <ByzCol :span="4" class="gd-demo-card gd-demo-card--surface">Helft (4/8)</ByzCol>
            <ByzCol :span="2" class="gd-demo-card gd-demo-card--muted">2/8</ByzCol>
            <ByzCol :span="2" class="gd-demo-card gd-demo-card--muted">2/8</ByzCol>
            <ByzCol :span="2" class="gd-demo-card gd-demo-card--muted">2/8</ByzCol>
            <ByzCol :span="2" class="gd-demo-card gd-demo-card--raised">2/8</ByzCol>
          </ByzGrid>
        </div>
        <p class="gd-caption"><code>&lt;ByzGrid :cols="8" gap="md"&gt;</code></p>
      </section>

      <!-- ── Variant C: 12-koloms ───────────────────────────────────────────── -->
      <section class="gd-section">
        <h2 class="gd-section__title">Variant C — 12 kolommen <span class="gd-badge">Standaard</span></h2>
        <p class="gd-section__desc">De industriestandaard. Deelbaar door 2, 3, 4 en 6. Maximale compositievrijheid voor alle pagina-layouts.</p>

        <div class="gd-preview">
          <ByzGrid :cols="12" gap="md">
            <ByzCol :span="12" class="gd-demo-card gd-demo-card--brand">12/12 — Hero / banner</ByzCol>
            <ByzCol :span="8"  class="gd-demo-card gd-demo-card--surface">8/12 — Hoofdinhoud</ByzCol>
            <ByzCol :span="4"  class="gd-demo-card gd-demo-card--raised">4/12 — Zijbalk</ByzCol>
            <ByzCol :span="4"  class="gd-demo-card gd-demo-card--muted">4/12</ByzCol>
            <ByzCol :span="4"  class="gd-demo-card gd-demo-card--muted">4/12</ByzCol>
            <ByzCol :span="4"  class="gd-demo-card gd-demo-card--muted">4/12</ByzCol>
            <ByzCol :span="3"  class="gd-demo-card gd-demo-card--muted">3/12</ByzCol>
            <ByzCol :span="3"  class="gd-demo-card gd-demo-card--muted">3/12</ByzCol>
            <ByzCol :span="3"  class="gd-demo-card gd-demo-card--muted">3/12</ByzCol>
            <ByzCol :span="3"  class="gd-demo-card gd-demo-card--muted">3/12</ByzCol>
          </ByzGrid>
        </div>
        <p class="gd-caption"><code>&lt;ByzGrid :cols="12" gap="md"&gt;</code></p>
      </section>

      <!-- ── Variant D: 16-koloms ───────────────────────────────────────────── -->
      <section class="gd-section">
        <h2 class="gd-section__title">Variant D — 16 kolommen</h2>
        <p class="gd-section__desc">Fijnmaziger dan 12-col. Handig voor data-rijke interfaces, design tools en admin-panelen waar pixelprecisie telt.</p>

        <div class="gd-preview">
          <ByzGrid :cols="16" gap="sm">
            <ByzCol :span="16" class="gd-demo-card gd-demo-card--brand">16/16</ByzCol>
            <ByzCol :span="10" class="gd-demo-card gd-demo-card--surface">10/16 — Inhoud</ByzCol>
            <ByzCol :span="6"  class="gd-demo-card gd-demo-card--raised">6/16 — Zijpaneel</ByzCol>
            <ByzCol :span="4"  class="gd-demo-card gd-demo-card--muted">4/16</ByzCol>
            <ByzCol :span="4"  class="gd-demo-card gd-demo-card--muted">4/16</ByzCol>
            <ByzCol :span="4"  class="gd-demo-card gd-demo-card--muted">4/16</ByzCol>
            <ByzCol :span="4"  class="gd-demo-card gd-demo-card--muted">4/16</ByzCol>
          </ByzGrid>
        </div>
        <p class="gd-caption"><code>&lt;ByzGrid :cols="16" gap="sm"&gt;</code></p>
      </section>

      <!-- ── Variant E: 24-koloms ───────────────────────────────────────────── -->
      <section class="gd-section">
        <h2 class="gd-section__title">Variant E — 24 kolommen</h2>
        <p class="gd-section__desc">Maximale granulariteit. Deelbaar door 2, 3, 4, 6, 8 en 12. Bedoeld voor complexe dashboard-interfaces en compositietools.</p>

        <div class="gd-preview">
          <ByzGrid :cols="24" gap="xs">
            <ByzCol :span="24" class="gd-demo-card gd-demo-card--brand">24/24</ByzCol>
            <ByzCol :span="16" class="gd-demo-card gd-demo-card--surface">16/24 — Inhoud</ByzCol>
            <ByzCol :span="8"  class="gd-demo-card gd-demo-card--raised">8/24 — Zijbalk</ByzCol>
            <ByzCol :span="6"  class="gd-demo-card gd-demo-card--muted">6/24</ByzCol>
            <ByzCol :span="6"  class="gd-demo-card gd-demo-card--muted">6/24</ByzCol>
            <ByzCol :span="6"  class="gd-demo-card gd-demo-card--muted">6/24</ByzCol>
            <ByzCol :span="6"  class="gd-demo-card gd-demo-card--muted">6/24</ByzCol>
            <ByzCol :span="8"  class="gd-demo-card gd-demo-card--muted">8/24</ByzCol>
            <ByzCol :span="8"  class="gd-demo-card gd-demo-card--muted">8/24</ByzCol>
            <ByzCol :span="8"  class="gd-demo-card gd-demo-card--muted">8/24</ByzCol>
          </ByzGrid>
        </div>
        <p class="gd-caption"><code>&lt;ByzGrid :cols="24" gap="xs"&gt;</code></p>
      </section>

      <!-- ── Variant F: Auto-fill ───────────────────────────────────────────── -->
      <section class="gd-section">
        <h2 class="gd-section__title">Variant F — Auto-fill</h2>
        <p class="gd-section__desc">Geen vaste kolomtelling. Kolommen passen automatisch in de beschikbare breedte. Ideaal voor kaart-grids en productoverzichten zonder JS-breakpoints.</p>

        <div class="gd-preview">
          <div class="gd-auto-demo">
            <div class="gd-auto-label">auto-sm <span class="gd-auto-note">min 12rem</span></div>
            <div class="byz-grid byz-grid--auto-sm byz-gap-md">
              <div v-for="i in 6" :key="i" class="gd-demo-card gd-demo-card--muted">Kaart {{ i }}</div>
            </div>
          </div>
          <div class="gd-auto-demo">
            <div class="gd-auto-label">auto-md <span class="gd-auto-note">min 18rem</span></div>
            <div class="byz-grid byz-grid--auto-md byz-gap-md">
              <div v-for="i in 6" :key="i" class="gd-demo-card gd-demo-card--surface">Kaart {{ i }}</div>
            </div>
          </div>
          <div class="gd-auto-demo">
            <div class="gd-auto-label">auto-lg <span class="gd-auto-note">min 24rem</span></div>
            <div class="byz-grid byz-grid--auto-lg byz-gap-md">
              <div v-for="i in 4" :key="i" class="gd-demo-card gd-demo-card--raised">Kaart {{ i }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- ── Responsive ─────────────────────────────────────────────────────── -->
      <section class="gd-section">
        <h2 class="gd-section__title">Responsive spans</h2>
        <p class="gd-section__desc">Geef per breakpoint een ander span-object mee via het <code>span</code> prop.</p>

        <div class="gd-preview">
          <ByzGrid :cols="12" gap="md">
            <ByzCol :span="{ default: 12, md: 6, lg: 4 }" class="gd-demo-card gd-demo-card--brand">
              default:12 / md:6 / lg:4
            </ByzCol>
            <ByzCol :span="{ default: 12, md: 6, lg: 4 }" class="gd-demo-card gd-demo-card--surface">
              default:12 / md:6 / lg:4
            </ByzCol>
            <ByzCol :span="{ default: 12, md: 12, lg: 4 }" class="gd-demo-card gd-demo-card--raised">
              default:12 / md:12 / lg:4
            </ByzCol>
          </ByzGrid>
        </div>

        <div class="gd-code-block">
          <pre><code>{{ responsiveCode }}</code></pre>
        </div>
      </section>

      <!-- ── Utility classes ────────────────────────────────────────────────── -->
      <section class="gd-section">
        <h2 class="gd-section__title">CSS utility classes</h2>
        <p class="gd-section__desc">Gebruik de grid ook zonder Vue components — puur met CSS klassen.</p>

        <div class="gd-code-block">
          <pre><code>{{ utilityCode }}</code></pre>
        </div>
      </section>

    </main>
  </div>
</template>

<style lang="scss" scoped>
.gd-page {
  min-height: 100vh;
  background: var(--byz-color-background);
  color: var(--byz-color-text);
  font-family: var(--byz-font-sans);
}

// ── Main ───────────────────────────────────────────────────────────────────
.gd-main {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1.5rem 6rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

// ── Intro ──────────────────────────────────────────────────────────────────
.gd-hero-title {
  font-family: var(--byz-font-serif);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  color: var(--byz-color-heading);
  margin-bottom: 0.5rem;
}

.gd-hero-sub {
  font-size: 1.1rem;
  color: var(--byz-color-text-muted);
  margin-bottom: 2rem;
  max-width: 60ch;
}

// ── Variants table ─────────────────────────────────────────────────────────
.gd-variants-table {
  border: 1px solid var(--byz-color-border);
  border-radius: 0.75rem;
  overflow: hidden;

  &__row {
    display: grid;
    grid-template-columns: 7rem 5rem 1fr auto;
    gap: 1rem;
    padding: 0.75rem 1.25rem;
    border-bottom: 1px solid var(--byz-color-border);
    font-size: 0.875rem;
    align-items: center;

    &:last-child { border-bottom: none; }
    &--header {
      background: var(--byz-color-surface);
      font-weight: 600;
      color: var(--byz-color-text-muted);
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  }
}

.gd-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.gd-chip {
  background: var(--byz-color-surface-raised);
  border: 1px solid var(--byz-color-border);
  border-radius: 0.25rem;
  padding: 0.125rem 0.375rem;
  font-size: 0.7rem;
  font-family: var(--byz-font-mono);
  color: var(--byz-color-text-muted);
}

// ── Section ────────────────────────────────────────────────────────────────
.gd-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &--intro { gap: 0.75rem; }

  &__title {
    font-family: var(--byz-font-serif);
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--byz-color-heading);
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  &__desc {
    color: var(--byz-color-text-muted);
    font-size: 0.9rem;
    max-width: 70ch;
    line-height: 1.6;
  }
}

.gd-badge {
  font-family: var(--byz-font-sans);
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  background: var(--byz-brand-500);
  color: #fff;
  padding: 0.2rem 0.5rem;
  border-radius: 9999px;
  vertical-align: middle;
}

// ── Controls ───────────────────────────────────────────────────────────────
.gd-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;

  &__group {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  &__label {
    font-size: 0.8rem;
    color: var(--byz-color-text-muted);
    font-weight: 600;
    white-space: nowrap;
  }

  &__pills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
  }
}

.gd-pill {
  background: var(--byz-color-surface);
  border: 1px solid var(--byz-color-border);
  color: var(--byz-color-text-muted);
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-family: var(--byz-font-mono);
  cursor: pointer;
  transition: all 0.15s;

  &:hover { border-color: var(--byz-brand-500); color: var(--byz-color-text); }

  &--active {
    background: var(--byz-brand-500);
    border-color: var(--byz-brand-500);
    color: #fff;
  }
}

// ── Preview ────────────────────────────────────────────────────────────────
.gd-preview {
  background: var(--byz-color-surface);
  border: 1px solid var(--byz-color-border);
  border-radius: 0.75rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

// ── Demo cells ─────────────────────────────────────────────────────────────
.gd-cell {
  background: var(--byz-color-surface-raised);
  border: 1px solid var(--byz-color-border);
  border-radius: 0.25rem;
  padding: 0.5rem;
  min-height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &__label {
    font-family: var(--byz-font-mono);
    font-size: 0.7rem;
    color: var(--byz-color-text-muted);
  }
}

.gd-demo-card {
  border-radius: 0.5rem;
  padding: 0.875rem 1rem;
  font-size: 0.8rem;
  font-family: var(--byz-font-mono);
  min-height: 3rem;
  display: flex;
  align-items: center;

  &--brand {
    background: linear-gradient(135deg, rgba(192, 16, 48, 0.3), rgba(192, 16, 48, 0.12));
    border: 1px solid rgba(192, 16, 48, 0.4);
    color: #ffb0b8;
  }

  &--surface {
    background: var(--byz-color-surface-raised);
    border: 1px solid var(--byz-color-border);
    color: var(--byz-color-text);
  }

  &--raised {
    background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
    border: 1px solid rgba(255,255,255,0.1);
    color: var(--byz-color-text-muted);
  }

  &--muted {
    background: var(--byz-color-surface);
    border: 1px dashed var(--byz-color-border);
    color: var(--byz-color-text-muted);
  }
}

// ── Auto-fill demo ─────────────────────────────────────────────────────────
.gd-auto-demo {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.gd-auto-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--byz-color-text-muted);
  font-family: var(--byz-font-mono);
}

.gd-auto-note {
  font-weight: 400;
  opacity: 0.6;
  margin-left: 0.25rem;
}

// ── Caption & code ─────────────────────────────────────────────────────────
.gd-caption {
  font-size: 0.8rem;
  color: var(--byz-color-text-muted);

  code {
    font-family: var(--byz-font-mono);
    background: var(--byz-color-surface);
    padding: 0.2rem 0.5rem;
    border-radius: 0.25rem;
    border: 1px solid var(--byz-color-border);
  }
}

.gd-code {
  font-family: var(--byz-font-mono);
  font-size: 0.85rem;
  color: var(--byz-brand-300, #ff7070);
}

.gd-code-block {
  background: var(--byz-color-surface);
  border: 1px solid var(--byz-color-border);
  border-radius: 0.75rem;
  overflow-x: auto;

  pre {
    margin: 0;
    padding: 1.25rem 1.5rem;
    font-family: var(--byz-font-mono);
    font-size: 0.85rem;
    line-height: 1.6;
    color: var(--byz-color-text);
  }
}

// ── Responsive ─────────────────────────────────────────────────────────────
@media (max-width: 1080px) {
  .gd-main { padding: 1.5rem 1rem 4rem; }

  .gd-variants-table {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .gd-variants-table__row { min-width: 480px; }

  .gd-controls { flex-direction: column; gap: 0.75rem; }
  .gd-controls__group { flex-wrap: wrap; }
}

</style>
