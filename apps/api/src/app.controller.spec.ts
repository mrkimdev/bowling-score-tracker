import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach } from '@jest/globals';
import { AppController } from './app.controller';
import { CoreModule } from './core/core.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [CoreModule],
      controllers: [AppController],
      providers: [],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('/health', () => {
    it('should return "OK"', () => {
      expect(appController.health()).toBe('OK');
    });
  });

  describe('/metrics', () => {
    it('should return metrics', () => {
      expect(appController.getMetrics()).toBeDefined();
    });
  });
});
