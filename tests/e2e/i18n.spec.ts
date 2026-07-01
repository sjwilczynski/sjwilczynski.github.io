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

  test("switching to Polish navigates to /pl/ and preserves the hash", async ({
    page,
  }) => {
    await page.goto("/#skills");
    await page.locator('.lang-toggle .lang-seg[hreflang="pl"]').click();
    await page.waitForURL("**/pl/#skills");
    await expect(page.locator("html")).toHaveAttribute("lang", "pl");
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
