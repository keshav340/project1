import { Entity, Column, PrimaryGeneratedColumn,OneToOne,JoinColumn} from 'typeorm';
import { Post } from 'src/modules/post/entity/post.entity';

@Entity()
export class MetaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  metaTitle: string;

  @Column()
  metaDescription: string;

  @OneToOne(() => Post, post => post.meta, { onDelete: 'CASCADE' })
  @JoinColumn()
  post: Post;
  

}
