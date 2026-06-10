<script setup lang="ts">
import {
  ByzInput, ByzTextarea, ByzSelect, ByzCheckbox, ByzRadio, ByzSwitch,
  ByzSearchInput, ByzFileUpload, ByzCombobox, ByzDatePicker, ByzFormField,
  ByzToastContainer, ByzFooter, ByzRating, ByzCode, ByzKbd,
  useToast, useForm,
} from '@byzantium-design-system/core'
import { usePlaygroundLocale } from '~/composables/usePlaygroundLocale'

const { p } = usePlaygroundLocale()
const { add: addToast } = useToast()

// --- Input demos ---
const inputText    = ref('')
const inputEmail   = ref('')
const inputPass    = ref('')
const inputNumber  = ref('')

// --- Textarea ---
const textareaVal  = ref('')

// --- Select ---
const selectVal    = ref('')
const selectOpts   = [
  { value: 'vue',    label: 'Vue 3' },
  { value: 'nuxt',   label: 'Nuxt 4' },
  { value: 'svelte', label: 'Svelte 5' },
  { value: 'react',  label: 'React 19' },
]

// --- Combobox ---
const comboVal = ref('')
const comboOpts = [
  { value: 'nl', label: 'Nederlands' },
  { value: 'en', label: 'English' },
  { value: 'de', label: 'Deutsch' },
  { value: 'fr', label: 'Français' },
  { value: 'es', label: 'Español' },
  { value: 'it', label: 'Italiano' },
  { value: 'pt', label: 'Português' },
]

// --- DatePicker ---
const dateVal = ref('')

// --- Checkbox / Radio ---
const checkA   = ref(true)
const checkB   = ref(false)
const checkInd = ref(false)
const radioVal = ref('b')

// --- Switch ---
const switchA = ref(true)
const switchB = ref(false)

// --- SearchInput ---
const searchVal = ref('')

// --- FileUpload ---
const files = ref<File[]>([])

// --- Rating ---
const ratingVal = ref(3)

// --- useForm demo ---
const form = useForm({
  initialValues: { naam: '', email: '', bericht: '' } as { naam: string; email: string; bericht: string },
  validate: (v) => ({
    naam:    !v.naam               ? 'Naam is verplicht'        : undefined,
    email:   !v.email.includes('@') ? 'Ongeldig e-mailadres'    : undefined,
    bericht: v.bericht.length < 10 ? 'Minimaal 10 tekens'       : undefined,
  }),
  onSubmit: async () => {
    addToast({ title: 'Verstuurd!', description: 'Je bericht is ontvangen.', variant: 'success' })
    form.handleReset()
  },
})
</script>

