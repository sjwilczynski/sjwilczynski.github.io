# AGENTS.md

Personal single-page CV/resume built with Astro + Bun. Content lives in Astro content collections; the site ships almost no JS and deploys to GitHub Pages.

## Commands

Uses **Bun** (not npm/pnpm) and a Node version satisfying `package.json`'s `engines.node` (CI uses Node 22). See `package.json` for the full script list; the non-obvious ones:

- `bun start` — dev server at http://localhost:4321
- `bun run ci` — full gate (`fmt:check` + `lint` + `check` + `tsc` + `build`); run before pushing
- `bun run test:e2e` — Playwright (`tests/e2e/`); first run needs `bunx playwright install chromium` (the config's `webServer` auto-builds + previews)
- `bun run og` / `bun run pdf` — regenerate the OG image / CV PDF (`scripts/`)

## Structure

- `src/pages/` — `index.astro` (home), `cv.astro` (printable, noindex), `404.astro`
- `src/components/` — `App.astro`, `sections/` (about, interests, skills…), `navigation/`, `theme/` (`ThemeToggle.astro`), `head/`, `icons/`
- `src/layouts/` — reusable `Section`/`Resume*` views
- `src/content/` — collections: `about`, `experience`, `education`, `research`, `projects`, `achievements`, `skills`, `concerts`, `podcasts`, `social-media`
- `src/content.config.ts` — collection loaders + Zod schemas (single source of truth)
- `src/data/getData.ts` — aggregates/sorts collections for pages
- `public/` — static assets · `scripts/` — OG image + PDF generators
- `.github/workflows/` — `ci.yml`, `gh-pages-deploy.yml`, `size-limit.yml`
- Path aliases (`tsconfig.json`): `@components/*`, `@data/*`, `@styles/*`, `@layouts/*`

## Conventions

- **Default branch is `source`** (not `main`). Pushing to `source` triggers the GitHub Pages deploy.
- Content is data-driven: each collection is defined in `content.config.ts`. Some load many `.md`/`.json` files via `glob`, others a single `data.json` via `file`.
- Add an entry by dropping a file in the collection dir matching its Zod schema, e.g. `src/content/experience/NN-name.md` — `NN-` prefix + `sortOrder` frontmatter control order; the Markdown body is the rich description. File-loader collections (skills, concerts, podcasts, social-media) are edited inside their `data.json`.
- UI is `.astro`; the `@astrojs/mdx` integration is available but content currently uses `.md`/`.json`. Icons come from `astro-icon` (allow-list in `astro.config.ts`).
- Theme toggle (`ThemeToggle.astro`) switches light/dark with sun/moon icons.
- `size-limit` enforces a CSS budget — keep generated CSS small.
- TypeScript runs under `astro/tsconfigs/strictest`; keep `bun run tsc` and `bun run check` green.
