# Roadmap naar v1.0.0 — Byzantium Design System

**Datum:** 2026-06-11
**Aanpak:** Priority-first per versie — elke release levert bruikbare winst voor echte producten.
**Doel:** Feature-complete voor marketing, web-applicaties en admin-interfaces.

---

## v0.8.0 — Stabilisatie + Moderne CSS

### Beta → Stable

Alle negen beta-componenten worden production-ready. Criterium voor `stable`: volledige keyboard-navigatie, axe-core test groen, alle props gedocumenteerd, light en dark mode getest.

| Component | Actie |
|---|---|
| `ByzFormField` | → stable |
| `ByzPopover` | → stable |
| `ByzCombobox` | → stable |
| `ByzDatePicker` | → stable |
| `ByzFileUpload` | → stable |
| `ByzSearchInput` | → stable |
| `ByzNotificationBell` | → stable |
| `ByzRating` | → stable |
| `ByzCode` | → stable |
| `ByzCommandPalette` | Beslissen: stabiliseren of deprecated |

### Nieuwe componenten

| Component | Beschrijving |
|---|---|
| `ByzSlider` | Range-slider met min/max/step, enkelvoudig en dubbel handel |
| `ByzSegmentedControl` | Knoppengroep als radio-alternatief (iOS-stijl) |
| `ByzNumberInput` | Numerieke invoer met +/− knoppen, min/max, step |
| `ByzOTPInput` | Eenmalig wachtwoord / PIN-invoer (4–8 tekens) |
| `ByzChart` | Lichtgewicht wrapper voor lijn-, staaf- en taartdiagrammen (eigen SVG, geen externe lib) |
| `ByzCalendar` | Volledige kalenderweergave (maand/week), los van `ByzDatePicker` |

### oklch kleurensysteem

Alle design tokens herschreven in `oklch` — perceptueel uniform, animeerbaar en donker-modus-vriendelijk. Gebruikers stellen hun brand-kleur in via drie variabelen; het volledige 50–950 palet wordt afgeleid via Relative Color Syntax.

```css
:root {
  --byz-brand-hue: 15;
  --byz-brand-chroma: 0.22;
  --byz-brand-lightness-mid: 45%;
}

--byz-brand-300: oklch(75% var(--byz-brand-chroma) var(--byz-brand-hue));
--byz-brand-500: oklch(var(--byz-brand-lightness-mid) var(--byz-brand-chroma) var(--byz-brand-hue));
--byz-brand-700: oklch(38% var(--byz-brand-chroma) var(--byz-brand-hue));
```

`useColor` composable biedt oklch-kleurberekeningen in JS inclusief contrast-check (APCA). De `/tokens` playground-pagina krijgt een interactieve oklch-kleurenkiezer.

### Moderne CSS-technieken

| Techniek | Toepassing |
|---|---|
| View Transitions API | `useViewTransition` composable + `ByzPageTransition` component voor Nuxt route-animaties |
| Scroll-driven Animations | `ByzScrollReveal` — fade/slide in bij scrollen via `animation-timeline: scroll()` |
| CSS Anchor Positioning | `ByzTooltip`, `ByzPopover`, `ByzDropdown` herbouwen zonder JS-positionering |
| `@starting-style` + `transition-behavior: allow-discrete` | Native CSS enter/exit-animaties voor Modal, Drawer, Alert, Toast |
| `light-dark()` | Alle kleur-tokens herschreven met `light-dark()` — één definitie voor beide modi |
| Container Queries | Card- en grid-componenten reageren op `@container` in plaats van viewport |
| `text-wrap: balance` | Standaard op headings en labels via base-styles |
| Popover API | Native `popover`-attribuut in `ByzTooltip` en `ByzDropdown` |
| `<dialog>` element | `ByzModal` herbouwen op native `<dialog>` — gratis focus-trap en `::backdrop` |
| `@property` | Design tokens als typed custom properties — animeerbaar, met fallback en inheritance-controle |
| `calc-size()` + `interpolate-size` | Height `0 → auto` animaties voor accordeon en dropdown zonder JS-hacks |
| `field-sizing: content` | Textarea in `ByzTextarea` groeit automatisch mee met inhoud |
| `@layer` | Cascade layers voor tokens, resets en component-stijlen — geen specificity-conflicten |
| `:user-valid` / `:user-invalid` | Formuliervalidatie-stijlen activeren pas na gebruikersinteractie |
| CSS Masonry | Native masonry-layout in `ByzGrid` via `grid-template-rows: masonry` |

### Progressive Enhancement met `@supports`

Elke moderne techniek heeft een gedocumenteerde fallback. Browsers zonder ondersteuning krijgen een werkende maar eenvoudigere ervaring.

```scss
// oklch met hex-fallback
.byz-button {
  background: #c01030;
  background: oklch(45% 0.22 15);
}

// View Transitions
@supports (view-transition-name: none) {
  .byz-page { view-transition-name: page; }
}

// calc-size
@supports (height: calc-size(auto)) {
  .byz-accordion__body { height: calc-size(auto); transition: height 0.2s; }
}
@supports not (height: calc-size(auto)) {
  .byz-accordion__body { max-height: 999px; overflow: hidden; transition: max-height 0.3s; }
}
```

