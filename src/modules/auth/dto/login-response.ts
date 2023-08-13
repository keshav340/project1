import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/modules/users/entities/user.entity';
import { Session } from 'src/modules/session/session.entity';
@ObjectType()
export class LoginResponse {
  @Field()
  access_token: string;

  @Field(() => User)
  user: User;
  // @Field()
  // expiresAt: string;
  @Field(() => [Session])
  sessions: Session[];
}
