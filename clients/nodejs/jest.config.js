/** @type {import("ts-jest").JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  // testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
  testMatch: ["**/tests/**/*.test.js"],
  // testMatch: ["**/tests/campaign/**/*.test.js"],
  testEnvironment: "node",
  collectCoverage: true,
  testTimeout: 60 * 8 * 1000, // 8 minutes
  slowTestThreshold: 15,
  maxWorkers: 1,
  // While some tests include connecting real SMTP service, keep max concurrency to 2 to avoid spamming
  maxConcurrency: 1,
  // options for debugging the tests
  detectOpenHandles: true,
  forceExit: true,
  /// moduleNameMapper: {
  //   "parse-domain": require.resolve("parse-domain"),
  // },
  reporters: ["default"],
};
