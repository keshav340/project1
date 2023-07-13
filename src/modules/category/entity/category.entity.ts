import { ObjectType, Field, ID } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Subcategory } from 'src/modules/subcategory/entity/subcategory.entity';
import { Post } from 'src/modules/post/entity/post.entity';

@Entity()
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()

  name: string;

  @Column()
 
  description: string;

  @OneToMany(() => Subcategory, subcategory => subcategory.category)
  
  subcategories: Subcategory[];

  @ManyToMany(() => Post, post => post.categories)
  @JoinTable()
 
  posts: Post[];

  // Add any additional columns or relationships as needed
}
