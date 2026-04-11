import globals from "globals";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import astroPlugin from "eslint-plugin-astro";
import jsxA11y from "eslint-plugin-jsx-a11y";
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
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "jsx-a11y": jsxA11y,
    },
    rules: {
      ...jsxA11y.configs.recommended.rules,
    },
  },
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
