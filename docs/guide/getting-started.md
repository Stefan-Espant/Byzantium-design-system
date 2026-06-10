# Getting Started

Byzantium is a structured, accessible Vue 3 design system built for production. It provides 36 components, 60+ semantic design tokens, full TypeScript support, and dark/light mode out of the box.

## Installation

Install `@byzantium-design-system/core` using your preferred package manager:

::: code-group

```sh [pnpm]
pnpm add @byzantium-design-system/core
```

```sh [npm]
npm install @byzantium-design-system/core
```

```sh [yarn]
yarn add @byzantium-design-system/core
```

:::

## Basic Usage

Import components directly in your Vue files:

```vue
<script setup lang="ts">
import { ByzButton, ByzInput } from '@byzantium-design-system/core'
</script>

<template>
  <ByzInput label="Email" v-model="email" type="email" />
  <ByzButton variant="primary" @click="submit">Submit</ByzButton>
</template>
```

## Register Globally

To register all components globally in your Vue app:

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { ByzButton, ByzInput } from '@byzantium-design-system/core'
import '@byzantium-design-system/core/styles'

const app = createApp(App)

app.component('ByzButton', ByzButton)
app.component('ByzInput', ByzInput)
// ...register other components as needed

app.mount('#app')
```

## Theme Setup

Byzantium ships with **Imperial Dark** as its default theme. Use the `useTheme()` composable to control theme at runtime:

```vue
<script setup lang="ts">
import { onMounted } from 'vue'
import { useTheme } from '@byzantium-design-system/core'

const { theme, setTheme, toggle, init } = useTheme()

onMounted(() => {
  // Reads from localStorage and respects prefers-color-scheme
  init()
})
</script>

<template>
  <button @click="toggle">
    Current theme: {{ theme }}
  </button>
</template>
```

### Setting a Specific Theme

```ts
const { setTheme } = useTheme()

setTheme('light')  // or 'dark'
```

The theme value is persisted to `localStorage` under the key `byz-theme` and applied via the `data-theme` attribute on `<html>`.

## TypeScript

Byzantium is written in strict TypeScript. All props, emits, and composable return types are fully typed — no additional `@types` packages needed.

## Next Steps

- Browse [all components](/components/button) to see what's available
- Learn about [design tokens](/guide/tokens) to customize the system
- Explore [composables](/composables/use-theme) for shared logic
