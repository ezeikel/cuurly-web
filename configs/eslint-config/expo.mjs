import { FlatCompat } from "@eslint/eslintrc";
import globals from "globals";
import baseConfig from "./base.mjs";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default [
  ...baseConfig,
  ...compat.extends("expo"),
  {
    languageOptions: {
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
]; 