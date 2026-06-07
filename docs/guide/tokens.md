# Design Tokens

Byzantium exposes 60+ design tokens as CSS custom properties under the `--byz-` prefix. They are defined on `:root` and respond to the `data-theme` attribute on `<html>` for dark/light mode switching.

## Color

Core semantic color tokens used throughout the system.

| Token | Light value | Dark value | Usage |
|---|---|---|---|
| `--byz-color-background` | `#ffffff` | `#0d0d0d` | Page background |
| `--byz-color-surface` | `#f5f5f5` | `#1a1a1a` | Card, panel backgrounds |
| `--byz-color-border` | `#e0e0e0` | `#2e2e2e` | Borders, dividers |
| `--byz-color-text-primary` | `#111111` | `#f0f0f0` | Primary body text |
| `--byz-color-text-secondary` | `#555555` | `#aaaaaa` | Secondary / muted text |
| `--byz-color-text-disabled` | `#aaaaaa` | `#555555` | Disabled text |
| `--byz-color-focus` | `#c01030` | `#e84050` | Focus rings |
| `--byz-color-error` | `#c01030` | `#ff7070` | Error states |
| `--byz-color-success` | `#1a7a40` | `#4ade80` | Success states |
| `--byz-color-warning` | `#b45309` | `#fbbf24` | Warning states |
| `--byz-color-info` | `#1d4ed8` | `#60a5fa` | Info states |

## Spacing

Spacing tokens follow a 4 px base scale.

| Token | Value | Usage |
|---|---|---|
| `--byz-space-1` | `4px` | Tight gaps |
| `--byz-space-2` | `8px` | Small gaps, inner padding |
| `--byz-space-3` | `12px` | Medium gaps |
| `--byz-space-4` | `16px` | Standard padding |
| `--byz-space-5` | `20px` | Slightly larger gaps |
| `--byz-space-6` | `24px` | Section padding |
| `--byz-space-8` | `32px` | Large gaps |
| `--byz-space-10` | `40px` | XL gaps |
| `--byz-space-12` | `48px` | 2XL |
| `--byz-space-16` | `64px` | 3XL / hero spacing |

## Typography

| Token | Value | Usage |
|---|---|---|
| `--byz-font-sans` | `'Syne', system-ui, sans-serif` | Body and UI text |
| `--byz-font-serif` | `'Cormorant Garamond', Georgia, serif` | Display headings |
| `--byz-font-mono` | `'Source Code Pro', monospace` | Code blocks |
| `--byz-text-xs` | `0.75rem` | Fine print |
| `--byz-text-sm` | `0.875rem` | Labels, captions |
| `--byz-text-base` | `1rem` | Body text |
| `--byz-text-lg` | `1.125rem` | Large body |
| `--byz-text-xl` | `1.25rem` | Sub-headings |
| `--byz-text-2xl` | `1.5rem` | Section headings |
| `--byz-text-3xl` | `1.875rem` | Page headings |
| `--byz-text-4xl` | `2.25rem` | Hero headings |
| `--byz-font-normal` | `400` | Regular weight |
| `--byz-font-medium` | `500` | Medium weight |
| `--byz-font-semibold` | `600` | Semibold |
| `--byz-font-bold` | `700` | Bold |

## Motion

| Token | Value | Usage |
|---|---|---|
| `--byz-duration-fast` | `120ms` | Micro-interactions |
| `--byz-duration-base` | `200ms` | Standard transitions |
| `--byz-duration-slow` | `350ms` | Complex transitions |
| `--byz-ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard easing |
| `--byz-ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Enter easing |
| `--byz-ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Exit easing |

## Shadows

| Token | Usage |
|---|---|
| `--byz-shadow-sm` | Subtle elevation (badges, chips) |
| `--byz-shadow-md` | Cards, dropdowns |
| `--byz-shadow-lg` | Modals, drawers |
| `--byz-shadow-xl` | Popovers, tooltips |

## Breakpoints

| Token | Value |
|---|---|
| `--byz-breakpoint-sm` | `640px` |
| `--byz-breakpoint-md` | `768px` |
| `--byz-breakpoint-lg` | `1024px` |
| `--byz-breakpoint-xl` | `1280px` |
| `--byz-breakpoint-2xl` | `1536px` |
