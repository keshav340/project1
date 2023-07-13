import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class CreateMetaArgs {
  @Field()
  metaTitle: string;

  @Field({ nullable: true })
  metaDescription?: string;
}

@ArgsType()
export class UpdateMetaArgs {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  metaTitle?: string;

  @Field({ nullable: true })
  metaDescription?: string;
}

@ArgsType()
export class DeleteMetaArgs {
  @Field(() => Int)
  id: number;
}
