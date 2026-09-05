import { test, expect } from "@playwright/test";

test.describe("Responsive navigation", () => {
  test.use({ viewport: { width: 375, height: 812 }, reducedMotion: "reduce" });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("closed mobile menu keeps links and preferences out of keyboard navigation", async ({
    page,
  }) => {
    const toggler = page.getByRole("button", { name: "Toggle navigation" });
    await expect(toggler).toHaveAttribute("aria-controls", "navigation-menu");
    await expect(page.locator(".nav-menu")).toBeHidden();
    await expect(page.locator(".lang-toggle")).toBeHidden();
    await expect(page.locator("#theme-toggle")).toBeHidden();

    await toggler.focus();
    await page.keyboard.press("Tab");
    await expect(page.locator(".about-subheading a")).toBeFocused();
  });

  test("mobile panel contains navigation and preferences and closes with Escape", async ({
    page,
  }) => {
    const toggler = page.getByRole("button", { name: "Toggle navigation" });
    await toggler.click();
    await expect(toggler).toHaveAttribute("aria-expanded", "true");

    const panel = page.locator(".nav-menu");
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
    await expect(panel).toBeHidden();
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
    await expect(page.locator('a.nav-link[href="#about"]')).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(page.locator(".nav-menu")).toBeHidden();
    await expect(toggler).toBeFocused();
  });

  test("choosing a section closes the mobile panel without leaving focus hidden", async ({
    page,
  }) => {
    const toggler = page.getByRole("button", { name: "Toggle navigation" });
    await toggler.click();
    await page.getByRole("link", { name: "Skills", exact: true }).click();
    await expect(page).toHaveURL(/#skills$/);
    await expect(page.locator(".nav-menu")).toBeHidden();
    await expect(toggler).toHaveAttribute("aria-expanded", "false");
    const focusInPanel = await page
      .locator(".nav-menu")
      .evaluate((panel) => panel.contains(document.activeElement));
    expect(focusInPanel).toBe(false);
  });

  test("mobile menu works after changing language and retains the chosen theme", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Toggle navigation" }).click();
    await page.getByRole("button", { name: "Toggle dark mode" }).click();
    await page.getByRole("link", { name: "Switch to Polish (PL)" }).click();
    await expect(page).toHaveURL(/\/pl\/$/);
    await expect(page.locator("html")).toHaveClass(/dark/);
    await expect(page.locator(".nav-menu")).toBeHidden();

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
    for (const width of [320, 375, 768, 991]) {
      await page.setViewportSize({ width, height: 812 });
      await expect(page.locator(".lang-toggle")).toBeHidden();
      await expect(page.locator("#theme-toggle")).toBeHidden();
      const brand = await page.locator(".brand-text").boundingBox();
      const toggler = await page.locator(".nav-toggler").boundingBox();
      if (!brand || !toggler) throw new Error("Missing mobile header");
      expect(brand.x + brand.width).toBeLessThanOrEqual(toggler.x);
      expect(toggler.x + toggler.width).toBeLessThanOrEqual(width);
    }
  });

  test("desktop keeps preferences visible and resizing resets the mobile menu", async ({
    page,
  }) => {
    await page.locator(".nav-toggler").click();
    await page.setViewportSize({ width: 1280, height: 900 });
    await expect(page.locator(".nav-toggler")).toBeHidden();
    await expect(page.locator('a.nav-link[href="#experience"]')).toBeVisible();
    await expect(page.locator(".lang-toggle")).toBeVisible();
    await expect(page.locator("#theme-toggle")).toBeVisible();

    await page.setViewportSize({ width: 375, height: 812 });
    await expect(page.locator(".nav-menu")).toBeHidden();
    await expect(page.locator(".nav-toggler")).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  test("open panel stays scrollable in a short landscape viewport", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 667, height: 320 });
    await page.locator(".nav-toggler").click();
    const panel = page.locator(".nav-menu");
    const geometry = await panel.evaluate((element) => ({
      bottom: element.getBoundingClientRect().bottom,
      clientHeight: element.clientHeight,
      scrollHeight: element.scrollHeight,
      overflowY: getComputedStyle(element).overflowY,
    }));
    expect(geometry.bottom).toBeLessThanOrEqual(320);
    expect(geometry.scrollHeight).toBeGreaterThan(geometry.clientHeight);
    expect(geometry.overflowY).toBe("auto");
    await panel.getByRole("button", { name: "Toggle dark mode" }).click();
    await expect(page.locator("html")).toHaveClass(/dark/);
  });
});
