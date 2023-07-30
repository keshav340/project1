import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subcategory } from './entity/subcategory.entity';
import { CreateSubcategoryInput, UpdateSubcategoryInput, DeleteSubcategoryInput } from './subcategory.input';
import { SubcategoryType } from './subcategory.type';
import { Category } from '../category/entity/category.entity';

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectRepository(Subcategory)
    private subcategoryRepository: Repository<Subcategory>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createSubcategory(subcategoryInput: CreateSubcategoryInput): Promise<SubcategoryType> {
    const { categoryId, ...data } = subcategoryInput;

    const category = await this.categoryRepository.findOne({where:{id:categoryId}});
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    
    const subcategory = this.subcategoryRepository.create(data);
    subcategory.category = category;

    
    const createdSubcategory = await this.subcategoryRepository.save(subcategory);

    
    return {
      id: createdSubcategory.id,
      name: createdSubcategory.name,
      description: createdSubcategory.description,
      category: {
        id: category.id,
        name: category.name,
        description: category.description,
      },
    };
  }

  async getSubcategoryById(id: number): Promise<SubcategoryType> {
    const subcategory = await this.subcategoryRepository.findOne({ where: { id }, relations: ['category'] });
  
    if (!subcategory) {
      throw new NotFoundException('Subcategory not found');
    }
  
    if (!subcategory.category) {
      throw new NotFoundException('Subcategory does not have a valid category');
    }
  
    return {
      id: subcategory.id,
      name: subcategory.name,
      description: subcategory.description,
      category: {
        id: subcategory.category.id,
        name: subcategory.category.name,
        description: subcategory.category.description,
      },
    };
  }
  
  
  
  async updateSubcategory(updateSubcategoryInput: UpdateSubcategoryInput): Promise<SubcategoryType> {
    const { id, ...data } = updateSubcategoryInput;
  
    
    const subcategory = await this.subcategoryRepository
      .createQueryBuilder('subcategory')
      .leftJoinAndSelect('subcategory.category', 'category')
      .where('subcategory.id = :id', { id })
      .getOne();
  
    if (!subcategory) {
      throw new NotFoundException('Subcategory not found');
    }
  
   
    Object.assign(subcategory, data);
    await this.subcategoryRepository.save(subcategory);
  
    return {
      id: subcategory.id,
      name: subcategory.name,
      description: subcategory.description,
      category: {
        id: subcategory.category.id,
        name: subcategory.category.name,
        description: subcategory.category.description,
      },
    };
  }
  

  async deleteSubcategory(id: number): Promise<boolean> {
    const subcategory = await this.subcategoryRepository.findOne({where:{id:id}});
  
    if (!subcategory) {
      throw new NotFoundException('Subcategory not found');
    }
  
    await this.subcategoryRepository.remove(subcategory);
  
    return true;
  }
  
  
}
