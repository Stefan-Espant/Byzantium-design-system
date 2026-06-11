<script setup lang="ts">
import { useLocale, localeNames } from '@byzantium-design-system/core'
import type { LocaleKey } from '@byzantium-design-system/core'

const { currentKey, setLocale } = useLocale()

const keys = Object.keys(localeNames) as LocaleKey[]

function onChange(e: Event) {
  setLocale((e.target as HTMLSelectElement).value as LocaleKey)
}
</script>

<template>
  <select
    class="lang-selector"
    :value="currentKey"
    :aria-label="localeNames[currentKey as LocaleKey]"
    @change="onChange"
  >
    <option v-for="key in keys" :key="key" :value="key">
      {{ key.toUpperCase() }} – {{ localeNames[key] }}
    </option>
  </select>
</template>

<style lang="scss" scoped>
.lang-selector {
  appearance: none;
  box-sizing: border-box;
  background: var(--byz-color-surface-raised);
  border: 1px solid var(--byz-color-border);
  border-radius: 0.375rem;
  color: var(--byz-color-text);
  cursor: pointer;
  font-family: var(--byz-font-mono);
  font-size: 0.75rem;
  padding: 0 1.75rem 0 0.625rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  min-width: 5.5rem;
  height: 2.25rem;

  &:hover {
    background-color: var(--byz-color-surface-hover);
    border-color: var(--byz-brand-500);
  }

  &:focus {
    outline: 2px solid var(--byz-brand-500);
    outline-offset: 2px;
  }

  option {
    background: var(--byz-color-surface-raised);
    color: var(--byz-color-text);
  }
}
</style>
