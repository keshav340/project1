// users/dto/user.dto.ts

import { ObjectType, Field, Int } from '@nestjs/graphql';
import Role from 'src/modules/enums/roles.enum';

@ObjectType()
export class UserType {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  role: Role;

  // You can include other fields as needed, such as comments, sessions, etc.
  // @Field(() => [CommentType])
  // comments: CommentType[];

  // @Field(() => [SessionType])
  // sessions: SessionType[];
}
