// src/app.module.ts
import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { TelegramController } from './telegram/telegram.controller';
import { TelegramModule } from './telegram/telegram.module';

@Module({
  imports: [ChatModule, TelegramModule],
  controllers: [TelegramController],
  providers: [],
})
export class AppModule {}
