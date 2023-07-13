import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Post } from './entity/post.entity';
import { PostService } from './post.service';
import { CreatePostInput, UpdatePostInput } from './dto/post.dto';
import { SearchPostsInput } from './args/search-post.input';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => Post)
  async getPostById(@Args('id', { type: () => ID }) id: number): Promise<Post> {
    const post = await this.postService.getPostById(id);
    if (post) {
      await this.postService.incrementPostViews(id);
    }
    return post;
  }

  @Query(() => [Post])
  async getAllPosts(): Promise<Post[]> {
    return this.postService.getAllPosts();
  }

  @Query(() => [Post])
  async searchPosts(@Args('input') input: SearchPostsInput): Promise<Post[]> {
    const { title, categoryId, tags } = input;
    return this.postService.searchPosts(title, categoryId, tags);
  }

  @Mutation(() => Post)
  async createPost(@Args('post') postData: CreatePostInput): Promise<Post> {
    return this.postService.createPost(postData);
  }

  @Mutation(() => Post)
  async updatePost(@Args('post') postData: UpdatePostInput): Promise<Post> {
    return this.postService.updatePost(postData);
  }

  @Mutation(() => Boolean)
  async deletePost(@Args('id', { type: () => ID }) id: number): Promise<boolean> {
    await this.postService.deletePost(id);
    return true;
  }
}