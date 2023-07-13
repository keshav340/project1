import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable ,OneToMany} from 'typeorm';
import { Category } from 'src/modules/category/entity/category.entity';
import { Post } from 'src/modules/post/entity/post.entity';

@Entity()
export class Subcategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Category, category => category.subcategories)
  category: Category;

  @ManyToMany(() => Post, post => post.subcategories)
  @JoinTable()
  posts: Post[];
   
}
