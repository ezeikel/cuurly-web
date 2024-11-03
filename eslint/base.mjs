import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat();

export default [
  {
    languageOptions: {
      globals: {
        browser: true,
        es2021: true,
        jest: true,
        expect: true,
        describe: true,
        it: true,
        beforeAll: true,
        afterAll: true,
        beforeEach: true,
        afterEach: true,
      },
    },
  },
  ...compat.extends("airbnb-base"),
  ...compat.extends("plugin:prettier/recommended"),
  {
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
          alwaysTryTypes: true,
        },
        node: true,
      },
    },
    rules: {
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: true,
          optionalDependencies: false,
          peerDependencies: false,
          includeTypes: true,
        },
      ],
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
    },
  },
];
