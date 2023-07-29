import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentInput } from './comment.dto';
import { User } from 'src/modules/users/entities/user.entity';
import { Post } from 'src/modules/Post/entity/post.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async createComment(commentInput: CreateCommentInput): Promise<Comment> {
    const { text, postId, username } = commentInput;

    const user = await this.userRepository
    .createQueryBuilder('user')
    .where('user.username = :username', { username })
    .getOne();
  
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const post = await this.postRepository
  .createQueryBuilder('post')
  .where('post.id = :postId', { postId })
  .getOne();

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const comment = this.commentRepository.create({
      text,
      user,
      post,
    });

    return this.commentRepository.save(comment);
  }
}
