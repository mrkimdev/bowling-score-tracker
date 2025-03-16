import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { GamesModule } from './features/games/games.module';
import { FramesModule } from './features/frames/frames.module';
import { CoreModule } from './core/core.module';
@Module({
  imports: [ConfigModule.forRoot(), CoreModule, GamesModule, FramesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
