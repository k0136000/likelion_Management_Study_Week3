import { Injectable, NotFoundException } from '@nestjs/common';
import { getConnection, Repository } from 'typeorm';
import { PostEntity } from './posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { v1 as uuid } from 'uuid';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}
  //전체 게시글 검색
  async getPosts() {
    return await this.postRepository.find();
  }
  //특정 게시글 검색
  async getPostInfo(contentId: string) {
    console.log(contentId);
    return this.postRepository.findOne({
      where: { contentId },
    });
  }
  //게시글 등록
  async createPost(
    content: string,
    userId: string,
    tag: string[],
    location: string,
  ) {
    const post = new PostEntity();
    post.contentId = uuid();
    post.userId = userId;
    post.content = content;
    // post.tag = tag;
    post.location = location;
    await this.postRepository.save(post); // 저장소를 이용해여 엔티티를 DB에 저장
    console.log('게시글 생성 완료!');
    return;
  }
  //게시글 삭제
  async deletePost(userId: string, contentId: string) {
    const post = await this.postRepository.findOne({
      where: { contentId },
    });

    if (!post) {
      throw new NotFoundException('포스트가 존재하지 않습니다.');
    }
    if (post.userId !== userId) {
      throw new Error();
    }
    await this.postRepository.delete(contentId);
  }
  //게시글 일부 수정
  async patchPost(userId: string, contentId: string, content: string) {
    const post = await this.postRepository.findOne({
      where: { contentId },
    });

    if (!post) {
      throw new NotFoundException('포스트가 존재하지 않습니다.');
    }
    if (post.userId !== userId) {
      throw new Error();
    }
    post.content = content;
    await this.postRepository.save(post);
    console.log('게시글 수정 완료');
  }
}
