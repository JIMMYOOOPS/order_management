import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  // Create the NestJS application
  const app = await NestFactory.create(AppModule);
  // Set Configs
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;
  // Set validation
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
}
bootstrap();
