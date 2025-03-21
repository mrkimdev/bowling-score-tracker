
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
  @ApiCreatedResponse({ type: GameDto, description: 'New Game has been successfully created.'})
  async create(@Body() createGameDto: CreateGameDto): Promise<GameDto> {
    return this.gamesService.create(createGameDto);
  }

  @Get(':gameId')
  @ApiOperation({ summary: 'Get a game by ID' })
  @ApiOkResponse({ type: GameDto, description: 'Game has been successfully retrieved.'})
  async findOne(@Param('gameId') id: string): Promise<GameDto> {
    return this.gamesService.findOne(id);
  }

  @Post(':gameId/end')
  @ApiOperation({ summary: 'End a game by ID' })
  @ApiCreatedResponse({ type: GameDto, description: 'Game has been successfully ended.'})
  async endGame(@Param('gameId') id: string): Promise<GameDto> {
    return this.gamesService.endGame(id);
  }
}
