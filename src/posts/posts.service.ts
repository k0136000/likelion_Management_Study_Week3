import { Injectable } from '@nestjs/common';
import { Posts } from './post.models';
import { v1 as uuid } from 'uuid';

@Injectable()
export class PostsService {
  private posts: Posts[] = [];
  //전체 게시글 검색
  async getPosts() {
    return this.posts;
  }
  //특정 게시글 검색
  async getPostInfo(contentId: string) {
    console.log(contentId);
    return this.posts.find((post) => post.contentId === contentId);
  }
  //게시글 검색
  async createPost(content: string) {
    const contentId: string = uuid();
    const post: Posts = {
      contentId,
      content,
    };
    this.posts.push(post);
    console.log('게시글 생성 완료!');
  }
  //게시글 삭제
  async deletePost(contentId: string) {
    this.posts = this.posts.filter((post) => post.contentId !== contentId);
  }
  //게시글 일부 수정
  async patchPost(contentId: string, content: string) {
    const post = this.posts.find((post) => post.contentId === contentId);
    this.posts = this.posts.filter((post) => post.contentId !== contentId);
    post.content = content;
    this.posts.push(post);
    console.log('게시글 수정 완료');
  }
}
