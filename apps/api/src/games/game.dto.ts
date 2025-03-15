import { ApiProperty } from '@nestjs/swagger';
import { CreateFrameDto } from "@/frames/frame.dto";

export class CreateGameDto {
  @ApiProperty({ description: 'The players of the game' })
  players: string[];
}

export class GameDto {
  @ApiProperty({ description: 'The ID of the game' })
  id: string;
  @ApiProperty({ description: 'The creation date of the game' })
  created_at: Date;
  @ApiProperty({ description: 'The players of the game' })
  players: string[];
  @ApiProperty({ description: 'The frames of the game' })
  frames: CreateFrameDto[];
  @ApiProperty({ description: 'The scores of the game' })
  scores: number[];
}