import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(private readonly httpService: HttpService) {}

  async sendMessage(message: string): Promise<any> {
    this.logger.log(`Enviando mensaje a OpenAI: "${message}"`);

    const headers = {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    };

    const payload = {
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'Eres un asistente útil.' },
        { role: 'user', content: message },
      ],
      temperature: 0.7,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          'https://api.openai.com/v1/chat/completions',
          payload,
          { headers },
        ),
      );
      const reply = response.data.choices[0].message.content;
      this.logger.log(`Respuesta recibida de OpenAI: "${reply}"`);
      return { response: reply };
    } catch (error) {
      this.logger.error('Error llamando a OpenAI', error.stack);
      throw error;
    }
  }
}
