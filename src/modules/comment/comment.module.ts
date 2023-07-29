// src/comment/comment.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment} from './comment.entity';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { User} from 'src/modules/users/entities/user.entity';
import { Post } from 'src/modules/Post/entity/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Post])],
  providers: [CommentService, CommentResolver],
})
export class CommentModule {}
