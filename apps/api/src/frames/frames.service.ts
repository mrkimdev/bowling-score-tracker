import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/core/services/prisma.service';
import { FrameDto } from './frame.dto';
import { validateFrameData, MAX_FRAMES } from '@repo/util/dist/bowling-score';

const LAST_FRAME_INDEX = MAX_FRAMES - 1;
@Injectable()
export class FramesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFrameDto: FrameDto) {
    if (!validateFrameData(createFrameDto, LAST_FRAME_INDEX === createFrameDto.frame_number)) {
      throw new BadRequestException('Invalid frame data');
    }
    const newFrame = await this.prisma.gameFrame.create({
      data: createFrameDto
    });
    return FrameDto.fromEntity(newFrame);
  } 

  async update(id: string, updateFrameDto: FrameDto) {
    if (!validateFrameData(updateFrameDto, LAST_FRAME_INDEX === updateFrameDto.frame_number)) {
      throw new BadRequestException('Invalid frame data');
    }
    const updatedFrame = await this.prisma.gameFrame.update({
      where: { id },
      data: updateFrameDto,
    }); 
    return FrameDto.fromEntity(updatedFrame);
  }
}