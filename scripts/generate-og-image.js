// Generates the 1200x630 social-share (Open Graph) image at
// public/img/og-image.png from the headshot in
// src/components/navigation/face.webp.
//
// Run with: bun --bun run og
//
// The brand fonts (Saira Extra Condensed for the name, Mulish for the rest)
// are downloaded from Google Fonts as exact-character subsets and embedded in
// the SVG so the render is deterministic and includes the Polish glyphs
// (ł, ń). The committed PNG is what ships; this script only needs to run when
// the headshot or wording changes.

import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const WIDTH = 1200;
const HEIGHT = 630;

const NAME_LINE1 = "Stanisław";
const NAME_LINE2 = "Wilczyński";
const ROLE = "Full-Stack Developer";
const TAGLINE = "Tools, code quality & accessible products";
const LOCATION = "Wrocław, Poland";
const SITE = "sjwilczynski.github.io";

const BG_FROM = "#4479a2";
const BG_TO = "#2d5171";

async function fetchFontBase64(family, weight, text) {
  const url =
    `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}` +
    `:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
  }).then((r) => {
    if (!r.ok)
      throw new Error(`Font CSS fetch failed for ${family}: ${r.status}`);
    return r.text();
  });
  const ttf = css.match(/url\((https:\/\/[^)]+)\)\s*format\('truetype'\)/);
  if (!ttf) throw new Error(`No TTF url found for ${family}`);
  const buf = Buffer.from(await fetch(ttf[1]).then((r) => r.arrayBuffer()));
  return buf.toString("base64");
}

function escapeXml(s) {
  return s.replace(
    /[<>&'"]/g,
    (c) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "'": "&apos;",
        '"': "&quot;",
      })[c],
  );
}

async function main() {
  const sairaChars = NAME_LINE1 + NAME_LINE2 + " ";
  const mulishChars = ROLE + TAGLINE + LOCATION + SITE + " ·•";

  const [saira, mulish] = await Promise.all([
    fetchFontBase64("Saira Extra Condensed", 700, sairaChars),
    fetchFontBase64("Mulish", 800, mulishChars),
  ]);

  const ringD = 380;
  const ringX = 930;
  const ringY = HEIGHT / 2;
  const photoD = 350;

  const svg = `<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @font-face { font-family: 'Saira Extra Condensed'; font-weight: 700; src: url(data:font/ttf;base64,${saira}) format('truetype'); }
      @font-face { font-family: 'Mulish'; font-weight: 800; src: url(data:font/ttf;base64,${mulish}) format('truetype'); }
    </style>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${BG_FROM}"/>
      <stop offset="1" stop-color="${BG_TO}"/>
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <text x="80" y="232" font-family="Saira Extra Condensed" font-weight="700" font-size="112" fill="#ffffff" letter-spacing="-1">${escapeXml(NAME_LINE1)}</text>
  <text x="80" y="338" font-family="Saira Extra Condensed" font-weight="700" font-size="112" fill="#ffffff" letter-spacing="-1">${escapeXml(NAME_LINE2)}</text>
  <text x="82" y="398" font-family="Mulish" font-weight="800" font-size="38" fill="#dce7f1">${escapeXml(ROLE)}</text>
  <rect x="82" y="452" width="64" height="6" rx="3" fill="#ffffff" opacity="0.85"/>
  <text x="82" y="502" font-family="Mulish" font-weight="800" font-size="26" fill="#bcd0e3">${escapeXml(TAGLINE)}</text>
  <text x="82" y="560" font-family="Mulish" font-weight="800" font-size="23" fill="#ffffff" opacity="0.92">${escapeXml(SITE)}<tspan dx="16" fill="#9fbcd6">•</tspan><tspan dx="16" fill="#bcd0e3">${escapeXml(LOCATION)}</tspan></text>
  <circle cx="${ringX}" cy="${ringY}" r="${ringD / 2}" fill="#ffffff" opacity="0.18"/>
  <circle cx="${ringX}" cy="${ringY}" r="${ringD / 2 - 7}" fill="none" stroke="#ffffff" stroke-width="3" opacity="0.65"/>
</svg>`;

  const background = await sharp(Buffer.from(svg)).png().toBuffer();

  const mask = Buffer.from(
    `<svg width="${photoD}" height="${photoD}" xmlns="http://www.w3.org/2000/svg"><circle cx="${photoD / 2}" cy="${photoD / 2}" r="${photoD / 2}" fill="#fff"/></svg>`,
  );

  const photo = await sharp(
    resolve(root, "src/components/navigation/face.webp"),
  )
    .resize(photoD, photoD, { fit: "cover", position: "top" })
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();

  const out = resolve(root, "public/img/og-image.png");
  await sharp(background)
    .composite([
      {
        input: photo,
        left: Math.round(ringX - photoD / 2),
        top: Math.round(ringY - photoD / 2),
      },
    ])
    .png()
    .toFile(out);

  console.log(`Wrote ${out}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
