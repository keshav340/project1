// post.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToOne, JoinColumn,OneToMany} from 'typeorm';
import { Category } from 'src/modules/category/entity/category.entity';
import { Subcategory } from 'src/modules/subcategory/entity/subcategory.entity';
import { TagEntity } from 'src/modules/tag/entities/tag.entity';
import { MetaEntity } from 'src/modules/meta/entity/meta.entity';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Post {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  description: string;
  @Field()
  @Column({ nullable: false,  default: ''})
  content: string;
  @Column({ default: 0 })
  views: number;
  
  
  @ManyToMany(() => Subcategory, subcategory => subcategory.posts)
  @JoinTable()
  subcategories: Subcategory[];

  @ManyToMany(() => Category, category => category.posts)
  @JoinTable()
  categories: Category[];

  @ManyToMany(() => TagEntity, tag => tag.posts)
  @JoinTable()
  tags: TagEntity[];

  @OneToOne(() => MetaEntity)
  @JoinColumn()
  meta: MetaEntity;

}