/* istanbul ignore file */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { RequestMethod } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1', {
    exclude: [
      { path: '/', method: RequestMethod.GET },
      { path: 'health', method: RequestMethod.GET },
      { path: 'metrics', method: RequestMethod.GET }
    ],
  });
  
  const config = new DocumentBuilder()
  .setTitle('Bowling Score Tracker')
    .setDescription('The Bowling Score Tracker API description')
  .setVersion('1.0')
  .addTag('bowling-score-tracker')
  .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, documentFactory);
  await app.listen(3000);
}
bootstrap();
