import { config } from '@repo/jest-config/nest';
import type { Config } from 'jest';

export default {
  ...config,
  "moduleNameMapper": {
    "@/(.*)": "<rootDir>/$1"
  }
} satisfies Config;
