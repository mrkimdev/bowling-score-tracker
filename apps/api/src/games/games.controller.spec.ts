import { Test } from "@nestjs/testing";
import { TestingModule } from "@nestjs/testing";
import { GamesController } from "./games.controller";
import { PrismaService } from "@/core/services/prisma.service";
import { randomUUID } from "crypto";
import { mockDeep, DeepMockProxy } from 'jest-mock-extended'
import { GamesService } from "./games.service";

describe('GamesController', () => {
  let controller: GamesController;
  let prismaService: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [GamesController],
      providers: [
        GamesService,
        {
          provide: PrismaService,
          useValue: mockDeep<PrismaService>(),
        },
      ],
    }).compile();

    controller = app.get<GamesController>(GamesController);
    prismaService = app.get<DeepMockProxy<PrismaService>>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /games', () => {
    it('should get all games', async () => {
      prismaService.game.findMany.mockResolvedValue([
        {
          id: randomUUID(),
          created_at: new Date(),
          ended_at: null,
          players: 'Hulk,Hawkeye,Wolvering,Deadpool', 
          frames: [],
          scores: [],
        } as any
      ]);
      const games = await controller.findAll();
      expect(games).toBeDefined();
    });
  });

  describe('POST /games', () => {
    it('should create a game', async () => {
      const emptyGame = {
        id: randomUUID(),
        created_at: new Date(),
        ended_at: null,
        players: 'Hulk,Hawkeye,Wolvering,Deadpool',
      }
      prismaService.game.create.mockResolvedValue(emptyGame);
      const game = await controller.create({ players: ['Hulk', 'Hawkeye', 'Wolvering', 'Deadpool'] });
      expect(game).toBeDefined();
    });
  });

  describe('GET /games/:id', () => {
    it('should get a game', async () => {
      const emptyGame = {
        id: randomUUID(),
        created_at: new Date(),
        ended_at: null,
        players: 'Hulk,Hawkeye,Wolvering,Deadpool',
        frames: [],
        scores: []
      }
      prismaService.game.findUnique.mockResolvedValue(emptyGame);
      const game = await controller.findOne(randomUUID());
      expect(game).toBeDefined();
      expect(game.id).toEqual(emptyGame.id);
      expect(game.created_at).toEqual(emptyGame.created_at.toISOString());
      expect(game.ended_at).not.toBeDefined();
      expect(game.players).toEqual(expect.arrayContaining(['Hulk', 'Hawkeye', 'Wolvering', 'Deadpool']));
    });
  });

  describe('POST /games/:id/end-game', () => {
    it('should end a game', async () => {
      const gameId = randomUUID();
      const endDate = new Date();
      prismaService.$transaction.mockResolvedValue([,,[{
          id: randomUUID(),
          game_id: gameId,
          player_order: 0,
          total_score: 10,
        },
        {
          id: randomUUID(),
          game_id: gameId,
          player_order: 1,
          total_score: 10,
        }]])
      prismaService.game.findUnique.mockResolvedValue({
        id: gameId,
        created_at: endDate,
        ended_at: null,
        players: 'Hulk,Hawkeye,Wolvering,Deadpool',
        frames: [{
          id: randomUUID(),
          game_id: gameId,
          player_order: 0,
          roll_1: 10,
          roll_2: 0,
        },
        {
          id: randomUUID(),
          game_id: gameId,
          player_order: 0,
          roll_1: 10,
          roll_2: 0,
        }] as any
      } as any);
      const game = await controller.endGame(gameId);
      expect(game).toBeDefined();
      expect(prismaService.game.update).toHaveBeenCalled();
      expect(prismaService.gameScore.createMany).toHaveBeenCalled();
      expect(prismaService.gameScore.findMany).toHaveBeenCalled();
    });
  });
});