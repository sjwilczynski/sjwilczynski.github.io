// Fails the build if a localized collection's EN and PL key sets diverge.
// Subdir collections compare basenames under en/ vs pl/; object collections
// require both en.json and pl.json to exist.
import { readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const CONTENT = "src/content";
const SUBDIR_COLLECTIONS = [
  "experience",
  "education",
  "research",
  "projects",
  "skills",
];
const FILE_COLLECTIONS = ["about", "achievements"];
const LOCALES = ["en", "pl"];

const problems = [];

const list = (dir) =>
  existsSync(dir)
    ? readdirSync(dir)
        .filter((f) => !f.startsWith("."))
        .sort()
    : null;

for (const col of SUBDIR_COLLECTIONS) {
  const sets = {};
  for (const loc of LOCALES) {
    const files = list(join(CONTENT, col, loc));
    if (files === null) {
      problems.push(`${col}: missing locale directory "${loc}/"`);
      sets[loc] = new Set();
    } else {
      sets[loc] = new Set(files);
    }
  }
  for (const loc of LOCALES) {
    const other = LOCALES.find((l) => l !== loc);
    for (const f of sets[loc]) {
      if (!sets[other].has(f)) {
        problems.push(
          `${col}: "${loc}/${f}" has no counterpart in "${other}/"`,
        );
      }
    }
  }
}

for (const col of FILE_COLLECTIONS) {
  for (const loc of LOCALES) {
    const p = join(CONTENT, col, `${loc}.json`);
    if (!existsSync(p)) problems.push(`${col}: missing "${loc}.json"`);
  }
}

if (problems.length > 0) {
  console.error("✗ i18n parity check failed:");
  for (const p of problems) console.error("  - " + p);
  process.exit(1);
}
console.log("✓ i18n parity check passed (EN/PL key sets match)");
