import { Controller, Post, Body, Logger } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  private readonly logger = new Logger(ChatController.name);

  constructor(private readonly chatService: ChatService) {}

  @Post()
  async chat(@Body() body: { message: string }) {
    this.logger.log(`Recibido mensaje desde cliente: "${body.message}"`);
    const result = await this.chatService.sendMessage(body.message);
    this.logger.log(`Enviando respuesta al cliente`);
    return result;
  }
}
