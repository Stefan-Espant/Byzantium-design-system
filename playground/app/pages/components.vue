<script setup lang="ts">
import {
  ByzButton,
  ByzInput,
  ByzAlert,
  ByzCard,
  ByzModal,
  ByzIcon,
  ByzHero,
  ByzNavbar,
} from '@byzantium/core'

const inputDefault  = ref('')
const inputError    = ref('ongeldig@')
const inputDisabled = ref('Niet bewerkbaar')
const modalOpen     = ref(false)
</script>

<template>
  <div class="cp-page">

    <!-- PAGE HEADER -->
    <header class="cp-header">
      <nav class="cp-header__inner">
        <a href="/" class="cp-header__brand">Byzantium</a>
        <span class="cp-header__title">Component bibliotheek</span>
        <a href="/" class="cp-header__back">← Terug</a>
      </nav>
    </header>

    <main class="cp-main">

      <!-- ByzButton -->
      <section class="cp-section">
        <h2 class="cp-section__title">ByzButton</h2>

        <div class="cp-group">
          <h3 class="cp-group__title">Varianten</h3>
          <div class="cp-row">
            <ByzButton variant="primary">Primary</ByzButton>
            <ByzButton variant="secondary">Secondary</ByzButton>
            <ByzButton variant="ghost">Ghost</ByzButton>
            <ByzButton variant="danger">Danger</ByzButton>
          </div>
        </div>

        <div class="cp-group">
          <h3 class="cp-group__title">Groottes</h3>
          <div class="cp-row cp-row--align-end">
            <ByzButton size="sm">Small</ByzButton>
            <ByzButton size="md">Medium</ByzButton>
            <ByzButton size="lg">Large</ByzButton>
          </div>
        </div>

        <div class="cp-group">
          <h3 class="cp-group__title">States</h3>
          <div class="cp-row">
            <ByzButton :loading="true">Laden…</ByzButton>
            <ByzButton :disabled="true">Uitgeschakeld</ByzButton>
            <ByzButton variant="secondary" :loading="true">Secondary laden</ByzButton>
          </div>
        </div>
      </section>

      <!-- ByzInput -->
      <section class="cp-section">
        <h2 class="cp-section__title">ByzInput</h2>

        <div class="cp-group">
          <div class="cp-grid-3">
            <ByzInput
              v-model="inputDefault"
              label="Standaard"
              placeholder="Typ hier…"
              hint="Dit is een hint"
            />
            <ByzInput
              v-model="inputError"
              label="Met fout"
              type="email"
              error="Voer een geldig e-mailadres in"
            />
            <ByzInput
              v-model="inputDisabled"
              label="Uitgeschakeld"
              :disabled="true"
            />
          </div>
        </div>

        <div class="cp-group">
          <h3 class="cp-group__title">Types</h3>
          <div class="cp-grid-3">
            <ByzInput label="Wachtwoord" type="password" placeholder="••••••••" />
            <ByzInput label="Telefoonnummer" type="tel" placeholder="+31 6 12 34 56 78" />
            <ByzInput label="URL" type="url" placeholder="https://byzantium.dev" />
          </div>
        </div>
      </section>

      <!-- ByzAlert -->
      <section class="cp-section">
        <h2 class="cp-section__title">ByzAlert</h2>
        <div class="cp-group">
          <div class="cp-stack">
            <ByzAlert type="info"    title="Informatie">Dit is een informatieve melding.</ByzAlert>
            <ByzAlert type="success" title="Gelukt">De wijzigingen zijn opgeslagen.</ByzAlert>
            <ByzAlert type="warning" title="Let op">Deze actie kan niet ongedaan worden.</ByzAlert>
            <ByzAlert type="error"   title="Fout">Er is iets misgegaan. Probeer opnieuw.</ByzAlert>
          </div>
        </div>
        <div class="cp-group">
          <h3 class="cp-group__title">Sluitbaar</h3>
          <ByzAlert type="info" title="Sluitbaar" dismissible>
            Klik op het kruisje om deze melding te sluiten.
          </ByzAlert>
        </div>
      </section>

      <!-- ByzCard -->
      <section class="cp-section">
        <h2 class="cp-section__title">ByzCard</h2>
        <div class="cp-group">
          <div class="cp-grid-3">
            <ByzCard padding="sm">
              <h3 style="margin-bottom: 0.5rem;">Small padding</h3>
              <p>Compact card voor dichte layouts.</p>
            </ByzCard>
            <ByzCard padding="md">
              <h3 style="margin-bottom: 0.5rem;">Medium padding</h3>
              <p>Standaard card — meest gebruikt.</p>
            </ByzCard>
            <ByzCard padding="lg" :elevated="true">
              <h3 style="margin-bottom: 0.5rem;">Large + elevated</h3>
              <p>Meer ruimte en schaduw voor nadruk.</p>
            </ByzCard>
          </div>
        </div>
      </section>

      <!-- ByzModal -->
      <section class="cp-section">
        <h2 class="cp-section__title">ByzModal</h2>
        <div class="cp-group">
          <ByzButton variant="primary" @click="modalOpen = true">
            Open modal
          </ByzButton>
          <ByzModal
            :open="modalOpen"
            title="Bevestig actie"
            @close="modalOpen = false"
          >
            <p>Weet je zeker dat je dit wilt verwijderen? Dit kan niet ongedaan worden gemaakt.</p>
            <template #footer>
              <div style="display: flex; gap: 0.5rem;">
                <ByzButton variant="danger" @click="modalOpen = false">Verwijderen</ByzButton>
                <ByzButton variant="ghost"  @click="modalOpen = false">Annuleren</ByzButton>
              </div>
            </template>
          </ByzModal>
        </div>
      </section>

      <!-- ByzIcon -->
      <section class="cp-section">
        <h2 class="cp-section__title">ByzIcon</h2>
        <div class="cp-group">
          <div class="cp-row">
            <ByzIcon name="star" size="sm" aria-label="Klein icoon">★</ByzIcon>
            <ByzIcon name="star" size="md" aria-label="Medium icoon">★</ByzIcon>
            <ByzIcon name="star" size="lg" aria-label="Groot icoon">★</ByzIcon>
            <ByzIcon name="heart" size="md" aria-label="Hart">♥</ByzIcon>
            <ByzIcon name="check" size="md" aria-label="Vinkje">✓</ByzIcon>
            <ByzIcon name="warning" size="md" aria-label="Waarschuwing">⚠</ByzIcon>
          </div>
        </div>
      </section>

      <!-- ByzHero -->
      <section class="cp-section">
        <h2 class="cp-section__title">ByzHero</h2>
        <div class="cp-group">
          <h3 class="cp-group__title">center (default)</h3>
          <div class="cp-preview">
            <ByzHero
              title="Gebouwd om te duren"
              subtitle="Toegankelijk van nature. Één bron van waarheid."
            >
              <ByzButton variant="primary">Aan de slag</ByzButton>
              <ByzButton variant="secondary">Meer info</ByzButton>
            </ByzHero>
          </div>
        </div>
        <div class="cp-group">
          <h3 class="cp-group__title">left</h3>
          <div class="cp-preview">
            <ByzHero
              title="Byzantium"
              subtitle="Design tokens voor schaalbare interfaces."
              align="left"
            >
              <ByzButton variant="primary">Lees meer</ByzButton>
            </ByzHero>
          </div>
        </div>
      </section>

      <!-- ByzNavbar -->
      <section class="cp-section">
        <h2 class="cp-section__title">ByzNavbar</h2>
        <div class="cp-group">
          <div class="cp-preview">
            <ByzNavbar
              brand="Byzantium"
              :items="[
                { label: 'Tokens', href: '#' },
                { label: 'Components', href: '#' },
                { label: 'Patronen', href: '#' },
              ]"
            >
              <ByzButton variant="primary" size="sm">Get started</ByzButton>
            </ByzNavbar>
          </div>
        </div>
      </section>

    </main>
  </div>
