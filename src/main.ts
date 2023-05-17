import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
    allowedHeaders:
      'X-Uid, X-Authentication, Authorization, Origin, X-Requested-With, Accept, X-PINGOTHER, Content-Type',
    methods: 'POST, GET, PUT, PATCH, DELETE',
    exposedHeaders:
      'X-Uid, X-Authentication, Authorization, Origin, X-Requested-With, Accept, X-PINGOTHER, Content-Type',
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  await app.listen(3000, () => {
    console.log('Server has been started');
  });
}
bootstrap();
