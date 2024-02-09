// category/category.resolver.ts

import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { CategoryType, CategoryInput } from './dto/category.dto';
import { CategoryService } from './category.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { User } from '../users/entities/user.entity'; // Import the User entity

@Resolver(() => CategoryType)
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query(() => [CategoryType])
  async getAllCategories(): Promise<CategoryType[]> {
    return this.categoryService.getAllCategories();
  }

  @Query(() => CategoryType)
  async getCategory(@Args('id') id: number): Promise<CategoryType> {
    return this.categoryService.getCategoryById(id);
  }

  @Mutation(() => CategoryType)
  @UseGuards(GqlAuthGuard)
  async createCategory(
    @Args('categoryInput') categoryInput: CategoryInput,
    @Context() context,
  ): Promise<CategoryType> {
    const creator: User = context.req.user;
    console.log('Creator:', creator);
    return this.categoryService.createCategory(categoryInput, creator);
  }

  @Mutation(() => CategoryType)
  @UseGuards(GqlAuthGuard)
  async updateCategory(
    @Args('id') id: number,
    @Args('categoryInput') categoryInput: CategoryInput,
  ): Promise<CategoryType> {
    return this.categoryService.updateCategory(id, categoryInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteCategory(@Args('id') id: number): Promise<boolean> {
    return this.categoryService.deleteCategory(id);
  }
}
