import { PostEntity } from 'src/posts/posts.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('User')
export class UserEntity {
  @PrimaryColumn()
  userId: string;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 60 })
  email: string;

  @Column({ length: 30 })
  password: string;

  @Column({ length: 60 })
  signupVerifyToken: string;

  //유저는 여러 개의 포스트를 작성할 수 있습니다.
  @OneToMany((type) => PostEntity, (post) => post.user)
  posts: PostEntity[];
}
