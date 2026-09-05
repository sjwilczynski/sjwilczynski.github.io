import { test, expect } from "@playwright/test";

test.describe("Responsive navigation", () => {
  test.use({
    viewport: { width: 375, height: 812 },
    reducedMotion: "reduce",
    colorScheme: "light",
  });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("closed mobile menu keeps links and preferences out of keyboard navigation", async ({
    page,
  }) => {
    const toggler = page.getByRole("button", { name: "Toggle navigation" });
    const controlledPanel = await toggler.getAttribute("aria-controls");
    expect(controlledPanel).toBeTruthy();
    const panel = page.locator(`[id="${controlledPanel}"]`);
    await expect(panel).toHaveCount(1);
    await expect(panel).toBeHidden();

    await toggler.focus();
    await page.keyboard.press("Tab");
    await expect(
      page
        .getByRole("main")
        .getByRole("link", { name: "sjwilczynski@gmail.com" }),
    ).toBeFocused();

    await toggler.click();
    await expect(panel).toBeVisible();
    await expect(
      panel.getByRole("link", { name: "Experience", exact: true }),
    ).toBeVisible();
    await expect(
      panel.getByRole("link", { name: "Switch to Polish (PL)" }),
    ).toBeVisible();
    await expect(
      panel.getByRole("button", { name: "Toggle dark mode" }),
    ).toBeVisible();
  });

  test("mobile panel contains navigation and preferences and closes with Escape", async ({
    page,
  }) => {
    const toggler = page.getByRole("button", { name: "Toggle navigation" });
    await toggler.click();
    await expect(toggler).toHaveAttribute("aria-expanded", "true");

    const panel = page.getByRole("navigation");
    await expect(
      panel.getByRole("link", { name: "Experience", exact: true }),
    ).toBeVisible();
    await expect(
      panel.getByRole("link", { name: "Switch to Polish (PL)" }),
    ).toBeVisible();
    const theme = panel.getByRole("button", { name: "Toggle dark mode" });
    await theme.click();
    await expect(theme).toHaveAttribute("aria-pressed", "true");
    await expect(toggler).toHaveAttribute("aria-expanded", "true");

    await page.keyboard.press("Escape");
    await expect(theme).toBeHidden();
    await expect(toggler).toHaveAttribute("aria-expanded", "false");
    await expect(toggler).toBeFocused();
  });

  test("mobile panel can be opened and dismissed using only the keyboard", async ({
    page,
  }) => {
    const toggler = page.getByRole("button", { name: "Toggle navigation" });
    await toggler.focus();
    await page.keyboard.press("Enter");
    await expect(toggler).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("link", { name: "About", exact: true }),
    ).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("link", { name: "About", exact: true }),
    ).toBeHidden();
    await expect(toggler).toBeFocused();
  });

  test("choosing a section closes the mobile panel without leaving focus hidden", async ({
    page,
  }) => {
    const toggler = page.getByRole("button", { name: "Toggle navigation" });
    const controlledPanel = await toggler.getAttribute("aria-controls");
    await toggler.click();
    await page.getByRole("link", { name: "Skills", exact: true }).click();
    await expect(page).toHaveURL(/#skills$/);
    await expect(
      page.getByRole("link", { name: "Skills", exact: true }),
    ).toBeHidden();
    await expect(toggler).toHaveAttribute("aria-expanded", "false");
    expect(
      await page
        .locator(`[id="${controlledPanel}"]`)
        .evaluate((panel) => panel.contains(document.activeElement)),
    ).toBe(false);
  });

  test("mobile menu works after changing language and retains the chosen theme", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Toggle navigation" }).click();
    await page.getByRole("button", { name: "Toggle dark mode" }).click();
    await page.getByRole("link", { name: "Switch to Polish (PL)" }).click();
    await expect(page).toHaveURL(/\/pl\/$/);
    await expect(
      page.getByRole("link", { name: "Doświadczenie", exact: true }),
    ).toBeHidden();

    const toggler = page.getByRole("button", {
      name: "Otwórz lub zamknij nawigację",
    });
    await toggler.click();
    await expect(
      page.getByRole("link", { name: "Doświadczenie", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Przełącz tryb ciemny" }),
    ).toHaveAttribute("aria-pressed", "true");
    await page.keyboard.press("Escape");
    await expect(toggler).toBeFocused();
  });

  test("full name and hamburger fit without overlap across mobile widths", async ({
    page,
  }) => {
    await page.evaluate(() => document.fonts.ready);
    for (const width of [320, 375, 768, 991]) {
      await page.setViewportSize({ width, height: 812 });
      await expect(
        page.getByRole("link", { name: "Switch to Polish (PL)" }),
      ).toBeHidden();
      await expect(
        page.getByRole("button", { name: "Toggle dark mode" }),
      ).toBeHidden();
      const brand = await page
        .getByRole("navigation")
        .getByRole("link", { name: "Stanisław Wilczyński" })
        .boundingBox();
      const toggler = await page
        .getByRole("button", { name: "Toggle navigation" })
        .boundingBox();
      if (!brand || !toggler) throw new Error("Missing mobile header");
      // Relative geometry is the regression: both controls fit on the same row
      // without overlapping, regardless of the CSS used to arrange them.
      expect(brand.x + brand.width).toBeLessThanOrEqual(toggler.x);
      expect(toggler.x + toggler.width).toBeLessThanOrEqual(width);
      expect(Math.max(brand.y, toggler.y)).toBeLessThan(
        Math.min(brand.y + brand.height, toggler.y + toggler.height),
      );
    }
  });

  test("desktop keeps preferences visible and resizing resets the mobile menu", async ({
    page,
  }) => {
    const toggler = page.getByRole("button", { name: "Toggle navigation" });
    await toggler.click();
    await page.setViewportSize({ width: 1280, height: 900 });
    await expect(toggler).toBeHidden();
    await expect(
      page.getByRole("link", { name: "Experience", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Switch to Polish (PL)" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Toggle dark mode" }),
    ).toBeVisible();

    await page.setViewportSize({ width: 375, height: 812 });
    await expect(
      page.getByRole("link", { name: "Experience", exact: true }),
    ).toBeHidden();
    await expect(
      page.getByRole("link", { name: "Switch to Polish (PL)" }),
    ).toBeHidden();
    await expect(
      page.getByRole("button", { name: "Toggle dark mode" }),
    ).toBeHidden();
    await expect(toggler).toHaveAttribute("aria-expanded", "false");
  });

  test("all menu actions are keyboard-reachable in a short landscape viewport", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 667, height: 320 });
    const navigation = page.getByRole("navigation");
    const toggler = navigation.getByRole("button", {
      name: "Toggle navigation",
    });
    await toggler.focus();
    await page.keyboard.press("Enter");
    const links = navigation.getByRole("link");
    // The name is before the hamburger; every remaining link is in its panel.
    for (const link of (await links.all()).slice(1)) {
      await page.keyboard.press("Tab");
      await expect(link).toBeFocused();
      await expect(link).toBeInViewport({ ratio: 1 });
    }
    await page.keyboard.press("Tab");
    const theme = navigation.getByRole("button", { name: "Toggle dark mode" });
    await expect(theme).toBeFocused();
    await expect(theme).toBeInViewport({ ratio: 1 });
    await page.keyboard.press("Enter");
    await expect(theme).toHaveAttribute("aria-pressed", "true");
    await page.keyboard.press("Escape");
    await expect(toggler).toBeFocused();
    await expect(toggler).toHaveAttribute("aria-expanded", "false");
  });
});
