import { InputType, ObjectType, Field,ID } from '@nestjs/graphql';
import { UserType } from 'src/modules/users/dto/user.type';
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
  @Field(() => UserType) // Include the creator field of UserType
  creator: UserType;
}
 