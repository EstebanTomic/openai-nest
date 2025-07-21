// src/telegram/telegram.module.ts
import { Module } from '@nestjs/common';
import { ChatModule } from '../chat/chat.module';
import { TelegramController } from './telegram.controller';

@Module({
  imports: [ChatModule],
  providers: [TelegramController],
})
export class TelegramModule {}
