<script setup lang="ts">
import {
  ByzButton, ByzInput, ByzIcon, ByzBadge, ByzAvatar, ByzSpinner,
  ByzSkeleton, ByzCheckbox, ByzRadio, ByzSwitch, ByzTextarea,
  ByzSelect, ByzTooltip, ByzTag, ByzLink, ByzAlert, ByzCard, ByzModal,
  ByzToastContainer, ByzBreadcrumb, ByzProgress, ByzTabs,
  ByzAccordion, ByzDropdown, ByzTable, ByzPagination,
  ByzStepper, ByzPopover, ByzDrawer,
  ByzPageHeader, ByzEmptyState, ByzFooter,
  useToast, useTheme, useLocale,
} from '@byzantium/core'

const { theme, toggle }                        = useTheme()
const { currentKey: lang, toggle: toggleLang } = useLocale()
const { add: addToast }                        = useToast()

// Form state
const checkboxVal  = ref(true)
const checkboxInd  = ref(false)
const radioVal     = ref('b')
const switchVal    = ref(true)
const textareaVal  = ref('')
const selectVal    = ref('')
const inputVal     = ref('')

// Modal
const modalOpen = ref(false)

// Tabs
const activeTab = ref('tokens')
const tabs = [
  { id: 'tokens',     label: 'Tokens' },
  { id: 'components', label: 'Componenten' },
  { id: 'patronen',   label: 'Patronen' },
]

// Accordion
const accordionItems = [
  { id: 'a1', title: 'Wat zijn design tokens?', content: 'Design tokens zijn de kleinste bouwstenen van een design system: kleuren, spacing, typografie en motion als naamgegeven variabelen.' },
  { id: 'a2', title: 'Hoe gebruik ik de componenten?', content: 'Importeer componenten uit @byzantium/core en gebruik ze direct in je Vue templates. Elk component ondersteunt TypeScript props.' },
  { id: 'a3', title: 'Is er dark mode ondersteuning?', content: 'Ja — Byzantium is dark-first. Gebruik useTheme() om te wisselen tussen licht en donker. De voorkeur wordt opgeslagen in localStorage.' },
]

// Dropdown
const dropdownItems = [
  { label: 'Bewerken',    value: 'edit',   icon: '✎' },
  { label: 'Dupliceren',  value: 'dupe',   icon: '⧉' },
  { separator: true,      label: '',       value: '' },
  { label: 'Verwijderen', value: 'delete', icon: '✕' },
]

// Table
const tableColumns = [
  { key: 'name',    label: 'Component', sortable: true },
  { key: 'tier',    label: 'Laag',      sortable: true },
  { key: 'status',  label: 'Status' },
]
const tableRows = [
  { name: 'ByzButton',   tier: 'Primitive', status: '✓ Klaar' },
  { name: 'ByzInput',    tier: 'Primitive', status: '✓ Klaar' },
  { name: 'ByzCard',     tier: 'Composite', status: '✓ Klaar' },
  { name: 'ByzModal',    tier: 'Composite', status: '✓ Klaar' },
  { name: 'ByzHero',     tier: 'Pattern',   status: '✓ Klaar' },
  { name: 'ByzNavbar',   tier: 'Pattern',   status: '✓ Klaar' },
]

// Pagination
const currentPage = ref(1)

// Progress
const progressVal = ref(68)

// Select options
const selectOptions = [
  { value: 'vue',     label: 'Vue 3' },
  { value: 'nuxt',    label: 'Nuxt 4' },
  { value: 'vite',    label: 'Vite 6' },
  { value: 'ts',      label: 'TypeScript' },
]

// Tags
const tags = ref(['Vue 3', 'TypeScript', 'Nuxt 4', 'Vite'])
function removeTag(label: string) { tags.value = tags.value.filter(t => t !== label) }

// Stepper
const stepperActive = ref('design')
const stepperCompleted = ref(['research'])
const stepperSteps = [
  { id: 'research', label: 'Onderzoek',   description: 'Context en vereisten' },
  { id: 'design',   label: 'Ontwerp',     description: 'Wireframes en mockups' },
  { id: 'build',    label: 'Bouwen',      description: 'Implementatie' },
  { id: 'review',   label: 'Review',      description: 'Testen en feedback' },
  { id: 'ship',     label: 'Lanceren',    description: 'Deploy naar productie' },
]

// Drawer
const drawerOpen = ref(false)
</script>

