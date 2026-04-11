import { defineConfig, fontProviders } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
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
  vite: {
    optimizeDeps: {
      include: ["react-vertical-timeline-component"],
      esbuildOptions: {
        define: {
          "process.env.NODE_ENV": JSON.stringify(
            process.env.NODE_ENV || "development",
          ),
        },
      },
    },
  },
  integrations: [
    react(),
    mdx(),
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
        "fa-solid": ["medal", "award", "basketball-ball", "dumbbell"],
      },
    }),
  ],
});
