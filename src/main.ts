import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import dotenv = require('dotenv');
import path = require('path');
import { ValidationPipe } from '@nestjs/common';
import { Logger3Middleware } from './middleware/logger3.middleware';
import { AuthGuard } from 'guards/canactivate.guard';

// env파일의 경로를 NODE_ENV값에 따라 다르게 지정한다.
// dotenv.config({
//   path: path.resolve(
//     process.env.NODE_ENV === 'production'
//       ? '.production.env'
//       : process.env.NODE_ENV === 'stage'
//       ? '.stage.env'
//       : '.development.env',
//   ),
// });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  // app.use(Logger3Middleware); // 미들웨어를 모든 모듈에 적용.
  // app.useGlobalGuards(new AuthGuard()); // 가드를 전역으로 사용하게 하기 위함
  await app.listen(3000);
}
bootstrap();
