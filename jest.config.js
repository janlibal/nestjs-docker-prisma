// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'ts', 'json'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$', // Test files have the `.spec.ts` extension
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json', // Path to your TypeScript config file
    },
  },
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'], // Optional setup file
  coverageDirectory: './coverage',
  collectCoverage: true,
  coverageProvider: 'v8',
  coveragePathIgnorePatterns: ['/node_modules/', 'test/'], // Exclude test files from coverage
};
