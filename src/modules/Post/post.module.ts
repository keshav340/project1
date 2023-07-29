import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entity/post.entity';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';
import { Category } from '../category/entity/category.entity';
import { Subcategory } from '../subcategory/entity/subcategory.entity';
import { TagEntity } from '../tag/entities/tag.entity';
import { MetaEntity } from '../meta/entity/meta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post,Category,TagEntity,MetaEntity,Subcategory])],
  providers: [PostResolver, PostService],
})
export class PostModule {}
