import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://sjwilczynski.github.io",
  build: {
    inlineStylesheets: "never",
  },
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
