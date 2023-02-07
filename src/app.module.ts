import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { validationSchema } from './config/validationSchema';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';

import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';

import emailConfig from './config/emailConfig';
import authConfig from './config/authConfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { generateTypeOrmConfig } from './config/typeorm.config';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { Logger2Middleware } from './middleware/logger2.middleware';
import { AuthModule } from './auth/auth.module';

// UsersModule에 usercontroller, emailcontroller가 포함되어 있으므로 여기서 포함시키지 않아도 됨.
@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [emailConfig, authConfig], // load 속성을 통해 앞에서 구성해둔 ConfigFactory를 지정함.
      isGlobal: true,
      validationSchema, // 환경변수 값에 대해 유효성 검사를 수행하도록 joi를 이용하여 유효성 검사 객체럴 작성함.
    }),
    TypeOrmModule.forRoot(generateTypeOrmConfig(process.env)),
    UsersModule,
    EmailModule,
    AuthModule,
  ],
  controllers: [PostsController, AppController],
  providers: [PostsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware, Logger2Middleware).forRoutes('/users');
  }
}
