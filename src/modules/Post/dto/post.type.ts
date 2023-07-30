
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { SubcategoryType } from 'src/modules/subcategory/subcategory.type';
import { TagType } from 'src/modules/tag/tag.type';
import { MetaType } from 'src/modules/meta/meta.type';
import { CategoryType } from 'src/modules/category/dto/category.dto';

@ObjectType()
export class PostType {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  content: string;

  @Field(() => [SubcategoryType], { nullable: true })
  subcategories?: SubcategoryType[];

  @Field(() => [TagType], { nullable: true })
  tags?: TagType[];

  @Field(() => MetaType, { nullable: true })
  meta?: MetaType;

  @Field(() => [CategoryType]) 
  categories: CategoryType[];
  
  @Field()
  views: number;
}
