import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserEntity } from 'src/users/users.entity';
import { PostsController } from './posts.controller';
import { PostEntity } from './posts.entity';
import { PostsService } from './posts.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([PostEntity, UserEntity])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
