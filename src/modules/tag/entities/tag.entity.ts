import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Post } from 'src/modules/post/entity/post.entity';


@Entity()
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @ManyToMany(() => Post, post => post.tags)
  @JoinTable()
  posts: Post[];

}