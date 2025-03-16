import { ApiProperty } from '@nestjs/swagger';
import { GameFrame } from '@prisma/client';
export class FrameDto {
  @ApiProperty({ description: 'The number of the frame' })
  frame_number: number;
  @ApiProperty({ description: 'The first roll of the frame' })
  roll_1: number;
  @ApiProperty({ description: 'The second roll of the frame' })
  roll_2?: number;
  @ApiProperty({ description: 'The third roll of the frame' })
  roll_3?: number;
  @ApiProperty({ description: 'The ID of the game' })
  game_id: string;
  @ApiProperty({ description: 'The order of the player' })
  player_order: number;

  static fromEntity(entity: GameFrame): FrameDto {
    const dto = new FrameDto();
    dto.frame_number = entity.frame_number;
    dto.roll_1 = entity.roll_1;
    dto.roll_2 = entity.roll_2;
    dto.roll_3 = entity.roll_3;
    dto.game_id = entity.game_id;
    dto.player_order = entity.player_order;
    return dto;
  }
}