<template>
  <div class="cp-page">
    <ByzToastContainer />

    <!-- HEADER -->
    <header class="cp-header">
      <nav class="cp-header__inner">
        <a href="/" class="cp-header__brand">Byzantium</a>
        <span class="cp-header__title">Component bibliotheek</span>
        <button class="cp-header__toggle" :aria-label="lang === 'nl' ? 'Switch to English' : 'Naar Nederlands'" @click="toggleLang">
          {{ lang === 'nl' ? 'EN' : 'NL' }}
        </button>
        <button class="cp-header__toggle" :aria-label="theme === 'dark' ? 'Licht' : 'Donker'" @click="toggle">
          {{ theme === 'dark' ? '☀' : '☾' }}
        </button>
        <a href="/" class="cp-header__back">← Terug</a>
      </nav>
    </header>

    <main class="cp-main">

      <!-- ByzBadge -->
      <section class="cp-section">
        <h2 class="cp-section__title">ByzBadge</h2>
        <div class="cp-group">
          <div class="cp-row">
            <ByzBadge>Default</ByzBadge>
            <ByzBadge variant="success">Success</ByzBadge>
            <ByzBadge variant="warning">Warning</ByzBadge>
            <ByzBadge variant="error">Error</ByzBadge>
            <ByzBadge variant="info">Info</ByzBadge>
          </div>
          <div class="cp-row" style="margin-top: 0.75rem;">
            <ByzBadge size="sm">Klein</ByzBadge>
            <ByzBadge :dot="true" variant="success" />
            <ByzBadge :dot="true" variant="error" />
          </div>
        </div>
      </section>

      <!-- ByzAvatar -->
      <section class="cp-section">
        <h2 class="cp-section__title">ByzAvatar</h2>
        <div class="cp-group">
          <div class="cp-row cp-row--align-end">
            <ByzAvatar name="Stefan van der Kort" size="sm" />
            <ByzAvatar name="Stefan van der Kort" size="md" />
            <ByzAvatar name="Stefan van der Kort" size="lg" />
            <ByzAvatar name="Stefan van der Kort" size="xl" />
            <ByzAvatar size="md" />
            <ByzAvatar name="Byzantium" shape="square" size="lg" />
          </div>
        </div>
      </section>

      <!-- ByzSpinner & ByzSkeleton -->
      <section class="cp-section">
        <h2 class="cp-section__title">ByzSpinner & ByzSkeleton</h2>
        <div class="cp-group">
          <h3 class="cp-group__title">Spinner</h3>
          <div class="cp-row cp-row--align-end">
            <ByzSpinner size="sm" />
            <ByzSpinner size="md" />
            <ByzSpinner size="lg" />
            <ByzSpinner color="white" />
            <ByzSpinner color="muted" />
          </div>
        </div>
        <div class="cp-group">
          <h3 class="cp-group__title">Skeleton</h3>
          <div style="max-width: 320px; display: flex; flex-direction: column; gap: 0.5rem;">
            <ByzSkeleton height="1rem" />
            <ByzSkeleton :lines="3" />
            <ByzSkeleton height="32px" width="32px" :rounded="true" />
          </div>
        </div>
      </section>

      <!-- ByzCheckbox & ByzRadio -->
      <section class="cp-section">
        <h2 class="cp-section__title">ByzCheckbox & ByzRadio</h2>
        <div class="cp-grid-2">
          <div>
            <h3 class="cp-group__title">Checkbox</h3>
            <div class="cp-stack">
              <ByzCheckbox v-model="checkboxVal" label="Aangevinkt" />
              <ByzCheckbox v-model="checkboxInd" label="Indeterminate" :indeterminate="true" />
              <ByzCheckbox :model-value="false" label="Uitgeschakeld" :disabled="true" />
              <ByzCheckbox :model-value="false" label="Met fout" error="Dit veld is verplicht" />
            </div>
          </div>
          <div>
            <h3 class="cp-group__title">Radio</h3>
            <div class="cp-stack">
              <ByzRadio v-model="radioVal" value="a" label="Optie A" name="demo" />
              <ByzRadio v-model="radioVal" value="b" label="Optie B" name="demo" />
              <ByzRadio v-model="radioVal" value="c" label="Optie C (uitgeschakeld)" name="demo" :disabled="true" />
            </div>
          </div>
        </div>
      </section>

      <!-- ByzSwitch -->
      <section class="cp-section">
        <h2 class="cp-section__title">ByzSwitch</h2>
        <div class="cp-group">
          <div class="cp-stack">
            <ByzSwitch v-model="switchVal" label="Meldingen inschakelen" />
            <ByzSwitch v-model="switchVal" label="Klein formaat" size="sm" />
            <ByzSwitch :model-value="false" label="Uitgeschakeld" :disabled="true" />
          </div>
        </div>
      </section>

      <!-- ByzTextarea & ByzSelect -->
      <section class="cp-section">
        <h2 class="cp-section__title">ByzTextarea & ByzSelect</h2>
        <div class="cp-grid-2">
          <ByzTextarea
            v-model="textareaVal"
            label="Opmerking"
            placeholder="Schrijf hier je opmerking…"
            hint="Max. 500 tekens"
            :rows="4"
          />
          <ByzSelect
            v-model="selectVal"
            label="Framework"
            :options="selectOptions"
            placeholder="Kies een framework…"
            hint="Gebaseerd op je project"
          />
        </div>
      </section>

      <!-- ByzTooltip -->
      <section class="cp-section">
        <h2 class="cp-section__title">ByzTooltip</h2>
        <div class="cp-group">
          <div class="cp-row">
            <ByzTooltip content="Boven de knop" placement="top">
              <ByzButton variant="secondary" size="sm">Hover mij (top)</ByzButton>
            </ByzTooltip>
            <ByzTooltip content="Rechts van de knop" placement="right">
              <ByzButton variant="secondary" size="sm">Rechts</ByzButton>
            </ByzTooltip>
            <ByzTooltip content="Onder de knop" placement="bottom">
              <ByzButton variant="secondary" size="sm">Onder</ByzButton>
            </ByzTooltip>
          </div>
        </div>
      </section>

      <!-- ByzTag -->
      <section class="cp-section">
        <h2 class="cp-section__title">ByzTag</h2>
        <div class="cp-group">
          <div class="cp-row">
            <ByzTag v-for="tag in tags" :key="tag" :label="tag" removable @remove="removeTag(tag)" />
          </div>
          <div class="cp-row" style="margin-top:.75rem">
            <ByzTag label="Success" variant="success" />
            <ByzTag label="Warning" variant="warning" />
            <ByzTag label="Error"   variant="error" />
            <ByzTag label="Info"    variant="info" />
          </div>
        </div>
      </section>

      <!-- ByzLink -->
      <section class="cp-section">
        <h2 class="cp-section__title">ByzLink</h2>
        <div class="cp-group">
          <div class="cp-stack">
            <div><ByzLink href="#">Standaard link</ByzLink></div>
            <div><ByzLink href="#" variant="accent">Accent link</ByzLink></div>
            <div><ByzLink href="#" variant="muted">Muted link</ByzLink></div>
            <div><ByzLink href="https://byzantium.dev" :external="true">Externe link</ByzLink></div>
            <div><ByzLink href="#" underline="always">Altijd onderstreept</ByzLink></div>
          </div>
        </div>
      </section>

      <!-- ByzPopover -->
      <section class="cp-section">
        <h2 class="cp-section__title">ByzPopover</h2>
        <div class="cp-group">
          <div class="cp-row">
            <ByzPopover placement="bottom">
              <template #trigger>
                <ByzButton variant="secondary" size="sm">Klik voor popover ▾</ByzButton>
              </template>
              <h3 style="margin-bottom:.5rem;font-size:1rem;">Instellingen</h3>
              <p style="font-size:.875rem;color:var(--byz-color-text-muted);margin-bottom:.75rem;">Pas je voorkeuren aan.</p>
              <ByzButton variant="primary" size="sm">Opslaan</ByzButton>
            </ByzPopover>
            <ByzPopover placement="bottom" trigger="hover">
              <template #trigger>
                <ByzButton variant="ghost" size="sm">Hover popover</ByzButton>
              </template>
              <p style="font-size:.875rem;">Getoond bij hover.</p>
            </ByzPopover>
          </div>
        </div>
      </section>

      <!-- ByzDrawer -->
      <section class="cp-section">
        <h2 class="cp-section__title">ByzDrawer</h2>
        <div class="cp-group">
          <ByzButton variant="secondary" size="sm" @click="drawerOpen = true">Open drawer →</ByzButton>
          <ByzDrawer :open="drawerOpen" title="Instellingen" @close="drawerOpen = false">
            <div style="display:flex;flex-direction:column;gap:1rem;">
              <ByzSwitch :model-value="true" label="Meldingen inschakelen" />
              <ByzSwitch :model-value="false" label="Marketing e-mails" />
              <ByzSelect :model-value="'nl'" label="Taal" :options="[{value:'nl',label:'Nederlands'},{value:'en',label:'English'}]" />
            </div>
            <template #footer>
              <div style="display:flex;gap:.5rem;">
                <ByzButton variant="primary" size="sm" @click="drawerOpen = false">Opslaan</ByzButton>
                <ByzButton variant="ghost"   size="sm" @click="drawerOpen = false">Annuleren</ByzButton>
              </div>
            </template>
          </ByzDrawer>
        </div>
      </section>

      <!-- ByzStepper -->
      <section class="cp-section">
        <h2 class="cp-section__title">ByzStepper</h2>
        <div class="cp-group">
          <ByzStepper
            v-model="stepperActive"
            :steps="stepperSteps"
            :completed-steps="stepperCompleted"
          />
        </div>
        <div class="cp-group">
          <h3 class="cp-group__title">Verticaal</h3>
          <ByzStepper
            v-model="stepperActive"
            :steps="stepperSteps.slice(0, 3)"
            :completed-steps="stepperCompleted"
            orientation="vertical"
          />
        </div>
      </section>

      <!-- ByzAlert -->
      <section class="cp-section">
        <h2 class="cp-section__title">ByzAlert</h2>
        <div class="cp-stack">
          <ByzAlert type="info"    title="Informatie">Dit is een informatieve melding.</ByzAlert>
          <ByzAlert type="success" title="Gelukt">De wijzigingen zijn opgeslagen.</ByzAlert>
          <ByzAlert type="warning" title="Let op">Deze actie kan niet ongedaan worden.</ByzAlert>
          <ByzAlert type="error"   title="Fout">Er is iets misgegaan. Probeer opnieuw.</ByzAlert>
        </div>
      </section>

      <!-- ByzCard & ByzModal -->
      <section class="cp-section">
        <h2 class="cp-section__title">ByzCard & ByzModal</h2>
        <div class="cp-grid-3">
          <ByzCard padding="sm"><h3 style="margin-bottom:.5rem">Small</h3><p>Compacte card.</p></ByzCard>
          <ByzCard padding="md"><h3 style="margin-bottom:.5rem">Medium</h3><p>Standaard card.</p></ByzCard>
          <ByzCard padding="md" :elevated="true">
            <h3 style="margin-bottom:.5rem">Elevated</h3>
            <ByzButton size="sm" @click="modalOpen = true">Open modal</ByzButton>
          </ByzCard>
        </div>
        <ByzModal :open="modalOpen" title="Voorbeeld modal" @close="modalOpen = false">
          <p>Dit is de inhoud van de modal. Druk Escape of klik buiten om te sluiten.</p>
          <template #footer>
            <div style="display:flex;gap:.5rem;">
              <ByzButton variant="primary" size="sm" @click="modalOpen = false">Bevestigen</ByzButton>
              <ByzButton variant="ghost"   size="sm" @click="modalOpen = false">Annuleren</ByzButton>
            </div>
          </template>
        </ByzModal>
      </section>

      <!-- ByzToast -->
      <section class="cp-section">
        <h2 class="cp-section__title">ByzToastContainer</h2>
        <div class="cp-group">
          <div class="cp-row">
            <ByzButton size="sm" variant="secondary" @click="addToast('Opgeslagen!', 'success')">Success toast</ByzButton>
            <ByzButton size="sm" variant="secondary" @click="addToast('Er is een fout opgetreden.', 'error')">Error toast</ByzButton>
            <ByzButton size="sm" variant="secondary" @click="addToast('Let op: dit kan niet ongedaan.', 'warning')">Warning toast</ByzButton>
            <ByzButton size="sm" variant="secondary" @click="addToast('Byzantium v0.1.0 beschikbaar.', 'info')">Info toast</ByzButton>
          </div>
        </div>
      </section>

      <!-- ByzBreadcrumb -->
      <section class="cp-section">
        <h2 class="cp-section__title">ByzBreadcrumb</h2>
        <ByzBreadcrumb :items="[
          { label: 'Home', href: '/' },
          { label: 'Components', href: '/components' },
          { label: 'ByzBreadcrumb' },
        ]" />
      </section>

      <!-- ByzProgress -->
      <section class="cp-section">
        <h2 class="cp-section__title">ByzProgress</h2>
        <div class="cp-group">
          <div class="cp-stack">
            <ByzProgress :value="progressVal" label="Voortgang" :show-value="true" />
            <ByzProgress :value="100" variant="success" label="Voltooid" :show-value="true" />
            <ByzProgress :value="30"  variant="error"   label="Mislukt"  :show-value="true" />
            <ByzProgress :value="0"   :indeterminate="true" label="Laden…" />
          </div>
        </div>
      </section>

      <!-- ByzTabs -->
      <section class="cp-section">
        <h2 class="cp-section__title">ByzTabs</h2>
        <ByzTabs v-model="activeTab" :tabs="tabs">
          <template #default="{ activeId }">
            <div style="padding: 1.5rem 0;">
              <div v-if="activeId === 'tokens'">Tokens — kleur, spacing, typografie en motion als CSS custom properties.</div>
              <div v-if="activeId === 'components'">Componenten — 22 kant-en-klare Vue 3 componenten in drie lagen.</div>
              <div v-if="activeId === 'patronen'">Patronen — volledige paginasecties gebouwd uit composites en primitives.</div>
            </div>
          </template>
        </ByzTabs>
      </section>

      <!-- ByzAccordion -->
      <section class="cp-section">
        <h2 class="cp-section__title">ByzAccordion</h2>
        <ByzAccordion :items="accordionItems" :default-open="['a1']" />
      </section>

      <!-- ByzDropdown -->
      <section class="cp-section">
        <h2 class="cp-section__title">ByzDropdown</h2>
        <div class="cp-group">
          <ByzDropdown :items="dropdownItems" @select="addToast(`Actie: ${$event}`, 'info')">
            <template #trigger>
              <ByzButton variant="secondary" size="sm">Acties ▾</ByzButton>
            </template>
          </ByzDropdown>
        </div>
      </section>

      <!-- ByzTable -->
      <section class="cp-section">
        <h2 class="cp-section__title">ByzTable</h2>
        <ByzTable :columns="tableColumns" :rows="tableRows" :striped="true" />
      </section>

      <!-- ByzPagination -->
      <section class="cp-section">
        <h2 class="cp-section__title">ByzPagination</h2>
        <ByzPagination v-model="currentPage" :total="120" :per-page="10" />
      </section>

      <!-- ByzPageHeader -->
      <section class="cp-section">
        <h2 class="cp-section__title">ByzPageHeader</h2>
        <div class="cp-preview">
          <ByzPageHeader
            title="Overzicht"
            subtitle="Alle componenten van het Byzantium design system."
            :breadcrumbs="[{ label: 'Home', href: '/' }, { label: 'Overzicht' }]"
          >
            <template #actions>
              <ByzButton size="sm" variant="primary">Nieuw</ByzButton>
            </template>
          </ByzPageHeader>
        </div>
      </section>

      <!-- ByzEmptyState -->
      <section class="cp-section">
        <h2 class="cp-section__title">ByzEmptyState</h2>
        <div class="cp-preview">
          <ByzEmptyState
            icon="◇"
            title="Geen componenten gevonden"
            description="Er zijn geen componenten die overeenkomen met je zoekopdracht. Probeer een andere term."
          >
            <template #actions>
              <ByzButton size="sm" variant="primary">Reset filters</ByzButton>
            </template>
          </ByzEmptyState>
        </div>
      </section>

    </main>

    <!-- ByzFooter -->
    <ByzFooter
      brand="Byzantium"
      :links="[{ label: 'GitHub', href: '#' }, { label: 'Changelog', href: '#' }]"
      copyright="© 2026 Byzantium"
    />

  </div>
</template>

<style lang="scss" scoped>
.cp-page { min-height: 100vh; display: flex; flex-direction: column; }

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

.cp-row {
  display: flex; gap: var(--byz-space-3); flex-wrap: wrap; align-items: center;
  &--align-end { align-items: flex-end; }
}
.cp-stack  { display: flex; flex-direction: column; gap: var(--byz-space-3); }
.cp-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--byz-space-6); }
.cp-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--byz-space-4); }
.cp-preview { border: 1px solid var(--byz-color-border); border-radius: 0.5rem; overflow: hidden; }
</style>
