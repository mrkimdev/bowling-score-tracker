import { FramesController } from "./frames.controller";
import { PrismaService } from "@/core/services/prisma.service";
import { Test } from "@nestjs/testing";
import { TestingModule } from "@nestjs/testing";
import { mockDeep, DeepMockProxy } from "jest-mock-extended";
import { FramesService } from "./frames.service";
import { randomUUID } from "crypto";
import { BadRequestException } from "@nestjs/common";
describe('FramesController', () => {
  let controller: FramesController;
  let prismaService: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FramesController],
      providers: [
        FramesService,
        {
          provide: PrismaService, useValue: mockDeep<PrismaService>()
        },
      ],
    }).compile(); 
    controller = app.get<FramesController>(FramesController);
    prismaService = app.get<DeepMockProxy<PrismaService>>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /games/:gameId/frames', () => {
    it('should create a frame', async () => {
      const newFrame = {
        game_id: '1',
        player_order: 0,
        roll_1: 10,
        frame_number: 1,
      }
      prismaService.gameFrame.create.mockResolvedValue({
        id: randomUUID(),
        ...newFrame
      } as any);
      const frame = await controller.create(newFrame); 
      expect(frame).toBeDefined();
      expect(prismaService.gameFrame.create).toHaveBeenCalled();
    })

    it('should throw BadRequestException when frame data is invalid', async () => {
      const invalidFrame = {
        game_id: '1',
        player_order: 0,
        roll_1: 11,
        frame_number: 1,
      }
      await expect(controller.create(invalidFrame)).rejects.toThrow(BadRequestException);
    })
  })

  describe('PUT /games/:gameId/frames/:frameId', () => {
    it('should update a frame', async () => {
      const existedFrame = {
        id: randomUUID(),
        game_id: '1',
        player_order: 0,
        roll_1: 10,
        frame_number: 1,
      };
      const frameId = randomUUID();
      prismaService.gameFrame.update.mockResolvedValue({
        ...existedFrame,
      } as any);
      const frame = await controller.update(frameId, existedFrame);
      expect(frame).toBeDefined();
      expect(prismaService.gameFrame.update).toHaveBeenCalled();
    });

    it('should throw BadRequestException when frame data is invalid', async () => {
      const invalidFrame = {
        id: randomUUID(),
        game_id: '1',
        player_order: 0,
        roll_1: 11,
        frame_number: 1,
      };
      await expect(
        controller.update(randomUUID(), invalidFrame),
      ).rejects.toThrow(BadRequestException);
    });
  })
});