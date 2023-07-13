import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { Category } from 'src/modules/category/entity/category.entity';
import { Subcategory } from 'src/modules/subcategory/entity/subcategory.entity';
@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  content: string;

  @Field(() => Category)
  category: Category;

  @Field(() => Subcategory)
  subcategory: Subcategory;
}

@InputType()
export class CreatePostInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  content: string;

  @Field(() => Int)
  categoryId: number;

  @Field(() => Int)
  subcategoryId: number;
}

@InputType()
export class UpdatePostInput {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  content?: string;

  @Field(() => Int, { nullable: true })
  categoryId?: number;

  @Field(() => Int, { nullable: true })
  subcategoryId?: number;
}
