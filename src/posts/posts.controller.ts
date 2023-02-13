import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PostDto } from './dto/create-post.dto';
import { SearchPostDto } from './dto/search-post.dto';
import { PostsService } from './posts.service';
import { PatchPostDto } from './dto/patch-post.dto';
import { AuthGuard } from 'guards/canactivate.guard';
import { UserEntity } from 'src/users/users.entity';
import { Token } from 'utils/user.decorator';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAllPosts() {
    return this.postService.getPosts();
  }

  @UseGuards(AuthGuard)
  @Get('/search')
  async getPostInfo(@Body() dto: SearchPostDto) {
    const { contentId } = dto;
    return await this.postService.getPostInfo(contentId);
  }

  // 1.유저 아이디 2.내용, 3. 태그 4.위치
  @UseGuards(AuthGuard)
  @Post()
  async createPost(
    @Token() user: UserEntity,
    @Body() dto: PostDto,
  ): Promise<void> {
    const { content, tag, location } = dto;
    await this.postService.createPost(content, user.userId, tag, location);
  }

  @UseGuards(AuthGuard)
  @Delete()
  async deletePost(@Token() user: UserEntity, @Body() dto: SearchPostDto) {
    const { contentId } = dto;
    return await this.postService.deletePost(user.userId, contentId);
  }

  @UseGuards(AuthGuard)
  @Patch()
  async patchPost(@Token() user: UserEntity, @Body() dto: PatchPostDto) {
    const { content, contentID } = dto;
    await this.postService.patchPost(user.userId, contentID, content);
  }
}
