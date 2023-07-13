import { ObjectType, Field, ID, InputType } from 'type-graphql';

@ObjectType()
export class Category {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => [Subcategory])
  subcategories: Subcategory[];
}

@ObjectType()
export class Subcategory {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;
}

@InputType()
export class CreateCategoryInput {
  @Field()
  name: string;

  @Field()
  description: string;
}

@InputType()
export class UpdateCategoryInput {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;
}

@InputType()
export class CreateSubcategoryInput {
  @Field()
  name: string;

  @Field()
  description: string;
}

@InputType()
export class UpdateSubcategoryInput {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;
}
