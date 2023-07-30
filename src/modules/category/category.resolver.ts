import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoryType, CategoryInput } from '../category/dto/category.dto';
import { CategoryService } from './category.service';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import Role from "src/modules/enums/roles.enum"

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
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  async createCategory(
    @Args('categoryInput') categoryInput: CategoryInput,
  ): Promise<CategoryType> {
    return this.categoryService.createCategory(categoryInput);
  }

  @Mutation(() => CategoryType)
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  async updateCategory(
    @Args('id') id: number,
    @Args('categoryInput') categoryInput: CategoryInput,
  ): Promise<CategoryType> {
    return this.categoryService.updateCategory(id, categoryInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  async deleteCategory(@Args('id') id: number): Promise<boolean> {
    return this.categoryService.deleteCategory(id);
  }
}
