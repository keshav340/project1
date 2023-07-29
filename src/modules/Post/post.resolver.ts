// post.resolver.ts
import { Resolver, Query, Args, Mutation,Int } from '@nestjs/graphql';
import { PostService } from './post.service';
import { PostInput } from './dto/post.dto';
import { PostType } from './dto/post.type';

@Resolver('Post')
export class PostResolver {
  constructor(private postService: PostService) {}

  @Mutation(() => PostType)
  async createPost(@Args('postData') postData: PostInput): Promise<PostType> {
    return this.postService.createPost(postData);
  }

  @Query(() => PostType)
  async getPostById(@Args('id') id: number): Promise<PostType> {
    return this.postService.getPostById(id);
  }

  @Mutation(() => Boolean)
  async deletePost(@Args('id') id: number): Promise<boolean> {
    return this.postService.deletePost(id);
  }

  @Query(() => [PostType])
  async getAllPosts(): Promise<PostType[]> {
    return this.postService.getAllPosts();
  }

  @Mutation(() => PostType)
  async updatePost(
    @Args('id', { type: () => Int }) id: number,
    @Args('postData') postData: PostInput,
  ): Promise<PostType> {
    return this.postService.updatePost(id, postData);
  }
  @Mutation(() => PostType)
  async incrementViews(@Args('postId') postId: number): Promise<PostType> {
    return this.postService.incrementViews(postId);
  }
  @Query(() => [PostType])
  async getPostsByTitle(@Args('title') title: string): Promise<PostType[]> {
    return this.postService.getPostsByTitle(title);
  }
  @Query(() => [PostType])
  async getPostsByCategory(@Args('categoryId') categoryId: number): Promise<PostType[]> {
    return this.postService.getPostsByCategory(categoryId);
  }
  @Query(() => [PostType])
  async getPostsByTag(@Args('tagId') tagId: number): Promise<PostType[]> {
    return this.postService.getPostsByTag(tagId);
  }
}
