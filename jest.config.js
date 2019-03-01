module.exports = {
  verbose: true,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
  collectCoverageFrom: ['src/**/*.{js,jsx}', '!**/node_modules/**', '!**/lib/**', '!**/bin/**'],
};
