import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreatePostArgs {
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
export class UpdatePostArgs {
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
