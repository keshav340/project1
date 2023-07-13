// post.dto.ts
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  content: string;

  @Field(() => [Number])
  categoryIds: number[];

  @Field(() => [Number])
  subcategoryIds: number[];

  @Field(() => [Number])
  tagIds: number[];

  @Field()
  metaTitle: string;

  @Field()
  metaDescription: string;
}

@InputType()
export class UpdatePostInput {
  @Field()
  id: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  content?: string;

  @Field(() => [Number], { nullable: true })
  categoryIds?: number[];

  @Field(() => [Number], { nullable: true })
  subcategoryIds?: number[];

  @Field(() => [Number], { nullable: true })
  tagIds?: number[];

  @Field({ nullable: true })
  metaTitle?: string;

  @Field({ nullable: true })
  metaDescription?: string;
}
