
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/core/services/prisma.service';
import { CreateGameDto, GameDto } from './game.dto';
import { calculateScore } from '@repo/util/dist/bowling-score';
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
      created_at: record.created_at.toISOString(),
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

    return GameDto.fromEntity(game, game.frames, game.scores);
  }

  async findAll(): Promise<GameDto[]> {
    const games = await this.prisma.game.findMany({ include: { frames: true, scores: true } });
    return games.map(game => (GameDto.fromEntity(game, game.frames, game.scores)))
  }

  async endGame(id: string): Promise<GameDto> {
    const game = await this.prisma.game.findUnique({
      where: { id },
      include: {
        frames: true,
      },
    });

    const [,,scores] = await this.prisma.$transaction([
      this.prisma.game.update({
        where: { id },
        data: { ended_at: new Date() },
      }),
      this.prisma.gameScore.createMany({
        data: game.players
          .split(',')
          .map((player, index) => ({
            game_id: id,
            player_order: index,
            total_score: calculateScore(game.frames
              .filter(frame => frame.player_order === index)
              .map(frame => ({
                roll_1: frame.roll_1,
                roll_2: frame.roll_2,
                roll_3: frame.roll_3,
              })
            ))
          })
        ),
      }),
      this.prisma.gameScore.findMany({
        where: { game_id: id },
      }),
    ]);
    return GameDto.fromEntity(game,game.frames,scores);
  }
}