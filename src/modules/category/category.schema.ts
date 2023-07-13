import { ObjectType, Field, ID, InputType } from 'type-graphql';
import { Subcategory } from '../subcategory/subcategory.schema';

@ObjectType()
export class Category {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => [Subcategory]) // Use the correct decorator for the subcategories field
  subcategories: Subcategory[];
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
