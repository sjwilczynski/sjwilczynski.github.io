import globals from "globals";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import astroPlugin from "eslint-plugin-astro";
import js from "@eslint/js";

export default [
  {
    ignores: ["**/*.mdx", "**/*.d.ts", "dist/**", ".astro/**"],
  },
  js.configs.recommended,
  ...tsPlugin.configs["flat/recommended"],
  ...astroPlugin.configs["flat/recommended"],
  ...astroPlugin.configs["flat/jsx-a11y-recommended"],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "no-constant-binary-expression": "error",
    },
  },
];
