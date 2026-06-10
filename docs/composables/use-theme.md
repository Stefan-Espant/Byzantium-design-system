# useTheme

A composable for reading and setting the active color theme. The theme is persisted to `localStorage` and applied as a `data-theme` attribute on `<html>`, so CSS custom property overrides work globally.

Byzantium defaults to **Imperial Dark** (`'dark'`) on first load.

## Import

```ts
import { useTheme } from '@byzantium-design-system/core'
```

## API

| Return value | Type | Description |
|---|---|---|
| `theme` | `Ref<'light' \| 'dark'>` | Reactive reference to the current theme |
| `setTheme(value)` | `(value: 'light' \| 'dark') => void` | Set a specific theme and persist it |
| `toggle()` | `() => void` | Toggle between `'light'` and `'dark'` |
| `init()` | `() => void` | Read from `localStorage` or fall back to `prefers-color-scheme` |

## Basic Usage

```vue
<script setup lang="ts">
import { onMounted } from 'vue'
import { useTheme } from '@byzantium-design-system/core'

const { theme, toggle, init } = useTheme()

onMounted(() => {
  init()
})
</script>

<template>
  <button @click="toggle">
    Switch to {{ theme === 'dark' ? 'light' : 'dark' }} mode
  </button>
</template>
```

## Setting a Specific Theme

```ts
const { setTheme } = useTheme()

setTheme('light')
setTheme('dark')
```

## Initializing on App Mount

Call `init()` once in your root component or `App.vue` to hydrate the theme from stored preferences:

```ts
// App.vue
import { onMounted } from 'vue'
import { useTheme } from '@byzantium-design-system/core'

const { init } = useTheme()

onMounted(() => {
  init()
})
```

`init()` reads from `localStorage` first. If no stored value is found, it checks `window.matchMedia('(prefers-color-scheme: dark)')` and sets the theme accordingly.

## Reacting to Theme Changes

`theme` is a shared `ref` — all components calling `useTheme()` share the same reactive state:

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '@byzantium-design-system/core'

const { theme } = useTheme()
const isDark = computed(() => theme.value === 'dark')
</script>
```

## localStorage Key

The theme is stored under `byz-theme`. To clear a user's preference:

```ts
localStorage.removeItem('byz-theme')
```

## CSS Integration

Setting the theme calls `document.documentElement.setAttribute('data-theme', value)`. Your CSS should define token overrides scoped to `[data-theme="light"]` and `[data-theme="dark"]`:

```css
:root,
[data-theme="dark"] {
  --byz-color-background: #0d0d0d;
  --byz-color-text-primary: #f0f0f0;
}

[data-theme="light"] {
  --byz-color-background: #ffffff;
  --byz-color-text-primary: #111111;
}
```
