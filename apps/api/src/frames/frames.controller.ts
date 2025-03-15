
import { Controller, Post, Body, Put, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FramesService } from './frames.service';
import { CreateFrameDto } from './frame.dto';

@Controller('games/:id/frames')
export class FramesController {
  constructor(private readonly framesService: FramesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new frame' })
  async create(@Body() createFrameDto: CreateFrameDto): Promise<CreateFrameDto> {
    return this.framesService.create(createFrameDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a frame' })
  async update(@Param('id') id: string, @Body() updateFrameDto: CreateFrameDto): Promise<CreateFrameDto> {
    return this.framesService.update(id, updateFrameDto);
  }
}