<template>
  <div class="fm-page">
    <ByzToastContainer />
    <PlaygroundHeader />

    <main class="fm-main">

      <!-- ByzInput -->
      <section class="fm-section">
        <h2 class="fm-section__title">ByzInput</h2>
        <div class="fm-group">
          <div class="fm-grid-2">
            <ByzInput v-model="inputText"   label="Naam"         type="text"     placeholder="Jan de Vries" />
            <ByzInput v-model="inputEmail"  label="E-mailadres"  type="email"    placeholder="jan@example.com" />
            <ByzInput v-model="inputPass"   label="Wachtwoord"   type="password" placeholder="••••••••" />
            <ByzInput v-model="inputNumber" label="Telefoonnummer" type="tel"    placeholder="+31 6 12345678" />
          </div>
        </div>
        <div class="fm-group">
          <p class="fm-group__label">States</p>
          <div class="fm-grid-2">
            <ByzInput :model-value="'stefan@example.com'" label="Met hint" type="email" hint="We sturen nooit spam." />
            <ByzInput :model-value="''" label="Verplicht veld" required error="Dit veld is verplicht" />
            <ByzInput :model-value="'uitgeschakeld'" label="Uitgeschakeld" disabled />
            <ByzInput :model-value="''" label="Zoekterm" type="search" placeholder="Zoek…" />
          </div>
        </div>
      </section>

      <!-- ByzTextarea -->
      <section class="fm-section">
        <h2 class="fm-section__title">ByzTextarea</h2>
        <div class="fm-group">
          <div class="fm-grid-2">
            <ByzTextarea v-model="textareaVal" label="Bericht" placeholder="Typ hier je bericht…" :rows="4" />
            <ByzTextarea :model-value="''" label="Geen resize" placeholder="Vaste hoogte" resize="none" :rows="4" />
            <ByzTextarea :model-value="''" label="Met hint" hint="Maximaal 500 tekens." :rows="3" />
            <ByzTextarea :model-value="''" label="Met fout" error="Bericht is te kort." :rows="3" />
          </div>
        </div>
      </section>

      <!-- ByzSelect + ByzCombobox -->
      <section class="fm-section">
        <h2 class="fm-section__title">ByzSelect & ByzCombobox</h2>
        <div class="fm-group">
          <div class="fm-grid-2">
            <ByzSelect v-model="selectVal" label="Framework" :options="selectOpts" placeholder="Kies een framework" />
            <ByzSelect :model-value="''" label="Uitgeschakeld" :options="selectOpts" disabled />
            <ByzCombobox v-model="comboVal" label="Taal zoeken" :options="comboOpts" placeholder="Zoek of selecteer taal" />
            <ByzSelect :model-value="''" label="Met fout" :options="selectOpts" error="Selectie is verplicht" />
          </div>
        </div>
      </section>

      <!-- ByzDatePicker -->
      <section class="fm-section">
        <h2 class="fm-section__title">ByzDatePicker</h2>
        <div class="fm-group">
          <div class="fm-grid-2">
            <ByzDatePicker v-model="dateVal" label="Geboortedatum" />
            <ByzDatePicker :model-value="''" label="Startdatum" min="2024-01-01" max="2026-12-31" hint="Kies een datum in 2024–2026." />
          </div>
        </div>
      </section>

      <!-- ByzCheckbox + ByzRadio -->
      <section class="fm-section">
        <h2 class="fm-section__title">ByzCheckbox & ByzRadio</h2>
        <div class="fm-group">
          <div class="fm-grid-2">
            <div class="fm-stack">
              <p class="fm-group__label">Selectievakjes</p>
              <ByzCheckbox v-model="checkA" label="Nieuwsbrief ontvangen" />
              <ByzCheckbox v-model="checkB" label="Marketingberichten" />
              <ByzCheckbox v-model="checkInd" label="Alle selecteren" :indeterminate="checkA !== checkB" />
              <ByzCheckbox :model-value="false" label="Uitgeschakeld" disabled />
              <ByzCheckbox :model-value="false" label="Met fout" error="Accepteer de voorwaarden" />
            </div>
            <div class="fm-stack">
              <p class="fm-group__label">Keuzerondjes</p>
              <ByzRadio v-model="radioVal" value="a" label="Maandelijks" name="plan" />
              <ByzRadio v-model="radioVal" value="b" label="Jaarlijks (20% korting)" name="plan" />
              <ByzRadio v-model="radioVal" value="c" label="Zakelijk" name="plan" />
              <ByzRadio :model-value="''" value="d" label="Uitgeschakeld" name="plan" disabled />
            </div>
          </div>
        </div>
      </section>

      <!-- ByzSwitch + ByzFormField -->
      <section class="fm-section">
        <h2 class="fm-section__title">ByzSwitch & ByzFormField</h2>
        <div class="fm-group">
          <div class="fm-grid-2">
            <div class="fm-stack">
              <p class="fm-group__label">ByzSwitch</p>
              <ByzSwitch v-model="switchA" label="Meldingen inschakelen" />
              <ByzSwitch v-model="switchB" label="E-mailnotificaties" size="sm" />
              <ByzSwitch :model-value="false" label="Uitgeschakeld" disabled />
            </div>
            <div class="fm-stack">
              <p class="fm-group__label">ByzFormField wrapper</p>
              <ByzFormField label="Voornaam" hint="Zoals in je paspoort." required :touched="true" error="">
                <ByzInput :model-value="'Stefan'" label="" />
              </ByzFormField>
              <ByzFormField label="Achternaam" required :touched="true" error="Achternaam is verplicht">
                <ByzInput :model-value="''" label="" />
              </ByzFormField>
            </div>
          </div>
        </div>
      </section>

      <!-- ByzSearchInput + ByzFileUpload -->
      <section class="fm-section">
        <h2 class="fm-section__title">ByzSearchInput & ByzFileUpload</h2>
        <div class="fm-group">
          <div class="fm-grid-2">
            <ByzSearchInput v-model="searchVal" placeholder="Zoek componenten…" clearable />
            <ByzSearchInput :model-value="''" placeholder="Laden…" :loading="true" />
            <ByzFileUpload v-model="files" label="Profielfoto" accept="image/*" />
            <ByzFileUpload v-model="files" label="Documenten" accept=".pdf,.docx" multiple />
          </div>
        </div>
      </section>

      <!-- ByzRating -->
      <section class="fm-section">
        <h2 class="fm-section__title">ByzRating</h2>
        <div class="fm-group">
          <div class="fm-grid-3">
            <div class="fm-stack">
              <p class="fm-group__label">Interactief</p>
              <ByzRating v-model="ratingVal" aria-label="Geef een beoordeling" />
              <span class="fm-hint">{{ ratingVal }} van 5 sterren</span>
            </div>
            <div class="fm-stack">
              <p class="fm-group__label">Readonly</p>
              <ByzRating :model-value="4" readonly />
              <ByzRating :model-value="2" readonly size="sm" />
            </div>
            <div class="fm-stack">
              <p class="fm-group__label">Formaten</p>
              <ByzRating :model-value="3" size="sm" readonly />
              <ByzRating :model-value="3" size="md" readonly />
              <ByzRating :model-value="3" size="lg" readonly />
            </div>
          </div>
        </div>
      </section>

      <!-- ByzKbd -->
      <section class="fm-section">
        <h2 class="fm-section__title">ByzKbd</h2>
        <div class="fm-group">
          <div class="fm-row">
            <ByzKbd keys="⌘K" />
            <ByzKbd :keys="['Ctrl', 'Shift', 'P']" />
            <ByzKbd :keys="['⌘', 'C']" />
            <ByzKbd :keys="['Alt', 'F4']" />
            <ByzKbd keys="Escape" />
          </div>
        </div>
      </section>

      <!-- useForm demo -->
      <section class="fm-section">
        <h2 class="fm-section__title">useForm — volledig formulier</h2>
        <p class="fm-section__sub">Klik op Versturen zonder invoer om validatie te zien.</p>
        <div class="fm-group">
          <div class="fm-grid-2">
            <form class="fm-form" novalidate @submit.prevent="form.handleSubmit">
              <ByzInput
                v-bind="form.getFieldProps('naam')"
                label="Naam"
                type="text"
                placeholder="Jan de Vries"
                required
                :error="form.touched.naam ? form.errors.naam : undefined"
              />
              <ByzInput
                v-bind="form.getFieldProps('email')"
                label="E-mailadres"
                type="email"
                placeholder="jan@example.com"
                required
                :error="form.touched.email ? form.errors.email : undefined"
              />
              <ByzTextarea
                v-bind="form.getFieldProps('bericht')"
                label="Bericht"
                placeholder="Schrijf minimaal 10 tekens…"
                required
                :rows="4"
                :error="form.touched.bericht ? (form.errors.bericht ?? undefined) : undefined"
              />
              <div class="fm-form__actions">
                <button type="button" class="fm-btn-ghost" @click="form.handleReset">Reset</button>
                <button type="submit" class="fm-btn-primary" :disabled="form.isSubmitting.value">
                  {{ form.isSubmitting.value ? 'Versturen…' : 'Versturen' }}
                </button>
              </div>
            </form>
            <div class="fm-form-state">
              <p class="fm-group__label">Formulierstatus</p>
              <ByzCode
                :code="`isDirty:      ${form.isDirty.value}\nisValid:      ${form.isValid.value}\n\nvalues:\n  naam:    '${form.values.naam}'\n  email:   '${form.values.email}'\n  bericht: '${form.values.bericht.slice(0, 20)}${form.values.bericht.length > 20 ? '…' : ''}'\n\nerrors:\n  naam:    ${form.errors.naam ? `'${form.errors.naam}'` : 'undefined'}\n  email:   ${form.errors.email ? `'${form.errors.email}'` : 'undefined'}\n  bericht: ${form.errors.bericht ? `'${form.errors.bericht}'` : 'undefined'}`"
                language="state"
                :copyable="false"
              />
            </div>
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
      copyright="© 2026 Semantique Agency"
    />
  </div>
