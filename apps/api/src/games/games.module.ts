import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { CoreModule } from '@/core/core.module';

@Module({
  imports: [CoreModule],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
