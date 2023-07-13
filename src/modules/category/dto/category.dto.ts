import { InputType, ObjectType, Field,ID } from '@nestjs/graphql';

@InputType()
export class CategoryInput {
  @Field()
  name: string;

  @Field()
  description: string;
}

@ObjectType()
export class CategoryType {
  @Field(() => ID)
  id: number;

  @Field(() => String, { nullable: true }) // Make the name field nullable
  name?: string;

  @Field(() => String, { nullable: true })
  description: string;
}
 