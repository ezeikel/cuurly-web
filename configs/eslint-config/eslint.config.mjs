// eslint.config.mjs
import baseConfig from "./base.mjs";
import reactConfig from "./react.mjs";
import nextjsConfig from "./next.mjs";

/** @type {import('typescript-eslint').Config} */
export default [
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"],
    rules: {
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: [
            "**/*.test.{ts,tsx}",
            "**/*.spec.{ts,tsx}",
            "**/*.config.{ts,js,mjs}",
            "**/eslint/*.mjs",
            "jest.setup.ts",
            "playwright.config.ts",
          ],
        },
      ],
    },
  },
  {
    files: ["*.config.{js,ts,mjs}", "**/eslint/*.mjs"],
    rules: {
      "import/no-extraneous-dependencies": "off",
    },
  },
];