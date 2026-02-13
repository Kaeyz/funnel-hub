// @ts-check
import eslint from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";
import vue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";

export default tseslint.config(
  {
    ignores: ["eslint.config.mjs", "src/components/ui"],
  },

  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...vue.configs["flat/recommended"],
  eslintPluginPrettierRecommended,

  // Vue file handling
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".vue"],
      },
    },
  },

  // Global settings
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
      sourceType: "module",
    },
  },

  // Custom rules
  {
    rules: {
      "prettier/prettier": ["error", { singleQuote: false }],
      quotes: ["warn", "double"],
      semi: ["warn", "always"],

      "@typescript-eslint/no-explicit-any": "off",
    },
  }
);
