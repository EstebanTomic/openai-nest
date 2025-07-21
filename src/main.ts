import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('Bootstrap');
  const port = 3000;
  await app.listen(port);
  logger.log(`Servidor iniciado y escuchando en http://localhost:${port}`);
}
bootstrap();
