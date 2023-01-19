import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { EmailService } from './email/email.service';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';

@Module({
  imports: [],
  controllers: [UsersController, PostsController],
  providers: [UsersService, EmailService, PostsService],
})
export class AppModule {}
