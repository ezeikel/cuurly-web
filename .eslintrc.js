module.exports = {
  extends: ["next", "airbnb", "plugin:prettier/recommended"],
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  rules: {
    "react/react-in-jsx-scope": 0,
    "react/state-in-constructor": 0,
    "react/function-component-definition": 0,
    "react/prop-types": 0,
    "react/require-default-props": 0,
    "jsx-a11y/anchor-is-valid": [
      2,
      {
        components: ["Link"],
        specialLink: ["hrefLeft", "hrefRight"],
        aspects: ["invalidHref", "preferButton"],
      },
    ],
    "no-console": [2, { allow: ["warn", "error"] }],
  },
  overrides: [
    {
      files: "**/*.ts?(x)",
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
      },
      plugins: ["@typescript-eslint/eslint-plugin"],
      extends: ["airbnb-typescript", "plugin:prettier/recommended"],
      rules: {
        "import/no-extraneous-dependencies": [
          "error",
          {
            devDependencies: [
              "./jest.config.ts",
              "./test/jest.common.ts",
              "./test/jest.client.ts",
              "./test/jest.lint.ts",
              "./test/jest.setup.ts",
              "./lib/utils.ts",
              "**/*.test.ts",
              "**/*.test.tsx",
              "tailwind.config.ts",
            ],
          },
        ],
      },
    },
  ],
};
