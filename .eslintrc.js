module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ["next/core-web-vitals", "airbnb", "plugin:prettier/recommended"],
  rules: {
    "react/state-in-constructor": "off",
    "react/function-component-definition": "off",
    "react/prop-types": "off",
    "react/require-default-props": "off",
    "react/jsx-uses-react": "off", // Not needed with React 17+
    "react/react-in-jsx-scope": "off", // Not needed with React 17+

    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["hrefLeft", "hrefRight"],
        aspects: ["invalidHref", "preferButton"],
      },
    ],

    "no-console": ["error", { allow: ["warn", "error"] }],
  },
  overrides: [
    {
      // apply to TypeScript files
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
      plugins: ["@typescript-eslint"],
      extends: [
        "airbnb-typescript",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
      ],
      rules: {
        // TypeScript-specific rules
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "warn",

        // Import rules for TypeScript
        "import/no-extraneous-dependencies": [
          "error",
          {
            devDependencies: [
              "**/*.test.ts",
              "**/*.test.tsx",
              "**/*.spec.ts",
              "**/*.spec.tsx",
              "jest.setup.ts",
              "jest.config.ts",
              "tailwind.config.ts",
            ],
          },
        ],
      },
    },
  ],
};
