import { test, expect } from "@playwright/test";

for (const [device, viewport] of [
  ["desktop", { width: 1280, height: 900 }],
  ["mobile", { width: 375, height: 812 }],
] as const) {
  test.describe(`Scrollspy on ${device}`, () => {
    test.use({ viewport, reducedMotion: "reduce" });

    test("marks the current section when scrolling down and back up without clicking links", async ({
      page,
    }) => {
      await page.goto("/");
      const navigation = page.getByRole("navigation");
      for (const name of ["Experience", "Skills", "Education"]) {
        const section = page.locator("main section").filter({
          has: page.getByRole("heading", { name, exact: true }),
        });
        await section.evaluate((element) =>
          element.scrollIntoView({
            block: "start",
            behavior: "instant",
          }),
        );
        // Mobile scrolling happens while the panel is closed, as it does when
        // reading the page. Opening the menu must reveal the current section.
        if (device === "mobile") {
          await navigation
            .getByRole("button", { name: "Toggle navigation" })
            .click();
        }
        await expect(
          navigation.getByRole("link", { name, exact: true }),
        ).toHaveAttribute("aria-current", "location");
        await expect(
          navigation.locator('a[aria-current="location"]'),
        ).toHaveCount(1);
        if (device === "mobile") await page.keyboard.press("Escape");
      }
    });

    test("continues tracking scroll after a language switch", async ({
      page,
    }) => {
      await page.goto("/");
      const navigation = page.getByRole("navigation");
      if (device === "mobile") {
        await navigation
          .getByRole("button", { name: "Toggle navigation" })
          .click();
      }
      await navigation
        .getByRole("link", { name: "Switch to Polish (PL)" })
        .click();
      await expect(page).toHaveURL(/\/pl\/$/);
      const section = page.locator("main section").filter({
        has: page.getByRole("heading", { name: "Umiejętności", exact: true }),
      });
      await section.evaluate((element) =>
        element.scrollIntoView({
          block: "start",
          behavior: "instant",
        }),
      );
      if (device === "mobile") {
        await navigation
          .getByRole("button", {
            name: "Otwórz lub zamknij nawigację",
          })
          .click();
      }
      await expect(
        navigation.getByRole("link", { name: "Umiejętności", exact: true }),
      ).toHaveAttribute("aria-current", "location");
      await expect(
        navigation.locator('a[aria-current="location"]'),
      ).toHaveCount(1);
    });
  });
}
