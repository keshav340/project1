import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class SearchPostsInput {
  @Field({ nullable: true })
  title?: string;

  @Field(() => Int, { nullable: true })
  categoryId?: number;

  @Field(() => [String], { nullable: true })
  tags?: string[];
}
