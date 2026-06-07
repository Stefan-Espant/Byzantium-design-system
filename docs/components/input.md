# ByzInput

An accessible text input with built-in label, hint, and error message handling. Uses `v-model` for two-way binding and wires all ARIA relationships automatically.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `modelValue` | `string` | `undefined` | The bound value (use with `v-model`) |
| `label` | `string` | — | **Required.** Visible label text rendered above the input |
| `type` | `'text' \| 'email' \| 'password' \| 'number' \| 'tel' \| 'url'` | `'text'` | Native input type |
| `placeholder` | `string` | `undefined` | Placeholder text |
| `disabled` | `boolean` | `false` | Disables the input |
| `error` | `string` | `undefined` | Error message shown below the input; sets `aria-invalid` |
| `hint` | `string` | `undefined` | Helper text shown below the input when there is no error |
| `required` | `boolean` | `false` | Marks the field as required; shows a `*` indicator |

## Events

| Event | Payload | Description |
|---|---|---|
| `update:modelValue` | `string` | Emitted on every `input` event |

## Basic Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { ByzInput } from '@byzantium/core'

const email = ref('')
</script>

<template>
  <ByzInput
    v-model="email"
    label="Email address"
    type="email"
    placeholder="you@example.com"
  />
</template>
```

## With Hint Text

```vue
<ByzInput
  v-model="username"
  label="Username"
  hint="3–20 characters, letters and numbers only"
/>
```

## Error State

Pass a string to `error` to trigger the error state. The message is linked via `aria-describedby` and announced by screen readers:

```vue
<ByzInput
  v-model="email"
  label="Email address"
  type="email"
  :error="emailError"
/>
```

## Required Field

```vue
<ByzInput
  v-model="name"
  label="Full name"
  required
/>
```

The `required` attribute is set on the native `<input>` and a visible `*` indicator is added to the label.

## Disabled State

```vue
<ByzInput
  v-model="value"
  label="Read-only field"
  disabled
/>
```

## Password Input

```vue
<ByzInput
  v-model="password"
  label="Password"
  type="password"
  hint="Minimum 8 characters"
/>
```

## Accessibility

- Every input has a visible `<label>` associated via `for`/`id`
- `aria-describedby` links the input to any active hint or error message
- `aria-invalid="true"` is set when an `error` prop is present
- Error messages use `role="alert"` for immediate announcement
- Minimum touch target of 44px (`min-height: 44px`) on the input field
- Focus ring uses `--byz-color-focus` with 3:1 contrast ratio minimum
