module.exports = {
  parser: "@babel/eslint-parser", // specifies ESLint parser
  parserOptions: {
    ecmaVersion: 2021, // allows for the parsing of modern ECMAScript features
    sourceType: "module", // allows for the use of imports
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  extends: ["airbnb", "plugin:prettier/recommended"],
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  rules: {
    "valid-typeof": "error",
    "react/react-in-jsx-scope": 0,
    "react/state-in-constructor": 0,
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "react/prop-types": 0,
    "react/require-default-props": 0,
    "react/jsx-filename-extension": [
      2,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "jsx-a11y/anchor-is-valid": [
      2,
      {
        components: ["Link"],
        specialLink: ["hrefLeft", "hrefRight"],
        aspects: ["invalidHref", "preferButton"],
      },
    ],
    "jsx-a11y/label-has-associated-control": ["error", { assert: "either" }],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [".storybook/**", "./components/GlobalStyles.js"],
      },
    ],
    "no-console": [2, { allow: ["warn", "error"] }],
    "react/function-component-definition": 0,
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
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
              "./components/**/*.test.tsx",
              "./components/**/*.stories.tsx",
              "./components/**/*.styled.ts",
            ],
          },
        ],
      },
    },
    {
      files: "./cypress.config.ts",
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./cypress/tsconfig.json",
      },
      plugins: ["@typescript-eslint/eslint-plugin"],
      extends: ["airbnb-typescript", "plugin:prettier/recommended"],
      rules: {
        "import/no-extraneous-dependencies": [
          "error",
          {
            devDependencies: ["./cypress.config.ts"],
          },
        ],
      },
    },
  ],
};