</template>

<style lang="scss" scoped>
.fm-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--byz-color-background);
  color: var(--byz-color-text-primary);
  font-family: var(--byz-font-sans);
}

// ── Main ─────────────────────────────────────────────────────────
.fm-main {
  flex: 1;
  max-width: 72rem;
  margin: 0 auto;
  width: 100%;
  padding: var(--byz-space-12) var(--byz-space-8) var(--byz-space-24);
}

// ── Section ──────────────────────────────────────────────────────
.fm-section {
  padding: var(--byz-space-10) 0;
  border-bottom: 1px solid var(--byz-color-border);
  &:last-child { border-bottom: none; }

  &__title {
    font-family: var(--byz-font-serif);
    font-size: var(--byz-text-2xl);
    font-weight: var(--byz-font-semibold);
    color: var(--byz-color-text-primary);
    margin: 0 0 var(--byz-space-6);
    padding-bottom: var(--byz-space-3);
    border-bottom: 2px solid var(--byz-brand-500);
    display: inline-block;
  }

  &__sub {
    font-size: var(--byz-text-sm);
    color: var(--byz-color-text-muted);
    margin: calc(-1 * var(--byz-space-4)) 0 var(--byz-space-6);
  }
}

.fm-group {
  margin-bottom: var(--byz-space-8);
  &:last-child { margin-bottom: 0; }

  &__label {
    font-size: var(--byz-text-xs);
    font-weight: var(--byz-font-semibold);
    color: var(--byz-color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin: 0 0 var(--byz-space-3);
  }
}

// ── Layouts ──────────────────────────────────────────────────────
.fm-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--byz-space-6); }
.fm-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--byz-space-6); }
.fm-stack  { display: flex; flex-direction: column; gap: var(--byz-space-3); }
.fm-row    { display: flex; flex-wrap: wrap; align-items: center; gap: var(--byz-space-4); }

