import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
    cors: {
      origin: true,
      credentials: true
    }
  });

  const PORT = Number(process.env.PORT) || 4000;

  await app.listen(PORT);
}
bootstrap();
