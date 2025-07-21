// src/telegram/telegram.controller.ts
import { Controller, Post, Body, Logger } from '@nestjs/common';
import { ChatService } from '../chat/chat.service';

@Controller('telegram')
export class TelegramController {
  private readonly logger = new Logger(TelegramController.name);

  constructor(private readonly chatService: ChatService) {}

  @Post()
  async handleUpdate(@Body() update: any) {
    this.logger.log('Update recibido de Telegram');
    // Extraemos el mensaje de texto
    const message = update.message?.text;
    const chatId = update.message?.chat?.id;

    if (!message || !chatId) {
      this.logger.warn('Update sin mensaje o chatId');
      return;
    }

    this.logger.log(`Mensaje recibido: "${message}" de chatId: ${chatId}`);

    try {
      const response = await this.chatService.sendMessage(message);
      // Aquí enviarías la respuesta a Telegram
      await this.sendMessage(chatId, response.response);
      this.logger.log(`Respuesta enviada a chatId: ${chatId}`);
    } catch (error) {
      this.logger.error(`Error procesando mensaje: ${error.message}`);
    }
  }

  private async sendMessage(chatId: number, text: string) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    // Usamos fetch o Axios, aquí con fetch:
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
  }
}