.fm-hint {
  font-size: var(--byz-text-xs);
  color: var(--byz-color-text-muted);
}

// ── useForm demo ─────────────────────────────────────────────────
.fm-form {
  display: flex;
  flex-direction: column;
  gap: var(--byz-space-4);

  &__actions {
    display: flex;
    gap: var(--byz-space-3);
    justify-content: flex-end;
    padding-top: var(--byz-space-2);
  }
}

.fm-btn-primary {
  padding: var(--byz-space-2) var(--byz-space-5);
  background: linear-gradient(135deg, var(--byz-brand-500) 0%, var(--byz-brand-400) 100%);
  color: #fff;
  border: none;
  border-radius: 0.375rem;
  font-family: var(--byz-font-sans);
  font-weight: var(--byz-font-semibold);
  font-size: var(--byz-text-sm);
  cursor: pointer;
  transition: opacity var(--byz-duration-fast) var(--byz-ease-default);
  &:hover:not(:disabled) { opacity: 0.88; }
  &:disabled { opacity: 0.45; cursor: not-allowed; }
}

.fm-btn-ghost {
  padding: var(--byz-space-2) var(--byz-space-4);
  background: transparent;
  color: var(--byz-color-text-muted);
  border: 1px solid var(--byz-color-border);
  border-radius: 0.375rem;
  font-family: var(--byz-font-sans);
  font-size: var(--byz-text-sm);
  cursor: pointer;
  &:hover { color: var(--byz-color-text-primary); border-color: var(--byz-brand-500); }
}

.fm-form-state {
  display: flex;
  flex-direction: column;
  gap: var(--byz-space-3);
}

// ── Mobile ───────────────────────────────────────────────────────
@media (max-width: 1080px) {
  .fm-main { padding: var(--byz-space-8) var(--byz-space-4) var(--byz-space-16); }
  .fm-grid-2, .fm-grid-3 { grid-template-columns: 1fr; }
}
</style>
