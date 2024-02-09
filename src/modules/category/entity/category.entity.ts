import { ObjectType, Field, ID } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
//import { Subcategory } from 'src/modules/subcategory/entity/subcategory.entity';
//import { Post } from 'src/modules/post/entity/post.entity';
import { User } from 'src/modules/users/entities/user.entity';
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

  // @OneToMany(() => Subcategory, subcategory => subcategory.category)
  
  // subcategories: Subcategory[];

  // @ManyToMany(() => Post, post => post.categories)
  // @JoinTable()
 
  // posts: Post[];
  @Field(() => User) // Include the user details in the response
  creator: User;

 
}
