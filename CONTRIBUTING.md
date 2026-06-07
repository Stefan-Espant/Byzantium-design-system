# Contributing to Byzantium

Thank you for helping build Byzantium. This guide covers everything you need to make a great contribution.

## Prerequisites

- Node.js >= 20
- pnpm 11.x (`npm i -g pnpm`)

## Setting up the project

```bash
git clone https://github.com/<org>/Byzantium-design-system.git
cd Byzantium-design-system
pnpm install
pnpm dev          # starts the playground (hot-reload)
```

## Project structure

```
packages/
  byzantium/      # @byzantium/core — the published package
    src/
      components/ # Vue components
      composables/
      tokens/     # Design tokens
playground/       # Dev sandbox — not published
docs/             # Documentation site — not published
```

## Making changes

### Component conventions

- One component per file, named in PascalCase (e.g. `ByzButton.vue`).
- All exported components must be prefixed with `Byz` to avoid collisions.
- Props must be typed with TypeScript interfaces; avoid `any`.
- Keep logic in composables when it can be reused.

### Naming conventions

| Thing | Convention |
|---|---|
| Component files | `ByzFoo.vue` |
| Composable files | `useFoo.ts` |
| Token files | `tokens.foo.ts` |
| CSS custom properties | `--byz-*` |

### Design tokens

Tokens live in `packages/byzantium/src/tokens/`. If you add or rename a token, update both the light and dark theme objects.

## Writing tests

Tests live alongside their source files (`*.spec.ts` / `*.test.ts`) and run with Vitest.

```bash
pnpm test            # run all tests once
pnpm test --watch    # watch mode
```

- Test observable behavior, not implementation details.
- Every new component needs at minimum a render test and a prop-validation test.
- Accessibility-sensitive behavior (focus management, ARIA state) must be covered.

## Typechecking

```bash
pnpm typecheck
```

Fix all errors before submitting. The CI pipeline will reject PRs with type errors.

## Creating a changeset

Every PR that changes the public API or fixes a bug **must** include a changeset. This is what drives versioning and the CHANGELOG.

```bash
pnpm changeset
```

The CLI will ask:
1. Which package is affected? (`@byzantium/core`)
2. Bump type: `patch` (bug fix), `minor` (new feature), `major` (breaking change)
3. A short summary — this becomes the CHANGELOG entry.

Commit the generated `.changeset/*.md` file alongside your changes.

Internal tooling and playground changes that do not affect `@byzantium/core` do **not** need a changeset.

## Submitting a pull request

1. Fork the repo and create a feature branch off `main`.
2. Make your changes and add tests.
3. Run `pnpm typecheck && pnpm test && pnpm build` locally — all must pass.
4. Create a changeset if needed (`pnpm changeset`).
5. Open a PR against `main` and fill in the PR template.

### PR checklist

- [ ] Tests pass locally
- [ ] Changeset added (if public-facing change)
- [ ] No TypeScript errors
- [ ] Accessibility verified
- [ ] Light and dark mode both look correct

## Commit message conventions

Use [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | When to use |
|---|---|
| `feat:` | New component or feature |
| `fix:` | Bug fix |
| `docs:` | Documentation only |
| `chore:` | Tooling, dependencies, config |
| `refactor:` | Code change with no behavior change |
| `test:` | Adding or updating tests only |

Examples:
```
feat: add ByzTooltip component
fix: correct focus trap in ByzModal
chore: upgrade vitest to 2.2
```

## Questions?

Open a GitHub Discussion or ping the team in the project Slack channel.
