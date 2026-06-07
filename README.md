# Byzantium

> A structured, accessible design system built on semantic tokens,
> reusable components and clear patterns.
> The single source of truth for everything visual.

---

## Overview

Byzantium is a dark-first Vue 3 design system written in TypeScript and SCSS. It provides a complete component library, a semantic token layer, and accessibility utilities — all packaged as `@byzantium/core`.

The visual language is built around an **Imperial Dark** theme: deep backgrounds, a crimson/burgundy brand palette (`--byz-brand-*`), and Cormorant Garamond + Syne as the type pairing. Light mode is available via the `[data-theme="light"]` attribute.

The system follows a three-tier component model (Primitives → Composites → Patterns), ensuring every UI element traces back to a single token and a single source of truth.

---

## Quick start

```bash
pnpm install
pnpm dev        # Start the Nuxt 4 playground at localhost:3002
pnpm build      # Build @byzantium/core
pnpm test       # Run Vitest unit tests
pnpm typecheck  # vue-tsc --noEmit
```

---

## Packages

| Package | Description |
|---------|-------------|
| `@byzantium/core` | Design tokens, all components, composables |
| `playground` | Nuxt 4 development sandbox for interactive component exploration |

---

## Architecture

Byzantium separates concerns into three layers so that complexity never leaks upward.

### Primitives
Single-purpose building blocks. Each primitive maps to one element and one responsibility. They accept no layout opinions; they only manage their own visual state.

### Composites
Combinations of two or more primitives arranged into a cohesive UI unit. A composite may own local state but delegates all visual decisions to the primitives it contains.

### Patterns
Full page sections assembled from composites and primitives. Patterns represent repeatable page-level structures such as navigation, hero areas, and sidebars.

---

## Tokens

All design decisions are expressed as CSS custom properties prefixed `--byz-*` and resolved at runtime, enabling theming without JavaScript.

| Category | Example properties |
|----------|--------------------|
| **Color** | `--byz-brand-500`, `--byz-color-surface`, `--byz-color-text-primary` |
| **Spacing** | `--byz-space-1` … `--byz-space-16` (4 px base grid) |
| **Typography** | `--byz-font-serif` (Cormorant), `--byz-font-sans` (Syne), `--byz-text-sm` … `--byz-text-3xl` |
| **Motion** | `--byz-duration-fast`, `--byz-duration-slow`, `--byz-ease-default` |
| **Shadows** | `--byz-shadow-sm`, `--byz-shadow-md`, `--byz-shadow-lg` |
| **Breakpoints** | `--byz-bp-sm` … `--byz-bp-2xl` |
| **Z-index** | `--byz-z-modal`, `--byz-z-toast`, `--byz-z-tooltip` |

Tokens are declared in the `:root` selector (Imperial Dark defaults). The light theme overrides only the properties that change under `[data-theme="light"]`.

---

## Components

### Primitives

| Component | Description |
|-----------|-------------|
| `ByzButton` | Action button with `primary`, `secondary`, `ghost`, and `danger` variants; loading state with built-in spinner |
| `ByzInput` | Text input with label, helper text, error state, and prefix/suffix slots |
| `ByzIcon` | SVG icon wrapper; accepts a name prop mapped to the icon registry |
| `ByzBadge` | Inline status label with semantic variants and an optional dot mode |
| `ByzAvatar` | User avatar with image, initials fallback, and size variants |
| `ByzSpinner` | Accessible loading indicator; respects `prefers-reduced-motion` |
| `ByzSkeleton` | Placeholder shimmer for loading states |
| `ByzCheckbox` | Accessible checkbox with indeterminate support |
| `ByzRadio` | Radio button for use inside a radio group |
| `ByzSwitch` | Toggle switch with ARIA `role="switch"` |
| `ByzTextarea` | Multi-line text input with auto-resize option |
| `ByzSelect` | Native select element with custom styling |
| `ByzTooltip` | Hover/focus tooltip with configurable placement |
| `ByzTag` | Dismissible or static tag for metadata and labels |
| `ByzLink` | Anchor element with router-link compatibility |
| `ByzAnnouncer` | Invisible live region that feeds updates to screen readers |

### Composites

