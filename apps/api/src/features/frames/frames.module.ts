import { Module } from '@nestjs/common';
import { FramesService } from './frames.service';
import { CoreModule } from '@/core/core.module';
import { FramesController } from './frames.controller';


@Module({
  imports: [CoreModule],
  controllers: [FramesController],
  providers: [FramesService],
})
export class FramesModule {}