`useFeatureSupport` composable detecteert in Vue welke features beschikbaar zijn (`supportsViewTransitions`, `supportsAnchorPos`, `supportsOklch`). SCSS-mixin-bibliotheek `@include supports-view-transitions { }` zorgt voor consistente fallback-patronen in alle componenten. Elke componentpagina toont welke features gebruikt worden en wat de fallback is.

### Nieuwe composables v0.8.0

| Composable | Beschrijving |
|---|---|
| `useLocalStorage` | Reactieve waarde gesynchroniseerd met localStorage |
| `useDebounce` | Gedebouncede ref of functie |
| `useResizeObserver` | Reactieve breedte/hoogte van een element |
| `useViewTransition` | Wrapper om `document.startViewTransition()` met fallback |
| `useFeatureSupport` | CSS-feature-detectie |
| `useColor` | oklch-kleurberekeningen en APCA-contrast-check |

---

## v0.9.0 — Documentatie + Marketing

### Storybook — alle componenten

Elke van de 51+ componenten krijgt een volledige story met vaste structuur:

| Story | Inhoud |
|---|---|
| `Default` | Basisgebruik met alle props zichtbaar in controls |
| `Variants` | Alle variants/sizes naast elkaar |
| `Keyboard` | Beschrijving van toetsenbord-interacties |
| `a11y` | axe-core check ingebakken, ARIA-rollen gedocumenteerd |
| `Dark mode` | Story in donker thema |
| `Code` | Copy-paste snippet voor de gebruiker |

### Getting Started pagina (`/getting-started`)

Stap-voor-stap voor nieuwe gebruikers:

1. Installatie — `npm i @byzantium-design-system/core`
2. Setup in Nuxt, Vite en Vue 3
3. Eerste component renderen
4. Brand-kleur aanpassen via oklch-tokens
5. Dark mode inschakelen
6. i18n instellen (16 talen)
7. Formulieren met `useForm`

### Nieuwe marketing-patronen

| Component | Beschrijving |
|---|---|
| `ByzPricingCard` | Prijstabel met feature-lijst, highlight-variant en CTA |
| `ByzTestimonial` | Quote met avatar, naam en bron |
| `ByzTimeline` | Verticale/horizontale tijdlijn voor stappenplannen en changelogs |
| `ByzCountdown` | Afteller naar datum met dagen/uren/minuten/seconden |
| `ByzFeatureGrid` | Icoon + titel + tekst in grid-layout voor feature-overzichten |
| `ByzCookieBanner` | GDPR-banner met accepteer/weiger en voorkeurenbeheer |
| `ByzAnnouncement` | Dismissible site-brede aankondigingsbalk bovenaan de pagina |

---

## v1.0.0 — Admin + Composables + Release

### Admin-patronen

| Component | Beschrijving |
|---|---|
| `ByzFilterBar` | Zoekbalk + filter-chips + sortering in één balk |
| `ByzBulkActions` | Toolbar die verschijnt bij geselecteerde tabelrijen |
| `ByzKanban` | Drag-and-drop kolommenbord met kaartjes |
| `ByzTreeView` | Hiërarchische data met inklapbare nodes |
| `ByzVirtualList` | Gevirtualiseerde lijst voor duizenden items zonder lag |
| `ByzMultiSelect` | Multi-selectie met chips, zoekfunctie en groepen |
| `ByzSheetPanel` | Bottom sheet voor mobiel — slide-up overlay |

### Composables compleet

Alle composables uit v0.8.0 zijn stable. v1.0.0 voegt toe:

| Composable | Beschrijving |
|---|---|
| `useVirtualList` | Windowing voor grote lijsten — vereist door `ByzVirtualList` |

### Playground-pagina's

| Pagina | Inhoud |
|---|---|
| `/colors` | Interactief oklch-kleurenpalet — schuifregelaars voor hue/chroma/lightness, live preview van 50–950 schaal, kopieer-token-knop, APCA contrast-ratio per tint |
| `/motion` | Live demo's van view transitions, scroll-driven animations, `@starting-style` en `calc-size()` — met schakelaar om fallback live te zien |

### Release-gereedheid

| Criterium | Standaard |
|---|---|
| Alle componenten `stable` | Geen `beta` of `experimental` in de release |
| 100% axe-core | Alle componenten keyboard-getest en screenreader-getest |
| oklch browser-garantie | Tokens geëxporteerd in zowel oklch als hex, testmatrix gepubliceerd |
| View Transitions garantie | CI verifieert dat elke pagina-overgang werkt met én zonder de API |
| Bundle-size limiet | CI faalt als pakket boven 80 kb gzip uitkomt |
| Tokens export | JSON in Design Tokens Community Group formaat voor Figma en andere tools |
| Migratiegids | Stappenplan voor teams die overstappen van Tailwind of Bootstrap |
| Semver-garantie | Publieke API bevroren — breaking changes alleen in major versies |
| Changelog automatisch | Volledig op basis van changesets — geen handmatig bijhouden |

---

## Samenvatting per versie

| Versie | Thema | Sleutelresultaat |
|---|---|---|
| **v0.8.0** | Stabilisatie + Moderne CSS | Alle beta's stable, oklch-tokens, 6 nieuwe componenten, View Transitions, `@supports`-systeem |
| **v0.9.0** | Documentatie + Marketing | Storybook compleet, Getting Started, 7 marketing-patronen |
| **v1.0.0** | Admin + Release | 7 admin-patronen, 2 nieuwe playground-pagina's, volledige release-gereedheid |
