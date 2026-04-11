// Compare two screenshot directories and generate diff images
// Usage: node scripts/compare-screenshots.js <baseline-dir> <compare-dir>
// Outputs diff images to scratch/screenshots/diff/ and a summary

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "fs";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const baselineDir = process.argv[2];
const compareDir = process.argv[3];

if (!baselineDir || !compareDir) {
  console.error(
    "Usage: node scripts/compare-screenshots.js <baseline-dir> <compare-dir>",
  );
  process.exit(1);
}

const diffDir = "scratch/screenshots/diff";
mkdirSync(diffDir, { recursive: true });

const files = readdirSync(baselineDir).filter((f) => f.endsWith(".png"));
const results = [];

for (const file of files) {
  const img1 = PNG.sync.read(readFileSync(`${baselineDir}/${file}`));
  const img2 = PNG.sync.read(readFileSync(`${compareDir}/${file}`));

  const { width, height } = img1;

  if (img2.width !== width || img2.height !== height) {
    console.log(
      `⚠️  ${file}: size mismatch (${width}x${height} vs ${img2.width}x${img2.height})`,
    );
    results.push({ file, diffPixels: -1, pct: "SIZE_MISMATCH" });
    continue;
  }

  const diff = new PNG({ width, height });
  const diffPixels = pixelmatch(
    img1.data,
    img2.data,
    diff.data,
    width,
    height,
    {
      threshold: 0.1,
    },
  );

  const totalPixels = width * height;
  const pct = ((diffPixels / totalPixels) * 100).toFixed(2);

  writeFileSync(`${diffDir}/${file}`, PNG.sync.write(diff));

  const icon = diffPixels === 0 ? "✅" : pct < 1 ? "⚠️ " : "❌";
  console.log(`${icon} ${file}: ${diffPixels} pixels differ (${pct}%)`);
  results.push({ file, diffPixels, pct });
}

console.log("\n--- Summary ---");
const perfect = results.filter((r) => r.diffPixels === 0).length;
const minor = results.filter((r) => r.diffPixels > 0 && r.pct < 1).length;
const major = results.filter((r) => r.pct >= 1).length;
console.log(`${perfect} perfect | ${minor} minor (<1%) | ${major} major (≥1%)`);
console.log(`Diff images saved to ${diffDir}/`);
