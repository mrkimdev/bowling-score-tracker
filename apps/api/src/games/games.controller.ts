
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto, GameDto } from './game.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all games' })
  async findAll(): Promise<GameDto[]> {
    return this.gamesService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new game' })
  async create(@Body() createGameDto: CreateGameDto): Promise<GameDto> {
    return this.gamesService.create(createGameDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a game by ID' })
  async findOne(@Param('id') id: string): Promise<GameDto> {
    return this.gamesService.findOne(id);
  }

  @Post(':id/end-game')
  @ApiOperation({ summary: 'End a game by ID' })
  async createFrame(@Param('id') id: string): Promise<GameDto> {
    return this.gamesService.endGame(id);
  }
}
