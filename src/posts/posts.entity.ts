import { UserEntity } from 'src/users/users.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity('Post')
export class PostEntity {
  @PrimaryColumn()
  contentId: string;

  @Column({ length: 100 })
  userId: string;

  @Column({ length: 100 })
  content: string;

  // @Column()
  // tag: string[];

  @Column({ length: 60 })
  location: string;

  @OneToOne((type) => UserEntity)
  @JoinColumn()
  users: UserEntity;
}
