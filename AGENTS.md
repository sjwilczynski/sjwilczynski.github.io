# AGENTS.md

Personal single-page CV/resume built with Astro + Bun. Content lives in Astro content collections; the site ships almost no JS and deploys to GitHub Pages.

## Commands

Uses **Bun** as package manager and runner (not npm/pnpm). Node >= 22.12.

- `bun install` — install dependencies
- `bun start` — dev server at http://localhost:4321 (`bun run dev` also runs `astro check --watch` in parallel)
- `bun run build` — production build (`astro build`) + `size-limit` CSS budget check
- `bun run preview` — preview the built `dist/`
- `bun run lint` — ESLint over `./src` (flat config, `.mdx`/`.d.ts`/`dist` ignored)
- `bun run check` — `astro check`; `bun run tsc` — `tsc --noEmit`; `bun run fmt` / `fmt:check` — Prettier
- `bun run test:e2e` — Playwright tests in `tests/e2e/` (its `webServer` auto-runs build + preview; run `bunx playwright install chromium` first)
- `bun run ci` — full gate: `fmt:check` + `lint` + `check` + `tsc` + `build`
- `bun run og` — regenerate OG image (`scripts/generate-og-image.js`); `bun run pdf` — build + generate CV PDF (`scripts/generate-pdf.js`)

## Structure

- `src/pages/` — `index.astro` (home), `cv.astro` (printable, noindex), `404.astro`
- `src/components/` — `App.astro`, `sections/` (about, interests, skills…), `navigation/`, `theme/` (`ThemeToggle.astro`), `head/`, `icons/`
- `src/layouts/` — reusable `Section`/`Resume*` views
- `src/content/` — collections: `about`, `experience`, `education`, `research`, `projects`, `achievements`, `skills`, `concerts`, `podcasts`, `social-media`
- `src/content.config.ts` — collection loaders + Zod schemas (single source of truth)
- `src/data/getData.ts` — aggregates/sorts collections for pages
- `public/` — static assets · `scripts/` — OG image + PDF generators

## Conventions

- **Default branch is `source`** (not `main`). Pushing to `source` triggers the GitHub Pages deploy.
- Content is data-driven: each collection is defined in `content.config.ts`. Some load many `.md`/`.json` files via `glob`, others a single `data.json` via `file`.
- Add an entry by dropping a file in the collection dir matching its Zod schema, e.g. `src/content/experience/NN-name.md` — `NN-` prefix + `sortOrder` frontmatter control order; the Markdown body is the rich description. File-loader collections (skills, concerts, podcasts, social-media) are edited inside their `data.json`.
- UI is `.astro`; the `@astrojs/mdx` integration is available but content currently uses `.md`/`.json`. Icons come from `astro-icon` (allow-list in `astro.config.ts`).
- Theme toggle (`ThemeToggle.astro`) switches light/dark with sun/moon icons.
- `size-limit` enforces a CSS budget — keep generated CSS small.
