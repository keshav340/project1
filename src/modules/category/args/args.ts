import { ArgsType, Field,Int } from 'type-graphql';

@ArgsType()
export class CreateCategoryArgs {
  @Field()
  name: string;

  @Field()
  description: string;
}


@ArgsType()
export class UpdateCategoryArgs {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;
}

