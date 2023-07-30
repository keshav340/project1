

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import { Post } from 'src/modules/Post/entity/post.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { ObjectType, Field, ID } from '@nestjs/graphql';
@ObjectType()
@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  text: string;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;
}
