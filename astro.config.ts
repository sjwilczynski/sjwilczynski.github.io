import { defineConfig, fontProviders } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

const systemFontFallbacks = [
  "-apple-system",
  "BlinkMacSystemFont",
  "Segoe UI",
  "Roboto",
  "Helvetica Neue",
  "Arial",
  "sans-serif",
  "Apple Color Emoji",
  "Segoe UI Emoji",
  "Segoe UI Symbol",
  "Noto Color Emoji",
];

// https://astro.build/config
export default defineConfig({
  site: "https://sjwilczynski.github.io",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "pl"],
    routing: { prefixDefaultLocale: false },
    // NO `fallback`: it is route-level, not per-entry, and would auto-generate
    // an English /pl/cv/. Per-entry fallback is handled in getData(lang).
  },
  build: {
    inlineStylesheets: "never",
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Saira Extra Condensed",
      cssVariable: "--font-heading",
      weights: ["500", "700"],
      subsets: ["latin", "latin-ext"],
      fallbacks: systemFontFallbacks,
    },
    {
      provider: fontProviders.google(),
      name: "Mulish",
      cssVariable: "--font-body",
      weights: ["400", "800"],
      styles: ["normal", "italic"],
      subsets: ["latin", "latin-ext"],
      fallbacks: systemFontFallbacks,
    },
  ],
  integrations: [
    mdx(),
    sitemap({
      // The printable CV is intentionally noindex; drop /cv, /cv/, and /pl/cv/.
      filter: (page) => !/\/cv\/?$/.test(new URL(page).pathname),
      i18n: {
        defaultLocale: "en",
        locales: { en: "en-US", pl: "pl-PL" },
      },
    }),
    icon({
      include: {
        fa: [
          "graduation-cap",
          "heart",
          "linkedin",
          "github",
          "stack-overflow",
          "plane",
          "book",
        ],
        "fa-solid": [
          "medal",
          "award",
          "basketball-ball",
          "dumbbell",
          "file-pdf",
          "sun",
          "moon",
        ],
      },
    }),
  ],
});
