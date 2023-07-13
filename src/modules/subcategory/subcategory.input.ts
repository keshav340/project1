import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateSubcategoryInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Int)
  categoryId: number;
}

@InputType()
export class UpdateSubcategoryInput {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;
}

@InputType()
export class DeleteSubcategoryInput {
  @Field(() => Int)
  id: number;
}
