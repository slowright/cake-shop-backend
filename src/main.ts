import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { setHeadersMiddleware } from './middlewares/headers.middleware';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost:3000'],
    },
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  await app.listen(3000, () => {
    console.log('Server has been started');
  });
}
bootstrap();
