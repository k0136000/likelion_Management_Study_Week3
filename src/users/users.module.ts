import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { EmailModule } from 'src/email/email.module';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';
import { Logger2Middleware } from 'src/middleware/logger2.middleware';
import { UsersController } from './users.controller';
import { UserEntity } from './users.entity';
import { UsersService } from './users.service';

@Module({
  imports: [EmailModule, AuthModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(LoggerMiddleware, Logger2Middleware)
      .forRoutes(UsersController); // 보통 미들웨어의 라우팅 경로를 지정할때에는 이렇게 컨트롤러 클래스를 주어 동작하도록 한다.
  }
}
