import type { Config } from 'jest';

export const config = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: "babel",
  coverageReporters: ['text', 'lcov'],
  moduleFileExtensions: ['js', 'ts', 'json'],
  testEnvironment: 'jsdom',
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
} as const satisfies Config;
