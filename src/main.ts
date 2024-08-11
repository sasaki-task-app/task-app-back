import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const cors = require('cors');
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    cors({
      origin: 'http://localhost:3000',
    }),
  );
  await app.listen(3001);
}
bootstrap();
