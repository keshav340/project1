import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Tag {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;
}

@ObjectType()
export class CreateTagResponse {
  @Field()
  tag: Tag;
}

@ObjectType()
export class UpdateTagResponse {
  @Field()
  tag: Tag;
}

@ObjectType()
export class DeleteTagResponse {
  @Field()
  success: boolean;
}
