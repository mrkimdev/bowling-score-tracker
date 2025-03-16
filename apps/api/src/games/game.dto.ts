import { ApiProperty } from '@nestjs/swagger';
import { CreateFrameDto } from "@/frames/frame.dto";
import { Game, GameFrame, GameScore } from '@prisma/client';

export class CreateGameDto {
  @ApiProperty({ description: 'The players of the game' })
  players: string[];
}

export class GameDto {
  @ApiProperty({ description: 'The ID of the game' })
  id: string;
  @ApiProperty({ description: 'The creation time of the game' })
  created_at: string;
  @ApiProperty({ description: 'The end time of the game' })
  ended_at: string;
  @ApiProperty({ description: 'The players of the game' })
  players: string[];
  @ApiProperty({ type: [CreateFrameDto], description: 'The frames of the game' })
  frames: CreateFrameDto[];
  @ApiProperty({ description: 'The scores of the game' })
  scores: number[];

  static fromEntity(entity: Game, frames: GameFrame[], scores: GameScore[]): GameDto {
    const dto = new GameDto();
    dto.id = entity.id;
    dto.created_at = entity.created_at.toISOString();
    dto.ended_at = entity.ended_at?.toISOString();
    dto.players = entity.players.split(',');
    dto.frames = frames.sort((a, b) => a.player_order - b.player_order).map(item => CreateFrameDto.fromEntity(item));
    dto.scores = scores.sort((a, b) => a.player_order - b.player_order).map(item => item.total_score);
    return dto;
  }
}