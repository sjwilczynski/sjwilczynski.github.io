import { test, expect } from "@playwright/test";

const SECTIONS = [
  "about",
  "experience",
  "education",
  "projects",
  "research",
  "skills",
  "achievements",
  "interests",
] as const;

test.describe("Smoke tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("all sections are present", async ({ page }) => {
    for (const section of SECTIONS) {
      const el = page.locator(`section#${section}`);
      await expect(el).toBeAttached();
    }
  });

  test("section reveal keeps its scroll-driven timeline through minification", async ({
    page,
  }) => {
    // The reveal is intentionally suppressed under prefers-reduced-motion, so
    // pin no-preference to keep this assertion deterministic across runners.
    await page.emulateMedia({ reducedMotion: "no-preference" });

    const supported = await page.evaluate(() =>
      CSS.supports("animation-timeline: view()"),
    );
    test.skip(!supported, "browser lacks scroll-driven animation support");

    // Regression guard: the CSS minifier used to fold `animation-timeline`
    // into the `animation` shorthand, producing invalid CSS that reset the
    // timeline to `auto` and silently disabled the reveal animation.
    const styles = await page
      .locator(".section-inner")
      .first()
      .evaluate((el) => {
        const cs = getComputedStyle(el);
        return { name: cs.animationName, timeline: cs.animationTimeline };
      });

    expect(styles.name).toBe("section-enter");
    expect(styles.timeline).toBe("view()");
  });

  test("navigation scrollspy highlights active section", async ({ page }) => {
    const skillsLink = page.locator('a.nav-link[href="#skills"]');

    await skillsLink.click();
    // Wait for scroll to complete and scrollspy to update
    await page.waitForTimeout(1000);

    await expect(skillsLink).toHaveClass(/active/);
  });

  test("concerts toggle shows timeline", async ({ page }) => {
    await page.locator("section#interests").scrollIntoViewIfNeeded();

    const button = page.getByRole("button", { name: /concerts list/i });
    await expect(button).toBeVisible();

    await button.click();

    const timelineElement = page.locator(".timeline-content");
    await expect(timelineElement.first()).toBeVisible();

    // Concert dates use the en-GB locale (DD/MM/YYYY) to match <html lang="en">.
    await expect(page.locator(".timeline-date").first()).toHaveText(
      /\d{2}\/\d{2}\/\d{4}/,
    );
  });

  test("printable CV page renders and is linked from home", async ({
    page,
  }) => {
    // Home page exposes a download link wired to the generated PDF.
    const downloadLink = page.getByRole("link", { name: "Download CV (PDF)" });
    await expect(downloadLink).toHaveAttribute("download");
    await expect(downloadLink).toHaveAttribute("href", /cv\.pdf$/);

    // The /cv page renders with its key sections, including the ones added
    // to match the printed CV (Interests, Certifications).
    await page.goto("/cv");
    for (const heading of [
      "Work experience",
      "Projects",
      "Skills",
      "Interests",
      "Education",
      "Certifications",
    ]) {
      await expect(page.getByRole("heading", { name: heading })).toBeVisible();
    }
  });
});
