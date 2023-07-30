
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class PostInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  content: string;

  @Field(() => Int)
  categoryId: number;

  @Field(() => [Int], { nullable: true })
  subcategoryIds?: number[];

  @Field(() => [Int], { nullable: true })
  tagIds?: number[];

  @Field(() => Int, { nullable: true })
  metaId?: number | null; // Add `null` to the type to allow null values

  @Field({ nullable: true })
  metaTitle?: string;

  @Field({ nullable: true })
  metaDescription?: string;
}
