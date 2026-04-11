// Visual regression screenshot capture script
// Usage: node scripts/screenshots.js [label]
// Saves screenshots to scratch/screenshots/[label]/

import { chromium } from "playwright";

const label = process.argv[2] || "run";
const OUT_DIR = `scratch/screenshots/${label}`;

const SECTIONS = [
  "about",
  "experience",
  "education",
  "projects",
  "research",
  "skills",
  "achievements",
  "interests",
];

const DESKTOP_VIEWPORT = { width: 1280, height: 800 };
const MOBILE_VIEWPORT = { width: 375, height: 812 };

async function capture(page, name) {
  const file = `${OUT_DIR}/${name}.png`;
  await page.screenshot({ path: file, fullPage: false });
  console.log(`  ✓ ${name}`);
}

async function run() {
  const { mkdirSync } = await import("fs");
  mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();

  // Desktop screenshots
  console.log("Desktop screenshots:");
  const desktopPage = await browser.newPage({ viewport: DESKTOP_VIEWPORT });
  await desktopPage.goto("http://localhost:4321", {
    waitUntil: "networkidle",
  });

  for (const section of SECTIONS) {
    await desktopPage.click(`a.nav-link[href="#${section}"]`);
    await desktopPage.waitForTimeout(500);
    await capture(desktopPage, `desktop-${section}`);
  }

  // Concerts timeline expanded
  console.log("Concerts timeline:");
  await desktopPage.click(`a.nav-link[href="#interests"]`);
  await desktopPage.waitForTimeout(500);
  const concertsButton = desktopPage.getByRole("button", {
    name: /concerts list/i,
  });
  await concertsButton.scrollIntoViewIfNeeded();
  // Wait for React hydration (client:visible triggers when element enters viewport)
  await desktopPage.waitForTimeout(3000);
  await concertsButton.click();
  // Wait for timeline to render
  await desktopPage.waitForTimeout(2000);
  await capture(desktopPage, "desktop-concerts-expanded");

  await desktopPage.close();

  // Mobile screenshots
  console.log("Mobile screenshots:");
  const mobilePage = await browser.newPage({ viewport: MOBILE_VIEWPORT });
  await mobilePage.goto("http://localhost:4321", { waitUntil: "networkidle" });

  // Mobile nav collapsed
  await capture(mobilePage, "mobile-nav-collapsed");

  // Mobile nav open
  const hamburger = mobilePage.locator(
    'button.navbar-toggler, button.nav-toggle, button[aria-label="Toggle navigation"]',
  );
  await hamburger.click();
  await mobilePage.waitForTimeout(500);
  await capture(mobilePage, "mobile-nav-open");

  await mobilePage.close();
  await browser.close();

  console.log(`\nAll screenshots saved to ${OUT_DIR}/`);
}

run().catch(console.error);
