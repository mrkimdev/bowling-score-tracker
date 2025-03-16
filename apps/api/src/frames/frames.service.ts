import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/core/services/prisma.service';
import { CreateFrameDto } from './frame.dto';
import { ScoresService } from './scores.service';
@Injectable()
export class FramesService {
  constructor(private readonly prisma: PrismaService, private readonly scoresService: ScoresService) {}

  async create(createFrameDto: CreateFrameDto) {
    return this.prisma.gameFrame.create({
      data: createFrameDto
    });
  }

  async update(id: string, updateFrameDto: CreateFrameDto) {
    return this.prisma.gameFrame.update({
      where: { id },
      data: updateFrameDto,
    }); 
  }
}