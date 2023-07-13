import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CategoryType } from '../category/dto/category.dto';



@ObjectType()
export class SubcategoryType {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => CategoryType)
  category: CategoryType;
}
