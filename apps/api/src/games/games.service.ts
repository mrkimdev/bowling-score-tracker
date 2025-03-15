
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/core/services/prisma.service';
import { CreateGameDto, GameDto } from './game.dto';

@Injectable()
export class GamesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createGameDto: CreateGameDto): Promise<GameDto> {
    const record = await this.prisma.game.create({
      data: {
        players: createGameDto.players.join(','),
      },
    });
    return {
      id: record.id,
      created_at: record.created_at,
      players: record.players.split(','),
      frames: [],
      scores: [],
    };
  }

  async findOne(id: string): Promise<GameDto> {
    const game = await this.prisma.game.findUnique({
      where: { id },
      include: {
        frames: true,
        scores: true,
      },
    });

    return {
      id: game.id,
      created_at: game.created_at,
      players: game.players.split(','),
      frames: game.frames.sort((a, b) => a.player_order - b.player_order).map(item => ({
        frame_number: item.frame_number,
        roll_1: item.roll_1,
        roll_2: item.roll_2,
        roll_3: item.roll_3,
        game_id: item.game_id,
        player_order: item.player_order,
      })),
      scores: game.scores.sort((a, b) => a.player_order - b.player_order).map(item => item.total_score),
    };
  }

  async findAll(): Promise<GameDto[]> {
    const games = await this.prisma.game.findMany({ include: { frames: true, scores: true } });
    return games.map(game => ({
      id: game.id,
      created_at: game.created_at,
      players: game.players.split(','),
      frames: game.frames.sort((a, b) => a.player_order - b.player_order).map(item => ({
        frame_number: item.frame_number,
        roll_1: item.roll_1,
        roll_2: item.roll_2,
        roll_3: item.roll_3,
        game_id: item.game_id,
        player_order: item.player_order,
      })),
      scores: game.scores.sort((a, b) => a.player_order - b.player_order).map(item => item.total_score),
    }))
  }

  async endGame(id: string): Promise<GameDto> {
    return this.findOne(id);
  }
}