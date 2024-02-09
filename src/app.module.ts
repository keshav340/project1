import { Module } from '@nestjs/common';
import  {TypeOrmModule}  from  "@nestjs/typeorm";
import {join} from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import {ApolloDriver} from  '@nestjs/apollo';
import { AppResolver } from './appresolver';
import { Category } from './modules/category/entity/category.entity';
//import { Subcategory } from './modules/subcategory/entity/subcategory.entity';
//import { Post } from './modules/post/entity/post.entity';
import { CategoryModule } from './modules/category/category.module';
//import { SubcategoryModule } from './modules/subcategory/subcategory.module';
//import { TagModule } from './modules/tag/tag.module';
//import { MetaModule } from './modules/meta/meta.module';
//import { MetaEntity } from './modules/meta/entity/meta.entity';
//import { TagEntity } from './modules/tag/entities/tag.entity';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { User } from './modules/users/entities/user.entity';
//import { PostModule } from './modules/Post/post.module';
//import { Comment } from './modules/comment/comment.entity';
//import { CommentModule } from './modules/comment/comment.module';
import { Session } from './modules/session/session.entity';
import { SessionsModule } from './modules/session/session.module';

@Module({
  imports: [AuthModule,CategoryModule,UsersModule,SessionsModule,
  GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: 'src/schema.graphql',
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'keshav',
      database: 'postgres',
      entities:[Category,User,Session],
      synchronize: true,autoLoadEntities: true,
    }),
  ],
  providers: []
})
export class AppModule {}