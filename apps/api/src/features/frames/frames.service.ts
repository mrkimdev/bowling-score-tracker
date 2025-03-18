import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/core/services/prisma.service';
import { CreateFrameDto, FrameDto } from './frame.dto';
import { validateFrameData, MAX_FRAMES } from '@repo/util/bowling-score';

@Injectable()
export class FramesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFrameDto: CreateFrameDto) {
    if (
      !validateFrameData(
        createFrameDto,
        MAX_FRAMES === createFrameDto.frame_number,
      )
    ) {
      throw new BadRequestException('Invalid frame data');
    }
    const newFrame = await this.prisma.gameFrame.create({
      data: {
        ...createFrameDto,
        roll_1: +createFrameDto.roll_1,
        roll_2: createFrameDto.roll_2 ? +createFrameDto.roll_2 : undefined,
        roll_3: createFrameDto.roll_3 ? +createFrameDto.roll_3 : undefined,
      },
    });
    return FrameDto.fromEntity(newFrame);
  }

  async update(id: string, updateFrameDto: FrameDto) {
    if (
      !validateFrameData(
        updateFrameDto,
        MAX_FRAMES === updateFrameDto.frame_number,
      )
    ) {
      throw new BadRequestException('Invalid frame data');
    }
    const updatedFrame = await this.prisma.gameFrame.update({
      where: { id },
      data: {
        ...updateFrameDto,
        roll_1: +updateFrameDto.roll_1,
        roll_2: updateFrameDto.roll_2 ? +updateFrameDto.roll_2 : undefined,
        roll_3: updateFrameDto.roll_3 ? +updateFrameDto.roll_3 : undefined,
      },
    });
    return FrameDto.fromEntity(updatedFrame);
  }
}