module.exports = {
  ...require("./test/jest-common"), // eslint-disable-line global-require
  coverageThreshold: {
    global: {
      statements: 34,
      branches: 24,
      functions: 29,
      lines: 29,
    },
  },
  projects: ["./test/jest.lint.js", "./test/jest.client.js"],
};
