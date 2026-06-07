# ByzButton

A flexible, accessible button component with multiple variants, sizes, and states. Wraps a native `<button>` element with full ARIA support.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'primary'` | Visual style of the button |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the button |
| `disabled` | `boolean` | `false` | Disables the button and prevents interaction |
| `loading` | `boolean` | `false` | Shows a spinner and marks the button as busy |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Native button type attribute |
| `ariaLabel` | `string` | `undefined` | Accessible label when button has no visible text |

## Events

| Event | Payload | Description |
|---|---|---|
| `click` | `MouseEvent` | Emitted on click when not disabled or loading |

## Slots

| Slot | Description |
|---|---|
| `default` | Button label content |

## Variants

Use the `variant` prop to communicate intent:

```vue
<ByzButton variant="primary">Save changes</ByzButton>
<ByzButton variant="secondary">Cancel</ByzButton>
<ByzButton variant="ghost">Learn more</ByzButton>
<ByzButton variant="danger">Delete account</ByzButton>
```

- **primary** — main call to action; crimson fill
- **secondary** — secondary action; outlined style
- **ghost** — tertiary action; transparent with text only
- **danger** — destructive action; red tones with warning semantics

## Sizes

```vue
<ByzButton size="sm">Small</ByzButton>
<ByzButton size="md">Medium</ByzButton>
<ByzButton size="lg">Large</ByzButton>
```

| Size | Min height | Font size | Padding |
|---|---|---|---|
| `sm` | 32px | 0.875rem | 6px 12px |
| `md` | 44px | 1rem | 10px 20px |
| `lg` | 52px | 1.125rem | 14px 28px |

## Loading State

When `loading` is `true`, the button renders a spinner, sets `aria-busy="true"`, and suppresses the `click` event:

```vue
<ByzButton :loading="isSubmitting" variant="primary">
  Submit
</ByzButton>
```

## Disabled State

When `disabled` is `true`, both `disabled` and `aria-disabled="true"` are set on the native element:

```vue
<ByzButton :disabled="!isFormValid" variant="primary">
  Continue
</ByzButton>
```

## Icon-only Button

Use `ariaLabel` when the button contains only an icon to provide an accessible name:

```vue
<ByzButton aria-label="Close dialog" variant="ghost">
  <ByzIcon name="x" />
</ByzButton>
```

## Accessibility

- Renders as a native `<button>` — keyboard focusable by default
- `aria-disabled` is set alongside the native `disabled` attribute so disabled buttons remain discoverable to screen readers
- `aria-busy="true"` is applied during loading to announce the pending state
- Minimum touch target of 44px height on `md` and `lg` sizes (WCAG 2.5.5)
- Focus ring inherits `--byz-color-focus` (crimson) with sufficient contrast in both themes
