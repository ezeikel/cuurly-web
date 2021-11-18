const path = require("path");

module.exports = {
  rootDir: path.join(__dirname, ".."),
  moduleNameMapper: {
    "\\.css$": require.resolve("./style-mock.js"),
  },
  watchPlugins: [
    "jest-watch-select-projects",
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
};
