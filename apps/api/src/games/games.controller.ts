
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto, GameDto } from './game.dto';
import { ApiOperation, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all games' })
  @ApiOkResponse({ type: GameDto, isArray: true, description: 'All Games have been successfully retrieved.'})
  async findAll(): Promise<GameDto[]> {
    return this.gamesService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new game' })
  @ApiCreatedResponse({ description: 'New Game has been successfully created.'})
  async create(@Body() createGameDto: CreateGameDto): Promise<GameDto> {
    return this.gamesService.create(createGameDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a game by ID' })
  @ApiOkResponse({ description: 'Game has been successfully retrieved.'})
  async findOne(@Param('id') id: string): Promise<GameDto> {
    return this.gamesService.findOne(id);
  }

  @Post(':id/end-game')
  @ApiOperation({ summary: 'End a game by ID' })
  @ApiCreatedResponse({ description: 'Game has been successfully ended.'})
  async createFrame(@Param('id') id: string): Promise<GameDto> {
    return this.gamesService.endGame(id);
  }
}
