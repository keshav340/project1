// post.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entity/post.entity';
import { CreatePostInput,UpdatePostInput } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async getPostById(id: number): Promise<Post> {
    return this.postRepository.findOne({ where: { id }, relations: ['categories', 'subcategories', 'tags', 'meta'] });
  }
  async incrementPostViews(id: number): Promise<void> {
    const post = await this.postRepository.findOne({where:{id:id}});
    if (post) {
      post.views++;
      await this.postRepository.save(post);
    }
  }
  

  async getAllPosts(): Promise<Post[]> {
    return this.postRepository.find({ relations: ['categories', 'subcategories', 'tags', 'meta'] });
  }

  async searchPosts(title?: string, categoryId?: number, tags?: string[]): Promise<Post[]> {
    const query = this.postRepository.createQueryBuilder('post')
      .leftJoinAndSelect('post.categories', 'category')
      .leftJoinAndSelect('post.subcategories', 'subcategory')
      .leftJoinAndSelect('post.tags', 'tag')
      .leftJoinAndSelect('post.meta', 'meta');

    if (title) {
      query.where('post.title LIKE :title', { title: `%${title}%` });
    }

    if (categoryId) {
      query.andWhere('category.id = :categoryId', { categoryId });
    }

    if (tags && tags.length > 0) {
      query.andWhere('tag.name IN (:...tags)', { tags });
    }

    return query.getMany();
  }

  async createPost(postData: CreatePostInput): Promise<Post> {
    const post = this.postRepository.create(postData);
    return this.postRepository.save(post);
  }

  async updatePost(postData: UpdatePostInput): Promise<Post> {
    const post = await this.getPostById(postData.id);
    Object.assign(post, postData);
    return this.postRepository.save(post);
  }

  async deletePost(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}
