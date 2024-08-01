module.exports = {
  roots: ['tests/'],
  verbose: true,
  bail: 1,
  collectCoverage: true,
  collectCoverageFrom: [
    '!node_modules/**',
    '!dist/**',
    '!src/app/Logger.ts',
    '!src/app/http/rest/**/*',
    '!src/app/http/index.ts',
    '!src/app/context.ts',
    '!src/app/cluster.ts',
    '!tests/**',
  ],
  coverageThreshold: {
    global: {
      lines: 70,
      statements: 80,
      branches: 80,
      functions: 80,
    },
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
}