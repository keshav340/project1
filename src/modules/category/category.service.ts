import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../category/entity/category.entity';
import { CategoryInput } from '../category/dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async getCategoryById(id: number): Promise<Category> {
    return this.categoryRepository.findOne({where:{id:id}});
  }

  async createCategory(categoryInput: CategoryInput): Promise<Category> {
    const category = this.categoryRepository.create(categoryInput);
    return this.categoryRepository.save(category);
  }

  async updateCategory(
    id: number,
    categoryInput: CategoryInput,
  ): Promise<Category> {
    const category = await this.getCategoryById(id);
    if (!category) {
      throw new Error('Category not found');
    }
    Object.assign(category, categoryInput);
    return this.categoryRepository.save(category);
  }

  async deleteCategory(id: number): Promise<boolean> {
    const category = await this.getCategoryById(id);
    if (!category) {
      throw new Error('Category not found');
    }
    await this.categoryRepository.remove(category);
    return true;
  }
}
