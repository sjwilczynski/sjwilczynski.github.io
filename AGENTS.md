# AGENTS.md

Personal bilingual CV built with Astro + Bun and published as a static site on GitHub Pages. Favor build-time rendering and minimal client JavaScript; keep additions within the CSS/JS budgets in `package.json`.

The home page and printable CV share content collections. Changes to shared data or views must account for both web/PDF output and both EN/PL locales.

## Working conventions

- Use **Bun** and a Node version satisfying `package.json`'s `engines`. Start local development with `bun start`.
- Target PRs at **`source`**. Pushing to `source` triggers GitHub Pages deployment.
- For content changes, read `src/content.config.ts` for loaders and validation, and `src/data/getData.ts` for locale selection and ordering. Keep validation in collection schemas and add matching EN/PL entries with the same key.
- For interactive UI changes, exercise behavior after language navigation as well as initial load: Astro's `ClientRouter` replaces the DOM without rerunning bundled scripts. Follow existing `astro:page-load` initialization and clean up listeners/observers when rebinding.

## Completion

- Before pushing code or content changes, run `bun run ci` and `bun run test:e2e`. The `ci` script excludes E2E; GitHub Actions runs them in separate jobs. Browser and content-contract tests both use the E2E command.
- When testing production output, ensure Playwright targets a fresh build/preview rather than an existing dev server it may reuse locally. Coordinate any interruption of a server the user is using.
- If Chromium is missing, install it with `bunx playwright install chromium`. For printable-CV changes, also run `bun run pdf` and inspect both generated PDFs.
- Documentation-only changes need no application build or tests.
