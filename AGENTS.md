# AGENTS.md

Static bilingual CV built with Astro + Bun. The home page and printable CV share content collections; preserve both EN and PL output when changing shared data or views.

## Workflow

- Use **Bun** and a Node version satisfying `package.json`'s `engines`. Start local development with `bun start`.
- Target PRs at **`source`**. Pushing to `source` triggers GitHub Pages deployment.
- Before pushing code or content changes, run `bun run ci` and `bun run test:e2e`. The `ci` script excludes E2E; `.github/workflows/ci.yml` runs them as separate `build` and `test` jobs.
- For printable-CV changes, also run `bun run pdf` and inspect both generated PDFs. Documentation-only changes need no application build or tests.

## Content changes

- Read `src/content.config.ts` for the affected collection's loader and schema, and `src/data/getData.ts` for locale selection and ordering. Add matching EN/PL entries with the same key; keep filename prefixes and `sortOrder` consistent with neighboring entries.
- Preserve stable selectors: skills groups use `kind` to distinguish skills from certifications; the CV's LinkedIn contact uses social-media ID `linkedin`. Headings and icons are presentation, not identity.
- For concert dates, use the validation boundary in `src/data/concerts.ts`. Renderers format validated dates; malformed dates must fail the content build.

## UI changes

- Preserve the responsive navigation contract: one mobile panel contains navigation and language/theme controls; desktop retains its sidebar and floating controls. Closed panels leave keyboard navigation; Escape restores focus to the hamburger.
- Exercise interactions after EN/PL navigation too: Astro's `ClientRouter` replaces the DOM without rerunning bundled scripts. Follow existing `astro:page-load` initialization and clean up listeners/observers when rebinding.
- For icons or asset-budget changes, consult `astro.config.ts`'s icon allow-list and `package.json`'s CSS/JS limits.

## Regression coverage

- Use `tests/e2e/` for browser behavior and `tests/content/` for data/build contracts; both run through `bun run test:e2e`. If Chromium is missing, install it with `bunx playwright install chromium`.
- Stop the local dev server before validating production output: Playwright reuses an existing server locally, otherwise it builds and starts a preview. CI always uses a fresh build.
- Prefer accessible roles, keyboard interactions, and observable outcomes. Use relative geometry for layout requirements such as non-overlap, rather than asserting exact CSS rules.
- Test schema edge cases directly. Reserve isolated builds for wiring contracts, as in `tests/content/build.spec.ts`.
