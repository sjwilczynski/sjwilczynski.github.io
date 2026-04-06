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

  test("navigation scrollspy highlights active section", async ({ page }) => {
    const skillsLink = page.locator('a.nav-link[href="#skills"]');

    await skillsLink.click();
    // Wait for scroll to complete and scrollspy to update
    await page.waitForTimeout(1000);

    await expect(skillsLink).toHaveClass(/active/);
  });

  test("concerts toggle shows timeline", async ({ page }) => {
    // Scroll to interests section to trigger client:visible hydration
    await page.locator("section#interests").scrollIntoViewIfNeeded();

    const button = page.getByRole("button", { name: /concerts list/i });
    await expect(button).toBeVisible();

    await button.click();

    // The timeline is rendered by React after hydration + click
    // Look for timeline element content rather than the wrapper class
    const timelineElement = page.locator(
      ".vertical-timeline-element-content",
    );
    await expect(timelineElement.first()).toBeVisible({ timeout: 10000 });
  });
});
