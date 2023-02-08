import { UserEntity } from 'src/users/users.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('Post')
export class PostEntity {
  @PrimaryColumn()
  contentId: string;

  // //얘 없어도 됨.
  // @Column()
  // userId: string;

  @Column({ length: 100 })
  content: string;

  // @Column()
  // tag: string[];

  @Column({ length: 60 })
  location: string;

  @ManyToOne((type) => UserEntity, (user) => user.posts)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
