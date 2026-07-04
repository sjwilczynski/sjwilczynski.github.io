import { test, expect } from "@playwright/test";

test.describe("i18n", () => {
  test("Polish home renders at /pl/ with lang=pl and translated nav", async ({
    page,
  }) => {
    const res = await page.goto("/pl/");
    expect(res?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", "pl");
    await expect(page.locator('a.nav-link[href="#experience"]')).toHaveText(
      "Doświadczenie",
    );
  });

  test("English home marks EN active in the switcher", async ({ page }) => {
    await page.goto("/");
    const en = page.locator('.lang-toggle .lang-seg[hreflang="en"]');
    await expect(en).toHaveAttribute("aria-current", "true");
  });

  test("switching to Polish navigates to /pl/ client-side and updates lang", async ({
    page,
  }) => {
    await page.goto("/");
    await page.locator('.lang-toggle .lang-seg[hreflang="pl"]').click();
    // ClientRouter performs a same-document navigation; the URL updates to /pl/.
    await page.waitForURL("**/pl/");
    await expect(page.locator("html")).toHaveAttribute("lang", "pl");
    await expect(page.locator('a.nav-link[href="#experience"]')).toHaveText(
      "Doświadczenie",
    );
  });

  test("switching language preserves the scroll position", async ({ page }) => {
    await page.goto("/");
    // Scroll to a mid-page offset (instant, to avoid racing the global smooth
    // scroll), then confirm we actually scrolled down.
    await page.evaluate(() => {
      const el = document.getElementById("experience");
      const top = (el?.getBoundingClientRect().top ?? 0) + window.scrollY;
      window.scrollTo({ top: Math.round(top), left: 0, behavior: "instant" });
    });
    const before = await page.evaluate(() => Math.round(window.scrollY));
    expect(before).toBeGreaterThan(0);

    await page.locator('.lang-toggle .lang-seg[hreflang="pl"]').click();
    await page.waitForURL("**/pl/");

    // The click records window.scrollY; ClientRouter swaps the DOM in place and
    // the astro:after-swap handler restores that exact offset. Poll because the
    // swap + restore land a tick after the URL updates.
    await expect
      .poll(() => page.evaluate(() => Math.round(window.scrollY)))
      .toBeGreaterThan(0);
    const after = await page.evaluate(() => Math.round(window.scrollY));
    expect(Math.abs(after - before)).toBeLessThanOrEqual(8);
  });

  test("Polish CV page renders translated headings", async ({ page }) => {
    await page.goto("/pl/cv");
    await expect(page.locator("html")).toHaveAttribute("lang", "pl");
    await expect(
      page.getByRole("heading", { name: "Doświadczenie zawodowe" }),
    ).toBeVisible();
  });

  test("Polish CV has no horizontal overflow on a narrow phone", async ({
    page,
  }) => {
    // The header contact line packs long, space-less URLs. The shared
    // CvDocument wrap fix must keep the Polish route from overflowing too.
    await page.setViewportSize({ width: 320, height: 760 });
    await page.goto("/pl/cv");

    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));

    // Allow a 1px rounding tolerance; anything more means real overflow.
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
  });
});
