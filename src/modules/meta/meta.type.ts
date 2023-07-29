import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class MetaType {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  metaTitle?: string;

  @Field({ nullable: true })
  metaDescription?: string;
}