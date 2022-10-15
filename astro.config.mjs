import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import image from "@astrojs/image";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://sjwilczynski.github.io",
  integrations: [image(), react(), mdx()],
});
