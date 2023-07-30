
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entity/post.entity';
import { PostInput } from './dto/post.dto';
import { PostType } from './dto/post.type';
import { Category } from '../category/entity/category.entity';
import { Subcategory } from '../subcategory/entity/subcategory.entity';
import { TagEntity } from '../tag/entities/tag.entity';
import { MetaEntity } from '../meta/entity/meta.entity';
import { ILike } from 'typeorm';
@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Subcategory)
    private subcategoryRepository: Repository<Subcategory>,
    @InjectRepository(TagEntity)
    private tagRepository: Repository<TagEntity>,
    @InjectRepository(MetaEntity)
    private metaRepository: Repository<MetaEntity>,
  ) {}

  async createPost(postData: PostInput): Promise<PostType> {
    const { metaId } = postData;
    let metaEntity = null;

    
    if (metaId) {
      
      metaEntity = await this.metaRepository.findOne({where:{id: metaId}});

      
      if (!metaEntity) {
        throw new NotFoundException('MetaEntity not found');
      }

      
      postData.metaTitle = metaEntity.metaTitle;
      postData.metaDescription = metaEntity.metaDescription;
    } else {
      
      if (!postData.metaTitle || !postData.metaDescription) {
        throw new BadRequestException('Please provide metaTitle and metaDescription or specify a valid metaId.');
      }
    }

    const category = await this.categoryRepository.findOne({ where: { id: postData.categoryId } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const subcategories = await this.subcategoryRepository.findByIds(postData.subcategoryIds || []);

    const tags = await this.tagRepository.findByIds(postData.tagIds || []);

    const post = new Post();
    post.title = postData.title;
    post.description = postData.description;
    post.content = postData.content;
    post.categories = [category];
    post.subcategories = subcategories;
    post.tags = tags;
    post.meta = metaEntity;

   
    const createdPost = await this.postRepository.save(post);

    return createdPost;
  }
  async getPostById(id: number): Promise<PostType> {
    return this.postRepository.findOne( {where:{id}, relations: ['subcategories', 'tags', 'meta', 'categories'] });
  }


  async deletePost(postId: number): Promise<boolean> {
    const post = await this.postRepository.findOne({where:{id:postId}});

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    await this.postRepository.remove(post);

    return true;
  }
  async getAllPosts(): Promise<PostType[]> {
    return this.postRepository.find({
      relations: ['categories', 'subcategories', 'tags', 'meta'],
    });
}

async updatePost(id: number, postData: PostInput): Promise<PostType> {
  const post = await this.postRepository.findOne({ where: { id } });
  if (!post) {
    throw new NotFoundException('Post not found');
  }

  
  if (postData.title) {
    post.title = postData.title;
  }
  if (postData.description) {
    post.description = postData.description;
  }
  if (postData.content) {
    post.content = postData.content;
  }
  if (postData.categoryId) {
    const category = await this.categoryRepository.findOne({ where: { id: postData.categoryId } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    post.categories = [category];
  }

  
  if (postData.subcategoryIds) {
    const subcategories = await this.subcategoryRepository.findByIds(postData.subcategoryIds);
    post.subcategories = subcategories;
  }

  if (postData.tagIds) {
    const tags = await this.tagRepository.findByIds(postData.tagIds);
    post.tags = tags;
  }

  
  if (postData.metaId) {
    const metaEntity = await this.metaRepository.findOne({ where: { id: postData.metaId } });
    if (!metaEntity) {
      throw new NotFoundException('MetaEntity not found');
    }
    post.meta = metaEntity;
  } else {
    if (!postData.metaTitle || !postData.metaDescription) {
      throw new BadRequestException('Please provide metaTitle and metaDescription or specify a valid metaId.');
    }
  }

  return this.postRepository.save(post);
}

async incrementViews(postId: number): Promise<PostType> {
  const post = await this.postRepository.findOne({where:{id:postId}});
  if (!post) {
    throw new NotFoundException('Post not found');
  }

  post.views++;
  await this.postRepository.save(post);

  return post;
}
async getPostsByTitle(title: string): Promise<PostType[]> {
  return this.postRepository.find({
    where: {
      title: ILike(`%${title}%`),
    },
    relations: ['subcategories', 'tags', 'meta', 'categories'],
  });
}
async getPostsByCategory(categoryId: number): Promise<PostType[]> {
  return this.postRepository.find({
    where: {
      categories: {
        id: categoryId,
      },
    },
    relations: ['subcategories', 'tags', 'meta', 'categories'],
  });
}
async getPostsByTag(tagId: number): Promise<PostType[]> {
  return this.postRepository
    .createQueryBuilder('post')
    .leftJoinAndSelect('post.tags', 'tag')
    .where('tag.id = :tagId', { tagId })
    .getMany();
}


}
