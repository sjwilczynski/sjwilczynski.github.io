// Generates deterministic, browser-independent PDFs of the /cv pages (EN + PL).
// Runs against the already-built `dist/`: starts Astro's preview server, renders
// each /cv route in the pinned Playwright Chromium, and writes the PDFs. The
// result never depends on a visitor's browser.
// Usage: node scripts/generate-pdf.js  (run after `astro build`)

import { preview } from "astro";
import { chromium } from "playwright";

const TARGETS = [
  { route: "/cv", output: "dist/cv.pdf" },
  { route: "/pl/cv", output: "dist/cv-pl.pdf" },
];

async function run() {
  const server = await preview({ logLevel: "error" });
  const browser = await chromium.launch();
  try {
    for (const { route, output } of TARGETS) {
      const page = await browser.newPage();
      await page.goto(`http://localhost:${server.port}${route}`, {
        waitUntil: "networkidle",
      });
      await page.emulateMedia({ media: "print" });
      await page.pdf({
        path: output,
        format: "A4",
        printBackground: true,
        margin: { top: "14mm", bottom: "14mm", left: "14mm", right: "14mm" },
      });
      await page.close();
      console.log(`✓ Wrote ${output}`);
    }
  } finally {
    await browser.close();
    await server.stop();
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
