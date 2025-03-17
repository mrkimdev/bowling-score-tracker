
import { Controller, Post, Body, Put, Param } from '@nestjs/common';
import { ApiOperation, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { FramesService } from './frames.service';
import { CreateFrameDto, FrameDto } from './frame.dto';

@Controller('games/:gameId/frames')
export class FramesController {
  constructor(private readonly framesService: FramesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new frame' })
  @ApiCreatedResponse({
    type: CreateFrameDto,
    description: 'New Frame has been successfully created.',
  })
  async create(@Body() createFrameDto: CreateFrameDto): Promise<FrameDto> {
    return this.framesService.create(createFrameDto);
  }

  @Put(':frameId')
  @ApiOperation({ summary: 'Update a frame' })
  @ApiOkResponse({
    type: FrameDto,
    description: 'Frame has been successfully updated.',
  })
  async update(
    @Param('frameId') id: string,
    @Body() updateFrameDto: FrameDto,
  ): Promise<FrameDto> {
    return this.framesService.update(id, updateFrameDto);
  }
}