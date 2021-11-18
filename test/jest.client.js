module.exports = {
  ...require("./jest-common"), // eslint-disable-line global-require
  displayName: "client",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: [
    "jest-styled-components",
    "@testing-library/jest-dom/extend-expect",
  ],
};
