import { ApiProperty } from '@nestjs/swagger';

export class CreateFrameDto {
  @ApiProperty({ description: 'The number of the frame' })
  frame_number: number;
  @ApiProperty({ description: 'The first roll of the frame' })
  roll_1: string;
  @ApiProperty({ description: 'The second roll of the frame' })
  roll_2?: string;
  @ApiProperty({ description: 'The third roll of the frame' })
  roll_3?: string;
  @ApiProperty({ description: 'The ID of the game' })
  game_id: string;
  @ApiProperty({ description: 'The order of the player' })
  player_order: number;
}