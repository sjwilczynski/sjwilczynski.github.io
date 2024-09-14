import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import purgecss from "astro-purgecss";

// https://astro.build/config
export default defineConfig({
  site: "https://sjwilczynski.github.io",
  build: {
    inlineStylesheets: "never",
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
        "fa-solid": ["medal", "award", "basketball-ball"],
      },
    }),
    purgecss(),
  ],
});
