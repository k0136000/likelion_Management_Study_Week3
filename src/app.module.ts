import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { PostsController } from './posts/posts.controller';
import { UsersService } from './users/users.service';
import { PostsService } from './posts/posts.service';
import { EmailService } from './email/email.service';

@Module({
  imports: [],
  controllers: [UsersController, PostsController],
  providers: [UsersService, PostsService, EmailService],
})
export class AppModule {}
