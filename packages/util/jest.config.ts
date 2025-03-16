import { config } from '@repo/jest-config/base';

export default {
  ...config,
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testRegex: '.*\\.test\\.ts$',
  testEnvironment: 'node', 
};
