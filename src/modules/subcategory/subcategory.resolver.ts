import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SubcategoryService } from './subcategory.service';
import { SubcategoryType } from './subcategory.type';
import { CreateSubcategoryInput, UpdateSubcategoryInput } from './subcategory.input';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => SubcategoryType)
export class SubcategoryResolver {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @Query(() => SubcategoryType)
  async getSubcategoryById(@Args('id', { type: () => Int }) id: number): Promise<SubcategoryType> {
    return this.subcategoryService.getSubcategoryById(id);
  }

  @Mutation(() => SubcategoryType)
  async createSubcategory(
    @Args('subcategoryInput') subcategoryInput: CreateSubcategoryInput,
  ): Promise<SubcategoryType> {
    return this.subcategoryService.createSubcategory(subcategoryInput);
  }

  @Mutation(() => SubcategoryType)
  async updateSubcategory(
    @Args('updateSubcategoryInput') updateSubcategoryInput: UpdateSubcategoryInput,
  ): Promise<SubcategoryType> {
    return this.subcategoryService.updateSubcategory(updateSubcategoryInput);
  }

  @Mutation(() => Boolean)
  async deleteSubcategory(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    const deleted = await this.subcategoryService.deleteSubcategory(id);
    
    if (!deleted) {
      throw new NotFoundException('Subcategory not found');
    }

    return true;
  }
}

