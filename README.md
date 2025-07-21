# 🤖 ChatGPT NestJS Telegram Bot

Este proyecto es una aplicación backend desarrollada con [NestJS](https://nestjs.com/) que integra la API de [OpenAI](https://platform.openai.com/) con un bot de [Telegram](https://core.telegram.org/bots), permitiendo enviar preguntas y recibir respuestas de forma simple, desde cualquier lugar.

## ✨ Características

- ⚡️ API REST robusta basada en NestJS
- 💬 Comunicación directa con ChatGPT (OpenAI API)
- 🤖 Control completo vía Telegram Bot (webhook)
- 🔒 Soporte para tokens y configuración vía `.env`
- 🧩 Modularidad y extensibilidad para futuras integraciones (imagen, voz, agentes, etc.)

---

## 🚀 Cómo empezar

### 1. Clonar repositorio

```bash
git clone https://github.com/EstebanTomic/openai-nest.git
cd openai-nest
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear archivo .env
Crea un archivo .env en la raíz con este contenido:

```bash
OPENAI_API_KEY=tu_clave_de_openai
TELEGRAM_BOT_TOKEN=tu_token_de_telegram
WEBHOOK_URL=https://tu-url.ngrok.io/telegram
```

### 3. Ejecutar la aplicación

```bash
npm run start:dev
```

## 🌐 Configurar el Bot de Telegram
### 1. Crea tu bot
1. Abre Telegram y busca el usuario @BotFather
2. Escribe /newbot y sigue los pasos para nombrar y obtener tu bot
3. Copia el Token de API que te da BotFather
```
Ejemplo: 123456789:ABCdefGHI_jklMNOpqrSTUvwxYZ
```
Pega ese token en tu archivo .env en TELEGRAM_BOT_TOKEN.

### 2. Exponer tu servidor local con ngrok
Si estás corriendo localmente, necesitas exponer el puerto 3000:
```bash
npx ngrok http 3000
```
Copia la URL pública que te da ngrok (por ejemplo, https://piere123.ngrok.io)

### 3. Configurar el webhook
Usa curl para decirle a Telegram que use tu URL:
```bash
curl -F "url=https://piere123.ngrok.io/telegram" https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook
```
Reemplaza:
- https://abc123.ngrok.io/telegram con tu URL real + ruta /telegram
- <TELEGRAM_BOT_TOKEN> con el token que te dio @BotFather


## 🧠 Cómo usarlo
1. Abre tu bot en Telegram
2. Escribe una pregunta o comando
3. El bot responderá con la respuesta generada por OpenAI (GPT)

## 📄 Licencia
Este proyecto está licenciado bajo la [Licencia MIT](LICENSE) © [EstebanTomic](https://github.com/EstebanTomic)