| Component | Description |
|-----------|-------------|
| `ByzAlert` | Contextual feedback message with icon and dismiss action |
| `ByzCard` | Surface container with header, body, and footer slots |
| `ByzModal` | Dialog with focus trap, backdrop, and scroll lock |
| `ByzToastContainer` | Positioned container that renders active toasts from `useToast` |
| `ByzBreadcrumb` | Navigation breadcrumb with structured data support |
| `ByzProgress` | Linear progress bar; supports indeterminate state |
| `ByzTabs` | Accessible tabbed interface with keyboard navigation |
| `ByzAccordion` | Collapsible content panels with animated transitions |
| `ByzDropdown` | Trigger + floating panel for action menus |
| `ByzTable` | Data table with sortable columns and row selection |
| `ByzPagination` | Page navigation controls with ellipsis compression |
| `ByzStepper` | Multi-step wizard indicator |
| `ByzPopover` | Rich floating content anchored to a trigger element |
| `ByzDrawer` | Slide-in panel from any edge of the viewport |

### Patterns

| Component | Description |
|-----------|-------------|
| `ByzHero` | Full-width hero section with heading, subtext, and CTA slots |
| `ByzNavbar` | Top navigation bar with responsive mobile collapse |
| `ByzPageHeader` | Page-level heading area with breadcrumb and action slots |
| `ByzEmptyState` | Zero-data placeholder with icon, message, and action |
| `ByzFooter` | Site footer with columns, links, and brand slot |
| `ByzSidebar` | Collapsible side navigation with nested menu support |

---

## Usage

Install `@byzantium/core` and import what you need:

```ts
import { ByzButton, ByzCard, useTheme } from '@byzantium/core'
import '@byzantium/core/styles'
```

Use components in your template:

```vue
<template>
  <ByzCard>
    <template #header>Account settings</template>
    <ByzButton variant="primary" @click="save">Save changes</ByzButton>
    <ByzButton variant="ghost" @click="cancel">Cancel</ByzButton>
  </ByzCard>
</template>
```

---

## Theming

Byzantium ships in **Imperial Dark** by default. No configuration is required — the dark theme is the base.

### Switching themes

Use the `useTheme` composable to toggle or set the active theme programmatically:

```ts
import { useTheme } from '@byzantium/core'

const { theme, setTheme, toggleTheme } = useTheme()

toggleTheme()          // dark ↔ light
setTheme('light')      // explicit
```

Internally, `useTheme` sets the `data-theme` attribute on `<html>`. You can also set it manually:

```html
<html data-theme="light">
```

### Custom tokens

Override any `--byz-*` property on `:root` or a scoped selector to extend the theme without forking the package:

```css
:root {
  --byz-brand-500: #7c3aed;   /* swap the brand to violet */
}
```

---

## Accessibility

Byzantium is built with WCAG 2.1 AA compliance as a baseline.

- **ARIA patterns** — all interactive components implement the correct ARIA roles, states, and properties as specified by the ARIA Authoring Practices Guide.
- **Keyboard navigation** — modals, dropdowns, tabs, and accordions handle full keyboard interactions including arrow-key navigation and `Escape` dismissal.
- **Focus trap** — the `useFocusTrap` composable keeps focus within dialogs and drawers until they are dismissed, preventing screen reader users from escaping into inert content.
- **Live announcements** — the `useAnnouncer` composable writes to an ARIA live region (`ByzAnnouncer`) so dynamic changes (toast messages, form errors, status updates) are announced without visual focus movement.
- **Touch targets** — all interactive elements meet a minimum 44 × 44 px touch target size.
- **Reduced motion** — animations and transitions respect `prefers-reduced-motion: reduce` at the token level, so the entire system adapts automatically.

---

## Development

```bash
# Install all workspace dependencies
pnpm install

# Start the Nuxt playground (hot reload)
pnpm dev

# Run unit tests (from the repo root)
pnpm test

# Run unit tests for @byzantium/core only
pnpm --filter @byzantium/core test

# Type-check the full workspace
pnpm typecheck

# Build the package
pnpm build
```

The playground at `playground/` contains a Nuxt 4 app that imports directly from the workspace package. Any changes to `packages/byzantium/src` are reflected immediately without a build step.

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for branch conventions, commit message format, component authoring guidelines, and the review process.

---

## License

MIT — see [LICENSE](./LICENSE).
