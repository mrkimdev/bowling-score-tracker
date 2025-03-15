export class CreateFrameDto {
  frame_number: number;
  roll_1: string;
  roll_2?: string;
  roll_3?: string;
  game_id: string;
  player_order: number;
}