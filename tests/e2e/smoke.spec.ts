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
    const skillsLink = page.getByRole("navigation").getByRole("link", {
      name: "Skills",
      exact: true,
    });

    await skillsLink.click();
    await expect(skillsLink).toHaveAttribute("aria-current", "location");
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

  // Characterization tests locking the content-model rendering: project link
  // text/href, the lone certification link, the comma-joined skills line, and a
  // podcast link must survive the JSON->Markdown/typed-data migration.
  test("project descriptions render real links on the home page", async ({
    page,
  }) => {
    const nova = page.getByRole("link", { name: "Nova Facade repository" });
    await expect(nova).toHaveAttribute(
      "href",
      "https://github.com/microsoft/nova-facade",
    );

    await expect(
      page.getByRole("link", { name: "Nova React Test Utils" }),
    ).toHaveAttribute(
      "href",
      "https://github.com/microsoft/nova-facade/blob/main/packages/nova-react-test-utils",
    );
  });

  test("certification link and podcast link render on the home page", async ({
    page,
  }) => {
    await expect(
      page.getByRole("link", { name: "Oracle Certified Associate" }),
    ).toHaveAttribute("href", /youracclaim\.com\/badges\//);

    await expect(
      page.getByRole("link", { name: "Radio Naukowe" }),
    ).toHaveAttribute(
      "href",
      "https://open.spotify.com/show/0O2XCgJvR6IuFgUBwOEUoL",
    );
  });

  test("printable CV preserves project links, skills order and cert link", async ({
    page,
  }) => {
    await page.goto("/cv");

    await expect(
      page.getByRole("link", { name: "Nova Facade repository" }),
    ).toHaveAttribute("href", "https://github.com/microsoft/nova-facade");

    // The first skills line is the (untitled) general-skills group, joined in
    // authoring order with ", ".
    await expect(page.locator(".skill-line").first()).toContainText(
      "Visual regression testing/unit testing, Design patterns, Code review, Analytical thinking, Algorithms & data structures, Building accessible interfaces",
    );

    await expect(
      page.getByRole("link", { name: "Oracle Certified Associate" }),
    ).toHaveAttribute("href", /youracclaim\.com\/badges\//);
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

  test("printable CV has no horizontal overflow on a narrow phone", async ({
    page,
  }) => {
    // The header contact line packs long, space-less URLs (GitHub, the personal
    // site, LinkedIn, email). Without wrapping they pushed the document wider
    // than the viewport and caused horizontal scrolling on phones.
    await page.setViewportSize({ width: 320, height: 760 });
    await page.goto("/cv");

    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));

    // Allow a 1px rounding tolerance; anything more means real overflow.
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
  });

  test("home page has no horizontal overflow on a narrow phone", async ({
    page,
  }) => {
    // The About social icons carry CSS-only hover tooltips. They used to stay
    // laid out (position:absolute, opacity:0) while hidden, so the rightmost
    // nowrap tooltip poked past the viewport and caused a horizontal scrollbar
    // at 320px. They are now `display:none` until hover/focus, leaving layout.
    await page.setViewportSize({ width: 320, height: 760 });
    await page.goto("/");

    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));

    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
  });

  test("social icon tooltip stays hidden until hover, then reveals", async ({
    page,
  }) => {
    const icon = page.locator(".icon-with-link").first();

    // Hidden tooltips must not occupy layout (that is what caused the overflow),
    // so they are `display:none` at rest rather than merely transparent.
    const restDisplay = await icon.evaluate(
      (el) => getComputedStyle(el, "::after").display,
    );
    expect(restDisplay).toBe("none");

    await icon.hover();
    await page.waitForTimeout(250);
    const hoverState = await icon.evaluate((el) => {
      const cs = getComputedStyle(el, "::after");
      return { display: cs.display, opacity: cs.opacity };
    });
    expect(hoverState.display).not.toBe("none");
    expect(Number(hoverState.opacity)).toBeGreaterThan(0);
  });

  // The date-layout fix pairs each experience role with its own tenure inside
  // the same `.role-row` (rather than dumping every date in a trailing column
  // disconnected from the role). Guard the structural role<->date association.
  test("each experience role shows its tenure within its own row", async ({
    page,
  }) => {
    const rows = page.locator("section#experience .role-row");
    const count = await rows.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);
      await expect(row.locator("h3")).toHaveCount(1);
      // Every experience role carries its tenure as one or more nowrap ranges.
      await expect(row.locator(".role-date .range").first()).toBeVisible();
    }
  });

  test("experience tenure sits beside the title on desktop and stacks on a phone", async ({
    page,
  }) => {
    const row = page.locator("section#experience .role-row").first();
    const title = row.locator("h3");
    const date = row.locator(".role-date");

    // Desktop: the date shares the row with the title, flush to its right.
    await page.setViewportSize({ width: 1280, height: 900 });
    const desktopTitle = await title.boundingBox();
    const desktopDate = await date.boundingBox();
    if (!desktopTitle || !desktopDate) throw new Error("missing role boxes");
    expect(desktopDate.x).toBeGreaterThan(desktopTitle.x);
    expect(desktopDate.y).toBeLessThan(desktopTitle.y + desktopTitle.height);

    // Phone: the @container query stacks the date directly under the title,
    // left-aligned to the same edge, so the role<->date pairing stays obvious.
    await page.setViewportSize({ width: 320, height: 760 });
    const phoneTitle = await title.boundingBox();
    const phoneDate = await date.boundingBox();
    if (!phoneTitle || !phoneDate) throw new Error("missing role boxes");
    expect(phoneDate.y).toBeGreaterThanOrEqual(
      phoneTitle.y + phoneTitle.height - 2,
    );
    expect(Math.abs(phoneDate.x - phoneTitle.x)).toBeLessThanOrEqual(2);
  });
});
