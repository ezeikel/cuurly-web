import path from "path";
import type { Config } from "jest";
import nextJest from "next/jest";

const rootDir = path.resolve(__dirname);

const createJestConfig = nextJest({
  dir: rootDir,
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^@/components/(.*)$": "<rootDir>/components/$1",
    "^@/app/(.*)$": "<rootDir>/app/$1",
    "^@/lib/(.*)$": "<rootDir>/lib/$1",
  },
  testPathIgnorePatterns: ["<rootDir>/tests/"],
  transformIgnorePatterns: ["/node_modules/(?!next-auth|@auth/core)/"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
};

export default createJestConfig(config);
