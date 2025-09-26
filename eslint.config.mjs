import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}", "**/*.test.js"],
    plugins: { js, jest: pluginJest },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...globals.jest },
      rules: {
        ...pluginJest.configs.recommended.rules,
      },
    },
  },
]);
