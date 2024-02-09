// category/category.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/modules/category/entity/category.entity';
import { CategoryInput } from './dto/category.dto';
import { User } from '../users/entities/user.entity'; // Import the User entity

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find({ relations: ['creator'] }); // Include the 'creator' relation
  }

  async getCategoryById(id: number): Promise<Category> {
    return this.categoryRepository.findOne({ where: { id }, relations: ['creator'] }); // Include the 'creator' relation
  }

  async createCategory(categoryInput: CategoryInput, creator: User): Promise<Category> {
    const category = new Category();
    category.name = categoryInput.name;
    category.description = categoryInput.description;
    category.creator = creator;

    return this.categoryRepository.save(category);
  }

  async updateCategory(id: number, categoryInput: CategoryInput): Promise<Category> {
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
