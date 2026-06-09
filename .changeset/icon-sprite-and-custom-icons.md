---
"@byzantium/core": minor
---

Add custom icon support and expand icon sprite to 1707 icons

- Icon sprite now includes all 1704 Lucide icons plus support for custom SVG icons via `scripts/custom-icons/`
- Added three built-in Byzantium icons: `byz-crown`, `byz-seal`, `byz-arch`
- Custom icons can be added by dropping SVG files into `scripts/custom-icons/` and running `node scripts/generate-icon-sprite.mjs`