</template>

<style lang="scss" scoped>
.cp-page {
  min-height: 100vh;
}

/* ── PAGE HEADER ──────────────────── */
.cp-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(14, 3, 5, 0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--byz-color-border);

  &__inner {
    display: flex;
    align-items: center;
    gap: var(--byz-space-6);
    max-width: 72rem;
    margin: 0 auto;
    padding: 0 var(--byz-space-8);
    min-height: 56px;
  }

  &__brand {
    font-family: var(--byz-font-serif);
    font-size: var(--byz-text-lg);
    font-weight: var(--byz-font-bold);
    color: var(--byz-color-text-primary);
    text-decoration: none;
  }

  &__title {
    flex: 1;
    font-size: var(--byz-text-sm);
    color: var(--byz-color-text-muted);
    letter-spacing: 0.04em;
  }

  &__back {
    font-size: var(--byz-text-sm);
    color: var(--byz-color-text-muted);
    text-decoration: none;
    transition: color var(--byz-duration-fast) var(--byz-ease-default);
    &:hover { color: var(--byz-color-accent); }
  }
}

/* ── MAIN LAYOUT ──────────────────── */
.cp-main {
  max-width: 72rem;
  margin: 0 auto;
  padding: var(--byz-space-12) var(--byz-space-8) var(--byz-space-20);
  display: flex;
  flex-direction: column;
  gap: var(--byz-space-1);
}

/* ── SECTION ──────────────────────── */
.cp-section {
  padding: var(--byz-space-10) 0;
  border-bottom: 1px solid var(--byz-color-border);

  &:last-child { border-bottom: none; }

  &__title {
    font-size: var(--byz-text-3xl);
    color: var(--byz-color-text-primary);
    margin-bottom: var(--byz-space-8);
    letter-spacing: -0.02em;

    &::after {
      content: '';
      display: block;
      width: 32px;
      height: 2px;
      background: var(--byz-color-accent);
      margin-top: var(--byz-space-3);
      border-radius: 1px;
    }
  }
}

/* ── GROUP ────────────────────────── */
.cp-group {
  margin-bottom: var(--byz-space-8);

  &:last-child { margin-bottom: 0; }

  &__title {
    font-size: var(--byz-text-xs);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--byz-color-text-muted);
    font-weight: var(--byz-font-semibold);
    margin-bottom: var(--byz-space-4);
  }
}

/* ── LAYOUT HELPERS ───────────────── */
.cp-row {
  display: flex;
  gap: var(--byz-space-3);
  flex-wrap: wrap;
  align-items: center;

  &--align-end { align-items: flex-end; }
}

.cp-stack {
  display: flex;
  flex-direction: column;
  gap: var(--byz-space-3);
}

.cp-grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--byz-space-6);
}

/* ── PREVIEW WRAPPER ──────────────── */
.cp-preview {
  border: 1px solid var(--byz-color-border);
  border-radius: 0.5rem;
  overflow: hidden;
}
</style>
