// src/telegram/telegram.service.ts
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import TelegramBot = require('node-telegram-bot-api');
import { ChatService } from '../chat/chat.service';

@Injectable()
export class TelegramService implements OnModuleInit {
  private readonly logger = new Logger(TelegramService.name);
  private bot: TelegramBot;

  constructor(private readonly chatService: ChatService) {}

  onModuleInit() {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) {
      this.logger.error('El token de Telegram no está configurado en .env');
      return;
    }

    this.bot = new TelegramBot(token, { polling: true });

    this.bot.on('message', async (msg) => {
      const chatId = msg.chat.id;
      const text = msg.text || '';

      this.logger.log(`Mensaje recibido de ${chatId}: ${text}`);

      try {
        const response = await this.chatService.sendMessage(text);
        await this.bot.sendMessage(chatId, response.response);
        this.logger.log(`Respuesta enviada a ${chatId}`);
      } catch (error) {
        this.logger.error(
          `Error enviando respuesta a ${chatId}: ${error.message}`,
        );
        await this.bot.sendMessage(
          chatId,
          'Lo siento, hubo un error procesando tu mensaje.',
        );
      }
    });
  }
}
