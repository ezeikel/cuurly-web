import baseConfig from "./base.mjs";
import nextjsConfig from "./next.mjs";
import reactConfig from "./react.mjs";
import typescriptConfig from "./typescript.mjs";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "dist/**",
      "build/**",
      "coverage/**",
    ],
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: true, // This will report unused eslint-disable comments
    },
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...typescriptConfig,
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"],
    rules: {
      // Override rules that might conflict between different configs
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
          optionalDependencies: false,
          peerDependencies: false,
          includeTypes: true,
        },
      ],
      // Turn off rules that TypeScript handles better
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn"],
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": ["error"],
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": ["error"],
      // Customize TypeScript-specific rules
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
    },
  },
  {
    files: ["*.config.{js,ts,mjs}", "**/eslint/*.mjs"],
    rules: {
      "import/no-extraneous-dependencies": "off",
    },
  },
  {
    files: ["**/__tests__/**/*", "**/*.{spec,test}.*"],
    rules: {
      "import/no-extraneous-dependencies": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];
