import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { PostDto } from './dto/create-post.dto';
import { SearchPostDto } from './dto/search-post.dto';
import { PostsService } from './posts.service';
import { PatchPostDto } from './dto/patch-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Get()
  async getAllPosts() {
    return this.postService.getPosts();
  }

  @Get('/search')
  async getPostInfo(@Body() dto: SearchPostDto) {
    const { contentId } = dto;
    return await this.postService.getPostInfo(contentId);
  }

  @Post()
  async createPost(@Body() dto: PostDto): Promise<void> {
    const { content } = dto;
    await this.postService.createPost(content);
    console.log(dto);
  }

  @Delete()
  async deletePost(@Body() dto: SearchPostDto) {
    const { contentId } = dto;
    return await this.postService.deletePost(contentId);
  }

  @Patch()
  async patchPost(@Body() dto: PatchPostDto): Promise<void> {
    const { content, contentId } = dto;
    await this.postService.patchPost(contentId, content);
  }
}
