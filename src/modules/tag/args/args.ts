import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

@ArgsType()
export class CreateTagArgs {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;
}

@ArgsType()
export class UpdateTagArgs {
  @Field()
  @IsNotEmpty()
  @IsNumberString()
  id: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;
}

@ArgsType()
export class DeleteTagArgs {
  @Field()
  @IsNotEmpty()
  @IsNumberString()
  id: number;
}
