import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoryType, CategoryInput } from '../category/dto/category.dto';
import { CategoryService } from './category.service';

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
  async createCategory(
    @Args('categoryInput') categoryInput: CategoryInput,
  ): Promise<CategoryType> {
    return this.categoryService.createCategory(categoryInput);
  }

  @Mutation(() => CategoryType)
  async updateCategory(
    @Args('id') id: number,
    @Args('categoryInput') categoryInput: CategoryInput,
  ): Promise<CategoryType> {
    return this.categoryService.updateCategory(id, categoryInput);
  }

  @Mutation(() => Boolean)
  async deleteCategory(@Args('id') id: number): Promise<boolean> {
    return this.categoryService.deleteCategory(id);
  }
}
