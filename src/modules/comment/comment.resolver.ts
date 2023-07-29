// src/comment/comment.resolver.ts

import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { CommentService } from 'src/modules/comment/comment.service';
import { CreateCommentInput } from './comment.dto';
import { Comment} from './comment.entity';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation(() => Comment)
  async createComment(
    @Args('commentInput') commentInput: CreateCommentInput,
  ): Promise<Comment> {
    return this.commentService.createComment(commentInput);
  }
}
