// Generates a deterministic, browser-independent PDF of the /cv page.
// Runs against the already-built `dist/` output: it starts Astro's preview
// server programmatically, renders /cv in the pinned Playwright Chromium, and
// writes `dist/cv.pdf`. Because the PDF is produced on the build machine with a
// fixed browser, the result never depends on a visitor's browser.
// Usage: node scripts/generate-pdf.js  (run after `astro build`)

import { preview } from "astro";
import { chromium } from "playwright";

const OUTPUT = "dist/cv.pdf";

async function run() {
  const server = await preview({ logLevel: "error" });
  const url = `http://localhost:${server.port}/cv`;

  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle" });
    await page.emulateMedia({ media: "print" });
    await page.pdf({
      path: OUTPUT,
      format: "A4",
      printBackground: true,
      margin: {
        top: "14mm",
        bottom: "14mm",
        left: "14mm",
        right: "14mm",
      },
    });
    console.log(`✓ Wrote ${OUTPUT}`);
  } finally {
    await browser.close();
    await server.stop();
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
