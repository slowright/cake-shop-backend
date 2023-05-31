import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['https://localhost:3000', 'http://localhost:5173'],
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-type'],
    methods: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'],
    exposedHeaders: ['X-Uid', 'X-Authentication'],
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use((res, req, next) => {
    res.header('X-Requested-With', 'XMLHttpRequest');
    next();
  });
  app.use(cookieParser());

  await app.listen(3000, () => {
    console.log('Server has been started');
  });
}
bootstrap();
