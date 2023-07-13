import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Meta {
  @Field(() => ID)
  id: number;

  @Field()
  metaTitle: string;

  @Field({ nullable: true })
  metaDescription?: string;
}

@ObjectType()
export class CreateMetaResponse {
  @Field(() => Meta)
  meta: Meta;
}

@ObjectType()
export class UpdateMetaResponse {
  @Field(() => Meta)
  meta: Meta;
}

@ObjectType()
export class DeleteMetaResponse {
  @Field()
  success: boolean;
}
