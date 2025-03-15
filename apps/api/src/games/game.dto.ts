import { CreateFrameDto } from "@/frames/frame.dto";

export class CreateGameDto {
  players: string[];
}

export class GameDto {
  id: string;
  created_at: Date;
  players: string[];
  frames: CreateFrameDto[];
  scores: number[];
}