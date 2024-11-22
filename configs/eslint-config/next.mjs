import nextPlugin from "@next/eslint-plugin-next";

export default [
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "@next/next/no-html-link-for-pages": "off", // Disable if you're using app directory
    },
    settings: {
      next: {
        rootDir: ".",
      },
    },
  },
];
